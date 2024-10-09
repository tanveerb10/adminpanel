'use client'
import React, { useEffect, useState } from 'react'
import Tags from '@/views/products/tags/Tags'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
export default function Page() {
  const [tagsResponse, setTagsResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalTags, setTotalTags] = useState(0)

  const fetchTags = async (page = 1, limit = 3) => {
    setLoading(true)
    setError(null)
    try {
      const tagsUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/tags?page=${page}&limit=${limit}`

      const responseData = await fetchData(tagsUrl, 'GET')
      if (responseData.success) {
        setTagsResponse(responseData.allTag)
        setTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
        setTotalTags(responseData.tagCount)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags(currentPage, limit)
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
  console.log(tagsResponse, 'tags all')

  const tagsProps = {
    tagsData: tagsResponse,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalTags,
    fetchTags: fetchTags
  }

  return <>{tagsResponse.length > 0 ? <Tags {...tagsProps} /> : <Loader />}</>
}
