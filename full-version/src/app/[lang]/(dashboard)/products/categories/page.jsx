'use client'
import React, { useEffect, useState } from 'react'
import Categories from '@/views/products/Categories/Categories'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
export default function page() {
  const [categoriesResponse, setCategoriesResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/categories`

        const responseData = await fetchData(categoriesUrl, 'GET')
        setCategoriesResponse(responseData)
      } catch (error) {
        console.log('error got', error.message)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])
  // console.log(responseData)

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  console.log(categoriesResponse, 'categories all')

  return (
    <div>
      <Categories CategoriesData={categoriesResponse} />
    </div>
  )
}
