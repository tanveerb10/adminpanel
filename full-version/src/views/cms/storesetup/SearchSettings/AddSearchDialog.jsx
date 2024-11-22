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
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material'
import Loader from '@/libs/components/Loader'

const AddSearchDialog = ({ open, setOpen, fetchSearch }) => {
  const [loading, setLoading] = useState(false)

  const validationSchema = yup.object({
    search: yup.array().of(
      yup.object({
        title: yup.string().required('Title is required')
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
    defaultValues: { search: [{ title: '' }] }
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'search' })

  const handleClose = () => {
    setOpen(false)
    reset({ titles: [{ title: '' }] })
  }

  const onSubmit = async data => {
    setLoading(true)

    const url = '/admin/cms/addSearchSettings'
    try {
      const responseData = await fetchData(url, 'POST', { titles: data.search })
      if (responseData.success) {
        toast.success('Search added successfully')
        fetchSearch()
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
      aria-labelledby='add-search-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Search
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-end mr-3'>
          <Button variant='tonal' onClick={() => append({ title: '' })}>
            Add Another
          </Button>
        </div>

        <DialogContent>
          {fields.map((item, index) => (
            <Grid key={item.id} container spacing={6}>
              <Grid item xs={12}>
                <div className='flex flex-col gap-2'>
                  <Controller
                    name={`search.${index}.title`}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        label={`Image Link ${index + 1}`}
                        variant='outlined'
                        fullWidth
                        placeholder='Enter Search Keyword'
                        error={!!errors?.search?.[index]?.title}
                        helperText={errors?.search?.[index]?.title?.message}
                      />
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

export default AddSearchDialog
