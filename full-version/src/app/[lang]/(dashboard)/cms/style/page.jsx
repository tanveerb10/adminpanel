import React from 'react'
import Style from '@views/cms/style/Style'
import dynamic from 'next/dynamic'

const FontSettings = dynamic(() => import('@/views/cms/style/FontSettings/FontSettings'), {
  ssr: false
})
const ThemeSettings = dynamic(() => import('@/views/cms/style/ThemeSettings/ThemeSettings'), {
  ssr: false
})
// const MetaSettings = dynamic(() => import('@/views/cms/style/MetaSettings/MetaSettings'), {
//   ssr: false
// })

export default function Page() {
  const tabContent = {
    fontSettings: <FontSettings TabValue='fontSettings' />,
    themeSettings: <ThemeSettings TabValue='themeSettings' />
    // metaSettings: <MetaSettings TabValue='metaSettings' />
  }
  return (
    <div>
      <Style tabContent={tabContent} />
    </div>
  )
}
