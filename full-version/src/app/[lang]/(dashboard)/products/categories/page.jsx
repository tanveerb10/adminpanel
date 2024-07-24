'use client'
import React, { useEffect, useState } from 'react'
import Categories from '@/views/products/Categories/Categories'
import fetchData from '@/utils/fetchData'

export default function page() {
  const [CategoriesResponse, setCategoriesResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const CategoriesUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/categories`

        const responseData = await fetchData(CategoriesUrl, 'GET')
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
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  console.log(CategoriesResponse, 'Categories all')

  return (
    <div>
      <Categories CategoriesData={CategoriesResponse} />
    </div>
  )
}
