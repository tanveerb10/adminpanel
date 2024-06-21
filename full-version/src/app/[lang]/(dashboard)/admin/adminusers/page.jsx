'use client'
import { useState, useEffect } from 'react'
import Adminusers from '@/views/admin/adminusers/Adminusers'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

// Function to generate nonce
const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()

// Function to generate a timestamp
const generateTimestamp = () => Date.now().toString()

// Function to generate a signature
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

// Function to get data using Fetch API
const getData = async (setUserData, setRoleData ,setError, setLoading) => {
  const secret = process.env.NEXT_PUBLIC_SECRET_KEY
  const token = Cookies.get('accessToken')

  console.log({ token })

  if (!secret) {
    setError('Secret key is not defined')
    setLoading(false)
    return
  }

  if (!token) {
    setError('Token is not defined')
    setLoading(false)
    return
  }

  const payloaddata = JSON.stringify({})
  const nonce = generateNonce()
  const timestamp = generateTimestamp()
  const signature = generateSignature(payloaddata, secret, nonce, timestamp)

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'livein-key': 'livein-key',
        'Nonce': nonce,
        'Timestamp': timestamp,
        'Signature': signature,
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
      // credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch userData, status: ${response.status}`)
    }

    const data = await response.json()
    setUserData(data)
    console.log({ data })
  } catch (error) {
    console.error('Error fetching data:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }

  try {
    const roleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'livein-key': 'livein-key',
        'Nonce': nonce,
        'Timestamp': timestamp,
        'Signature': signature,
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
      // credentials: 'include',
    })

    if (!roleResponse.ok) {
      throw new Error(`Failed to fetch userData, status: ${roleResponse.status}`)
    }

    const rData = await roleResponse.json()
    setRoleData(rData)
  } catch (error) {
    console.error('Error fetching data:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

const Page = () => {
  const [userData, setUserData] = useState(null)
  const [roleData, setRoleData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getData(setUserData, setRoleData ,setError, setLoading)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return <Adminusers userData={userData} roleData={roleData}/>
}

export default Page
