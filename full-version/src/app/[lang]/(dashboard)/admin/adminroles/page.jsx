'use client'
import { useState, useEffect } from 'react'
import Adminroles from '@/views/admin/adminroles/Adminroles'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
const getData = async (setError, setRoleData, setLoading) => {
  try {
    const roleApi = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles`
    const roleResponse = await fetchData(roleApi, 'GET')

    if (!roleResponse.success) {
      throw new Error(`Failed to fetch userData, status: ${roleResponse.status}`)
    }

    setRoleData(roleResponse)
  } catch (error) {
    console.error('Error fetching data:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

const Page = () => {
  const [roleData, setRoleData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getData(setError, setRoleData, setLoading)
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  return <Adminroles roleData={roleData} />
}

export default Page
