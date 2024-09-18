'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import { Controller, useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import PagesDelete from '@/views/cms/pages/PagesDelete'
import AddHeader from '@/libs/components/AddHeader'
const RichTextEditor = dynamic(() => import('@/libs/RichTextEditor'), { ssr: false })

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required')
})

const PagesDetailForm = ({ staticData = {}, isAddStaticPage }) => {
  console.log(staticData, 'datatatatataat inintial')

  const initialValue = {
    title: staticData?.result?.title || '',
    content: staticData?.result?.content || ''
  }
  const id = staticData?.result?._id || ''

  const router = useRouter()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema)
  })

  const baseUrl = process.env.NEXT_PUBLIC_API_URL_LIVE
  const createStatic = `/admin/cms/createStaticPage`
  const updateStatic = `/admin/cms/updateStaticPage/${id}`

  const handleRedirect = () => {
    router.push('/cms/pages')
  }
  const handleSave = async values => {
    console.log('submitted', values)
    try {
      const url = id ? `${baseUrl}${updateStatic}` : `${baseUrl}${createStatic}`
      const method = id ? 'PUT' : 'POST'
      await fetchData(url, method, values)
      toast.success('Page saved successfully')
      handleRedirect()
    } catch (err) {
      toast.error('Error got in submit')
    }
  }
  return (
    <>
      <AddHeader title={id ? 'Edit Static Page' : 'Add Static Page'} />
      <Card>
        <CardHeader title='Static Pages' />
        <CardContent>
          <form onSubmit={handleSubmit(handleSave)}>
            <Grid container spacing={6} className='mbe-6'>
              <Grid item xs={12}>
                <Controller
                  name='title'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label='Title'
                      fullWidth
                      placeholder='Title '
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid className='p-0 border shadow-none' sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <Typography className='mbe-1'>Content</Typography>
                  <Controller
                    name='content'
                    control={control}
                    render={({ field }) => (
                      <RichTextEditor
                        {...field}
                        label
                        onChange={value => {
                          field.onChange(value)
                        }}
                      />
                    )}
                  />
                  {errors.content && <Typography color='error'>{errors.content.message}</Typography>}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained'>
                  Save
                </Button>
              </Grid>
              {!isAddStaticPage && (
                <Grid item xs={12}>
                  <PagesDelete id={id} redirect={handleRedirect} />
                </Grid>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default PagesDetailForm
