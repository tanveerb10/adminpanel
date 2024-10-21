'use client'
import React, { useEffect, useState } from 'react'
import TaxSetting from '@/views/taxes/index'
import dynamic from 'next/dynamic'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

const Taxrate = dynamic(() => import('@/views/taxes/taxrate/SetTax'), {
  ssr: false
})
const TaxRateOverride = dynamic(() => import('@/views/taxes/taxrate/SetTaxOverride'), {
  ssr: false
})

export default function page() {
  const [taxData, setTaxData] = useState([])
  const [taxOverrideData, setTaxOverrideData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const taxURL = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/get_tax_rate`
  const taxOverrideURL = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/get_tax_override`

  const taxApi = async () => {
    try {
      setLoading(true)
      const responseData = await fetchData(taxURL, 'GET')
      if (responseData.success) {
        setTaxData(responseData.taxRate)
      }
    } catch (err) {
      console.log(err, 'error')
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const taxOverrideApi = async () => {
    try {
      setLoading(true)
      const responseData = await fetchData(taxOverrideURL, 'GET')
      if (responseData.success) {
        setTaxOverrideData(responseData.taxOverrides)
      }
    } catch (err) {
      console.log(err, 'error')
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    taxApi()
    taxOverrideApi()
  }, [])

  if (loading) return <Loader />

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const tabContent = {
    setTax: <Taxrate TabValue='setTax' taxData={taxData} setTaxFlag={true} taxApi={taxApi} />,
    setTaxOverride: (
      <TaxRateOverride
        TabValue='setTaxOverride'
        taxOverrideData={taxOverrideData}
        setTaxOverrideFlag={true}
        taxOverrideApi={taxOverrideApi}
      />
    )
  }

  return (
    <>
      <TaxSetting tabContent={tabContent} />
    </>
  )
}
