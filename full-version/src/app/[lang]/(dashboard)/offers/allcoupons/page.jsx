'use client'
import React, { useEffect, useState } from 'react'
import AllCoupons from '@/views/offers/allcoupons/AllCoupons'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
export default function page() {
  const [coupons, setcoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCoupons, setTotalCoupons] = useState(0)

  const fetchcoupons = async (limit, page) => {
    try {
      const couponUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/coupons/allcoupon?page=${page}&limit=${limit}`
      const responseData = await fetchData(couponUrl, 'GET')
      if (responseData.success) {
        setcoupons(responseData.Coupon)
        setCurrentPage(responseData.currentPage)
        setTotalPages(responseData.totalPages)
        setTotalCoupons(responseData.couponCount)
      }
    } catch (err) {
      console.log('Error received:', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchcoupons(limit, currentPage)
  }, [limit, currentPage])

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

  console.log(coupons, 'coupons all')

  const couponsProps = {
    coupons,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalCoupons
  }

  return <>{coupons.length > 0 ? <AllCoupons {...couponsProps} /> : <Loader />}</>
}
