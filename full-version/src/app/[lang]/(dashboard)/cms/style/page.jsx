import React from 'react'
import dynamic from 'next/dynamic'
import TabsPanel from '@/libs/components/TabsPanel'

const FontSettings = dynamic(() => import('@/views/cms/style/FontSettings/FontSettings'), {
  ssr: false
})
const ThemeSettings = dynamic(() => import('@/views/cms/style/ThemeSettings/ThemeSettings'), {
  ssr: false
})
const MetaSettings = dynamic(() => import('@views/cms/style/MetaSettings/MetaSettings'))

export default function Page() {
  const tabContent = {
    fontSettings: <FontSettings TabValue='fontSettings' />,
    themeSettings: <ThemeSettings TabValue='themeSettings' />,
    metaSettings: <MetaSettings TabValue='metaSettings' />
  }

  const allTabs = [
    { key: 'fontSettings', label: 'Font Settings' },
    { key: 'themeSettings', label: 'Theme Settings' },
    { key: 'metaSettings', label: 'Meta Settings' }
  ]
  return (
    <div>
      <TabsPanel tabContent={tabContent} allTabs={allTabs} />
    </div>
  )
}
