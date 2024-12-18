'use client'

// React Imports
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'

// MUI Imports
import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'

import { toast } from 'react-toastify'
import { Dialog, DialogContent, Button, Typography } from '@mui/material'
import Loader from '@/libs/components/Loader'

const AddMediaDialog = ({ open, setOpen }) => {
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const { handleSubmit, reset } = useForm({})

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

    formData.append('other_image_src', selectedFile)

    const url = '/admin/cms/addOtherFiles'
    setLoading(true)
    try {
      const responseData = await fetchData(url, 'POST', formData, 'image')
      if (responseData.success) {
        toast.success('Media added successfully')
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
  console.log('selected file', selectedFile)

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

      <Typography variant='h4' className='flex flex-col gap-2 text-center p-3 sm:pbs-3 sm:pbe-3 sm:pli-5'>
        Add Media
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className='flex max-sm:flex-col items-center gap-6'>
            <img height={150} width={150} className='rounded' src={imgSrc} alt='Profile' />
            <div className='flex flex-col sm:flex-row gap-4'>
              {selectedFile === null ? (
                <Button component='label' variant='tonal' htmlFor='account-settings-upload-image'>
                  Upload
                  <input
                    hidden
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={handleFileInputChange}
                    id='account-settings-upload-image'
                  />
                </Button>
              ) : (
                <>
                  <Button variant='tonal' color='error' onClick={handleFileInputReset}>
                    Reset
                  </Button>
                  <Button variant='tonal' type='submit' disabled={loading}>
                    {loading ? <Loader size={20} /> : 'Submit'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddMediaDialog
