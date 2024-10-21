'use client'
import { useEffect, useState } from 'react'

import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import AllCustomer from '@/views/customers/allcustomers/customerDetails/AllCustomer'

export default function Page() {
  // State for Customer Tab
  const [customerResponse, setCustomerResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [customerTotalPages, setCustomerTotalPages] = useState(0)
  const [totalCustomer, setTotalCustomer] = useState(0)

  const fetchCustomer = async (page = 1, limit = 3) => {
    setLoading(true)
    setError(null)
    try {
      const customerUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/allcustomers?page=${page}&limit=${limit}`

      const responseData = await fetchData(customerUrl, 'GET')
      if (responseData.success) {
        setCustomerResponse(responseData.totalCustomer)
        setCustomerTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
        setTotalCustomer(responseData.customerCount)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer(currentPage, limit)
  }, [currentPage, limit])

  // Handlers for Customer Tab
  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }
  const handleLimitChange = newLimit => {
    setLimit(newLimit)
    setCurrentPage(1)
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
    limit: limit,
    totalPages: customerTotalPages,
    handlePageChange,
    handleLimitChange,
    currentPage: currentPage,
    totalCustomer
  }

  return (
    <>
      <AllCustomer {...customerProps} />
    </>
  )
}
