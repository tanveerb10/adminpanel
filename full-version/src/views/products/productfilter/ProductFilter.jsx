'use client'
import FilterContainer from '@/views/products/productfilter/FilterContainer'
import { Button, Grid } from '@mui/material'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function ProductFilter({ filterResponse, extraFilterResponse, fetchFilterData }) {
  const addAvailableFilterOptions = async () => {
    const ApiURL = '/admin/filters/AddAvailableFilterOptions'
    try {
      const responseData = await fetchData(ApiURL, 'GET')
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
    <Grid container spacing={6}>
      {extraFilterResponse.length > 0 && (
        <Grid xs={12} item className='text-right'>
          <Button variant='contained' color='primary' onClick={addAvailableFilterOptions}>
            Add Remaining option
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <FilterContainer data={filterResponse[0].fields} />
      </Grid>
    </Grid>
  )
}
