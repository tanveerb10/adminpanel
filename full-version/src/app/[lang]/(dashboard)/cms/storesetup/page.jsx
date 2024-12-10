'use client'

import dynamic from 'next/dynamic'
import TabsPanel from '@/libs/components/TabsPanel'

const StoreSettings = dynamic(() => import('@/views/cms/storesetup/StoreSettings/StoreSettings'), {
  ssr: false
})
const MetaSettings = dynamic(() => import('@/views/cms/storesetup/MetaSettings/MetaSettings'), {
  ssr: false
})

const SearchSettings = dynamic(() => import('@/views/cms/storesetup/SearchSettings/SearchSettings'), {
  ssr: false
})

const PaymentSettings = dynamic(() => import('@/views/cms/storesetup/PaymentSettings/PaymentSettings'), { ssr: false })
const ProductConfig = dynamic(() => import('@/views/cms/storesetup/productConfig/ProductConfigSettings'), {
  ssr: false
})

export default function Page() {
  const tabContent = {
    storeSettings: <StoreSettings TabValue='storeSettings' />,
    metaSettings: <MetaSettings TabValue='metaSettings' />,
    searchSettings: <SearchSettings TabValue='searchSettings' />,
    paymentSettings: <PaymentSettings TabValue='paymentSettings' />,
    productConfig: <ProductConfig TabValue='paymentSettings' />
  }

  const allTabs = [
    { key: 'storeSettings', label: 'Store Settings' },
    { key: 'metaSettings', label: 'Meta Settings' },
    { key: 'searchSettings', label: 'Search Settings' },
    { key: 'paymentSettings', label: 'Payment Settings' },
    { key: 'productConfig', label: 'Product Config' }
  ]
  return (
    <div>
      <TabsPanel tabContent={tabContent} allTabs={allTabs} />
    </div>
  )
}
