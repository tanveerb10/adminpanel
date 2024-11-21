'use client'
// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import CustomTabList from '@core/components/mui/TabList'

const Storesetup = ({ tabContent }) => {
  const tabs = [
    { key: 'storeSettings', label: 'Store Settings' },
    { key: 'metaSettings', label: 'Meta Settings' }
  ].map(({ key, label }) => (
    <Tab key={key} value={key} label={<div className='flex items-center gap-1.5'>{label}</div>} />
  ))

  const [activeTab, setActiveTab] = useState('storeSettings')

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }
  return (
    <>
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
    </>
  )
}

export default Storesetup
