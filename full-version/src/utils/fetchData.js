import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie'


const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()
const generateTimestamp = () => Date.now().toString()
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

const fetchData= async(url, method='GET', data = null) =>{
  
  const secret = process.env.NEXT_PUBLIC_SECRET_KEY || '';
  const token = Cookies.get('accessToken')

  if (!secret) {
    throw new Error('Secret key is not defined')
    
  }

  if (!token) {
    throw new Error('Token is not defined')
  }
  
  // const payloaddata = data ? JSON.stringify(data) : '';
  const payloaddata = data ? JSON.stringify(data): JSON.stringify({})
  const nonce = generateNonce()
  const timestamp = generateTimestamp()
  const signature = generateSignature(payloaddata, secret, nonce, timestamp)


    const headers= {
      'Content-Type': 'application/json',
      'livein-key': 'livein-key',
      'Nonce': nonce,
      'Timestamp': timestamp,
      'Signature': signature,
      'Authorization': `Bearer ${token}`
      
    }
  
  const requestOptions = {
    method, 
    headers,
    body: method !== 'GET'?JSON.stringify(data):null
  }
  try {
    
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
return await response.json();
  }
   catch (error) {
    console.error('Error fetching data:', error);
    throw error
  }
}

export default fetchData