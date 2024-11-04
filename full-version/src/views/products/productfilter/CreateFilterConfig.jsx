import { Button, Grid } from '@mui/material'
import React from 'react'
import AddHeader from '@/libs/components/AddHeader'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function CreateFilterConfig({ fetchFilterData }) {
  const createFilterConfiguration = async () => {
    const ApiURL = '/admin/filters/createFilterConfig'
    try {
      const responseData = await fetchData(ApiURL, 'POST')
      if (responseData.success) {
        toast.success(responseData.message || 'Added available config option')
        fetchFilterData()
      } else {
        throw new Error(responseData.message || 'failed to get available option')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <Grid className='backdrop-blur-[20px] rounded-lg shadow-lg bg-black/15 h-full w-full flex flex-col justify-center items-center'>
      <AddHeader title='No filter configurations found. Start by adding a new filter configuration!' />
      <Button
        variant='contained'
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333', marginTop: '20px' }}
        onClick={createFilterConfiguration}
      >
        Create Filter Config
      </Button>
    </Grid>
  )
}
