'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, Button, Typography, Grid, MenuItem, InputAdornment, IconButton } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchFormData from '@/utils/fetchFormData'
import fetchData from '@/utils/fetchData'
import useLocalizedRedirect from '@/utils/useLocalizedRedirect'
// STATES OF INDIA
let states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry'
]

const AccountDetails = ({ adminDetail, roleData, isAddAdmin, isProfile, onlyViewProfile }) => {
  // let isProfile = true
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedRole, setSelectedRole] = useState(adminDetail?.role?.role_name || '')
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const redirect = useLocalizedRedirect()

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
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().required('Status required'),
    gender: yup.string().required('Gender is required'),
    pin: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
      .required('Pin code is required')
  })

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: adminDetail || {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      password: '',
      state: '',
      pin: '',
      gender: '',
      role: '',
      status: ''
    }
  })

  console.log('admin detail', adminDetail)
  useEffect(() => {
    if (adminDetail) {
      reset(adminDetail)
      setValue('role', adminDetail?.role?.role_name)
    }
  }, [adminDetail, reset])

  const handleFileInputChange = useCallback(event => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 800 * 1024) {
        toast.error('File size should not exceed 800KB')
        return
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Invalid file type. Only JPG and PNG are allowed.')
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = e => setImgSrc(e.target.result)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileInputReset = () => {
    setImgSrc('/images/avatars/1.png')
    setSelectedFile(null)
  }

  const handleRoleChange = e => {
    const newRole = e.target.value
    setValue('role', newRole, { shouldValidate: true })
    setSelectedRole(newRole)
  }
  // const { id, lang: } = useParams()
  const { lang: locale, id } = useParams()
  const handleProfileImageSubmit = async data => {
    if (!selectedFile) {
      toast.error('Image is required')
      return
    }

    const formData = new FormData()
    if (selectedFile) {
      formData.append('profile_image_src', selectedFile)
      formData.append('adminId', adminDetail._id)
    }
    const uploadprofilebyself = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/uploadprofilebyself`
    const uploadprofilebysuperadmin = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/uploadprofilebysuperadmin`
    try {
      const response = await fetchFormData(
        isProfile ? uploadprofilebyself : uploadprofilebysuperadmin,
        'PUT',
        formData,
        'image'
      )
      if (response.success || response.status) {
        toast.success('Image Updated successfully!')
      } else {
        toast.error('Unsuccessful to update image')
      }
    } catch (error) {
      toast.error(`Error submitting data: ${error.message}`)
    }
  }
  const handleFormSubmit = async data => {
    const apiUrl = isAddAdmin
      ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/adminsignup`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/updateadmin/${id}`

    try {
      const response = await fetchFormData(apiUrl, isAddAdmin ? 'POST' : 'PUT', data)
      if (response.success || response.status) {
        if (isAddAdmin) {
          toast.success('Admin added successfully!')
          redirect('admin/adminusers')
        } else {
          toast.success('Admin Updated successfully!')
        }
      } else {
        isAddAdmin ? toast.error('Unsuccessful to add admin') : 'unsuccessful to update admin'
      }
    } catch (error) {
      toast.error(`Error submitting data: ${error.message}`)
    }
  }

  return (
    <Card>
      {!isAddAdmin && (
        <CardContent className='mbe-4'>
          <div className='flex max-sm:flex-col items-center gap-6'>
            <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
            <div className='flex flex-grow flex-col gap-4'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={handleFileInputChange}
                    id='account-settings-upload-image'
                  />
                </Button>
                <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                  Reset
                </Button>
                <Button variant='tonal' color='primary' onClick={handleProfileImageSubmit}>
                  Save
                </Button>
              </div>
              <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
            </div>
          </div>
        </CardContent>
      )}
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
                    disabled={isProfile}
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
                    disabled={isProfile}
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
                    disabled={isProfile}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            {isAddAdmin && (
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
            )}
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
                    disabled={isProfile}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Gender'
                    disabled={isProfile}
                    error={Boolean(errors.gender)}
                    helperText={errors.gender?.message}
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='others'>Others</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='status'
                control={control}
                defaultValue={adminDetail?.status || ''}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Status'
                    disabled={isProfile}
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
              {onlyViewProfile ? (
                <CustomTextField
                  value={adminDetail?.role?.role_name}
                  fullWidth
                  label='Role'
                  disabled={onlyViewProfile}
                  placeholder='Role'
                />
              ) : (
                <Controller
                  name='role'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      select
                      fullWidth
                      label='Role'
                      // disabled={onlyViewProfile}
                      value={selectedRole || ''}
                      onChange={handleRoleChange}
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
                    >
                      {roleData?.roles?.map(role => (
                        <MenuItem value={role.role_name} key={role.role_id}>
                          <Typography className='capitalize'>{role.role_name}</Typography>
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Address'
                    disabled={isProfile}
                    placeholder='Address'
                    error={Boolean(errors.address)}
                    helperText={errors.address?.message}
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
                    fullWidth
                    label='City'
                    placeholder='City'
                    disabled={isProfile}
                    error={Boolean(errors.city)}
                    helperText={errors.city?.message}
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
                    select
                    fullWidth
                    label='State'
                    disabled={isProfile}
                    error={Boolean(errors.state)}
                    helperText={errors.state?.message}
                  >
                    {states.map(state => (
                      <MenuItem value={state} key={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </CustomTextField>
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
                    fullWidth
                    type='number'
                    label='Pincode'
                    disabled={isProfile}
                    placeholder='Pin code'
                    error={Boolean(errors.pin)}
                    helperText={errors.pin?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                {isAddAdmin ? 'Add Admin' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
