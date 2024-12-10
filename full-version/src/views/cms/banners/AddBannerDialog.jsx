'use client'

// React Imports
import { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material'
import Loader from '@/libs/components/Loader'

const AddBannerDialog = ({ open, setOpen, fetchBanner }) => {
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const validationSchema = yup.object({
    redirect_link: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter a valid URL!'
      )
      .required('Redirect Link is required')
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { redirect_link: '' }
  })

  const handleClose = () => {
    setOpen(false)
    handleFileInputReset()
    reset()
  }

  const onSubmit = async data => {
    if (!selectedFile) {
      toast.error('Image is required')
      return
    }

    const formData = new FormData()

    formData.append('redirect_link', data.redirect_link)
    formData.append('banner_image_src', selectedFile)

    const url = '/admin/cms/addBannerSettings'
    setLoading(true)
    try {
      const responseData = await fetchData(url, 'POST', formData, 'image')
      if (responseData.success) {
        toast.success('Banner added successfully')
        fetchBanner()
        handleFileInputReset()
      }
      if (!responseData.success) {
        console.log(responseData.message, 'fail response')
        throw new Error(responseData.message || 'Something went wrong')
      }
    } catch (err) {
      toast.error(err?.message || 'An unexpected error occurred')
      console.log(err)
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  const handleFileInputChange = useCallback(event => {
    const file = event.target.files[0]
    if (file) {
      // if (file.size > 800 * 1024) {
      //   toast.error('File size should not exceed 800KB')
      //   return
      // }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Invalid file type. Only JPG and PNG are allowed.')
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = e => setImgSrc(e.target.result)
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileInputReset = () => {
    setImgSrc('/images/avatars/1.png')
    setSelectedFile(null)
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      aria-labelledby='add-banner-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Banner
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <div className='flex max-sm:flex-col items-center gap-6'>
                <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
                <div className='flex flex-grow flex-col gap-4'>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        accept='image/png, image/jpeg'
                        onChange={handleFileInputChange}
                        id='account-settings-upload-image'
                      />
                    </Button>
                    <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={`redirect_link`}
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label='Redirect Link'
                    variant='outlined'
                    fullWidth
                    placeholder='Enter Redirect Link'
                    error={!!errors?.redirect_link}
                    helperText={errors?.redirect_link?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' disabled={loading}>
            {loading ? <Loader size={20} /> : 'Submit'}
          </Button>
          <Button variant='tonal' type='button' color='secondary' onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddBannerDialog
