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

const MetasDetailForm = ({ isAddMetas, id, metaData }) => {
  console.log(metaData.meta_title, 'id from form ')
  console.log(metaData, 'metaData from form ')

  const [keyword, setKeyword] = useState('')
  isAddMetas ? console.log('is Add meta') : console.log('is edit meta')

  const { lang: locale } = useParams()
  const router = useRouter()

  const validationSchema = yup.object().shape({
    meta_title: yup.string().required('Meta name is required'),
    meta_description: yup.string().required('Meta description is required')
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      meta_title: '',
      meta_description: '',
      key_words: [],
      product_id: id
    }
  })

  useEffect(() => {
    if (metaData) {
      reset({
        meta_title: metaData.meta_title || '',
        meta_description: metaData.meta_description || '',
        key_words: metaData.key_words || [],
        product_id: id
      })
    }
  }, [metaData, reset, id])

  const handleFormSubmit = async data => {
    console.log('tanveer', data)
    console.log('Form Submit called', data.key_words)
    if (data.key_words.length <= 0) {
      console.log(data.key_words.length <= 0)
      return toast.error('Meta keywords should not be empty')
    }
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/addProductMeta`

      const response = await fetchData(apiUrl, 'POST', data)
      console.log('API Response:', response)

      if (response.success) {
        toast.success(response.message)
        router.push(getLocalizedUrl(`/products/metas`, locale))
      } else {
        toast.error(response.message)
        console.error(response, 'else error')
      }
    } catch (error) {
      console.error('API Error:', error.message, 'catch error')
      toast.error(error.message || 'An Error occurred')
    }
  }

  const handleDelete = item => {
    console.log(item)
    const currentKeywords = watch('key_words')
    setValue(
      'key_words',
      currentKeywords.filter(metu => item !== metu)
    )
  }

  const handleAddMeta = () => {
    console.log('am add meta')
    console.log(keyword)
    const currentKeywords = watch('key_words')

    if (keyword.trim() && !currentKeywords.includes(keyword.trim())) {
      const updatedKeywords = [...currentKeywords, keyword.trim()]
      setValue('key_words', updatedKeywords)
      setKeyword('')
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
                        onChange={e => setValue('meta_title', e.target.value)}
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
                        onChange={e => setValue('meta_description', e.target.value)}
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
                      {watch('key_words').length ? (
                        watch('key_words').map((item, index) => (
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
