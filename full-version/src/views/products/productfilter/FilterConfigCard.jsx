'use client'
import { Card, CardContent, CardHeader, IconButton, Switch, Typography } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import EditIcon from '@mui/icons-material/Edit'
import { useSortable } from '@dnd-kit/sortable'
import fetchData from '@/utils/fetchData'
import { useState, useCallback } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'

export default function FilterConfigCard({ _id, fieldName, fieldType, position, enabled, displayName }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })
  const [edit, setEdit] = useState(false)
  const [currentName, setCurrentName] = useState(displayName)
  const [currentEnabled, setCurrentEnabled] = useState(enabled)

  const debounceApi = useCallback(
    debounce(async updatedData => {
      try {
        const apiUrl = '/admin/filters/UpdateFilterConfig'

        const response = await fetchData(apiUrl, 'POST', updatedData)
        console.log('API Response:', response)

        if (!response.success) {
          console.log('error response', response.message)
          toast.error(response.message)
        }
        if (response.success) {
          return toast.success(response.message || 'SuccessFully Updated')
        }
      } catch (error) {
        console.error('API Error:', error)
        toast.error(error.message || 'An Error occurred')
      }
    }, 500),
    []
  )

  const handleSave = () => {
    setEdit(false)
    const updatedData = {
      fields: [
        {
          displayName: currentName,
          enabled: currentEnabled,
          fieldName,
          fieldType,
          _id
        }
      ]
    }

    debounceApi(updatedData)
  }

  const handleToggleSwitch = async () => {
    const newEnabledState = !currentEnabled
    setCurrentEnabled(newEnabledState)

    const updatedData = {
      fields: [
        {
          displayName: currentName,
          enabled: newEnabledState,
          fieldType,
          fieldName,
          _id
        }
      ]
    }

    try {
      await debounceApi(updatedData)
      setCurrentEnabled(newEnabledState)
    } catch (error) {
      console.error('Error toggling switch:', error)
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
          <IconButton {...listeners} aria-label={`Drag ${fieldName}`} size='small' className='cursor-grab'>
            <DragHandleIcon />
          </IconButton>
        </div>
        {/* Card Content */}
        <div className='flex-1 flex flex-col justify-center px-3'>
          <Typography variant='h6' className='font-bold'>
            {!edit ? (
              currentName
            ) : (
              <CustomTextField placeholder='Edit' value={currentName} onChange={e => setCurrentName(e.target.value)} />
            )}
          </Typography>
          <Typography variant='body2'>
            Type {fieldType} - Position {position}
          </Typography>
        </div>
        {/* Action Buttons */}
        <div className='flex items-center space-x-2 pr-2'>
          {!edit ? (
            <IconButton onClick={() => setEdit(true)} size='small'>
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleSave} size='small'>
              <SaveAsIcon />
            </IconButton>
          )}
          <Switch
            checked={currentEnabled}
            onChange={handleToggleSwitch}
            color='primary'
            size='small'
            inputProps={{
              'aria-label': `${fieldName} toggle`,
              'aria-labelledby': `${fieldName} switch`,
              'aria-describedby': `Enable or disable ${fieldName}`
            }}
          />
        </div>
      </Card>
    </div>
  )
}
