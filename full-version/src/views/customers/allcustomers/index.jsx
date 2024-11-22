//  ===============================This component is not in use =========================================
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

const tabs = [
  { key: 'AllCustomer', label: 'Customer' },
  { key: 'AllCustomerAddress', label: 'Customer Address' }
].map(({ key, label }) => (
  <Tab key={key} value={key} label={<div className='flex items-center gap-1.5'>{label}</div>} />
))

export default function CustomerSetting({ tabContent }) {
  const [activeTab, setActiveTab] = useState('AllCustomer')

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12} className='flex justify-center'>
          <CustomTabList onChange={handleChange} variant='scrollable'>
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
