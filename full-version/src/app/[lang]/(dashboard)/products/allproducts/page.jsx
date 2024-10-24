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
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')

  const fetchProducts = async (page, limit, searchValue = '') => {
    const productUrl =
      searchValue.length > 0
        ? `/admin/products/searchProductByTitleandBrand?q=${searchValue}&page=${page}&limit=${limit}`
        : `/admin/products/allproduct?page=${page}&limit=${limit}`
    try {
      setLoading(true)
      const responseData = await fetchData(productUrl, 'GET')
      console.log('Get products data', responseData)
      setProductData(responseData.allProduct)
      setTotalProducts(responseData.productCount)
      setTotalPages(responseData.totalPages)
      setCurrentPage(responseData.currentPage)
      setError(null)
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred'
      setError(errorMessage)

      console.error('error got', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    // if (!searchValue.length > 0) {
    fetchProducts(currentPage, limit, searchValue)
    // }
  }, [currentPage, limit, searchValue])

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

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div>{error.message || 'An unknown error occurred.'}</div>
  }
  const resetFilter = () => {
    setCurrentPage(1)
    setLimit(3)
    setSearchValue('')
    setValue('')
    fetchProducts(1, 3)
  }
  const productProps = {
    allProductData: productData,
    limit,
    totalPages,
    currentPage,
    totalProducts,
    value,
    handlePageChange,
    handleLimitChange,
    handleSearch,
    setValue,
    resetFilter
  }

  console.log(productData, limit, totalPages, currentPage, totalProducts, value, error, searchValue)

  return (
    <div>
      <Allproducts {...productProps} />
    </div>
  )
}
