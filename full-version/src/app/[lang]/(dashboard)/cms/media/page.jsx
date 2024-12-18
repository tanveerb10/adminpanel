'use client'
import { useEffect, useState } from 'react'
import Media from '@views/cms/media/Media'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

export default function page() {
  const [loading, setLoading] = useState(false)
  const [mediaData, setMediaData] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalMedia, setTotalMedia] = useState(0)

  const fetchMediaData = async (page = 1, limit = 3) => {
    setLoading(true)
    setError(null)
    try {
      const url = `/admin/cms/getAllOtherFilesSettings?page=${page}&limit=${limit}`
      const responseData = await fetchData(url, 'GET')
      if (responseData.success) {
        setMediaData(responseData.data)
        setTotalMedia(responseData.totalItems)
        setTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
        console.log(mediaData, 'media data')
      } else {
        setError('Failed to fetch data')
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMediaData(currentPage, limit)
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
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div>Error: {error.message || 'An unknown error occurred.'}</div>
  }

  const mediaProps = {
    mediaData,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalMedia
  }
  return (
    <div>
      <Media {...mediaProps} />
    </div>
  )
}
