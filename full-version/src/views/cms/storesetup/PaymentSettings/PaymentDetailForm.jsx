'use client'

import { Grid, Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '@/@core/components/mui/TextField'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import fetchData from '@/utils/fetchData'
// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

import { toast } from 'react-toastify'

import Loader from '@/libs/components/Loader'

const staticPaymentGateway = [
  { name: 'razor pay', value: 'razorpay' },
  { name: 'phone pe', value: 'phonepe' },
  { name: 'cash on delivery', value: 'cash_on_delivery' }
]

export default function PaymentDetailForm({ detail, open, setOpen, paymentApi, isAddPayment, gatewayList }) {
  // console.log(isAddPayment ? 'add' : 'edit')
  console.log('details', detail)
  const [loading, setLoading] = useState(false)

  const initialFormData = {
    display_name: detail?.display_name || '',
    payment_type: detail?.payment_gateway === 'cash_on_delivery' ? 'cash_on_delivery' : 'prepaid',
    payment_gateway: detail?.payment_gateway || '',
    payment_message: detail?.payment_message || '',
    min_order_value: detail?.min_order_value || 0,
    max_order_value: detail?.max_order_value || 0,
    status: detail?.status ?? true,
    client_test_id: detail?.client_test_id || '',
    client_live_id: detail?.client_live_id || '',
    client_test_secret: detail?.client_test_secret || '',
    client_live_secret: detail?.client_live_secret || '',
    merchant_test_id: detail?.merchant_test_id || '',
    merchant_live_id: detail?.merchant_live_id || '',
    three_test_url: detail?.three_test_url || '',
    three_live_url: detail?.three_live_url || '',
    salt_test: detail?.salt_test || '',
    salt_live: detail?.salt_live || '',
    salt_test_index: detail?.salt_test_index || '',
    salt_live_index: detail?.salt_live_index || '',
    payment_environment: detail?.payment_environment || ''
  }

  const validationSchema = yup.object().shape({
    display_name: yup.string().required('Payment name is required'),
    payment_message: yup.string().required('Payment message is required'),
    min_order_value: yup.number().positive().min(1, 'Must be at least 1').required('Minimum order value is required'),
    max_order_value: yup
      .number()
      .positive()
      .moreThan(yup.ref('min_order_value'), 'Max order must be greater than Min order')
      .required('Max order value is required'),
    status: yup.boolean().required('Status is required')
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

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  const handleFormSubmit = async data => {
    setLoading(true)

    if (data.payment_gateway === 'cash_on_delivery') {
      data.payment_type = 'cash_on_delivery'
    } else {
      data.payment_type = 'prepaid'
    }
    const url = isAddPayment ? '/admin/cms/addPaymentSettings' : `/admin/cms/updatePaymentSettings/${detail._id}`
    const method = isAddPayment ? 'POST' : 'PUT'
    try {
      const responseData = await fetchData(url, method, data)
      if (responseData.success) {
        toast.success('Payment added successfully')
        paymentApi()
      }
      if (!responseData.success) {
        toast.error(err || 'Error during submission')
        throw new Error('Something went wrong' || responseData.message)
      }
    } catch (err) {
      toast.error(err || 'Error during submission')
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  const paymentGatewayObject = staticPaymentGateway.filter(item => {
    return !gatewayList.includes(item.value)
  })

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      aria-labelledby='add-search-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {isAddPayment ? 'Add Payment Setting' : 'Edit Payment Setting'}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='display_name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label={
                      <span className='flex items-center'>
                        Payment Name
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    placeholder='Enter payment name'
                    error={Boolean(errors.display_name)}
                    helperText={errors.display_name?.message}
                  />
                )}
              />
            </Grid>

            {detail?.payment_gateway.length > 0 ? (
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  value={detail.payment_gateway}
                  disabled
                  fullWidth
                  label={
                    <span className='flex items-center'>
                      Payment Name
                      <span className='text-sm ml-1'>*</span>
                    </span>
                  }
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='payment_gateway'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      select
                      fullWidth
                      label={
                        <span className='flex items-center'>
                          Payment Gateway
                          <span className='text-sm ml-1'>*</span>
                        </span>
                      }
                      error={Boolean(errors.payment_gateway)}
                      helperText={errors.payment_gateway?.message}
                    >
                      {/* {gatewayList.map(item => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))} */}
                      {paymentGatewayObject.map(item => (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <Controller
                name='payment_message'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label={
                      <span className='flex items-center'>
                        Payment Message
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    placeholder='Enter payment message'
                    error={Boolean(errors.payment_message)}
                    helperText={errors.payment_message?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='min_order_value'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label={
                      <span className='flex items-center'>
                        Min Order Value <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    placeholder='Enter minimum order value'
                    error={Boolean(errors.min_order_value)}
                    helperText={errors.min_order_value?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='max_order_value'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label={
                      <span className='flex items-center'>
                        Max Order Value
                        <span className='text-sm ml-1'>*</span>
                      </span>
                    }
                    placeholder='Enter maximum order value'
                    error={Boolean(errors.max_order_value)}
                    helperText={errors.max_order_value?.message}
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
                name='client_test_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Client ID [Test]' placeholder='Enter Test Client ID' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='client_live_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Client ID [Live]' placeholder='Enter Live Client ID' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='client_test_secret'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Client Secret [Test]'
                    placeholder='Enter Test Client Secret'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='client_live_secret'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Client Secret [Live]'
                    placeholder='Enter Live Client Secret'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='merchant_test_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Merchant ID [Test]'
                    placeholder='Enter Test Merchant ID'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='merchant_live_id'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Merchant ID [Live]'
                    placeholder='Enter Live merchant ID'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='three_test_url'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Three URL [Test]' placeholder='Enter Test Three URL' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='three_live_url'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Three URL [Live]' placeholder='Enter Live Three URL' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='salt_test'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Salt [Test]' placeholder='Enter Test Salt' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='salt_live'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Salt [Live]' placeholder='Enter Live Salt' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='salt_test_index'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Salt Index [Test]' placeholder='Enter Test Salt Index' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='salt_live_index'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Salt Index [Live]' placeholder='Enter Live Salt Index' />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='payment_environment'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth select label='Payment Environment'>
                    <MenuItem value='test'>Test</MenuItem>
                    <MenuItem value='live'>Live</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DialogActions className='pbs-0 sm:pbe-16 sm:pli-16 mt-3 flex justify-center '>
                <Button variant='contained' type='submit' disabled={loading}>
                  {loading ? <Loader size={20} /> : 'Submit'}
                </Button>
                <Button variant='tonal' type='button' color='secondary' onClick={handleClose} disabled={loading}>
                  Cancel
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}
