'use client'
import React, { useEffect, useState } from 'react'
import BrandDetailForm from '@/views/products/brands/BrandDetailForm'
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

  useEffect(() => {
    if (id !== 'addnewbrand') {
      const individualBrand = async () => {
        try {
          const getIndividualBrand = `/admin/brands/getbrand/${id}`
          const responseData = await fetchData(getIndividualBrand, 'GET')
          setGetIndividualData(responseData)
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
      }
      individualBrand()
    } else {
      setLoading(false)
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

  if (id === 'addnewbrand') {
    return <BrandDetailForm isAddBrand={true} />
  }

  return <BrandDetailForm brandData={getIndividualData} />
}
