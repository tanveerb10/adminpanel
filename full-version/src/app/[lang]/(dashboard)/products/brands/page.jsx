'use client'
import { useEffect, useState } from 'react'
import Brands from '@/views/products/brands/Brands'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
export default function page() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalBrands, setTotalBrands] = useState(0)

  const fetchBrands = async (page = 1, limit = 3) => {
    setLoading(true)
    setError(null)
    try {
      const brandUrl = `/admin/brands?page=${page}&limit=${limit}`
      const responseData = await fetchData(brandUrl, 'GET')
      if (responseData.success) {
        setBrands(responseData.allBrand)
        setTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
        setTotalBrands(responseData.brandCount)
      }
    } catch (err) {
      console.log('Error received:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands(currentPage, limit)
  }, [currentPage, limit])

  const handlePageChange = newPage => {
    console.log('handle page change', newPage)
    setCurrentPage(newPage)
    // await fetchBrands(newPage,limit)
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

  console.log(brands, 'brands all')

  const brandsProps = {
    brandsData: brands,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalBrands
  }
  return <div>{brands.length > 0 ? <Brands {...brandsProps} /> : <Loader />}</div>
}
