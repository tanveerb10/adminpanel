'use client'
import { Card, IconButton, Switch } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useSortable } from '@dnd-kit/sortable'
import fetchData from '@/utils/fetchData'
import { useState, useCallback } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'

const useSearchApi = (_id, fetchSearch) => {
  const [loading, setLoading] = useState(false)

  const updateSearch = useCallback(
    async updatedData => {
      setLoading(true)
      try {
        const apiUrl = `/admin/cms/updateSearchSettings/${_id}`
        const response = await fetchData(apiUrl, 'PUT', updatedData)

        if (!response.success) {
          toast.error(response.message)
        } else {
          toast.success(response.message || 'Successfully Updated')
          fetchSearch()
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [_id, fetchSearch]
  )

  const deleteSearch = useCallback(async () => {
    setLoading(true)
    try {
      const apiUrl = `/admin/cms/deleteSearchSettings/${_id}`
      const response = await fetchData(apiUrl, 'DELETE')

      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.success(response.message || 'Successfully Deleted')
        fetchSearch()
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [_id, fetchSearch])
  return { updateSearch, deleteSearch, loading }
}

export default function SearchCard({
  _id,
  title,
  enable,

  fetchSearch
}) {
  console.log(fetchSearch, 'from card')
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })

  const [currentEnabled, setCurrentEnabled] = useState(enable)
  const [link, setLink] = useState({ title })

  const { updateSearch, deleteSearch, loading } = useSearchApi(_id, fetchSearch)

  const debounceApi = useCallback(
    debounce(async updatedData => {
      await updateSearch(updatedData)
    }, 500),
    [updateSearch]
  )

  const handleDelete = async () => {
    await deleteSearch()
  }

  const handleSave = () => {
    const updatedData = {
      title: link.title,

      enable: currentEnabled,
      _id
    }
    debounceApi(updatedData)
  }

  const handleToggleSwitch = () => {
    const newEnabledState = !currentEnabled
    setCurrentEnabled(newEnabledState)
    const updatedData = {
      title: link.title,

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
            name='title'
            onChange={e => handleLinkChange('title', e.target.value)}
            defaultValue={link.title}
          />
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
