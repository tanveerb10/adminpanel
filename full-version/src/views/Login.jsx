'use client'

// React Imports
import { useState } from 'react'
// Next Imports
import Link from 'next/link'
import { useRouter, useParams, useSearchParams } from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Alert from '@mui/material/Alert'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { object, minLength, string, email, strict } from 'valibot'
import classnames from 'classnames'

import { setCookie } from 'cookies-next'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

import CryptoJS from 'crypto-js'

// Secret key
const secret = process.env.NEXT_PUBLIC_SECRET_KEY

// Debugging: Log the secret to ensure it's loaded correctly
console.log('Secret Key:', secret)

// Function to generate nonce
const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()

// Function to generate a timestamp
const generateTimestamp = () => Date.now().toString()

// Function to generate a signature
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

// Styled Custom Components
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const schema = object({
  email: string([minLength(1, 'This field is required'), email('Email is invalid')]),
  password: string([
    minLength(1, 'This field is required'),
    minLength(5, 'Password must be at least 5 characters long')
  ])
})

const Login = ({ mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [sendAlert, setSendAlert] = useState('')

  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login-light-border.png'

  // Hooks
  const searchParams = useSearchParams()
  const router = useRouter()
  const { lang: locale } = useParams()
  const { settings } = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: 'superadmin@livein.in',

      password: 'admin@123'
    }
  })

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  // console.log(token);
  // onSubmit function
  const onSubmit = async ({ email, password }) => {
    const url = `/admin/admins/adminlogin`
    const payloaddata = JSON.stringify({ email, password })
    const nonce = generateNonce()
    const timestamp = generateTimestamp()
    const signature = generateSignature(payloaddata, secret, nonce, timestamp)
    console.log(email, password)
    console.log('payload')
    try {
      // const response = await fetch('/admin/admins/adminlogin', { email, password })
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'livein-key': 'livein-key',
          Nonce: nonce,
          Timestamp: timestamp,
          Signature: signature
        },
        body: payloaddata
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      // Check for access and refresh tokens
      if (data.accessToken && data.refreshToken) {
        setCookie('accessToken', data.accessToken)
        setCookie('refreshToken', data.refreshToken)
        const redirectURL = searchParams.get('redirectTo') ?? '/'

        router.push(getLocalizedUrl(redirectURL, locale))
      } else {
        throw new Error('you are not authenticated')
      }
    } catch (err) {
      setSendAlert(err.message)
    }
  }
  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} alt='character-illustration' />
        {!hidden && <MaskImg alt='mask' src={authBackground} />}
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo />
        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-8 sm:mbs-11 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  autoFocus
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='Enter your email'
                  onChange={e => {
                    field.onChange(e.target.value)
                  }}
                  {...(errors.email && {
                    error: true,
                    helperText: errors?.email?.message
                  })}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Password'
                  placeholder='············'
                  id='login-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  onChange={e => {
                    field.onChange(e.target.value)
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <i className={isPasswordShown ? 'tabler-eye' : 'tabler-eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...(errors.password && { error: true, helperText: errors.password.message })}
                />
              )}
            />
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox defaultChecked />} label='Remember me' />
              <Typography
                className='text-end'
                color='primary'
                component={Link}
                href={getLocalizedUrl('/forgot-password', locale)}
              >
                Forgot password?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>
          </form>
          {sendAlert && <Alert severity='error'>{sendAlert}</Alert>}
        </div>
      </div>
    </div>
  )
}

export default Login
