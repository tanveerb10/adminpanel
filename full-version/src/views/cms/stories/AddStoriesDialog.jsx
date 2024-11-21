'use client'

// React Imports
import { useState } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// MUI Imports
import fetchData from '@/utils/fetchData'
// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, MenuItem } from '@mui/material'
import Loader from '@/libs/components/Loader'

const AddStoriesDialog = ({ open, setOpen, fetchStories, categoryData }) => {
  const [loading, setLoading] = useState(false)
  console.log(categoryData)
  const validationSchema = yup.object({
    stories: yup.array().of(
      yup.object({
        image_link: yup
          .string()
          .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter a valid URL!'
          )
          .required('Image Link is required'),
        redirect_link: yup
          .string()
          .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter a valid URL!'
          )
          .required('Redirect Link is required'),
        thumbnail_image_link: yup
          .string()
          .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter a valid URL!'
          )
          .required('Thumbnail Image Link is required'),
        category: yup.string().required('Category is required')
      })
    )
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { stories: [{ image_link: '', redirect_link: '', thumbnail_image_link: '', category: '' }] }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'stories' })

  const handleClose = () => {
    setOpen(false)
    reset({ stories: [{ image_link: '', redirect_link: '', thumbnail_image_link: '', category: '' }] })
  }

  const onSubmit = async data => {
    setLoading(true)

    const url = '/admin/cms/addStorySettings'
    try {
      const responseData = await fetchData(url, 'POST', { storys: data.stories })
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
        <div className='text-end mr-3'>
          <Button
            variant='tonal'
            onClick={() => append({ image_link: '', redirect_link: '', thumbnail_image_link: '', category: '' })}
          >
            Add Another
          </Button>
        </div>

        <DialogContent>
          {fields.map((item, index) => (
            <Grid key={item.id} container spacing={6}>
              <Grid item xs={12}>
                <div className='flex flex-col gap-2'>
                  <Controller
                    name={`stories.${index}.image_link`}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label={`Image Link ${index + 1}`}
                        variant='outlined'
                        fullWidth
                        placeholder='Enter Image Link'
                        error={!!errors?.stories?.[index]?.image_link}
                        helperText={errors?.stories?.[index]?.image_link?.message}
                      />
                    )}
                  />

                  <Controller
                    name={`stories.${index}.redirect_link`}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Redirect Link'
                        variant='outlined'
                        fullWidth
                        placeholder='Enter Redirect Link'
                        error={!!errors?.stories?.[index]?.redirect_link}
                        helperText={errors?.stories?.[index]?.redirect_link?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`stories.${index}.thumbnail_image_link`}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Thumbnail Image Link'
                        variant='outlined'
                        fullWidth
                        placeholder='Enter Thumbnail Image Link'
                        error={!!errors?.stories?.[index]?.thumbnail_image_link}
                        helperText={errors?.stories?.[index]?.thumbnail_image_link?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`stories.${index}.category`}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label='Category Link'
                        variant='outlined'
                        fullWidth
                        select
                        placeholder='Enter Category Link'
                        error={!!errors?.stories?.[index]?.category}
                        helperText={errors?.stories?.[index]?.category?.message}
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
              {fields.length > 1 && (
                <Grid item xs={12} className='text-center'>
                  <Button
                    variant='outlined'
                    onClick={() => remove(index)}
                    color='error'
                    endIcon={<i className='tabler-trash' />}
                  >
                    Delete
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
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
