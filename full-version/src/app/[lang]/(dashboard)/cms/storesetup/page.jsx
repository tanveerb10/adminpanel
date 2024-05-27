'use client'

import { useEffect, useState } from 'react'
import Storesetup from '@/views/cms/storesetup/Storesetup'
import { fetchInitialData } from "@/utils/api.js"

const StoreSetupPage = () => {
  const [initialData, setInitialData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await fetchInitialData()
      setInitialData(data)
    }
    getData()
  }, [])

  // Render loading state or the component with initial data
  return (
    <div>
      {initialData ? <Storesetup initialData={initialData} /> : <p>Loading...</p>}
    </div>
  )
}

export default StoreSetupPage