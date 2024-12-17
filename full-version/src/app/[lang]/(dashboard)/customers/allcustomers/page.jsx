'use client'
import { useEffect, useState } from 'react'

import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import AllCustomer from '@/views/customers/allcustomers/customerDetails/AllCustomer'

const ASCENDING = 'asc'
const DESCENDING = 'dsc'

export default function Page() {
  // State for Customer Tab
  const [customerResponse, setCustomerResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [customerTotalPages, setCustomerTotalPages] = useState(0)
  const [totalCustomer, setTotalCustomer] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortMethod, setSortMethod] = useState(ASCENDING)
  const [selectStatus, setSelectStatus] = useState('')
  const [isSortingActive, setIsSortingActive] = useState(false)

  const fetchCustomer = async (page = 1, limit = 3, searchValue = '') => {
    setLoading(true)
    setError(null)
    try {
      const customerUrl = `/admin/customers/allcustomers?page=${page}&limit=${limit}&q=${searchValue}&status=${selectStatus}&sortBy=${sortBy}&sortMethod=${sortMethod}`

      const responseData = await fetchData(customerUrl, 'GET')
      if (responseData.success) {
        setCustomerResponse(responseData.totalCustomer)
        setCustomerTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
        setTotalCustomer(responseData.customerCount)
        setError(null)
      }
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer(currentPage, limit, searchValue)
  }, [currentPage, limit, searchValue, sortBy, sortMethod, selectStatus])

  // Handlers for Customer Tab
  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }
  const handleLimitChange = newLimit => {
    setLimit(newLimit)
    setCurrentPage(1)
  }

  const handleSearch = search => {
    console.log('hello', search)
    setSearchValue(search)
    setCurrentPage(1)
  }
  const handleSelectStatus = status => {
    setSelectStatus(status)
  }

  const handleSorting = by => {
    setSortBy(by)
    setSortMethod(prevMethod => (prevMethod === ASCENDING ? DESCENDING : ASCENDING))
    setIsSortingActive(true)
  }

  const resetFilter = () => {
    fetchCustomer(1, 3)
    setCurrentPage(1)
    setLimit(3)
    setSearchValue('')
    setValue('')
    setSortBy('')
    setSortMethod(ASCENDING)
    setSelectStatus('')
    setIsSortingActive(false)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  console.log(customerResponse, 'customer all')

  const customerProps = {
    customerData: customerResponse,
    limit,
    totalPages: customerTotalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalCustomer,
    value,
    handleSearch,
    setValue,
    resetFilter,
    handleSorting,
    sortMethod,
    selectStatus,
    handleSelectStatus,
    isSortingActive
  }

  return (
    <>
      <AllCustomer {...customerProps} />
    </>
  )
}
