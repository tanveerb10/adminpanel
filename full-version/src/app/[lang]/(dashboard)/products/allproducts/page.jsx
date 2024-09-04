'use client'
import { useEffect, useState } from 'react'
import Allproducts from '@/views/products/allproducts/Allproducts'
import fetchData from '@/utils/fetchData'
import { Typography } from '@mui/material'

export default function page() {
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(true)
  const productUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products`
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
    return <Typography>Wait am loading right now</Typography>
  }
  console.log(productData, 'prodddsdfgdfgfdsfghfdghfdg')
  return (
    <div>
      <Allproducts allProductData={productData} />
    </div>
  )
}
