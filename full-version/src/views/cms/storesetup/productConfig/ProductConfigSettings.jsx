'use client'
import { useState, useEffect } from 'react'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import CreateProductConfig from './CreateProductConfig'
import ProductConfig from '@/views/cms/storesetup/productConfig/ProductConfig'

export default function ProductConfigSettings() {
  // State for Customer Tab
  const [productConfigResponse, setProductConfigResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [extraProductConfigResponse, setExtraProductConfigResponse] = useState([])

  const fetchProductConfigData = async () => {
    setLoading(true)
    setError(null)
    try {
      const getProductConfigUrl = `/admin/cms/getAllProductDetailsSettings`
      const getExtraProductConfigUrl = `/admin/cms/checkRemainingProductDetails`

      const [responseData, extraResponseData] = await Promise.all([
        fetchData(getProductConfigUrl, 'GET'),
        fetchData(getExtraProductConfigUrl, 'GET')
      ])
      if (responseData.success) {
        setProductConfigResponse(responseData.data)
        setExtraProductConfigResponse(extraResponseData.data)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductConfigData()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <>
      {productConfigResponse.length > 0 ? (
        <ProductConfig
          productConfigResponse={productConfigResponse}
          extraProductConfigResponse={extraProductConfigResponse}
          fetchProductConfigData={fetchProductConfigData}
        />
      ) : (
        <CreateProductConfig fetchProductConfigData={fetchProductConfigData} />
      )}
    </>
  )
}
