'use client'
import ProductConfigContainer from '@/views/cms/storesetup/productConfig/ProductConfigContainer'
import { Button, Grid } from '@mui/material'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function ProductConfig({ productConfigResponse, extraProductConfigResponse, fetchProductConfigData }) {
  const addAvailableProductConfigOptions = async () => {
    const ApiURL = '/admin/cms/addRemainingProductDetails'
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
    <Grid container spacing={6}>
      {extraProductConfigResponse.length > 0 && (
        <Grid xs={12} item className='text-right'>
          <Button variant='contained' color='primary' onClick={addAvailableProductConfigOptions}>
            Add Remaining option
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <ProductConfigContainer data={productConfigResponse} fetchProductConfigData={fetchProductConfigData} />
      </Grid>
    </Grid>
  )
}
