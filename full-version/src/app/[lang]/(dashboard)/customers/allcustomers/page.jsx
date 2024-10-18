'use client'
import { useEffect, useState } from 'react'

import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import AllCustomer from '@/views/customers/allcustomers/customerDetails/AllCustomer'
import CustomerSetting from '@/views/customers/allcustomers/index'
import dynamic from 'next/dynamic'

// const AllCustomer = dynamic(() => import('@/views/customers/allcustomers/customerDetails/AllCustomer'), {
//   ssr: false
// })
// const AllCustomerAddress = dynamic(() => import('@/views/customers/allcustomers/customerAddress/AllCustomerAddress'), {
//   ssr: false
// })
export default function Page() {
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [limit, setLimit] = useState(10)
  // const [totalPages, setTotalPages] = useState(0)

  // State for Customer Tab
  const [customerResponse, setCustomerResponse] = useState([])
  const [customerLoading, setCustomerLoading] = useState(true)
  const [customerError, setCustomerError] = useState(null)
  const [customerCurrentPage, setCustomerCurrentPage] = useState(1)
  const [customerLimit, setCustomerLimit] = useState(3)
  const [customerTotalPages, setCustomerTotalPages] = useState(0)
  const [totalCustomer, setTotalCustomer] = useState(0)

  // State for Customer Address Tab
  const [customerAddressResponse, setCustomerAddressResponse] = useState([])
  const [addressLoading, setAddressLoading] = useState(true)
  const [addressError, setAddressError] = useState(null)
  const [addressCurrentPage, setAddressCurrentPage] = useState(1)
  const [addressLimit, setAddressLimit] = useState(3)
  const [addressTotalPages, setAddressTotalPages] = useState(0)
  const [customerAddressCount, setCustomerAddressCount] = useState(0)

  const fetchCustomerDetails = async (page = 1, limit = 3) => {
    setCustomerLoading(true)
    setCustomerError(null)
    try {
      const customerUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/allcustomers?page=${page}&limit=${limit}`

      const responseData = await fetchData(customerUrl, 'GET')
      if (responseData.success) {
        setCustomerResponse(responseData.totalCustomer)
        setCustomerTotalPages(responseData.totalPages)
        setCustomerCurrentPage(responseData.currentPage)
        setTotalCustomer(responseData.customerCount)
      }
    } catch (error) {
      console.log('error got', error.message)
      setCustomerError(error)
    } finally {
      setCustomerLoading(false)
    }
  }

  const fetchCustomerAddress = async (page = 1, limit = 3) => {
    setCustomerAddressResponse(true)
    setAddressError(null)
    try {
      const customerUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/allcustomersaddress?page=${page}&limit=${limit}`

      const responseData = await fetchData(customerUrl, 'GET')
      if (responseData.success) {
        setCustomerAddressResponse(responseData.data)
        setAddressTotalPages(responseData.totalPages)
        setAddressCurrentPage(responseData.currentPage)
        setCustomerAddressCount(responseData.customer_address_count)
      }
    } catch (error) {
      console.log('error got', error.message)
      setAddressError(error)
    } finally {
      setAddressLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomerAddress(customerCurrentPage, customerLimit)
  }, [customerCurrentPage, customerLimit])
  useEffect(() => {
    fetchCustomerDetails(addressCurrentPage, addressLimit)
  }, [addressCurrentPage, addressLimit])

  // const handlePageChange = newPage => {
  //   console.log('handle page change', newPage)
  //   setCurrentPage(newPage)
  // }
  // const handleLimitChange = newLimit => {
  //   console.log('handle limit change', newLimit)
  //   setLimit(newLimit)
  //   setCurrentPage(1)
  // }

  // Handlers for Customer Tab
  const handleCustomerPageChange = newPage => {
    setCustomerCurrentPage(newPage)
  }
  const handleCustomerLimitChange = newLimit => {
    setCustomerLimit(newLimit)
    setCustomerCurrentPage(1)
  }

  // Handlers for Customer Address Tab
  // const handleAddressPageChange = newPage => {
  //   setAddressCurrentPage(newPage)
  // }
  // const handleAddressLimitChange = newLimit => {
  //   setAddressLimit(newLimit)
  //   setAddressCurrentPage(1)
  // }

  if (customerLoading || addressLoading) {
    return <Loader />
  }

  if (customerError || addressError) {
    return <div>Error: {customerError?.message || addressError?.message || 'An unknown error occurred.'}</div>
  }

  console.log(customerResponse, 'customer all')

  const customerProps = {
    customerData: customerResponse,
    limit: customerLimit,
    totalPages: customerTotalPages,
    handlePageChange: handleCustomerPageChange,
    handleLimitChange: handleCustomerLimitChange,
    currentPage: customerCurrentPage,
    totalCustomer,
    TabValue: 'AllCustomer'
  }
  // const customerAddressProps = {
  //   customerAddressData: customerAddressResponse,
  //   limit: addressLimit,
  //   totalPages: addressTotalPages,
  //   handlePageChange: handleAddressPageChange,
  //   handleLimitChange: handleAddressLimitChange,
  //   currentPage: addressCurrentPage,
  //   customerAddressCount,
  //   TabValue: 'AllCustomerAddress'
  // }
  // const tabContent = {
  //   AllCustomer: <AllCustomer {...customerProps} />,
  //   // AllCustomerAddress: <AllCustomerAddress {...customerAddressProps} />
  // }

  return (
    <>
      {/* <CustomerSetting tabContent={tabContent} /> */}
      <AllCustomer {...customerProps} />
    </>
  )
}
