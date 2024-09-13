'use client'
import { useState, useEffect } from 'react'
import Adminusers from '@/views/admin/adminusers/Adminusers'
import fetchFormData from '@/utils/fetchFormData'

const getData = async (setUserData, setRoleData, setError, setLoading) => {
  try {
    const [userResponse, roleResponse] = await Promise.all([
      fetchFormData(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins`, 'GET'),
      fetchFormData(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles`, 'GET')
    ])

    if (!userResponse.success) {
      throw new Error(`Failed to fetch user data, status: ${userResponse.status}`)
    }

    // Check role data response
    if (!roleResponse.success) {
      throw new Error(`Failed to fetch role data, status: ${roleResponse.status}`)
    }

    // Update state with fetched data
    setUserData(userResponse)
    setRoleData(roleResponse)
    console.log(userResponse)
    console.log(roleResponse)
  } catch (error) {
    setError(error.message)
  } finally {
    // Ensure loading is false after both requests finish
    setLoading(false)
  }
}

const Page = () => {
  const [userData, setUserData] = useState(null)
  const [roleData, setRoleData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getData(setUserData, setRoleData, setError, setLoading)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error || 'An unexpected error occurred'}</div>
  }

  return <Adminusers userData={userData} roleData={roleData} />
}

export default Page
