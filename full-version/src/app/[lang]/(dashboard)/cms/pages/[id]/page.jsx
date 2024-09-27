'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import fetchData from '@/utils/fetchData'
import { useParams, useRouter } from 'next/navigation'
import PagesDetailForm from '@/views/cms/pages/PagesDetailForm'
import Loader from '@/libs/components/Loader'
export default function page() {
  const [getStaticData, setGetStaticData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()
  console.log(id)
  console.log(getStaticData, 'get static data')
  useEffect(() => {
    if (id !== 'addnewstaticpage') {
      const individualStatic = async () => {
        try {
          const getIndividualCoupon = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/cms/getStaticPage/${id}`
          const responseData = await fetchData(getIndividualCoupon, 'GET')
          setGetStaticData(responseData)
        } catch (error) {
          setError(error)
        } finally {
          setLoading(false)
        }
      }
      individualStatic()
    } else {
      setLoading(false)
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (role !== 'superadmin') {
    setTimeout(() => router.push('/'), 3000)
    return <div>wait you are going to redirect because you are not super admin...</div>
  }
  if (error) {
    return <div>No data available</div>
  }

  if (id === 'addnewstaticpage') {
    return <PagesDetailForm isAddStaticPage={true} />
  }

  return <PagesDetailForm staticData={getStaticData} />
}
