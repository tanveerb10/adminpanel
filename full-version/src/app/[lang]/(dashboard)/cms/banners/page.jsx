'use client'
import { useState, useEffect } from 'react'
import Banners from '@views/cms/banners/Banners'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import CreateBanner from '@/views/cms/banners/CreateBanner'

export default function Page() {
  // State for Customer Tab
  const [bannerResponse, setBannerResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBanner = async () => {
    setLoading(true)
    setError(null)
    try {
      const getBannerUrl = `/admin/cms/getAllBannerSettings`

      const responseData = await fetchData(getBannerUrl, 'GET')

      if (responseData.success) {
        setBannerResponse(responseData.data)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanner()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <>
      {bannerResponse.length > 0 ? (
        <Banners bannerResponse={bannerResponse} fetchBanner={fetchBanner} />
      ) : (
        <CreateBanner fetchBanner={fetchBanner} />
      )}
    </>
  )
}
