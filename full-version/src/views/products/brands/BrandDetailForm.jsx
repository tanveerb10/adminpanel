'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import debounce from 'lodash.debounce'
import { Card, CardContent, Button, Typography, Grid, MenuItem, InputAdornment, IconButton } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'

const BrandDetailForm = ({ adminDetail, roleData, isAddAdmin }) => {
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [selectedRole, setSelectedRole] = useState(adminDetail?.role?.role_name || '')
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [formData, setFormData] = useState(adminDetail || {})

  const validationSchema = yup.object().shape({
    name: yup.string().required('Brand name is required'),
    description: yup.string().required('Brand description is required'),
    productCount: yup.number().required('Product count is required'),
    sortOrder: yup.string().required('Sort order is required'),
    status: yup.string().required('Status required'),
    imgSrc: yup.string().required("Brand image is required"),
    isDeleted: yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: adminDetail || {
      name: '',
      description: '',
      productCount: '',
      imgSrc: '',
        status: '',
        sortOrder: '',
      isDeleted:''
    }
  })

  useEffect(() => {
    if (adminDetail) {
      reset(adminDetail)
      setValue('role', adminDetail?.role?.role_name)
    }
  }, [adminDetail, reset])

  const handleFormChange = useCallback(
    debounce((field, value) => {
      setFormData(prevState => ({ ...prevState, [field]: value }))
    }, 300),
    []
  )

  const handleFileInputChange = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => setImgSrc(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputReset = () => {
    setImgSrc('/images/avatars/1.png')
  }

  const handleRoleChange = e => {
    const newRole = e.target.value
    setValue('role', newRole, { shouldValidate: true }) // Update the role value and trigger validation
    setSelectedRole(newRole) // Update state for selected role
  }
  const { id } = useParams()
  const handleFormSubmit = async formData => {

    const apiUrl = isAddAdmin
      ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/createBrand`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/updateBrand/${id}`

    try {
      const response = await fetch(apiUrl, {
        method: isAddAdmin ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'livein-key': 'livein-key',
          Nonce: nonce,
          Timestamp: timestamp,
          Signature: signature,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch data, status: ${response.status}`)
      }

      const responseData = await response.json()
      // responseData.success(toast.success('success'))
      if (responseData.success || responseData.status) {
        isAddAdmin ? toast.success('Admin added successfully!') : toast.success('Admin Updated successfully!')
      } else {
        isAddAdmin ? toast.error('Unsuccessful to add admin') : 'unsuccessful to update admin'
      }

      console.log('Data submitted successfully:', responseData)

      // Handle success scenario (e.g., show success message, redirect, etc.)
    } catch (error) {
      toast.error('Error submitting data:', error.message)
      // Handle error scenario (e.g., show error message to the user)
    }
  }

  return (
    <Card>
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
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Brand Name'
                    placeholder='Brand Name'
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Brand Description'
                    placeholder='Brand Description'
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
          
            <Grid item xs={12} sm={6}>
              <Controller
                name='productCount'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Product Count'
                    placeholder='Product Count'
                    error={Boolean(errors.productCount)}
                    helperText={errors.productCount?.message}
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
                    label='Status'
                    error={Boolean(errors.status)}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value='true'>Active</MenuItem>
                    <MenuItem value='false'>Inactive</MenuItem>
                    
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='isDeleted'
                control={control}
                defaultValue={adminDetail?.status || ''}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='IsDeleted'
                    error={Boolean(errors.isDeleted)}
                    helperText={errors.isDeleted?.message}
                  >
                    <MenuItem value='true'>True</MenuItem>
                    <MenuItem value='false'>False</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='sortOrder'
                control={control}
                defaultValue={adminDetail?.status || ''}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='sortOrder'
                    error={Boolean(errors.sortOrder)}
                    helperText={errors.sortOrder?.message}
                  >
                    <MenuItem value='yes'>Yes</MenuItem>
                    <MenuItem value='no'>No</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
          
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                {isAddAdmin ? 'Add Brand' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default BrandDetailForm
