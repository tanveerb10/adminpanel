'use client'

// React Imports
import { useCallback, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// MUI Imports
import fetchData from '@/utils/fetchData'
// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, MenuItem, Typography } from '@mui/material'
import Loader from '@/libs/components/Loader'
import Image from 'next/image'

const AddStoriesDialog = ({ open, setOpen, fetchStories, categoryData }) => {
  const [loading, setLoading] = useState(false)

  const [src, setSrc] = useState({
    imgSrc: '/images/avatars/1.png',
    thumbnailSrc: '/images/avatars/2.png'
  })
  const [selectedFile, setSelectedFile] = useState({ imgSelect: null, thumbnailSelect: null })

  const validationSchema = yup.object({
    redirect_link: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter a valid URL!'
      )
      .required('Redirect Link is required'),

    category: yup.string().required('Category is required')
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { redirect_link: '', category: '' }
  })

  const handleClose = () => {
    setOpen(false)
    reset({ redirect_link: '', category: '' })
    setSelectedFile({ imgSelect: null, thumbnailSelect: null })
    setSrc({
      imgSrc: '/images/avatars/1.png',
      thumbnailSrc: '/images/avatars/2.png'
    })
    setLoading(false)
  }

  const mainFileInputRef = useRef(null)
  const thumbnailFileInputRef = useRef(null)

  const handleFileInputChange = useCallback((event, type) => {
    const file = event.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Invalid file type. Only JPG and PNG are allowed.')
        return
      }

      const reader = new FileReader()
      reader.onload = e => {
        setSrc(prev => ({ ...prev, [`${type}Src`]: e.target.result }))
      }
      reader.readAsDataURL(file)

      setSelectedFile(prev => ({ ...prev, [`${type}Select`]: file }))
    }
  }, [])

  const handleImageClick = type => {
    if (type === 'imgSrc') {
      mainFileInputRef.current.click()
    } else {
      thumbnailFileInputRef.current.click()
    }
  }

  const onSubmit = async data => {
    console.log('datatatata', data)

    if (!selectedFile.imgSelect == null || selectedFile.thumbnailSelect == null) {
      toast.error('Image is required')
      return
    }

    setLoading(true)

    const formData = new FormData()

    formData.append('image_src', selectedFile.imgSelect)
    formData.append('thumbnail_image_src', selectedFile.thumbnailSelect)
    formData.append('redirect_link', data.redirect_link)
    formData.append('category', data.category)

    const url = '/admin/cms/addStorySettings'
    try {
      const responseData = await fetchData(url, 'POST', formData, 'image')
      if (responseData.success) {
        toast.success('Stories added successfully')
        fetchStories()
      }
      if (!responseData.success) {
        console.log(responseData.message, 'fail response')
        throw new Error('Something went wrong' || responseData.message)
      }
    } catch (err) {
      toast.error(err)
      console.log(err)
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      aria-labelledby='add-story-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Stories
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Grid className='flex justify-center max-sm:flex-col my-1 gap-5 items-center'>
                <Grid className='flex flex-col items-center justify-center'>
                  <p className='text-center'>Main Image</p>
                  <Image
                    height={100}
                    width={100}
                    className='rounded'
                    src={src.imgSrc}
                    alt='Main image'
                    onClick={() => handleImageClick('imgSrc')}
                  />
                  <input
                    hidden
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={e => handleFileInputChange(e, 'img')}
                    ref={mainFileInputRef}
                  />
                </Grid>
                <Grid className='flex flex-col items-center justify-center'>
                  <p className='text-center'>Thumbnail Image</p>
                  <Image
                    height={100}
                    width={100}
                    className='rounded'
                    src={src.thumbnailSrc}
                    alt='Thumbnail image'
                    onClick={() => handleImageClick('thumbnailSrc')}
                  />
                  <input
                    hidden
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={e => handleFileInputChange(e, 'thumbnail')}
                    ref={thumbnailFileInputRef}
                  />
                </Grid>
              </Grid>

              <div className='flex flex-col gap-2'>
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

                <Controller
                  name={`category`}
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label='Category Link'
                      variant='outlined'
                      fullWidth
                      select
                      placeholder='Enter Category Link'
                      error={!!errors?.category}
                      helperText={errors?.category?.message}
                    >
                      {categoryData.map(item => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </div>
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

export default AddStoriesDialog
