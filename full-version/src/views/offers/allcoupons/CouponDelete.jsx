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

const CouponDelete = ({ id, status }) => {
  const { showFeedback } = useFeedback()
  // const { id } = useParams()
  const router = useRouter()
  // States
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

  const onSubmit = async () => {
    if (!checkboxValue) return

    setLoading(true)
    try {
      const apiUrl = status
        ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/coupons/deactivatecoupon/${id}`
        : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/coupons/activatecoupon/${id}`
      const response = await fetchData(apiUrl, 'POST', {})
      if (response.success) {
        showFeedback(`Coupon ${status ? 'deactivated' : 'activated'} successfully.`, 'success')
        router.push('/offers/allcoupons')
      } else {
        throw new Error(response.message || 'Failed to process coupon request.')
      }
    } catch (error) {
      showFeedback(error.message || 'An error occurred.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title={status ? 'Deactivate Coupon' : 'Activate Coupon'} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={Boolean(errors.checkbox)} className='is-full mbe-6'>
            <Controller
              name='checkbox'
              control={control}
              rules={{ required: true }}
              render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label='I confirm my action' />}
            />
            {errors.checkbox && <FormHelperText error>Please confirm you want to proceed</FormHelperText>}
          </FormControl>

          <Button
            variant='contained'
            color={status ? 'error' : 'success'}
            type='submit'
            disabled={!checkboxValue || loading}
          >
            {loading
              ? status
                ? 'Deactivating....'
                : 'Activating....'
              : status
                ? 'Deactivate Coupon'
                : 'Activate Coupon'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CouponDelete
