'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import debounce from 'lodash.debounce'
import { Card, CardContent, Button, Typography, Grid, MenuItem } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import { getLocalizedUrl } from '@/utils/i18n'
import BrandDelete from '@views/products/brands/BrandDelete'

const BrandDetailForm = ({ isAddBrand, brandData }) => {
  const initialFormData = {
    brand_name: brandData?.brand?.brand_name || '',
    brand_image_src: brandData?.brand?.brand_image_src || null,
    products_count: brandData?.brand?.products_count || 0,
    brand_description: brandData?.brand?.brand_description || '',
    is_deleted: brandData?.brand?.is_deleted || false,
    sort_order: brandData?.brand?.sort_order || '',
    brand_image_alt: brandData?.brand?.brand_image_alt || '',
    // brand_slug: brandData?.brand?.brand_slug || ''
  }
  // const [formData, setFormData] = useState(initialFormData)
  const [imgSrc, setImgSrc] = useState(initialFormData.brand_image_src)
  const [selectedFile, setSelectedFile] = useState(null)
  const validationSchema = yup.object().shape({
    brand_name: yup.string().required('Brand name is required'),
    brand_description: yup.string().required('Brand description is required'),
    products_count: yup.number().required('Product count is required'),
    sort_order: yup.string().required('Sort order is required'),
    brand_image_src: yup.string(),
    // brand_image_src: yup.string().required('Brand image is required'),
    is_deleted: yup.string().required('Is Deleted is required'),
    // brand_slug: yup.string(),
    brand_image_alt: yup.string()
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
    if (brandData) {
      reset(initialFormData)
    }
  }, [brandData, reset])

  const handleFileInputChange = event => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = e => setImgSrc(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputReset = () => {
    setImgSrc(initialFormData.brand_image_src)
  }

  const { id, lang: locale } = useParams()
  const router = useRouter()

  const handleSlug = brandName => {
    return brandName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
  }
  const handleFormSubmit = async data => {
    try {
      // if (isAddBrand) {
      //   data.brand_slug = handleSlug(data.brand_name)
      // }

      const formData = new FormData()
      formData.append('brand_name', data.brand_name)
      formData.append('products_count', data.products_count)
      formData.append('brand_description', data.brand_description)
      formData.append('is_deleted', data.is_deleted)
      formData.append('sort_order', data.sort_order)
      formData.append('brand_image_alt', data.brand_image_alt)
      // formData.append('brand_slug', data.brand_slug);

      if (!isAddBrand) {
        formData.append('brand_slug', data.brand_slug)
      }

      if (selectedFile) {
        formData.append('brand_image_src', imgSrc)
      } else if (!isAddBrand) {
        formData.append('brand_image_src', data.brand_image_src)
      }

      console.log('Form Data:', data)
      const apiUrl = isAddBrand
        ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/createBrand`
        : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/updateBrand/${id}`
      const response = await fetchData(apiUrl, isAddBrand ? 'POST' : 'PUT', formData)
      console.log('API Response:', response)
      const result = await response.json()
      console.log('API Response:', result)

      if (response.success === true) {
        setTimeout(() => router.push(getLocalizedUrl(`/products/brands`, locale)), 3000)
        return toast.success(response.message)
      }
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
    }
  }
  console.log(imgSrc, "img src ")
  console.log(selectedFile, "selected file src ")
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='mbe-4'>
            <div className='flex max-sm:flex-col items-center gap-6'>
              <img height={100} width={100} className='rounded' src={imgSrc} alt={initialFormData.brand_image_alt} />
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
                    name='brand_name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Brand Name'
                        placeholder='Brand Name'
                        error={Boolean(errors.brand_name)}
                        helperText={errors.brand_name?.message}
                        // onChange={handleSlug(e)}
                      />
                    )}
                  />
                </Grid>
                {!isAddBrand && (
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='brand_slug'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          fullWidth
                          label='Brand Slug'
                          placeholder='Brand Slug'
                          error={Boolean(errors.brand_slug)}
                          helperText={errors.brand_slug?.message}
                        />
                      )}
                    />
                  </Grid>
                )}
                {/* <Grid item xs={12} sm={6}>
                  <Controller
                    name='brand_image_src'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Image Link'
                        placeholder='Image Link'
                        error={Boolean(errors.brand_image_src)}
                        helperText={errors.brand_image_src?.message}
                      />
                    )}
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='brand_image_alt'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Image Alt'
                        placeholder='Image Alt'
                        error={Boolean(errors.brand_image_alt)}
                        helperText={errors.brand_image_alt?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='products_count'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Product Count'
                        placeholder='Product Count'
                        error={Boolean(errors.products_count)}
                        helperText={errors.products_count?.message}
                      />
                    )}
                  />
                </Grid>
                {!isAddBrand && (
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name='is_deleted'
                      control={control}
                      defaultValue={brandData?.status || ''}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          select
                          fullWidth
                          label='Status'
                          error={Boolean(errors.is_deleted)}
                          helperText={errors.is_deleted?.message}
                        >
                          <MenuItem value='true'>True</MenuItem>
                          <MenuItem value='false'>False</MenuItem>
                        </CustomTextField>
                      )}
                    />
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='sort_order'
                    control={control}
                    defaultValue={brandData?.sortOrder || ''}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Sort Order'
                        error={Boolean(errors.sort_order)}
                        helperText={errors.sort_order?.message}
                      >
                        <MenuItem value='yes'>Yes</MenuItem>
                        <MenuItem value='no'>No</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='brand_description'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        multiline
                        maxRows={4}
                        label='Brand Description'
                        placeholder='Brand Description'
                        error={Boolean(errors.brand_description)}
                        helperText={errors.brand_description?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    {isAddBrand ? 'Add Brand' : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {!isAddBrand && (
        <Grid item xs={12}>
          <Card>
            <BrandDelete id={id} status={initialFormData.is_deleted} />
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default BrandDetailForm
