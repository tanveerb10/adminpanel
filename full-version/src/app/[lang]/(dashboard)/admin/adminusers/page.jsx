'use client'
import { useState, useEffect } from 'react'
import Adminusers from '@/views/admin/adminusers/Adminusers'
import fetchFormData from '@/utils/fetchFormData'
import Loader from '@/libs/components/Loader'
const getData = async (
  setUserData,
  setRoleData,
  setError,
  setLoading,
  setTotalPages,
  setCurrentPage,
  setTotalAdmin,
  currentPage = 1,
  limit = 3
) => {
  try {
    const [userResponse, roleResponse] = await Promise.all([
      fetchFormData(`/admin/admins/alladmin?page=${currentPage}&limit=${limit}`, 'GET'),
      fetchFormData(`/admin/roles/allroles`, 'GET')
    ])

    if (!userResponse.success) {
      throw new Error(`Failed to fetch user data, status: ${userResponse.status}`)
    }

    // Check role data response
    if (!roleResponse.success) {
      throw new Error(`Failed to fetch role data, status: ${roleResponse.status}`)
    }

    // Update state with fetched data
    setUserData(userResponse.allAdmin)
    setTotalPages(userResponse.totalPages)
    setCurrentPage(userResponse.currentPage)
    setTotalAdmin(userResponse.adminsCount)
    setRoleData(roleResponse)
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
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalAdmin, setTotalAdmin] = useState(0)

  useEffect(() => {
    getData(
      setUserData,
      setRoleData,
      setError,
      setLoading,
      setTotalPages,
      setCurrentPage,
      setTotalAdmin,
      currentPage,
      limit
    )
  }, [currentPage, limit])

  const handlePageChange = newPage => {
    console.log('handle page change', newPage)
    setCurrentPage(newPage)
  }
  const handleLimitChange = newLimit => {
    console.log('handle limit change', newLimit)
    setLimit(newLimit)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error || 'An unexpected error occurred'}</div>
  }

  return (
    <Adminusers
      userData={userData}
      limit={limit}
      currentPage={currentPage}
      totalAdmin={totalAdmin}
      totalPages={totalPages}
      roleData={roleData}
      handlePageChange={handlePageChange}
      handleLimitChange={handleLimitChange}
    />
  )
}
export default Page
