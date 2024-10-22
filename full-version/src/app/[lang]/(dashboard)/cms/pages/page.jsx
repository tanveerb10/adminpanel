'use client'
import React, { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData'
import Pages from '@views/cms/pages/Pages'
import Loader from '@/libs/components/Loader'
export default function page() {
  const [loading, setLoading] = useState(false)
  const [staticData, setStaticData] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        setLoading(true)
        const url = `/admin/cms/allStaticPages`
        const responseData = await fetchData(url, 'GET')
        if (responseData.success) {
          setStaticData(responseData)
        } else {
          setError('Failed to fetch data')
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchStaticData()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div>Error : {error}</div>
  }
  return (
    <div>
      <Pages data={staticData} />
    </div>
  )
}
