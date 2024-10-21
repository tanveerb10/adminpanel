'use client'
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardHeader, CardContent, Button, Grid, MenuItem, IconButton } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

const CustomerAddressForm = ({ isAddAddress, handleToggle, selectAddress, id, fetchIndividualAddress }) => {
  const [loading, setLoading] = useState(false)
  const [deleteValue, setDeleteValue] = useState('no')
  console.log('select address', selectAddress)
  const validationSchema = yup.object().shape({
    address_name: yup.string().required('Address name is required'),
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    address1: yup.string().required('Address line 1 is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pin: yup.string().required('PIN code is required'),
    country: yup.string().required('Country is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required')
  })

  console.log('selectAddress in address form ', selectAddress)
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      address_name: selectAddress?.address_name || '',
      firstname: selectAddress?.firstname || '',
      lastname: selectAddress?.lastname || '',
      address1: selectAddress?.address1 || '',
      address2: selectAddress?.address2 || null,
      city: selectAddress?.city || '',
      state: selectAddress?.state || '',
      pin: selectAddress?.pin || '',
      country: selectAddress?.country || '',
      phone: selectAddress?.phone || '',
      customer_id: id
    }
  })

  useEffect(() => {
    reset(selectAddress) // Reset form when selectAddress changes
  }, [selectAddress, reset])

  const handleFormSubmit = async data => {
    const apiUrl = isAddAddress
      ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/createcustomeraddress`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/updatecustomeraddress/${selectAddress._id}`

    try {
      setLoading(true)
      const response = await fetchData(apiUrl, isAddAddress ? 'POST' : 'PUT', data)
      if (response.success) {
        toast.success(isAddAddress ? 'Address added successfully!' : 'Address updated successfully!')
        // Redirect or update UI as necessary
        fetchIndividualAddress()
        handleToggle()
      } else {
        toast.error('Error saving address: ' + response.message)
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred'
      toast.error(`Error submitting data: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (deleteValue === 'yes') {
      try {
        setLoading(true)
        const deleteAddressUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/deletecustomeraddress/${selectAddress._id}`
        const responseData = await fetchData(deleteAddressUrl, 'DELETE')
        if (responseData.success) {
          toast.success('Address deleted successfully')
          // Handle UI update after deletion
          fetchIndividualAddress()
          handleToggle()
        } else {
          throw new Error(responseData.message || 'Something went wrong')
        }
      } catch (err) {
        toast.error(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Grid className='flex flex-row'>
            <Grid item xs={12}>
              <CardHeader title={isAddAddress ? 'Add Customer Address' : 'Edit Customer Address'} />
            </Grid>
            <Grid item xs={12} className='text-right pr-5'>
              <IconButton onClick={() => handleToggle()}>
                <i className='tabler-eye text-[25px] text-textSecondary' />
              </IconButton>
            </Grid>
          </Grid>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Controller
                    name='address_name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Address Name (e.g., Home, Work)'
                        error={Boolean(errors.address_name)}
                        helperText={errors.address_name?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='firstname'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='First Name'
                        error={Boolean(errors.firstname)}
                        helperText={errors.firstname?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='lastname'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Last Name'
                        error={Boolean(errors.lastname)}
                        helperText={errors.lastname?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='address1'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Address Line 1'
                        error={Boolean(errors.address1)}
                        helperText={errors.address1?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='address2'
                    control={control}
                    render={({ field }) => <CustomTextField {...field} label='Address Line 2 (optional)' fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='city'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='City'
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                        fullWidth
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
                        label='State'
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='pin'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='PIN Code'
                        error={Boolean(errors.pin)}
                        helperText={errors.pin?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='country'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Country'
                        error={Boolean(errors.country)}
                        helperText={errors.country?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Phone Number'
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit' disabled={loading}>
                    {isAddAddress ? 'Add Address' : 'Update Address'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <CustomTextField
                  label='Delete Address?'
                  variant='outlined'
                  fullWidth
                  select
                  value={deleteValue}
                  onChange={e => setDeleteValue(e.target.value)}
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  color='error'
                  onClick={handleDelete}
                  disabled={loading || deleteValue === 'no'}
                >
                  Delete Address
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomerAddressForm
