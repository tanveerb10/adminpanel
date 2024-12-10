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
import useLocalizedRedirect from '@/utils/useLocalizedRedirect'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { useFeedback } from '@/contexts/FeedbackContext'
import { useParams, useRouter } from 'next/navigation'
import fetchData from '@/utils/fetchData'

const AccountDelete = () => {
  const { showFeedback } = useFeedback()
  const redirect = useLocalizedRedirect()
  const { id } = useParams()
  // States
  const [open, setOpen] = useState(false)
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

  const onSubmit = () => {
    setOpen(true)
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const apiUrl = `/admin/admins/deleteadmin/${id}`
      const response = await fetchData(apiUrl, 'DELETE', {})
      if (response.success) {
        showFeedback('Account deleted successfully.', 'success')
        redirect('admin/adminusers')
      } else {
        throw new Error(response.message || 'Failed to delete admin.')
      }
    } catch (error) {
      showFeedback(error.message || 'An error occurred.', 'error')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader title='Delete Account' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={Boolean(errors.checkbox)} className='is-full mbe-6'>
            <Controller
              name='checkbox'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label='I confirm my account deactivation' />
              )}
            />
            {errors.checkbox && <FormHelperText error>Please confirm you want to delete this account</FormHelperText>}
          </FormControl>
          <Button
            variant='contained'
            color='error'
            type='submit'
            disabled={!checkboxValue}
            onClick={() => handleDelete()}
          >
            {!loading ? 'Deactivate Account' : 'Deactivating....'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDelete
