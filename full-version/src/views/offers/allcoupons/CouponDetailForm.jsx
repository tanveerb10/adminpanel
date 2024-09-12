'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, Button, Grid, MenuItem, Autocomplete, CircularProgress } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import { getLocalizedUrl } from '@/utils/i18n'
import CouponDelete from '@views/offers/allcoupons/CouponDelete'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const CouponDetailForm = ({ isAddCoupon, couponData }) => {
  const initialFormData = {
    coupon_name: couponData?.coupon?.coupon_name || '',
    coupon_code: couponData?.coupon?.coupon_code || null,
    coupon_count: couponData?.coupon?.coupon_count || 0,
    coupon_description: couponData?.coupon?.coupon_description || '',
    status: couponData?.coupon?.status || false,
    coupon_eligibility: couponData?.coupon?.coupon_eligibility || '',
    limit_per_user: couponData?.coupon?.limit_per_user || '',
    discount_type: couponData?.coupon?.discount_type || '',
    discount_value: couponData?.coupon?.discount_value || '',
    min_order_value: couponData?.coupon?.min_order_value || '',
    max_order_value: couponData?.coupon?.max_order_value || '',
    valid_from: couponData?.coupon?.valid_from ? new Date(couponData.coupon.valid_from) : new Date(),
    valid_to: couponData?.coupon?.valid_to ? new Date(couponData.coupon.valid_to) : new Date(),
    customer_for: couponData?.coupon?.coupon_for || ''
  }

  const today = new Date()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [dateFormat, setDateFormat] = useState({
    validFrom: today,
    validTo: today
  })

  const validationSchema = yup.object().shape({
    coupon_name: yup.string().required('Coupon name is required'),
    coupon_description: yup.string().required('Coupon description is required'),
    coupon_code: yup.string().required('Coupon code is required'),
    coupon_count: yup.number().required('Coupon count is required'),
    limit_per_user: yup.number().required('Limit per user is required'),
    discount_type: yup.string().required('Discount type is required'),
    discount_value: yup.number().required('Discount value is required'),
    min_order_value: yup.number().required('Min order value is required'),
    max_order_value: yup.number().required('Max order value is required'),
    status: yup.boolean().required('Is Deleted is required'),

    customer_for: yup.string().when('coupon_eligibility', {
      is: 'single',
      then: schema => schema.required('Customer is required when eligibility is single')
    })
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormData
  })

  useEffect(() => {
    if (couponData) {
      reset(initialFormData)
      setDateFormat({
        validFrom: couponData?.coupon?.valid_from ? new Date(couponData.coupon.valid_from) : today,
        validTo: couponData?.coupon?.valid_to ? new Date(couponData.coupon.valid_to) : today
      })
    }
  }, [couponData, reset])

  const couponEligibility = watch('coupon_eligibility')

  const { id, lang: locale } = useParams()
  const router = useRouter()

  const handleFormSubmit = async data => {
    console.log('tanveer')
    console.log('Form Submit called', data)
    setSubmitting(true)
    try {
      const apiUrl = isAddCoupon
        ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/coupons/createcoupon`
        : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/coupons/updatecoupon/${id}`

      const response = await fetchData(apiUrl, isAddCoupon ? 'POST' : 'PUT', data)
      console.log('API Response:', response)

      if (!response.success) {
        console.log('error response', response.message)
        toast.error(response.message)
      }
      if (response.success) {
        setTimeout(() => router.push(getLocalizedUrl(`/offers/allcoupons`, locale)), 3000)
        return toast.success(response.message)
      }
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  const allCustomers = useCallback(async () => {
    setLoading(true)
    try {
      const getCustomerUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/allcustomers`
      const responseData = await fetchData(getCustomerUrl, 'GET')
      if (responseData.success) {
        const formattedOptions = responseData.totalCustomer.map(customer => ({
          id: customer._id,
          label: customer.email
        }))
        setOptions(formattedOptions)
        console.log(options, 'option all customer')
      } else {
        toast.error('Failed to fetch options')
      }
    } catch (error) {
      setError('Failed to fetch options')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open && couponEligibility === 'single' && options.length === 0) {
      allCustomers()
    }
  }, [open, options.length, allCustomers, couponEligibility])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='coupon_name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Coupon Name'
                        placeholder='Coupon Name'
                        error={Boolean(errors.coupon_name)}
                        helperText={errors.coupon_name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='coupon_code'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Coupon Code '
                        placeholder='Coupon Code'
                        error={Boolean(errors.coupon_code)}
                        helperText={errors.coupon_code?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='discount_value'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Discount Value'
                        placeholder='Discount Value'
                        error={Boolean(errors.discount_value)}
                        helperText={errors.discount_value?.message}
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
                        label='Min Order Value'
                        placeholder='Min Order Value'
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
                        label='Max Order Value'
                        placeholder='Max Order Value'
                        error={Boolean(errors.max_order_value)}
                        helperText={errors.max_order_value?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='coupon_count'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Coupon Count'
                        placeholder='Coupon Count'
                        error={Boolean(errors.coupon_count)}
                        helperText={errors.coupon_count?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='limit_per_user'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Limit Per User'
                        placeholder='Limit Per User'
                        error={Boolean(errors.limit_per_user)}
                        helperText={errors.limit_per_user?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='coupon_eligibility'
                    control={control}
                    defaultValue={couponData?.coupon_eligibility || ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Coupon Eligibility'
                        onChange={e => {
                          field.onChange(e)
                        }}
                        error={Boolean(errors.coupon_eligibility)}
                        helperText={errors.coupon_eligibility?.message}
                      >
                        <MenuItem value='all'>All</MenuItem>
                        <MenuItem value='single'>Single</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='customer_for'
                    control={control}
                    defaultValue={couponData?.coupon_for || ''}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        sx={{ width: 300 }}
                        open={open}
                        onOpen={() => {
                          setOpen(true)
                        }}
                        onClose={() => {
                          setOpen(false)
                        }}
                        disabled={couponEligibility !== 'single'}
                        onChange={(event, value) => field.onChange(value?.id || '')}
                        isOptionEqualToValue={(option, value) => option.id === value}
                        getOptionLabel={option => option.label || ''}
                        options={options}
                        loading={loading}
                        renderInput={params => (
                          <CustomTextField
                            {...params}
                            placeholder='Search for customer'
                            error={Boolean(errors.customer_for)}
                            helperText={errors.customer_for?.message}
                            label='Select Customer'
                            input={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loading ? <CircularProgress color='inherit' size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </>
                              )
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='status'
                    control={control}
                    defaultValue={couponData?.status || ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Status'
                        error={Boolean(errors.status)}
                        helperText={errors.status?.message}
                      >
                        <MenuItem value='true'>True</MenuItem>
                        <MenuItem value='false'>False</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='discount_type'
                    control={control}
                    defaultValue={couponData?.discount_type || ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Discount Type'
                        error={Boolean(errors.discount_type)}
                        helperText={errors.discount_type?.message}
                      >
                        <MenuItem value='percent'>Percent</MenuItem>
                        <MenuItem value='amount'>Amount</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='coupon_description'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        multiline
                        maxRows={4}
                        minDate={today}
                        label='Coupon Description'
                        placeholder='Coupon Description'
                        error={Boolean(errors.coupon_description)}
                        helperText={errors.coupon_description?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <AppReactDatepicker
                    showYearDropdown
                    showMonthDropdown
                    selected={dateFormat.validFrom}
                    // minDate={today}
                    dateFormat='dd MMM yyyy'
                    onChange={date => setDateFormat(prev => ({ ...prev, validFrom: date || new Date() }))}
                    customInput={<CustomTextField label='Valid From' fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <AppReactDatepicker
                    showYearDropdown
                    showMonthDropdown
                    selected={dateFormat.validTo}
                    // minDate={dateFormat.validFrom}
                    dateFormat='dd MMM yyyy'
                    onChange={date => setDateFormat(prev => ({ ...prev, validTo: date || new Date() }))}
                    customInput={<CustomTextField label='Valid To' fullWidth />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' type='submit' disabled={submitting}>
                    {submitting ? 'Submitting' : isAddCoupon ? 'Add Coupon' : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {!isAddCoupon && (
        <Grid item xs={12}>
          <Card>
            <CouponDelete id={id} status={initialFormData.status} />
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default CouponDetailForm
