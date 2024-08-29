import React from 'react'
// import Bulkimport from '@/views/products/bulkimport/Bulkimport'
import BulkSetting from '@/views/products/bulkimport/BulkSetting/index'
import dynamic from 'next/dynamic'

const UploadTab = dynamic(() => import('@/views/products/bulkimport/Bulkimport'), {
  ssr: false
})
const UpdateTab = dynamic(() => import('@/views/products/bulkimport/Bulkimport'), {
  ssr: false
})

export default function page() {
  const tabContent = {
    update: <UpdateTab isUpdate={true} />,
    upload: <UploadTab />
  }
  return (
    <div>
      <BulkSetting tabContent={tabContent} />
      {/* <Bulkimport /> */}
    </div>
  )
}
