'use client'
import { useEffect, useState } from 'react'
import Allproducts from '@/views/products/allproducts/Allproducts'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

export default function page() {
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    const fetchProducts = async (page, limit) => {
      const productUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/allproduct?page=${page}&limit=${limit}`
      try {
        setLoading(true)
        const responseData = await fetchData(productUrl, 'GET')
        console.log('Get products data', responseData)
        setProductData(responseData.allProduct)
        setTotalProducts(responseData.productCount)
        setTotalPages(responseData.totalPages)
        setCurrentPage(responseData.currentPage)
      } catch (error) {
        setError(error || 'Error occurred')
        console.error('error got', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts(currentPage, limit)
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
    return <div>{error.message}</div>
  }

  const productProps = {
    allProductData: productData,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalProducts,
    fromMetas: true
  }

  return (
    <div>
      <Allproducts {...productProps} />
    </div>
  )
}
