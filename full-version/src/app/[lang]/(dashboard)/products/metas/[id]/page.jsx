'use client'

import React, { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import Metas from '@/views/products/metas/Metas'

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (role !== 'superadmin') {
      const timer = setTimeout(() => {
        router.push('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [role, router])

  useEffect(() => {
    if (id !== 'addnewmetas') {
      const getSingleProduct = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/getproductmeta/${id}`
      setLoading(true)
      try {
        fetchData(getSingleProduct, 'GET').then(response => {

          console.log('Get single product data', response)
          setLoading(false)
        })
      } catch (error) {
        console.log('error got', error)
        setError('error got in brand', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  }, [])
  if (loading) {
    // need to check loading
    return <div>Loading...</div>
  }

  if (error) {
    return <div>No data available or {error}</div>
  }

  if (id == 'addnewmetas') {
    return (
      <>

        <Metas isAddMetas={true} />

      </>
    )
  }
  return (
    <>
      <Metas id={id} />
    </>
  )
}
