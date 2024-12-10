'use client'
import { useState, useEffect } from 'react'
import ProductFilter from '@/views/products/productfilter/ProductFilter'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import CreateFilterConfig from '@/views/products/productfilter/CreateFilterConfig'

export default function Page() {
  // State for Customer Tab
  const [filterResponse, setFilterResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [extraFilterResponse, setExtraFilterResponse] = useState([])

  const fetchFilterData = async () => {
    setLoading(true)
    setError(null)
    try {
      const getFilterUrl = `/admin/filters/getAvailableFiltersInDb`
      const getExtraFilterUrl = `/admin/filters/getAvailableFilterOptions`

      const [responseData, extraResponseData] = await Promise.all([
        fetchData(getFilterUrl, 'GET'),
        fetchData(getExtraFilterUrl, 'GET')
      ])
      if (responseData.success) {
        setFilterResponse(responseData.data)
        setExtraFilterResponse(extraResponseData.extraFilters)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFilterData()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <>
      {filterResponse.length > 0 ? (
        <ProductFilter
          filterResponse={filterResponse}
          extraFilterResponse={extraFilterResponse}
          fetchFilterData={fetchFilterData}
        />
      ) : (
        <CreateFilterConfig fetchFilterData={fetchFilterData} />
      )}
    </>
  )
}
