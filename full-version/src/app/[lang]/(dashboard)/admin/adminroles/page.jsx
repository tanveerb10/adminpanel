'use client'
import { useState, useEffect } from 'react'
import Adminroles from '@/views/admin/adminroles/Adminroles'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

const Page = () => {
  const [roleData, setRoleData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRoles, setTotalRoles] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')

  const fetchRoles = async (page = 1, limit = 3, searchValue = '') => {
    const roleApi =
      searchValue.length > 0
        ? `/admin/roles/searchrole?q=${searchValue}&page=${page}&limit=${limit}`
        : `/admin/roles/allroles?page=${page}&limit=${limit}`
    try {
      setLoading(true)
      setError(null)

      const roleResponse = await fetchData(roleApi, 'GET')

      if (!roleResponse.success) {
        throw new Error(`Failed to fetch role, status: ${roleResponse.status}`)
      }

      setRoleData(roleResponse.roles)
      setTotalPages(roleResponse.totalPages)
      setCurrentPage(roleResponse.currentPage)
      setTotalRoles(roleResponse.rolesCount)
    } catch (error) {
      console.error('Error fetching data:', error)
      const errorMessage = error.message || 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles(currentPage, limit, searchValue)
  }, [currentPage, limit, searchValue])

  const handlePageChange = newPage => {
    console.log('handle page change', newPage)
    setCurrentPage(newPage)
  }
  const handleLimitChange = newLimit => {
    console.log('handle limit change', newLimit)
    setLimit(newLimit)
    setCurrentPage(1)
  }
  const handleSearch = search => {
    console.log('hello', search)
    setSearchValue(search)
    setCurrentPage(1)
  }

  const resetFilter = () => {
    setCurrentPage(1)
    setLimit(3)
    setSearchValue('')
    setValue('')
    fetchRoles(1, 3)
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
    totalRoles,
    handleSearch,
    setValue,
    resetFilter,
    value
  }

  return <>{<Adminroles {...rolesProps} />}</>
}

export default Page
