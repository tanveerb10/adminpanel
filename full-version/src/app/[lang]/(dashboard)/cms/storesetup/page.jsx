'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Storesetup from '@/views/cms/storesetup/index'

const StoreSettings = dynamic(() => import('@/views/cms/storesetup/StoreSettings/StoreSettings'), {
  ssr: false
})
const MetaSettings = dynamic(() => import('@/views/cms/storesetup/MetaSettings/MetaSettings'), {
  ssr: false
})

export default function Page() {
  const tabContent = {
    storeSettings: <StoreSettings TabValue='storeSettings' />,
    metaSettings: <MetaSettings TabValue='metaSettings' />
  }

  return (
    <div>
      <Storesetup tabContent={tabContent} />
    </div>
  )
}
