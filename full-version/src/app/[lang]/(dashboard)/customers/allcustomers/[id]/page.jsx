'use client'
import React, { useEffect, useState } from 'react'
import CustomerDetailForm from '@/views/customers/allcustomers/CustomerDetailForm'
import { useAuth } from '@/contexts/AuthContext'
import fetchData from '@/utils/fetchData'
import { useParams, useRouter } from 'next/navigation'
import Loader from '@/libs/components/Loader'
export default function page() {
  const [getIndividualData, setGetIndividualData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()
  console.log(id)

  const individualCustomer = async () => {
    try {
      setLoading(true)
      const getIndividualCustomer = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/getcustomer/${id}`
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

  if (role !== 'superadmin') {
    setTimeout(() => router.push('/'), 3000)
    return <div>wait you are going to redirect because you are not super admin...</div>
  }
  if (error) {
    return <div>No data available</div>
  }

  if (id === 'addnewcustomer') {
    return <CustomerDetailForm isAddCustomer={true} />
  }

  return <CustomerDetailForm customerData={getIndividualData} id={id} individualCustomer={individualCustomer} />
}
