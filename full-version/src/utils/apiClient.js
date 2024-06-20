import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const secret = process.env.NEXT_PUBLIC_SECRET_KEY;

// Function to generate nonce
const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString();

// Function to generate a timestamp
const generateTimestamp = () => Date.now().toString();

// Function to generate a signature
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`;
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex);
};

// Create an Axios instance
export const apiClient = axios.create({
  baseURL: 'http://165.232.189.68',
  withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const payloaddata = JSON.stringify(config.data || {});
    const nonce = generateNonce();
    const timestamp = generateTimestamp();
    const signature = generateSignature(payloaddata, secret, nonce, timestamp);

    // Get the access token from cookies
    const token = Cookies.get('accessToken');

    // Add headers to the request
    config.headers['Content-Type'] = 'application/json';
    config.headers['Nonce'] = nonce;
    config.headers['Timestamp'] = timestamp;
    config.headers['Signature'] = signature;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
