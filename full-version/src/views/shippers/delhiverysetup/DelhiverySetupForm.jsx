'use client'
import { Grid, Button, MenuItem, Card, CardHeader, CardContent, Divider, Typography, IconButton } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '@/@core/components/mui/TextField'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import fetchData from '@/utils/fetchData'

// Component Imports
import { toast } from 'react-toastify'

import Loader from '@/libs/components/Loader'

export default function DelhiverySetupForm({ detail, isAddLogistic, fetchDelhivery }) {
  const [loading, setLoading] = useState(false)
  const [editable, setEditable] = useState(!isAddLogistic)

  console.log('datatatatata detail', detail)
  const initialFormData = {
    display_name: detail?.display_name || '',
    status: detail?.otherfields?.status ?? true,
    token_test: detail?.otherfields?.token_test || '',
    token_live: detail?.otherfields?.token_live || '',
    api_key_test: detail?.otherfields?.api_key_test || '',
    api_key_live: detail?.otherfields?.api_key_live || '',
    api_secret_test: detail?.otherfields?.api_secret_test || '',
    api_secret_live: detail?.otherfields?.api_secret_live || '',
    logistic_enviroment: detail?.otherfields?.logistic_enviroment || '',
    logistic_partner: detail?.otherfields?.logistic_partner || 'delhivery',
    address1: detail?.pickup_address?.address1 || '',
    address2: detail?.pickup_address?.address2 || '',
    city: detail?.pickup_address?.city || '',
    state: detail?.pickup_address?.state || '',
    pincode: detail?.pickup_address?.pincode || '',
    country: detail?.pickup_address?.country || 'india',
    phone: detail?.pickup_address?.phone || ''
  }

  const validationSchema = yup.object().shape({
    display_name: yup.string().required('Display Name is required'),
    status: yup.boolean().required('Status is required'),
    token_test: yup.string().required('Test Token is required'),
    token_live: yup.string().required('Live Token is required'),
    api_key_test: yup.string().required('Test API Key is required'),
    api_key_live: yup.string().required('Live API Key is required'),
    api_secret_test: yup.string().required('Test API Secret is required'),
    api_secret_live: yup.string().required('Live API Secret is required'),
    logistic_enviroment: yup.string().required('Logistic Environment is required'),
    logistic_partner: yup.string().required('Logistic Partner is required'),
    address1: yup.string().required('Address Line 1 is required'),
    address2: yup.string().required('Address Line 2 is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required')
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormData
  })

  useEffect(() => {
    if (detail) {
      reset(initialFormData)
    }
  }, [detail, reset])

  const handleFormSubmit = async data => {
    console.log('data', data)
    setLoading(true)

    const formatData = {
      display_name: data.display_name,
      logistic_partner: data.logistic_partner || 'delhivery',
      pickup_address: {
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        country: data.country || 'india',
        phone: data.phone
      },
      otherfields: {
        status: data.status,
        token_test: data.token_test,
        token_live: data.token_live,
        api_key_test: data.api_key_test,
        api_key_live: data.api_key_live,
        api_secret_test: data.api_secret_test,
        api_secret_live: data.api_secret_live,
        logistic_enviroment: data.logistic_enviroment
      }
    }
    const url = isAddLogistic ? '/admin/cms/addLogisticSettings' : `/admin/cms/updateLogisticSettings/${detail._id}`
    const method = isAddLogistic ? 'POST' : 'PUT'
    try {
      const responseData = await fetchData(url, method, formatData)
      if (responseData.success) {
        toast.success(responseData.message || 'Logistics added successfully')
        fetchDelhivery()
      }
      if (!responseData.success) {
        toast.error(err || 'Error during submission')
        throw new Error('Something went wrong' || responseData.message)
      }
    } catch (err) {
      toast.error(err || 'Error during submission')
    } finally {
      setLoading(false)
    }
  }

  const handleEditToggle = () => {
    setEditable(!editable)
  }
  return (
    <Card>
      <Grid className='flex justify-between items-center'>
        <CardHeader title={isAddLogistic ? 'Add Logistic Setting' : 'Edit Logistic Setting'} />
        {!isAddLogistic && (
          <IconButton onClick={handleEditToggle} className='mr-2'>
            <i className='tabler-edit text-[25px] text-textSecondary' />
          </IconButton>
        )}
      </Grid>
      <Divider />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h6'>1. Logistic Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='display_name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    label={
                      <span className='flex items-center'>
                        Logistic Name
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    placeholder='Enter Logistic name'
                    error={Boolean(errors.display_name)}
                    helperText={errors.display_name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    disabled={editable}
                    label={
                      <span className='flex items-center'>
                        Status
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.status)}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='token_test'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Test Token'
                    label={
                      <span className='flex items-center'>
                        Token [Test]
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.token_test)}
                    helperText={errors.token_test?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='token_live'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Live Token'
                    label={
                      <span className='flex items-center'>
                        Token [Live]
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.token_live)}
                    helperText={errors.token_live?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='api_key_test'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Test Api Key'
                    label={
                      <span className='flex items-center'>
                        Api Key [Test]
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.api_key_test)}
                    helperText={errors.api_key_test?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='api_key_live'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Live Api Key'
                    label={
                      <span className='flex items-center'>
                        Api Key [Live]
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.api_key_live)}
                    helperText={errors.api_key_live?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='api_secret_test'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Test Api Secret'
                    label={
                      <span className='flex items-center'>
                        Api Secret [Test]
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.api_secret_test)}
                    helperText={errors.api_secret_test?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='api_secret_live'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Live Api Secret'
                    label={
                      <span className='flex items-center'>
                        Api Secret [Live]
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.api_secret_live)}
                    helperText={errors.api_secret_live?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='logistic_partner'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled
                    label={
                      <span className='flex items-center'>
                        Logistic Partner
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='logistic_enviroment'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    disabled={editable}
                    select
                    label={
                      <span className='flex items-center'>
                        Logistic Environment
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.logistic_enviroment)}
                    helperText={errors.logistic_enviromentdelhivery?.message}
                  >
                    <MenuItem value='test'>Test</MenuItem>
                    <MenuItem value='live'>Live</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>2. Pick up Address</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='address1'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    placeholder='Enter Address 1'
                    multiline
                    rows={3}
                    label={
                      <span className='flex items-center'>
                        Address Line 1<span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.address1)}
                    helperText={errors.address1?.message}
                    fullWidth
                    disabled={editable}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='address2'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    multiline
                    rows={3}
                    fullWidth
                    disabled={editable}
                    placeholder='Enter Address 2'
                    label={
                      <span className='flex items-center'>
                        Address Line 2<span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.address2)}
                    helperText={errors.address2?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    placeholder='Enter City'
                    label={
                      <span className='flex items-center'>
                        City
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.city)}
                    helperText={errors.city?.message}
                    fullWidth
                    disabled={editable}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    placeholder='Enter State'
                    label={
                      <span className='flex items-center'>
                        State
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.state)}
                    helperText={errors.state?.message}
                    fullWidth
                    disabled={editable}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='pincode'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    placeholder='Enter Pincode'
                    label={
                      <span className='flex items-center'>
                        PIN Code
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.pincode)}
                    helperText={errors.pincode?.message}
                    fullWidth
                    disabled={editable}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    disabled={editable}
                    placeholder='Enter Phone Number'
                    fullWidth
                    type='number'
                    inputmode='numeric'
                    label={
                      <span className='flex items-center'>
                        Phone Number
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid className=' flex sm:gap-5 justify-center mt-5 gap-2'>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? <Loader size={20} /> : 'Submit'}
            </Button>
            <Button variant='tonal' type='button' color='secondary' onClick={() => reset()} disabled={loading}>
              Cancel
            </Button>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}
