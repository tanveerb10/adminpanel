'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, Button, Typography, Grid, MenuItem, Autocomplete, CircularProgress } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import { getLocalizedUrl } from '@/utils/i18n'
import BrandDelete from '@views/products/brands/BrandDelete'
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
    max_order_value: couponData?.coupon?.max_order_value || ''
  }

  const [eligibilityValue, setEligibilityValue] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [dateFormat, setDateFormat] = useState({
    validFrom: new Date(),
    validTo: new Date()
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

    sort_order: yup.string().required('Sort order is required'),

    status: yup.boolean().required('Is Deleted is required'),
    coupon_image_alt: yup.string().required('imaga alt')
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormData
  })

  useEffect(() => {
    if (couponData) {
      reset(initialFormData)
    }
  }, [couponData, reset])

  const { id, lang: locale } = useParams()
  const router = useRouter()

  console.log(eligibilityValue)
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
        setTimeout(() => router.push(getLocalizedUrl(`/offers/coupons`, locale)), 3000)
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

  const loadingData = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loadingData) {
      return undefined
    }

    return () => {
      active = false
    }
  }, [loadingData])

  useEffect(() => {
    if (open && options.length === 0) {
      allCustomers()
    }
  }, [open])

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
                          setEligibilityValue(e.target.value)
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
                  <Autocomplete
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                      setOpen(true)
                    }}
                    onClose={() => {
                      setOpen(false)
                    }}
                    disabled={eligibilityValue !== 'single'}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={option => option.label}
                    options={options}
                    loading={loading}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
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
                    dateFormat='dd MMM yyyy'
                    onChange={date => setDateFormat(prev => ({ ...prev, validTo: date || new Date() }))}
                    customInput={<CustomTextField label='Valid To' fullWidth />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
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
            <BrandDelete id={id} status={initialFormData.is_deleted} />
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default CouponDetailForm
