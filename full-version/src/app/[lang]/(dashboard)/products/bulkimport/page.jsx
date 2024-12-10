import React from 'react'
import dynamic from 'next/dynamic'
import TabsPanel from '@/libs/components/TabsPanel'

const Bulkimport = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
  ssr: false
})

export default function Page() {
  const tabContent = {
    upload: <Bulkimport TabValue='productUploadTab' HeaderValue='Product Import' />,
    update: <Bulkimport TabValue='productUpdateTab' HeaderValue='Product Update' />,
    price: <Bulkimport TabValue='priceTab' HeaderValue='Price Update' />,
    category: <Bulkimport TabValue='categoryTab' HeaderValue='Category Update' />,
    metas: <Bulkimport TabValue='metasTab' HeaderValue='Metas Update' />,
    inventory: <Bulkimport TabValue='inventoryTab' HeaderValue='Inventory Update' />
  }

  const allTabs = [
    { key: 'upload', label: 'Product Import' },
    { key: 'update', label: 'Product Update' },
    { key: 'price', label: 'Price Update' },
    { key: 'category', label: 'Category Update' },
    { key: 'metas', label: 'Metas Update' },
    { key: 'inventory', label: 'Inventory Update' }
  ]
  return (
    <div>
      <TabsPanel tabContent={tabContent} allTabs={allTabs} />
    </div>
  )
}
