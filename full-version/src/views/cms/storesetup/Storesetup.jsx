'use client'

// React Imports
import { useState, useEffect } from 'react'

// Hooks
import { useForm, Controller } from 'react-hook-form'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { Typography } from '@mui/material'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

const Storesetup = () => {
  const {
    control: storeControl,
    handleSubmit: handleStoreSubmit,
    formState: { errors: storeErrors },
    reset: resetStoreForm
  } = useForm()

  const {
    control: legalControl,
    handleSubmit: handleLegalSubmit,
    formState: { errors: legalErrors },
    reset: resetLegalForm
  } = useForm()

  // States
  const [formData, setFormData] = useState({
    storeName: '',
    storeEmail: '',
    storePhoneNumber: '',
    storeAddress: '',
    legalName: '',
    legalEmail: '',
    legalPhoneNumber: '',
    legalAddress: ''
  })

  const [storeEditable, setStoreEditable] = useState(false)
  const [storeSubmitDisabled, setStoreSubmitDisabled] = useState(true)

  const [legalEditable, setLegalEditable] = useState(false)
  const [legalSubmitDisabled, setLegalSubmitDisabled] = useState(true)

  // Hooks
  useEffect(() => {
    // Simulate fetching data from the database
    const fetchData = async () => {
      const data = await fakeApiCall()

      setFormData(data)
      resetStoreForm(data) // Reset the form with fetched data
      resetLegalForm(data) // Reset the form with fetched data
    }

    fetchData()
  }, [resetStoreForm, resetLegalForm])

  const fakeApiCall = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          storeAddress: '123 Main St',
          storeEmail: 'store@example.com',
          storeName: 'John',
          storePhoneNumber: '1234567890',
          legalAddress: '235 Anderi',
          legalEmail: 'legal@example.com',
          legalPhoneNumber: '1234567890',
          legalName: 'Livein'
        })
      }, 5000)
    })
  }

  const onSubmitStore = data => {
    console.log('Store submitted:', data)
    setStoreEditable(false) 
    setStoreSubmitDisabled(true)
  }

  const onSubmitLegal = data => {
    console.log('Legal submitted:', data)
    setLegalEditable(false)
    setLegalSubmitDisabled(true)
  }

  const handleEditStore = () => {
    if (storeEditable) {
      setStoreEditable(false);
      setStoreSubmitDisabled(true);
    } else {
      setStoreEditable(true);
      setStoreSubmitDisabled(false);
    }
  };

  const handleEditLegal = () => {
    if (legalEditable) {
      setLegalEditable(false);
      setLegalSubmitDisabled(true);
    } else {
      setLegalEditable(true);
      setLegalSubmitDisabled(false);
    }
  };

  return (
    <div className='flex flex-col  gap-4'>
      <Card>
        <CardHeader title='Store Details' />
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px', paddingTop: '16px' }}>
          <Typography variant='h6' className='cursor-pointer' onClick={handleEditStore}>
            {storeEditable?"Close":"Edit"}
          </Typography>
        </div>
        <CardContent>
          <form onSubmit={handleStoreSubmit(onSubmitStore)}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Controller
                  name='storeName'
                  control={storeControl}
                  defaultValue={formData.storeName}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Store Name'
                      placeholder='John Doe'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-user' />
                          </InputAdornment>
                        ),
                        readOnly: !storeEditable
                      }}
                      error={Boolean(storeErrors.storeName)}
                      helperText={storeErrors.storeName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='storeEmail'
                  control={storeControl}
                  defaultValue={formData.storeEmail}
                  rules={{
                    required: 'This field is required',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Enter a valid email'
                    }
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='email'
                      label='Store Email'
                      placeholder='store@example.com'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-mail' />
                          </InputAdornment>
                        ),
                        readOnly: !storeEditable
                      }}
                      error={Boolean(storeErrors.storeEmail)}
                      helperText={storeErrors.storeEmail?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='storePhoneNumber'
                  control={storeControl}
                  defaultValue={formData.storePhoneNumber}
                  rules={{
                    required: 'This field is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Enter a valid phone number'
                    },
                    minLength: {
                      value: 10,
                      message: 'Phone number must be exactly 10 digits'
                    },
                    maxLength: {
                      value: 10,
                      message: 'Phone number must be exactly 10 digits'
                    }
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Store Phone No.'
                      placeholder='1234567890'
                      type='text'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-phone' />
                          </InputAdornment>
                        ),
                        readOnly: !storeEditable
                      }}
                      error={Boolean(storeErrors.storePhoneNumber)}
                      helperText={storeErrors.storePhoneNumber?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='storeAddress'
                  control={storeControl}
                  defaultValue={formData.storeAddress}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      label='Store Address'
                      placeholder='123 Main St'
                      sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-message' />
                          </InputAdornment>
                        ),
                        readOnly: !storeEditable
                      }}
                      error={Boolean(storeErrors.storeAddress)}
                      helperText={storeErrors.storeAddress?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' type='submit' disabled={storeSubmitDisabled}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title='Billing Information' />
        <Divider />

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '16px', paddingTop: '16px' }}>
          <Typography variant='h6' className='cursor-pointer' onClick={handleEditLegal}>
           {legalEditable?"Close":"Edit"}
          </Typography>
        </div>
        <CardContent>
          <form onSubmit={handleLegalSubmit(onSubmitLegal)}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Controller
                  name='legalName'
                  control={legalControl}
                  defaultValue={formData.legalName}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Legal Business Name'
                      placeholder='Legal Business Name'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-user' />
                          </InputAdornment>
                        ),
                        readOnly: !legalEditable
                      }}
                      error={Boolean(legalErrors.legalName)}
                      helperText={legalErrors.legalName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='legalEmail'
                  control={legalControl}
                  defaultValue={formData.legalEmail}
                  rules={{
                    required: 'This field is required',
                    pattern: {
                      value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Enter a valid email'
                    }
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      type='email'
                      label='Legal Email'
                      placeholder='legal@example.com'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-mail' />
                          </InputAdornment>
                        ),
                        readOnly: !legalEditable
                      }}
                      error={Boolean(legalErrors.legalEmail)}
                      helperText={legalErrors.legalEmail?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='legalPhoneNumber'
                  control={legalControl}
                  defaultValue={formData.legalPhoneNumber}
                  rules={{
                    required: 'This field is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Enter a valid phone number'
                    },
                    minLength: {
                      value: 10,
                      message: 'Phone number must be exactly 10 digits'
                    },
                    maxLength: {
                      value: 10,
                      message: 'Phone number must be exactly 10 digits'
                    }
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Legal Phone No.'
                      placeholder='1234567890'
                      type='text'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-phone' />
                          </InputAdornment>
                        ),
                        readOnly: !legalEditable
                      }}
                      error={Boolean(legalErrors.legalPhoneNumber)}
                      helperText={legalErrors.legalPhoneNumber?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name='legalAddress'
                  control={legalControl}
                  defaultValue={formData.legalAddress}
                  rules={{ required: 'This field is required' }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      rows={4}
                      multiline
                      label='Legal Address'
                      placeholder='Legal Address'
                      sx={{ '& .MuiInputBase-root.MuiFilledInput-root': { alignItems: 'baseline' } }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <i className='tabler-message' />
                          </InputAdornment>
                        ),
                        readOnly: !legalEditable
                      }}
                      error={Boolean(legalErrors.legalAddress)}
                      helperText={legalErrors.legalAddress?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' type='submit' disabled={legalSubmitDisabled}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Storesetup
