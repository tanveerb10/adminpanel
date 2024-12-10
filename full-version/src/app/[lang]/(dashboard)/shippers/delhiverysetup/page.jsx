'use client'

import { useEffect, useState } from 'react'
import Delhiverysetup from '@/views/shippers/delhiverysetup/DelhiverySetup'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

export default function page() {
  const [delhiveryData, setDelhiveryData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDelhivery = async () => {
    try {
      setLoading(true)
      const url = `/admin/cms/getLogisticSettings/delhivery`
      const responseData = await fetchData(url, 'GET')
      if (responseData.success) {
        setDelhiveryData(responseData.data)
      } else {
        setError('Error in fetching')
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDelhivery()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div>No data available</div>
  }

  return (
    <>
      {Object.keys(delhiveryData).length > 0 ? (
        <Delhiverysetup detail={delhiveryData} fetchDelhivery={fetchDelhivery} />
      ) : (
        <Delhiverysetup isAddLogistic={true} fetchDelhivery={fetchDelhivery} />
      )}
    </>
  )
}
