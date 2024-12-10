'use client'

import React, { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
// import Metas from '@/views/products/metas/Metas'
import MetasDetailForm from '@/views/products/metas/MetasDetailForm'
import Loader from '@/libs/components/Loader'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [metaData, setMetaData] = useState([])
  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  // useEffect(() => {
  //   if (role !== 'superadmin') {
  //     router.push('/')
  //     toast.warning('from role')
  //   }
  // }, [role])

  useEffect(() => {
    // if (id !== 'addnewmetas') {
    const metaUrl = `/admin/products/getproductmeta/${id}`
    setLoading(true)
    try {
      fetchData(metaUrl, 'GET').then(response => {
        console.log('Get meta data', response)
        setMetaData(response.productMetas[0] || {})
        setLoading(false)
      })
    } catch (error) {
      console.log('error got', error)
      setError('error got in meta', error)

      setLoading(false)
    } finally {
      setLoading(false)
    }
    // }
  }, [])
  console.log(metaData, 'metaData')
  if (loading) {
    // need to check loading
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>No data available or {error}</div>
  }

  if (metaData.meta_title) {
    return <MetasDetailForm id={id} metaData={metaData} />
  }
  return (
    <>
      <MetasDetailForm id={id} isAddMetas={!metaData.meta_title} metaData={metaData} />
    </>
  )
}
