'use client'
import React, { useEffect, useState } from 'react'
import AllCoupons from '@/views/offers/allcoupons/AllCoupons'
import fetchData from '@/utils/fetchData'
import Loader from '@libs/components/Loader'
export default function page() {
  const [coupons, setcoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchcoupons = async () => {
      try {
        const couponUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/coupons/allcoupon`

        const responseData = await fetchData(couponUrl, 'GET')
        setcoupons(responseData)
      } catch (err) {
        console.log('Error received:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchcoupons()
  }, [])

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

  console.log(coupons, 'coupons all')

  return (
    <div>
      <AllCoupons couponsData={coupons} />
    </div>
  )
}
