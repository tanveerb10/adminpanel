
import axios from 'axios';
import CryptoJS from 'crypto-js';

// Secret key
export const secret = process.env.NEXT_PUBLIC_SECRET_KEY

// Debugging: Log the secret to ensure it's loaded correctly
console.log("Secret Key:", secret);

// Function to generate nonce
export const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString();

// Function to generate a timestamp
export const generateTimestamp = () => Date.now().toString();

// Function to generate a signature
export const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`;
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex);
};

// Create an Axios instance
export const apiAuthentication = axios.create({
  baseURL: 'http://165.232.189.68',
//   withCredentials: true,
  // credentials: 'include', // for fetch
});

// Add a request interceptor
apiAuthentication.interceptors.request.use(
  (config) => {
    const payloaddata = JSON.stringify(config.data || {});
    const nonce = generateNonce();
    const timestamp = generateTimestamp();
    const signature = generateSignature(payloaddata, secret, nonce, timestamp);

    // Add headers to the request
    config.headers['Content-Type'] = 'application/json';
    config.headers['Nonce'] = nonce;
    config.headers['Timestamp'] = timestamp;
    config.headers['Signature'] = signature;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
