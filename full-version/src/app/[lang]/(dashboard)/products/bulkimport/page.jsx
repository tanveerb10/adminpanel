import React from 'react'
// import Bulkimport from '@/views/products/bulkimport/Bulkimport'
import BulkSetting from '@/views/products/BulkSetting/index'
import dynamic from 'next/dynamic'

// const UploadTab = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
//   ssr: false
// })
// const UpdateTab = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
//   ssr: false
// })
// const CategoryTab = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
//   ssr: false
// })
// const InventoryTab = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
//   ssr: false
// })
// const MetasTab = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
//   ssr: false
// })
const Bulkimport = dynamic(() => import('@/views/products/bulkSetting/bulkimport/Bulkimport'), {
  ssr: false
})

// const tabConfig =
export default function Page() {
  const tabContent = {
    upload: <Bulkimport TabValue='productUploadTab' HeaderValue='Product Import' />,
    update: <Bulkimport TabValue='productUpdateTab' HeaderValue='Product Update' />,
    price: <Bulkimport TabValue='priceTab' HeaderValue='Price Update' />,
    category: <Bulkimport TabValue='categoryTab' HeaderValue='Category Update' />,
    metas: <Bulkimport TabValue='metasTab' HeaderValue='Metas Update' />,
    inventory: <Bulkimport TabValue='inventoryTab' HeaderValue='Inventory Update' />
  }
  return (
    <div>
      <BulkSetting tabContent={tabContent} />
      {/* <Bulkimport /> */}
    </div>
  )
}
