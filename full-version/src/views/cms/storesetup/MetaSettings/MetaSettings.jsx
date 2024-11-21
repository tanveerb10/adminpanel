'use client'

import { useState } from 'react'

import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, CardHeader, Grid, MenuItem } from '@mui/material'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

const schema = yup.object().shape({
  metaTitle: yup.string().required('Meta title is required'),
  metaDescription: yup.string().required('Meta description is required'),

  metaKeywords: yup.array().of(yup.string()).min(1, 'At least one meta is required').required('Metas are required')
})

export default function MetaSettings({ getMetaData }) {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      metaTitle: getMetaData?.meta_tags?.title || '',
      metaDescription: getMetaData?.meta_tags?.description || '',
      metaKeywords: getMetaData?.meta_tags?.keywords || []
    }
  })

  const handleOnSubmit = async data => {
    console.log('hello subit')
    console.log('meta submit data', data)
    const formatData = {
      meta_tags: {
        title: data.metaTitle,
        description: data.metaDescription,
        keywords: data.metaKeywords
      }
    }
    console.log(formatData)
    const metaUrl = `/admin/cms/updateTagSettings`
    console.log(metaUrl)
    try {
      setLoading(true)
      console.log('under loading')
      const responseData = await fetchData(metaUrl, 'PUT', formatData)
      if (responseData.success) {
        toast.success(responseData.message || 'Meta Setting Update Successfully')
      } else {
        toast.error(responseData.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card>
      <CardHeader title='Meta Setting' />
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                name='metaTitle'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Meta Title'
                    placeholder='Meta Title'
                    error={Boolean(errors.metaTitle)}
                    helperText={errors.metaTitle?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='metaDescription'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Meta Description'
                    placeholder='Meta Description'
                    error={Boolean(errors.metaDescription)}
                    helperText={errors.metaDescription?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='metaKeywords'
                control={control}
                render={({ field }) => (
                  <CustomCheckboxAutocomplete
                    {...field}
                    fullWidth
                    label='Meta keywords'
                    placeholder='Meta Keywords'
                    onChange={(event, newValue) => {
                      field.onChange(newValue)
                    }}
                    initialOptions={getMetaData?.meta_tags?.keywords || []}
                    error={!!errors.metaKeywords}
                    helperText={errors.metaKeywords ? errors.metaKeywords.message : ''}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant='contained' type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
