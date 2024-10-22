'use client'
import { useState, useEffect } from 'react'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import MetaSettingsForm from '@/views/cms/style/MetaSettings/MetaSettingsForm'

export default function MetaSetting() {
  const [getMetaData, setGetMetaData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  console.log('get meta data', getMetaData)
  const metaApi = async () => {
    try {
      setLoading(true)
      const metaSettingURL = `/admin/cms/getMetaSettings`

      const responseData = await fetchData(metaSettingURL, 'GET')
      if (responseData.success) {
        setGetMetaData(responseData.data)
      }
      if (!responseData.success) {
        throw new Error(responseData.message || 'Error occurred during Getting data')
      }
    } catch (err) {
      setError(err || 'Error Get')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    metaApi()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <MetaSettingsForm getMetaData={getMetaData} />
    </>
  )
}
