'use client'
import { useEffect, useState } from 'react'
import Allcustomer from '@/views/customers/allcustomers/Allcustomer'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
export default function Page() {
  const [customerResponse, setCustomerResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCustomer, setTotalCustomer] = useState(0)

  const fetchCustomer = async (page = 1, limit = 3) => {
    setLoading(true)
    setError(null)
    try {
      const customerUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/allcustomers?page=${page}&limit=${limit}`

      const responseData = await fetchData(customerUrl, 'GET')
      if (responseData.success) {
        setCustomerResponse(responseData.totalCustomer)
        setTotalPages(responseData.totalPages)
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
    return <div>Error: {error.message || 'An unknown error occurred.'}</div>
  }
  console.log(customerResponse, 'customer all')

  const customerProps = {
    customerData: customerResponse,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalCustomer
  }

  return <>{customerResponse.length > 0 ? <Allcustomer {...customerProps} /> : <Loader />}</>
}
