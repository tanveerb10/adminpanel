import { Button, Grid } from '@mui/material'
import React from 'react'
import AddHeader from '@/libs/components/AddHeader'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function CreateProductConfig({ fetchProductConfigData }) {
  const createProductConfiguration = async () => {
    const ApiURL = '/admin/cms/createProductDetailsSettings'
    try {
      const responseData = await fetchData(ApiURL, 'POST')
      if (responseData.success) {
        toast.success(responseData.message || 'Added available config option')
        fetchProductConfigData()
      } else {
        throw new Error(responseData.message || 'failed to get available option')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <Grid className='backdrop-blur-[20px] rounded-lg shadow-lg bg-black/15 h-full w-full flex flex-col justify-center items-center'>
      <AddHeader title='No Product configurations found. Start by adding a new product configuration!' />
      <Button
        variant='contained'
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333', marginTop: '20px' }}
        onClick={createProductConfiguration}
      >
        Create Product Config
      </Button>
    </Grid>
  )
}
