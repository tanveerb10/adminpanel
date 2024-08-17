import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import { convertFormDataIntoObject } from '@/utils/convertFormDataIntoObject'
const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()
const generateTimestamp = () => Date.now().toString()
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

const fetchFormData = async (url, method = 'POST', formData) => {
  const secret = process.env.NEXT_PUBLIC_SECRET_KEY || ''
  const token = Cookies.get('accessToken')

  if (!secret || !token) {
    throw new Error('Secret key or token is not defined')
  }

  const payloaddata = formData
  // instanceof FormData ? convertFormDataIntoObject(formData) : formData
  console.log(payloaddata, 'payyyyyyyyylllllllooooaaaddd')
  const nonce = generateNonce()
  const timestamp = generateTimestamp()
  const signature = generateSignature(JSON.stringify(payloaddata), secret, nonce, timestamp)

  const headers = {
    'livein-key': 'livein-key',
    Nonce: nonce,
    Timestamp: timestamp,
    Signature: signature,
    Authorization: `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: formData
    })

    return await response.json()

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status} `)
    // }
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export default fetchFormData
