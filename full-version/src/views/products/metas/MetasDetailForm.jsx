'use client'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, Button, Typography, Grid, Chip, CardHeader } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import { getLocalizedUrl } from '@/utils/i18n'

const MetasDetailForm = ({ isAddMetas }) => {
  const initialFormData = {
    meta_title: '',
    product_title: '',
    meta_description: '',
    key_words: []
  }
  // const [addMeta, setAddMeta] = useState(['one', 'two'])
  const [formData, setFormData] = useState(initialFormData)
  const [keyword, setKeyword] = useState('')
  isAddMetas = true

  // const initialFormData = {
  // meta_title: brandData?.brand?.brand_name || '',
  // product_title: brandData?.brand?.products_count || '',
  // meta_description: brandData?.brand?.brand_description || '',
  // key_words: brandData?.brand?.brand_image_src || []
  // }

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

  // useEffect(() => {
  //   if (brandData) {
  //     reset(initialFormData)
  //   }
  // }, [brandData, reset])

  const { id, lang: locale } = useParams()
  const router = useRouter()

  const handleFormSubmit = async data => {
    console.log('tanveer', data)
    // console.log('yessss', data[key_words])
    console.log('Form Submit called', data.key_words)
    if (formData.key_words.length <= 0) {
      console.log(data.key_words.length <= 0)
      return toast.error('Meta keywords should not be empty')
    }
    try {
      const apiUrl = isAddMetas
        ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/addProductMeta`
        : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/updateProductMeta/${id}`

      const response = await fetchData(apiUrl, isAddMetas ? 'POST' : 'PUT', formData)
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

  const handleDelete = item => {
    console.log(item)
    console.log(formData)
    console.log(formData.key_words.length)

    setFormData(prev => ({
      ...prev,
      key_words: prev.key_words.filter(metu => item !== metu)
    }))
    // const filterMeta = initialFormData.key_words.filter(metu => item != metu)
    // setAddMeta(filterMeta)
  }

  const handleAddMeta = () => {
    console.log('am add meta')
    console.log(keyword)
    // setAddMeta(prev => [...prev, keyword])
    // if (keyword.trim()) {
    setFormData(prev => ({
      ...prev,
      key_words: [...prev.key_words, keyword]
    }))
    setKeyword('')
    console.log(formData)

    // }
  }
  console.log(formData.key_words.length, 'length of meta')
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

                <Grid item xs={12} className='flex justify-center gap-3'>
                  <Grid>
                    <CustomTextField
                      fullWidth
                      label='Meta keywords'
                      placeholder='Meta keywords'
                      value={keyword || ''}
                      onChange={e => setKeyword(e.target.value)}
                    />
                  </Grid>
                  <Grid className='flex items-end'>
                    <Button
                      variant='contained'
                      color='success'
                      disabled={!keyword.trim()}
                      onClick={() => handleAddMeta()}
                    >
                      Add keyword
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title='All Metas' />
                    <CardContent>
                      {formData.key_words.length ? (
                        formData.key_words.map((item, index) => (
                          <Chip key={item} label={item} className='m-1' onDelete={() => handleDelete(item)} />
                        ))
                      ) : (
                        <Typography>No meta</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' type='submit'>
                    {isAddMetas ? 'Add Meta' : 'Save Changes'}
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
