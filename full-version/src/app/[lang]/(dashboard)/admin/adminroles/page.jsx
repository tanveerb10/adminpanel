'use client'
import { useState, useEffect } from 'react'
import Adminroles from '@/views/admin/adminroles/Adminroles'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

const getData = async (
  setError,
  setRoleData,
  setLoading,
  setTotalPages,
  setCurrentPage,
  setTotalRoles,
  page = 1,
  limit = 3
) => {
  setLoading(true)
  setError(null)
  try {
    const roleApi = `/admin/roles/allroles?page=${page}&limit=${limit}`
    const roleResponse = await fetchData(roleApi, 'GET')

    if (!roleResponse.success) {
      throw new Error(`Failed to fetch userData, status: ${roleResponse.status}`)
    }

    if (roleResponse.success) {
      setRoleData(roleResponse.roles)
      setTotalPages(roleResponse.totalPages)
      setCurrentPage(roleResponse.currentPage)
      setTotalRoles(roleResponse.rolesCount)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

const Page = () => {
  const [roleData, setRoleData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRoles, setTotalRoles] = useState(0)

  useEffect(() => {
    getData(setError, setRoleData, setLoading, setTotalPages, setCurrentPage, setTotalRoles, currentPage, limit)
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
    return <Loader />
  }

  if (error) {
    return <div>Errors: {error}</div>
  }

  const rolesProps = {
    roleData,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalRoles
  }

  return <>{roleData.length > 0 ? <Adminroles {...rolesProps} /> : <Loader />}</>
}

export default Page
