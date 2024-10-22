'use client'
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, Button, Typography, Grid, MenuItem } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getLocalizedUrl } from '@/utils/i18n'
import fetchFormData from '@/utils/fetchFormData'

const CategoriesDetailForm = ({ isAddCategories, categoryData }) => {
  const initialFormData = {
    category_name: categoryData?.category?.category_name || '',
    category_image_src: categoryData?.category?.imageUrl || '/images/icons/default-image.jpg',
    product_count: categoryData?.category?.products_count || 0,
    category_description: categoryData?.category?.category_description || '',
    status: categoryData?.category?.is_deleted || false,
    category_sort: categoryData?.category?.category_sort || '',
    category_image_alt: categoryData?.category?.category_image_alt || '',
    category_slug: categoryData?.category?.category_slug
  }

  console.log(initialFormData, 'check ini')
  const [imgSrc, setImgSrc] = useState(initialFormData.category_image_src)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const validationSchema = yup.object().shape({
    category_name: yup.string().required('category name is required'),
    category_description: yup.string().required('category description is required'),
    category_sort: yup.string().required('Sort order is required'),
    category_image_alt: yup.string().required('Category image alt is required'),

    ...(isAddCategories
      ? {}
      : {
          product_count: yup.number(),
          status: yup.boolean().required('status is required')
        })
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
    if (categoryData) {
      reset(initialFormData)
    }
  }, [categoryData, reset])

  const handleFileInputChange = event => {
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
  }

  const handleFileInputReset = () => {
    setImgSrc(initialFormData.category_image_src)
    setSelectedFile(null)
  }

  const { id, lang: locale } = useParams()
  const router = useRouter()

  const handleFormSubmit = async data => {
    setLoading(true)
    console.log('tanveer')
    try {
      if (!selectedFile) {
        toast.error('Image is required')
        return
      }

      const apiUrl = isAddCategories ? `/admin/Categories/createCategory` : `/admin/Categories/updateCategory/${id}`

      const formData = new FormData()
      formData.append('category_name', data.category_name)
      formData.append('category_description', data.category_description)
      formData.append('sort_order', data.sort_order)

      if (!isAddCategories) {
        formData.append('status', data.status)
        formData.append('category_image_alt', data.category_image_alt)
      }

      if (selectedFile) {
        formData.append('category_image_src', selectedFile)
      } else if (!isAddCategories) {
        formData.append('category_image_src', data.category_image_src)
      }

      const response = await fetchFormData(apiUrl, isAddCategories ? 'POST' : 'PUT', formData, 'image')

      console.log('API Response:', response)

      if (!response.success) {
        console.log('error response', response.message)
        toast.error(response.message)
        setLoading(false)
        return
      } else {
        toast.success(response.message)
        setTimeout(() => router.push(getLocalizedUrl(`/products/categories`, locale)), 3000)
        setLoading(false)
        return
      }
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
      setLoading(false)
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt={initialFormData.category_image_alt} />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' aria-label='Upload new photo'>
                Upload New Photo
                <input hidden type='file' accept='image/png, image/jpeg' onChange={handleFileInputChange} />
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
                name='category_name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Category Name'
                    placeholder='category Name'
                    error={Boolean(errors.category_name)}
                    helperText={errors.category_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='category_description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Category Description'
                    placeholder='category Description'
                    error={Boolean(errors.category_description)}
                    helperText={errors.category_description?.message}
                  />
                )}
              />
            </Grid>
            {!isAddCategories && (
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='category Slug'
                  placeholder='category Slug'
                  value={categoryData?.category?.category_slug || ''}
                  disabled
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Controller
                name='category_image_alt'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Image Alt'
                    placeholder='Image Alt'
                    error={Boolean(errors.category_image_alt)}
                    helperText={errors.category_image_alt?.message}
                  />
                )}
              />
            </Grid>
            {!isAddCategories && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='product_count'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='number'
                      label='Product Count'
                      placeholder='Product Count'
                      error={Boolean(errors.product_count)}
                      helperText={errors.product_count?.message}
                    />
                  )}
                />
              </Grid>
            )}
            {!isAddCategories && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='status'
                  control={control}
                  defaultValue={categoryData?.category?.status || ''}
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
            )}

            <Grid item xs={12} sm={6}>
              <Controller
                name='category_sort'
                control={control}
                defaultValue={categoryData?.category?.category_sort || ''}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Sorting Order'
                    error={Boolean(errors.category_sort)}
                    helperText={errors.category_sort?.message}
                  >
                    <MenuItem value='featured'>Featured</MenuItem>
                    <MenuItem value='bestselling'>Best Selling</MenuItem>
                    <MenuItem value='pricelowtohigh'>Price low to high</MenuItem>
                    <MenuItem value='pricehightolow'>Price high to low</MenuItem>
                    <MenuItem value='dateoldtonew'> Date old to new</MenuItem>
                    <MenuItem value='datenewtoold'> Date new to old</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <Button variant='contained' disabled>
                  Saving...
                </Button>
              ) : (
                <Button variant='contained' type='submit'>
                  {isAddCategories ? 'Add Categories' : 'Save Changes'}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CategoriesDetailForm
