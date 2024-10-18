'use client'
import React, { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Grid,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import useLocalizedRedirect from '@/utils/useLocalizedRedirect'

const CustomerDetailForm = ({ customerData, isAddCustomer, id, individualCustomer }) => {
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const redirect = useLocalizedRedirect()
  console.log(customerData, 'from detail of customer')
  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .required('First name is required')
      .matches(/^[a-zA-Z0-9]*$/, 'First name can only contain letters and numbers')
      .notOneOf(['*'], 'First name cannot be *'),
    lastname: yup
      .string()
      .required('Last name is required')
      .matches(/^[a-zA-Z0-9]*$/, 'Last name can only contain letters and numbers')
      .notOneOf(['*'], 'Last name cannot be *'),
    email: yup
      .string()
      .email('Enter a valid email')
      .matches(/^[^*]+$/, 'Email cannot contain *')
      .matches(/.+\..+/, 'Email must contain a domain (e.g., .com)')
      .required('Email is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    marketing_optin: yup.boolean().required(),
    verified_email: yup.boolean().required(),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[\W_]/, 'Password must contain at least one symbol or whitespace character')
  })

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: customerData?.customer?.firstname || '',
      lastname: customerData?.customer?.lastname || '',
      email: customerData?.customer?.email || '',
      phone: customerData?.customer?.phone || '',
      password: customerData?.customer?.password || '',
      verified_email: customerData?.customer?.verified_email || false,
      marketing_optin: customerData?.customer?.marketing_optin || false
    }
  })

  const handleFormSubmit = async data => {
    const apiUrl = isAddCustomer
      ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/createcustomer`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/updatecustomer/${id}`

    try {
      const response = await fetchData(apiUrl, isAddCustomer ? 'POST' : 'PUT', data)
      if (response.success || response.status) {
        if (isAddCustomer) {
          toast.success('Customer added successfully!')
          redirect('customers/allcustomers')
        } else {
          toast.success('Customer Updated successfully!')
        }
      } else {
        toast.error(isAddCustomer ? 'Unsuccessful to add Customer' : 'unsuccessful to update customer')
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred'
      toast.error(`Error submitting data: ${errorMessage}`)
    }
  }

  const currentStatus = customerData?.customer?.status ? 'Activated' : 'Deactivated'
  // const status = customerData?.customer?.status
  const isActivated = customerData?.customer?.status
  const name = customerData?.customer?.firstname

  const handleStatusSubmit = async () => {
    console.log(currentStatus)
    console.log(!isActivated)
    const apiUrl = isActivated
      ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/deactivateCustomer/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/activateCustomer/${id}`

    try {
      const response = await fetchData(apiUrl, 'POST', {})
      if (response.success || response.status) {
        if (isActivated) {
          toast.success('Customer deactivated successfully!')
        } else {
          toast.success('Customer activated successfully!')
        }
        individualCustomer()
      } else {
        toast.error(isActivated ? 'Failed to deactivate customer' : 'Failed to activate customer')
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred'
      toast.error(`Error submitting data: ${errorMessage}`)
    }
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='firstname'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='First Name'
                        placeholder='First Name'
                        error={Boolean(errors.firstname)}
                        helperText={errors.firstname?.message}
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
                        fullWidth
                        label='Last Name'
                        placeholder='Last Name'
                        error={Boolean(errors.lastname)}
                        helperText={errors.lastname?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Email'
                        placeholder='Email'
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Password'
                        type={isNewPasswordShown ? 'text' : 'password'}
                        placeholder='············'
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                                onMouseDown={e => e.preventDefault()}
                              >
                                <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
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
                        fullWidth
                        type='number'
                        label='Phone Number'
                        placeholder='Phone Number'
                        inputmode='numeric'
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='verified_email'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Verified Email'
                        placeholder='Verified Email'
                        error={Boolean(errors.verified_email)}
                        helperText={errors.verified_email?.message}
                      >
                        <MenuItem value={true}>yes</MenuItem>
                        <MenuItem value={false}>no</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='marketing_optin'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Marketing Option'
                        placeholder='Marketing Option'
                        error={Boolean(errors.marketing_optin)}
                        helperText={errors.marketing_optin?.message}
                      >
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    {isAddCustomer ? 'Add Customer' : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={`${currentStatus} product`} />
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Currently {name} Customer is {currentStatus}
            </Typography>
            <Grid container gap={5}>
              <Button variant='contained' color='success' disabled={isActivated} onClick={handleStatusSubmit}>
                Activate Customer
              </Button>

              <Button variant='contained' color='error' disabled={!isActivated} onClick={handleStatusSubmit}>
                Deactivate Customer
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomerDetailForm
