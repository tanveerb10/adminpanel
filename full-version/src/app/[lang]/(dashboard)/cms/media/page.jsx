'use client'
import { useEffect, useState } from 'react'
import Media from '@views/cms/media/Media'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import { toast } from 'react-toastify'

const ASCENDING = 'asc'
const DESCENDING = 'dsc'

export default function page() {
  const [loading, setLoading] = useState(false)
  const [mediaData, setMediaData] = useState([])
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalMedia, setTotalMedia] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortMethod, setSortMethod] = useState(ASCENDING)
  const [isSortingActive, setIsSortingActive] = useState(false)

  const fetchMediaData = async (page = 1, limit = 3, searchValue = '') => {
    setLoading(true)
    setError(null)
    try {
      const url = `/admin/otherfiles/getAllOtherFiles?page=${page}&limit=${limit}&sortBy=${sortBy}&sortMethod=${sortMethod}&q=${searchValue}`
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
  const fetchMediaDelete = async data => {
    console.log('clicl')
    try {
      const url = `/admin/otherfiles/deleteOtherFilesSettings`
      const responseData = await fetchData(url, 'DELETE', { ids: data })
      if (responseData.success) {
        toast.success('Successfully deleted media')
        fetchMediaData(currentPage, limit)
      } else {
        toast.error('Failed to fetch data')
      }
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred')
    }
  }

  useEffect(() => {
    fetchMediaData(currentPage, limit, searchValue)
  }, [currentPage, limit, searchValue, sortBy, sortMethod])

  const handlePageChange = newPage => {
    console.log('handle page change', newPage)
    setCurrentPage(newPage)
  }
  const handleLimitChange = newLimit => {
    console.log('handle limit change', newLimit)
    setLimit(newLimit)
    setCurrentPage(1)
  }

  const handleSearch = search => {
    console.log('hello', search)
    setSearchValue(search)
    setCurrentPage(1)
  }

  const handleSorting = by => {
    setSortBy(by)
    setSortMethod(prevMethod => (prevMethod === ASCENDING ? DESCENDING : ASCENDING))
    setIsSortingActive(true)
  }

  const resetFilter = () => {
    setCurrentPage(1)
    setLimit(3)
    setSearchValue('')
    setValue('')
    fetchMediaData(1, 3)
    setSortBy('')
    setSortMethod(ASCENDING)

    setIsSortingActive(false)
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
    totalMedia,
    fetchMediaDelete,
    fetchMediaData,
    value,
    handleSearch,
    setValue,
    resetFilter,
    handleSorting,
    sortMethod,
    isSortingActive
  }
  return (
    <div>
      <Media {...mediaProps} />
    </div>
  )
}
