'use client'

import { useEffect, useState } from 'react'
import Storesetup from '@/views/cms/storesetup/Storesetup'
import { fetchInitialData } from '@/utils/api.js'
import Loader from '@libs/components/Loader'
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
      {initialData ? (
        <Storesetup initialData={initialData} />
      ) : (
        <div className='flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default StoreSetupPage
