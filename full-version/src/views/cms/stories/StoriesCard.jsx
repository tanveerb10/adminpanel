'use client'
import { Card, IconButton, MenuItem, Switch } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useSortable } from '@dnd-kit/sortable'
import fetchData from '@/utils/fetchData'
import { useState, useCallback } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'

const useStoriesApi = (_id, fetchStories) => {
  const [loading, setLoading] = useState(false)

  const updateStories = useCallback(
    async updatedData => {
      setLoading(true)
      try {
        const apiUrl = `/admin/cms/updateStorySettings/${_id}`
        const response = await fetchData(apiUrl, 'PUT', updatedData)

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

export default function StoriesCard({
  _id,
  image_link,
  thumbnail_image_link,
  category,
  redirect_link,
  enable,
  categoryData,
  fetchStories
}) {
  console.log(fetchStories, 'from card')
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })

  const [currentEnabled, setCurrentEnabled] = useState(enable)
  const [link, setLink] = useState({ image_link, redirect_link, category, thumbnail_image_link })

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
    const updatedData = {
      image_link: link.image_link,
      redirect_link: link.redirect_link,
      thumbnail_image_link: link.thumbnail_image_link,
      category: link.category,
      enable: currentEnabled,
      _id
    }
    debounceApi(updatedData)
  }

  const handleToggleSwitch = () => {
    const newEnabledState = !currentEnabled
    setCurrentEnabled(newEnabledState)
    const updatedData = {
      image_link: link.image_link,
      redirect_link: link.redirect_link,
      thumbnail_image_link: link.thumbnail_image_link,
      category: link.category,
      enable: newEnabledState,
      _id
    }
    debounceApi(updatedData)
  }

  const handleLinkChange = (name, value) => {
    setLink(prev => ({ ...prev, [name]: value }))
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
        <div className='flex-1 flex flex-col justify-center gap-2 my-2'>
          <CustomTextField
            placeholder='Image link'
            name='image_link'
            onChange={e => handleLinkChange('image_link', e.target.value)}
            defaultValue={link.image_link}
          />
          <CustomTextField
            placeholder='Redirect link'
            name='redirect_link'
            onChange={e => handleLinkChange('redirect_link', e.target.value)}
            defaultValue={link.redirect_link}
          />
          <CustomTextField
            placeholder='Thumbnail image link'
            name='thumbnail_image_link'
            onChange={e => handleLinkChange('thumbnail_image_link', e.target.value)}
            defaultValue={link.thumbnail_image_link}
          />
          <CustomTextField
            placeholder='Category'
            name='category'
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
        </div>
        {/* Action Buttons */}
        <div className='flex flex-col items-center justify-center space-x-2 pr-2'>
          {/* <Switch checked={currentEnabled} onChange={handleToggleSwitch} color='primary' size='small' /> */}
          <Switch checked={currentEnabled} onChange={handleToggleSwitch} color='primary' size='small' />

          <IconButton onClick={handleSave} size='small' disabled={loading}>
            <i className='tabler-device-floppy text-[22px] text-green-500' />
          </IconButton>

          <IconButton onClick={handleDelete} disabled={loading}>
            <i className='tabler-trash text-[22px] text-Secondary text-red-500' />
          </IconButton>
        </div>
      </Card>
    </div>
  )
}