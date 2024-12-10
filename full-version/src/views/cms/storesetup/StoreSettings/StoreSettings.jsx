import { useEffect, useState } from 'react'
import StoreSettingsDetailForm from './StoreSettingsDetailForm'

import Loader from '@/libs/components/Loader'
import fetchData from '@/utils/fetchData'

export default function StoreSettings() {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStore = async () => {
    setLoading(true)
    setError(null)
    try {
      const getStoreUrl = `/admin/cms/getStoreDetails`

      const responseData = await fetchData(getStoreUrl, 'GET')

      if (responseData.success) {
        setResponse(responseData.data)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStore()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return <StoreSettingsDetailForm getStoreData={response} />
}
