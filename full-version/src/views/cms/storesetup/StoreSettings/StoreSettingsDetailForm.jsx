'use client'
import { useState } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem } from '@mui/material'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

const schema = yup.object().shape({
  storeName: yup.string().required('Store name is required'),
  billingAddress: yup.string().required('Billing address is required'),
  currency: yup.string().required('Currency is required'),
  weightUnit: yup.string().required('Weight unit is required')
})

export default function StoreSettingsDetailForm({ getStoreData }) {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      storeName: getStoreData?.store_details?.store_name || '',
      billingAddress: getStoreData?.store_details?.billing_address || '',
      currency: getStoreData?.store_details?.currency || '',
      weightUnit: getStoreData?.store_details?.weight_unit || ''
    }
  })

  const handleOnSubmit = async data => {
    const formatData = {
      store_details: {
        store_name: data.storeName,
        billing_address: data.billingAddress,
        currency: data.currency,
        weight_unit: data.weightUnit
      }
    }
    console.log(formatData)
    const storeUrl = `/admin/cms/updateStoreDetails`

    try {
      setLoading(true)
      console.log('under loading')
      const responseData = await fetchData(storeUrl, 'PUT', formatData)
      if (responseData.success) {
        toast.success(responseData.message || 'Meta Setting Update Successfully')
      } else {
        toast.error(responseData.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card>
      <CardHeader title='Store Setting' />
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                name='storeName'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Store Name'
                    placeholder='Store Name'
                    error={Boolean(errors.storeName)}
                    helperText={errors.storeName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='billingAddress'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Billing Address'
                    placeholder='Billing Address'
                    error={Boolean(errors.billingAddress)}
                    helperText={errors.billingAddress?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='currency'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Currency'
                    placeholder='Currency'
                    select
                    error={Boolean(errors.currency)}
                    helperText={errors.currency?.message}
                  >
                    <MenuItem value='INR'>INR</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='weightUnit'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Weight Unit'
                    placeholder='Weight Unit'
                    select
                    error={Boolean(errors.weightUnit)}
                    helperText={errors.weightUnit?.message}
                  >
                    <MenuItem value='g'>G</MenuItem>
                    <MenuItem value='kg'>KG</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
