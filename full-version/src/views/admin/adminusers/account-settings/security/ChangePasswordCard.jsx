'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import fetchData from '@/utils/fetchData'
//Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'

const ChangePasswordCard = ({ adminId, isSuperAdmin }) => {
  // States

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' })

  const validatePassword = () => {
    let valid = true // Track overall validity

    if (newPassword.length < 8) {
      setErrors(prev => ({ ...prev, newPassword: 'Password must be at least 8 characters long.' }))
      valid = false
    } else if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
      setErrors(prev => ({ ...prev, newPassword: 'Password must contain both uppercase and lowercase letters.' }))
      valid = false
    } else if (!/[0-9]/.test(newPassword) && !/[\W_]/.test(newPassword)) {
      setErrors(prev => ({ ...prev, newPassword: 'Password must contain at least one number or symbol.' }))
      valid = false
    } else {
      setErrors(prev => ({ ...prev, newPassword: '' })) // Clear newPassword errors if valid
    }

    if (newPassword !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }))
      valid = false
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' })) // Clear confirmPassword errors if valid
    }

    return valid
  }

  const handleSubmit = async () => {
    console.log(newPassword, 'new password')
    console.log(confirmPassword, 'confirm password')

    if (!validatePassword()) {
      toast.error(errors.newPassword || errors.confirmPassword || 'Validation failed')
      return
    }
    const formatData = {
      adminId: adminId,
      password: newPassword
    }

    const apiUrl = isSuperAdmin
      ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/changepasswordbysuperadmin`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/changepasswordbySelf`

    try {
      setLoading(true)
      const response = await fetchData(apiUrl, 'PUT', formatData)
      if (response.success || response.status) {
        if (isSuperAdmin) {
          toast.success('Admin password updated successfully!')
        } else {
          toast.success('Your password updated successfully!')
        }
      } else {
        toast.error('Unsuccessful to update password')
      }
    } catch (err) {
      toast.error(`Error submitting data: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }
  const togglePasswordVisibility = field => {
    setShowPassword(prevState => ({
      ...prevState,
      [field]: !prevState[field]
    }))
  }
  return (
    <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='New Password'
              type={showPassword.newPassword ? 'text' : 'password'}
              placeholder='············'
              value={newPassword}
              onChange={e => {
                setNewPassword(e.target.value)
                setErrors(prev => ({ ...prev, newPassword: '' }))
              }}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => togglePasswordVisibility('newPassword')}
                      aria-label='toggle password visibility'
                    >
                      <i className={showPassword.newPassword ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Confirm New Password'
              type={showPassword.confirmPassword ? 'text' : 'password'}
              placeholder='············'
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value)
                setErrors(prev => ({ ...prev, confirmPassword: '' }))
              }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      aria-label='toggle confirm password visibility'
                    >
                      <i className={showPassword.confirmPassword ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} className='flex flex-col gap-4'>
            <Typography variant='h6'>Password Requirements:</Typography>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-2.5'>
                <i className='tabler-circle-filled text-[8px]' />
                Minimum 8 characters long - the more, the better
              </div>
              <div className='flex items-center gap-2.5'>
                <i className='tabler-circle-filled text-[8px]' />
                At least one lowercase & one uppercase character
              </div>
              <div className='flex items-center gap-2.5'>
                <i className='tabler-circle-filled text-[8px]' />
                At least one number, symbol, or whitespace character
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className='flex gap-4'>
            <Button variant='contained' onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant='tonal'
              type='reset'
              color='secondary'
              onClick={() => {
                setNewPassword('')
                setConfirmPassword('')
                setErrors({ newPassword: '', confirmPassword: '' })
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
