'use client'
import React, { useEffect, useState } from 'react'
import Brands from '@/views/products/brands/Brands'
import fetchData from '@/utils/fetchData'
import { brand } from 'valibot'

export default function page() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`

        const responseData = await fetchData(brandUrl, 'GET')
        setBrands(responseData)
      } catch (error) {
        console.log('error got', error.message)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])
  // console.log(responseData)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  console.log(brands, 'brands all')

  return (
    <div>
      <Brands brandsData={brands} />
    </div>
  )
}
