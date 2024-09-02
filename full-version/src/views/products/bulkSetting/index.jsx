'use client'
// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

// const tabs = [
//   <Tab
//     key='upload'
//     label={
//       <div className='flex items-center gap-1.5'>
//         {/* <i className='tabler-users text-lg' /> */}
//         Product Import
//       </div>
//     }
//     value='upload'
//   />,
//   <Tab
//     key='update'
//     label={
//       <div className='flex items-center gap-1.5'>
//         {/* <i className='tabler-users text-lg' /> */}
//         Product Update
//       </div>
//     }
//     value='update'
//   />,
//   <Tab
//     key='price'
//     value='price'
//     label={
//       <div className='flex items-center gap-1.5'>
//         {/* <i className='tabler-users text-lg' /> */}
//         Price Update
//       </div>
//     }
//   />,

//   <Tab
//     key='category'
//     value='category'
//     label={
//       <div className='flex items-center gap-1.5'>
//         {/* <i className='tabler-users text-lg' /> */}
//         Category Update
//       </div>
//     }
//   />,
//   <Tab
//     key='metas'
//     value='metas'
//     label={
//       <div className='flex items-center gap-1.5'>
//         {/* <i className='tabler-users text-lg' /> */}
//         Metas Update
//       </div>
//     }
//   />,
//   <Tab
//     key='inventory'
//     value='inventory'
//     label={
//       <div className='flex items-center gap-1.5'>
//         {/* <i className='tabler-users text-lg' /> */}
//         Inventory Update
//       </div>
//     }
//   />
// ]

const tabs = [
  { key: 'upload', label: 'Product Import' },
  { key: 'update', label: 'Product Update' },
  { key: 'price', label: 'Price Update' },
  { key: 'category', label: 'Category Update' },
  { key: 'metas', label: 'Metas Update' },
  { key: 'inventory', label: 'Inventory Update' }
].map(({ key, label }) => (
  <Tab
    key={key}
    value={key}
    label={
      <div className='flex items-center gap-1.5'>
        {/* <i className='tabler-users text-lg' /> */}
        {label}
      </div>
    }
  />
))

// const tabContent = {
//   update: <div>Update page</div>,
//   upload: <div>Upload page</div>
// }
export default function BulkSetting({ tabContent }) {
  const [activeTab, setActiveTab] = useState('upload')

  const handleChange = (event, value) => {
    console.log('active tab value ', value)
    setActiveTab(value)
  }
  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12} className='flex justify-center'>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            {tabs}
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContent[activeTab] || <div>No Content Available</div>}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}
