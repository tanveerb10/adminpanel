'use client'
import { useEffect, useState } from 'react'
import Allproducts from '@/views/products/allproducts/Allproducts'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

export default function page() {
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(true)
  const productUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/allproduct`
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetchData(productUrl, 'GET')
        console.log('Get products data', response)
        setProductData(response)
      } catch (error) {
        console.error('error got', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }
  console.log(productData, 'prodddsdfgdfgfdsfghfdghfdg')
  return (
    <div>
      <Allproducts allProductData={productData} fromMetas={true} />
    </div>
  )
}
