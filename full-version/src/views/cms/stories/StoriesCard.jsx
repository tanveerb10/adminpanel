'use client'
import { Card, Grid, IconButton, MenuItem, Switch } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useSortable } from '@dnd-kit/sortable'
import fetchData from '@/utils/fetchData'
import { useState, useCallback, useRef } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'
import Image from 'next/image'

const useStoriesApi = (_id, fetchStories) => {
  const [loading, setLoading] = useState(false)

  const updateStories = useCallback(
    async updatedData => {
      setLoading(true)
      try {
        const apiUrl = `/admin/cms/updateStorySettings/${_id}`
        const response = await fetchData(apiUrl, 'PUT', updatedData, 'image')

        if (!response.success) {
          toast.error(response.message)
        } else {
          toast.success(response.message || 'Successfully Updated')
          fetchStories()
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [_id, fetchStories]
  )

  const deleteStories = useCallback(async () => {
    setLoading(true)
    try {
      const apiUrl = `/admin/cms/deleteStorySettings/${_id}`
      const response = await fetchData(apiUrl, 'DELETE')

      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.success(response.message || 'Successfully Deleted')
        fetchStories()
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [_id, fetchStories])
  return { updateStories, deleteStories, loading }
}

export default function StoriesCard({ _id, category, redirect_link, enable, categoryData, fetchStories, allImageUrl }) {
  console.log(fetchStories, 'from card')
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })

  const [currentEnabled, setCurrentEnabled] = useState(enable)
  const [link, setLink] = useState({ redirect_link, category })

  const [src, setSrc] = useState({
    imgSrc: allImageUrl?.image_src || '/images/avatars/1.png',
    thumbnailSrc: allImageUrl?.thumbnail_image_src || '/images/avatars/2.png'
  })
  const [selectedFile, setSelectedFile] = useState({ imgSelect: null, thumbnailSelect: null })

  const { updateStories, deleteStories, loading } = useStoriesApi(_id, fetchStories)

  const debounceApi = useCallback(
    debounce(async updatedData => {
      await updateStories(updatedData)
    }, 500),
    [updateStories]
  )

  const handleDelete = async () => {
    await deleteStories()
  }

  const handleSave = () => {
    const formData = new FormData()
    if (selectedFile.imgSelect != null) {
      formData.append('image_src', selectedFile.imgSelect)
    }
    if (selectedFile.thumbnailSelect != null) {
      formData.append('thumbnail_image_src', selectedFile.thumbnailSelect)
    }
    formData.append('redirect_link', link.redirect_link)
    formData.append('category', link.category)
    formData.append('enable', currentEnabled)
    debounceApi(formData)
  }

  const handleToggleSwitch = () => {
    const newEnabledState = !currentEnabled
    setCurrentEnabled(newEnabledState)
    const formData = new FormData()
    formData.append('enable', newEnabledState)
    debounceApi(formData)
  }

  const handleLinkChange = (name, value) => {
    setLink(prev => ({ ...prev, [name]: value }))
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

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        maxWidth: '100%',
        marginBottom: '10px',
        boxSizing: 'border-box'
      }}
      {...attributes}
    >
      <Card className='flex items-center min-h-[70px]'>
        {/* Drag Icon */}
        <div className='flex items-center justify-center w-[40px] h-full'>
          <IconButton {...listeners} size='small' className='cursor-grab'>
            <DragHandleIcon />
          </IconButton>
        </div>
        {/* Card Content */}

        <Grid className='flex items-center w-full max-sm:flex-col'>
          <Grid className='flex max-sm:flex-col my-1 gap-3  '>
            <Grid className='flex flex-col items-center justify-center'>
              <p className='text-center'>Main </p>
              <Image
                height={70}
                width={70}
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
              <p className='text-center'>Thumbnail </p>
              <Image
                height={70}
                width={70}
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

          <Grid className='flex flex-col gap-2 m-2 items-center w-full'>
            <CustomTextField
              placeholder='Redirect link'
              name='redirect_link'
              fullWidth
              onChange={e => handleLinkChange('redirect_link', e.target.value)}
              defaultValue={link.redirect_link}
            />
            <CustomTextField
              placeholder='Category'
              name='category'
              fullWidth
              onChange={e => handleLinkChange('category', e.target.value)}
              defaultValue={link.category}
              select
            >
              {categoryData.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid className='flex flex-col max-sm:flex-row items-end text-end justify-end'>
            <Switch checked={currentEnabled} onChange={handleToggleSwitch} color='primary' size='small' />

            <IconButton onClick={handleSave} size='small' disabled={loading}>
              <i className='tabler-device-floppy text-[22px] text-green-500' />
            </IconButton>

            <IconButton onClick={handleDelete} disabled={loading}>
              <i className='tabler-trash text-[22px] text-Secondary text-red-500' />
            </IconButton>
          </Grid>
        </Grid>

        {/* <Grid className='flex max-sm:flex-col my-1 gap-2 mr-2 items-center'>
            <CustomTextField
              placeholder='Redirect link'
              name='redirect_link'
              fullWidth
              onChange={e => handleLinkChange('redirect_link', e.target.value)}
              defaultValue={link.redirect_link}
            />
            <CustomTextField
              placeholder='Category'
              name='category'
              fullWidth
              onChange={e => handleLinkChange('category', e.target.value)}
              defaultValue={link.category}
              select
            >
              {categoryData.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid> */}
      </Card>
    </div>
  )
}
