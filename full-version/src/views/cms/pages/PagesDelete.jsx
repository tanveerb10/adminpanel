'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useFeedback } from '@/contexts/FeedbackContext'
import { useParams, useRouter } from 'next/navigation'
import fetchData from '@/utils/fetchData'

const PagesDelete = ({ id, redirect }) => {
  const { showFeedback } = useFeedback()
  // const { id } = useParams()
  const router = useRouter()
  // States
  // const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Hooks
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  // Vars
  const checkboxValue = watch('checkbox')

  // const onSubmit = () => {
  //   setOpen(true)
  // }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/cms/deleteStaticPage/${id}`
      const response = await fetchData(apiUrl, 'DELETE')
      if (response.success) {
        showFeedback('Page deleted successfully.', 'success')
        // router.push('/cms/pages')
        // router.push(getLocalizedUrl(`/cms/pages/addnewstaticpage`, locale))
        redirect()
      } else {
        throw new Error(response.message || 'Failed to delete page.')
      }
    } catch (error) {
      showFeedback(error.message || 'An error occurred.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title='Static Pages' />
      <CardContent>
        <form>
          <FormControl error={Boolean(errors.checkbox)} className='is-full mbe-6'>
            <Controller
              name='checkbox'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label='I confirm to delete page ' />
              )}
            />
            {errors.checkbox && <FormHelperText error>Please confirm you want to delete this page</FormHelperText>}
          </FormControl>
          <Button
            variant='contained'
            color='error'
            type='submit'
            disabled={!checkboxValue}
            onClick={() => handleDelete()}
          >
            {!loading ? 'Delete Page' : 'Deleting....'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default PagesDelete
