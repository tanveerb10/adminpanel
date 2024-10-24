'use client'
import { useState, useEffect } from 'react'
import Adminusers from '@/views/admin/adminusers/Adminusers'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

const Page = () => {
  const [userData, setUserData] = useState([])
  const [roleData, setRoleData] = useState(null)
  const [adminLoading, setAdminLoading] = useState(true)
  const [roleLoading, setRoleLoading] = useState(true)
  const [adminError, setAdminError] = useState(null)
  const [roleError, setRoleError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalAdmin, setTotalAdmin] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')

  const fetchAdmins = async (page = 1, limit = 3, searchValue = '') => {
    const adminUrl =
      searchValue.length > 0
        ? `/admin/admins/searchadmins?q=${searchValue}&page=${page}&limit=${limit}`
        : `/admin/admins/alladmin?page=${page}&limit=${limit}`

    try {
      setAdminLoading(true)
      setAdminError(null)
      const userResponse = await fetchData(adminUrl, 'GET')
      if (!userResponse.success) throw new Error(`Failed to fetch user data`)
      setUserData(userResponse.allAdmin)
      setTotalPages(userResponse.totalPages)
      setTotalAdmin(userResponse.adminsCount)
    } catch (err) {
      setAdminError(err.message || 'An unknown error occurred')
    } finally {
      setAdminLoading(false)
    }
  }

  const fetchRoles = async () => {
    const roleUrl = '/admin/roles/allroles'
    try {
      setRoleLoading(true)
      setRoleError(null)
      const responseData = await fetchData(roleUrl, 'GET')
      setRoleData(responseData)
    } catch (err) {
      setRoleError(err.message || 'An unknown error occurred')
    } finally {
      setRoleLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins(currentPage, limit, searchValue)
  }, [currentPage, limit, searchValue])

  useEffect(() => {
    fetchRoles()
  }, [])

  const handlePageChange = newPage => setCurrentPage(newPage)
  const handleLimitChange = newLimit => {
    setLimit(newLimit)
    setCurrentPage(1)
  }
  const handleSearch = search => {
    setSearchValue(search)
    setCurrentPage(1)
  }
  const resetFilter = () => {
    setCurrentPage(1)
    setLimit(3)
    setSearchValue('')
    setValue('')
    fetchAdmins(1, 3)
  }

  if (adminLoading || roleLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (adminError || roleError) {
    return <div>Error: {adminError || roleError || 'An unexpected error occurred'}</div>
  }

  const adminProps = {
    userData,
    limit,
    currentPage,
    totalAdmin,
    totalPages,
    roleData,
    handlePageChange,
    handleLimitChange,
    handleSearch,
    value,
    setValue,
    resetFilter
  }

  return <Adminusers {...adminProps} />
}

export default Page
