'use client'
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, Button, Typography, Grid, MenuItem, Chip } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import { getLocalizedUrl } from '@/utils/i18n'

const MetasDetailForm = ({ isAddProduct, brandData }) => {
  isAddProduct = true

  const initialFormData = {
    meta_title: brandData?.brand?.brand_name || '',
    product_title: brandData?.brand?.products_count || '',
    meta_description: brandData?.brand?.brand_description || '',
    key_words: brandData?.brand?.brand_image_src || []
  }

  const validationSchema = yup.object().shape({
    meta_title: yup.string().required('Meta name is required'),
    product_title: yup.string().required('Product title is required'),
    meta_description: yup.string().required('Meta description is required')
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

  const { id, lang: locale } = useParams()
  const router = useRouter()

  const handleFormSubmit = async data => {
    console.log('tanveer')
    console.log('Form Submit called', data)

    try {
      const apiUrl = isAddProduct
        ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/addProductMeta`
        : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/updateProductMeta/${id}`

      const response = await fetchData(apiUrl, isAddProduct ? 'POST' : 'PUT')
      console.log('API Response:', response)

      if (!response.success) {
        console.log('error response', response.message)
        toast.error(response.message)
      }
      if (response.success) {
        setTimeout(() => router.push(getLocalizedUrl(`/products/metas`, locale)), 3000)
        return toast.success(response.message)
      }
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
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
                    name='meta_title'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Meta Name'
                        placeholder='Meta Name'
                        error={Boolean(errors.meta_title)}
                        helperText={errors.meta_title?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='product_title'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Product Title'
                        placeholder='Product Title'
                        error={Boolean(errors.product_title)}
                        helperText={errors.product_title?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='meta_description'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        multiline
                        maxRows={4}
                        label='Meta Description'
                        placeholder='Meta Description'
                        error={Boolean(errors.meta_description)}
                        helperText={errors.meta_description?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  {/* <Controller
                    name='key_words'
                    control={control}
                    render={({ field }) => ( */}
                  <CustomTextField
                    // {...field}
                    fullWidth
                    multiline
                    maxRows={4}
                    label='Meta keywords'
                    placeholder='Meta keywords'
                    // error={Boolean(errors.brand_description)}
                    // helperText={errors.brand_description?.message}
                  >
                    <Chip />
                  </CustomTextField>
                  {/* )}
                  /> */}
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    {isAddProduct ? 'Add Meta' : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MetasDetailForm
