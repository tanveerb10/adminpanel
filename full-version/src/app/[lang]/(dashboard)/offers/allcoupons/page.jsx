'use client'
import React, { useEffect, useState } from 'react'

import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import AllCoupons from '@/views/offers/allcoupons/Allcoupons'

const ASCENDING = 'asc'
const DESCENDING = 'dsc'

export default function page() {
  const [coupons, setcoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCoupons, setTotalCoupons] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [value, setValue] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortMethod, setSortMethod] = useState(ASCENDING)
  const [selectStatus, setSelectStatus] = useState('')
  const [isSortingActive, setIsSortingActive] = useState(false)

  const fetchcoupons = async (page, limit, searchValue = '') => {
    const couponUrl = `/admin/coupons/allcoupon?page=${page}&limit=${limit}&sortBy=${sortBy}&sortMethod=${sortMethod}&q=${searchValue}&status=${selectStatus}`

    try {
      setLoading(true)
      const responseData = await fetchData(couponUrl, 'GET')
      if (responseData.success) {
        setcoupons(responseData.coupons)
        setCurrentPage(responseData.currentPage)
        setTotalPages(responseData.totalPages)
        setTotalCoupons(responseData.couponCount)
        setError(null)
      }
    } catch (err) {
      const errorMessage = error || 'An unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchcoupons(currentPage, limit, searchValue)
  }, [currentPage, limit, searchValue, sortBy, sortMethod, selectStatus])

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

  const handleSelectStatus = status => {
    setSelectStatus(status)
  }

  const handleSorting = by => {
    setSortBy(by)
    setSortMethod(prevMethod => (prevMethod === ASCENDING ? DESCENDING : ASCENDING))
    setIsSortingActive(true)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error.message || 'An unknown error occurred.'}</div>
  }

  const resetFilter = () => {
    setCurrentPage(1)
    setLimit(3)
    setSearchValue('')
    setValue('')
    fetchcoupons(1, 3)
    setSortBy('')
    setSortMethod(ASCENDING)
    setSelectStatus('')
    setIsSortingActive(false)
  }
  const couponsProps = {
    coupons,
    limit,
    totalPages,
    handlePageChange,
    handleLimitChange,
    currentPage,
    totalCoupons,
    value,
    handleSearch,
    setValue,
    resetFilter,
    handleSorting,
    sortMethod,
    selectStatus,
    handleSelectStatus,
    isSortingActive
  }

  return (
    <>
      <AllCoupons {...couponsProps} />
    </>
  )
}
