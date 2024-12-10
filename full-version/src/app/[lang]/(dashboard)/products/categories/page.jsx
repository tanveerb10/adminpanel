'use client'
import React, { useEffect, useState } from 'react'
import Categories from '@/views/products/Categories/Categories'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
export default function Page() {
  const [categoriesResponse, setCategoriesResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)

  const fetchCategories = async (page = 1, limit = 3) => {
    setLoading(true)
    setError(null)
    try {
      const categoriesUrl = `/admin/categories?page=${page}&limit=${limit}`

      const responseData = await fetchData(categoriesUrl, 'GET')
      if (responseData.success) {
        setCategoriesResponse(responseData.allCategory)
        setTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
        setTotalCategories(responseData.categoryCount)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories(currentPage, limit)
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
  console.log(categoriesResponse, 'categories all')

  const categoriesProps = {
    categoriesData: categoriesResponse,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalCategories
  }

  return <>{categoriesResponse.length > 0 ? <Categories {...categoriesProps} /> : <Loader />}</>
}
