import { useEffect, useState } from 'react'
import MetaSettingsDetailForm from './MetaSettingsDetailForm'
import Loader from '@/libs/components/Loader'
import fetchData from '@/utils/fetchData'

export default function MetaSettings() {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMeta = async () => {
    setLoading(true)
    setError(null)
    try {
      const getMetaUrl = `/admin/cms/getMetaSettings`

      const responseData = await fetchData(getMetaUrl, 'GET')

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
    fetchMeta()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return <MetaSettingsDetailForm getMetaData={response} />
}
