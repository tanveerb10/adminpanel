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

const AccountSettings = ({ tabContentList, isAddAdmin }) => {
  // States
  const [activeTab, setActiveTab] = useState('account')

  const handleChange = (event, value) => {
    // console.log('Tab change:', value)
    setActiveTab(value)
  }

  // console.log('tabContentList:', tabContentList)
  // console.log('activeTab:', activeTab)

  const tabs = [
    <Tab
      key='account'
      label={
        <div className='flex items-center gap-1.5'>
          <i className='tabler-users text-lg' />
          Account
        </div>
      }
      value='account'
    />
  ]
  if (!isAddAdmin) {
    tabs.push(
      <Tab
        key='security'
        label={
          <div className='flex items-center gap-1.5'>
            <i className='tabler-lock text-lg' />
            Security
          </div>
        }
        value='security'
      />
      // <Tab
      //   key="notifications"
      //   label={
      //     <div className='flex items-center gap-1.5'>
      //       <i className='tabler-bell text-lg' />
      //       Notifications
      //     </div>
      //   }
      //   value='notifications'
      // />
    )
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            {tabs}
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default AccountSettings
