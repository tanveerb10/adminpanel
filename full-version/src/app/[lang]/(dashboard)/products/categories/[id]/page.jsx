'use client'
import React, { useEffect, useState } from 'react'
import CategoriesDetailForm from '@/views/products/Categories/CategoriesDetailForm'
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
    if (id !== 'addnewcategory') {
      const individualCategories = async () => {
        try {
          const getIndividualCategories = `/admin/categories/${id}`
          const responseData = await fetchData(getIndividualCategories, 'GET')
          setGetIndividualData(responseData)
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
      }
      individualCategories()
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

  if (id === 'addnewcategory') {
    return <CategoriesDetailForm isAddCategories={true} />
  }

  return <CategoriesDetailForm categoryData={getIndividualData} />
}
