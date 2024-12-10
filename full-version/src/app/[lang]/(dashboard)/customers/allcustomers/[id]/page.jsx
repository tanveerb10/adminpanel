'use client'
import React, { useEffect, useState } from 'react'
// import CustomerDetailForm from '@/views/customers/allcustomers/customerDetails/CustomerDetailForm'
import { useAuth } from '@/contexts/AuthContext'
import fetchData from '@/utils/fetchData'
import { useParams, useRouter } from 'next/navigation'
import Loader from '@/libs/components/Loader'
import dynamic from 'next/dynamic'
import TabsPanel from '@/libs/components/TabsPanel'

const CustomerAddressToggleParent = dynamic(
  () => import('@/views/customers/allcustomers/customerAddress/CustomerAddressToggleParent')
)
const CustomerDetailForm = dynamic(() => import('@/views/customers/allcustomers/customerDetails/CustomerDetailForm'))

export default function page() {
  const [getIndividualData, setGetIndividualData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()
  console.log(id)

  const individualCustomer = async () => {
    try {
      setLoading(true)
      const getIndividualCustomer = `/admin/customers/getcustomer/${id}`
      const responseData = await fetchData(getIndividualCustomer, 'GET')
      setGetIndividualData(responseData)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id !== 'addnewcustomer') {
      individualCustomer()
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>No data available</div>
  }

  const tabContent = {
    AllCustomer: (
      <CustomerDetailForm customerData={getIndividualData} id={id} individualCustomer={individualCustomer} />
    ),
    AllCustomerAddress: <CustomerAddressToggleParent id={id} />
  }

  const allTabs = [
    { key: 'AllCustomer', label: 'Customer' },
    { key: 'AllCustomerAddress', label: 'Customer Address' }
  ]

  if (id === 'addnewcustomer') {
    return <CustomerDetailForm isAddCustomer={true} />
  }

  return (
    <>
      <TabsPanel tabContent={tabContent} allTabs={allTabs} />
    </>
  )
}
