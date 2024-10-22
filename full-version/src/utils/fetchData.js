import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import { convertFormdataInObject } from '@/utils/convertFormdataInObject'

const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()
const generateTimestamp = () => Date.now().toString()
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

const fetchData = async (url, method = 'GET', data = null, type = 'default') => {
  const secret = process.env.NEXT_PUBLIC_SECRET_KEY || ''
  const token = Cookies.get('accessToken')

  if (!secret || !token) {
    throw new Error('Secret key or token is not defined')
  }

  const isFormData = data instanceof FormData

  let signPayload

  if (isFormData) {
    signPayload = convertFormdataInObject(data, type)
  } else {
    signPayload = data
  }
  console.log(signPayload, 'signpayloaddddddd')
  console.log(data, 'normallll datataatatata')
  const payloaddata = data ? JSON.stringify(signPayload) : JSON.stringify({})

  const nonce = generateNonce()
  const timestamp = generateTimestamp()
  const signature = generateSignature(payloaddata, secret, nonce, timestamp)

  const headers = {
    'livein-key': 'livein-key',
    Nonce: nonce,
    Timestamp: timestamp,
    Signature: signature,
    Authorization: `Bearer ${token}`
  }
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const requestOptions = {
    method,
    headers,
    body: method !== 'GET' ? (isFormData ? data : payloaddata) : null
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_LIVE}${url}`, requestOptions)

    if (!response.ok) {
      const errorText = await response.text()
      const errorData = JSON.parse(errorText) || {}
      const errorMessage = errorData.message || 'Unknown error occurred.'
      throw new Error(errorMessage)
    }
    // Check Content-Type and parse response accordingly
    const contentType = response.headers.get('Content-Type')
    return contentType && contentType.includes('application/json') ? await response.json() : await response.text() // Handle non-JSON responses
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(error.message)
  }
}

export default fetchData
