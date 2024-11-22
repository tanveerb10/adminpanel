'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import TabsPanel from '@/libs/components/TabsPanel'

const StoreSettings = dynamic(() => import('@/views/cms/storesetup/StoreSettings/StoreSettings'), {
  ssr: false
})
const MetaSettings = dynamic(() => import('@/views/cms/storesetup/MetaSettings/MetaSettings'), {
  ssr: false
})

const SearchSettings = dynamic(() => import('@/views/cms/storesetup/SearchSettings/SearchSettings'))

export default function Page() {
  const tabContent = {
    storeSettings: <StoreSettings TabValue='storeSettings' />,
    metaSettings: <MetaSettings TabValue='metaSettings' />,
    searchSettings: <SearchSettings TabValue='searchSettings' />
  }

  const allTabs = [
    { key: 'storeSettings', label: 'Store Settings' },
    { key: 'metaSettings', label: 'Meta Settings' },
    { key: 'searchSettings', label: 'Search Settings' }
  ]
  return (
    <div>
      <TabsPanel tabContent={tabContent} allTabs={allTabs} />
    </div>
  )
}
