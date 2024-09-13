import axios from 'axios'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import { convertFormdataInObject } from '@/utils/convertFormdataInObject'

const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()
const generateTimestamp = () => Date.now().toString()
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

const fetchFormData = async (
  url,
  method = 'GET',
  data = null,
  type = 'default',
  onUploadProgress,
  onDownloadProgress
) => {
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

  // Add Content-Type header if not FormData
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await axios({
      url,
      method,
      headers,
      data: method !== 'GET' ? (isFormData ? data : payloaddata) : null,
      onUploadProgress: progressEvent => {
        if (onUploadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onUploadProgress(percentCompleted)
        }
      },
      onDownloadProgress: progressEvent => {
        if (onDownloadProgress) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onDownloadProgress(percentCompleted)
        }
      }
    })

    const contentType = response.headers['content-type']

    if (contentType && contentType.includes('application/json')) {
      return response.data
    } else {
      return response
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error.response ? new Error(error.response.data.message) : new Error(error.message)
  }
}

export default fetchFormData
