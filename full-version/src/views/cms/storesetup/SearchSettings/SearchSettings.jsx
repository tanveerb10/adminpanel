'use client'
import { useState, useEffect } from 'react'
import Search from '@views/cms/storesetup/SearchSettings/Search'

import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import CreateSearch from '@/views/cms/storesetup/SearchSettings/CreateSearch'

export default function SearchSettings() {
  // State for Customer Tab
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      const getSearchUrl = `/admin/cms/getAllSearchSettings`

      const responseData = await fetchData(getSearchUrl, 'GET')

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
    fetchSearch()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <>
      {response.length > 0 ? (
        <Search response={response} fetchSearch={fetchSearch} />
      ) : (
        <CreateSearch fetchSearch={fetchSearch} />
      )}
    </>
  )
}
