'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports

import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem } from '@mui/material'
import Loader from '@/libs/components/Loader'

const TagsDetailForm = ({ open, setOpen, isEdit, tagId, fetchTags }) => {
  console.log(typeof fetchTags, 'top dialog')
  const validationSchema = yup.object().shape({
    tag_name: yup.string().required('Tag Name is required')
    // slug: yup.string().required('Tag Slug is required')
  })

  const [tagData, setTagData] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [deleteValue, setDeleteValue] = useState('no')

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tag_name: tagData?.tag_name || '',
      slug: tagData?.slug || ''
    }
  })

  useEffect(() => {
    reset({
      tag_name: tagData?.tag_name || '',
      slug: tagData?.slug || ''
    })
  }, [tagData, reset])

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  useEffect(() => {
    if (open && isEdit && tagId) {
      const fetchTagData = async () => {
        setLoadingData(true)
        try {
          const getTagUrl = `/admin/tags/${tagId}`
          const response = await fetchData(getTagUrl, 'GET')

          setTagData(response.tag)
        } catch (error) {
          toast.error('Error fetching tags')
        } finally {
          setLoadingData(false)
        }
      }
      fetchTagData()
    }
  }, [open, isEdit, tagId])
  console.log(tagData, 'tag data dialog')
  const onSubmit = async data => {
    setLoading(true)

    console.log(data, 'payload data')

    const createTagUrl = `/admin/tags/createTag`
    const updateTagUrl = `/admin/tags/updateTag/${tagId}`

    const url = isEdit ? updateTagUrl : createTagUrl
    const method = isEdit ? 'PUT' : 'POST'
    try {
      const responseData = await fetchData(url, method, data)
      if (responseData.success) {
        toast.success(`Tag ${isEdit ? 'updated' : 'added'} successfully`)
        await fetchTags()
        console.log(typeof fetchTags, 'typpe of')
        handleClose()
        // isEdit ? taxOverrideApi() : taxApi()
      }
      if (!responseData.success) {
        console.log(responseData.message, 'fail response')
        throw new Error('Something went wrong' || responseData.message)
      }
    } catch (err) {
      toast.error(err.message || 'An error occurred')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  if (loadingData) {
    return <Loader />
  }
  const handleChange = e => {
    setDeleteValue(e.target.value)
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      const deleteTagUrl = `/admin/tags/deleteTag/${tagId}`
      const responseData = await fetchData(deleteTagUrl, 'DELETE')
      if (responseData.success) {
        toast.success(`Tag delete successfully`)
        fetchTags()
      }
      if (!responseData.success) {
        console.log(responseData.message, 'fail response')
        throw new Error(responseData.message || 'Something went wrong')
      }
    } catch (err) {
      toast.error(err.message || 'An Error occurred')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {isEdit ? `Edit Tag` : 'Add Tag'}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
          <Controller
            name='tag_name'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Tag Name'
                variant='outlined'
                fullWidth
                placeholder='Enter Tag Name'
                margin='normal'
                error={!!errors.tag_name}
                helperText={errors.tag_name?.message}
              />
            )}
          />
          {isEdit && (
            <>
              <Controller
                name='slug'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    label='Tag Slug'
                    variant='outlined'
                    fullWidth
                    placeholder='Enter Tag Slug'
                    margin='normal'
                    // error={!!errors.slug}
                    // helperText={errors.slug?.message}
                  />
                )}
              />
              <CustomTextField
                label='Tag Delete'
                variant='outlined'
                fullWidth
                select
                value={deleteValue}
                onChange={handleChange}
              >
                <MenuItem value='yes'>Yes</MenuItem>
                <MenuItem value='no'>No</MenuItem>
              </CustomTextField>
            </>
          )}
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          {deleteValue === 'yes' ? (
            <Button variant='tonal' type='button' color='error' onClick={handleDelete} disabled={loading}>
              Delete
            </Button>
          ) : (
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? <Loader size={20} /> : 'Submit'}
            </Button>
          )}
          <Button variant='tonal' type='button' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default TagsDetailForm
