'use client'

import { Card, IconButton, Switch, Button } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useSortable } from '@dnd-kit/sortable'
import fetchData from '@/utils/fetchData'
import { useState, useCallback, useRef } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'
import Image from 'next/image'

const useBannerApi = (_id, fetchBanner) => {
  const [loading, setLoading] = useState(false)

  const updateBanner = useCallback(
    async updatedData => {
      setLoading(true)
      console.log('update data ', updatedData)
      try {
        const apiUrl = `/admin/cms/updateBannerSettings/${_id}`
        const response = await fetchData(apiUrl, 'PUT', updatedData, 'image')

        if (!response.success) {
          toast.error(response.message)
        } else {
          toast.success(response.message || 'Successfully Updated')
          fetchBanner()
        }
      } catch (error) {
        toast.error(error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    },
    [_id, fetchBanner]
  )

  const deleteBanner = useCallback(async () => {
    setLoading(true)
    try {
      const apiUrl = `/admin/cms/deleteBannerSettings/${_id}`
      const response = await fetchData(apiUrl, 'DELETE')

      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.success(response.message || 'Successfully Deleted')
        fetchBanner()
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [_id, fetchBanner])

  return { updateBanner, deleteBanner, loading }
}

export default function BannerCard({ _id, image_link, banner_image_src, redirect_link, enable, fetchBanner }) {
  console.log(fetchBanner, 'from card')
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })

  const [currentEnabled, setCurrentEnabled] = useState(enable)
  const [redirectLink, setRedirectLink] = useState(redirect_link)
  const [imgSrc, setImgSrc] = useState(banner_image_src || '/images/avatars/1.png')
  const [selectedFile, setSelectedFile] = useState(null)

  const { updateBanner, deleteBanner, loading } = useBannerApi(_id, fetchBanner)

  const debounceApi = useCallback(
    debounce(async updatedData => {
      await updateBanner(updatedData)
    }, 500),
    [updateBanner]
  )

  const handleDelete = async () => {
    await deleteBanner()
  }

  const handleSave = () => {
    const formData = new FormData()
    formData.append('redirect_link', redirectLink)
    if (selectedFile != null) {
      formData.append('banner_image_src', selectedFile)
    }
    formData.append('enable', currentEnabled)
    formData.append('_id', _id)
    debounceApi(formData)
  }

  const handleToggleSwitch = () => {
    const newEnabledState = !currentEnabled
    setCurrentEnabled(newEnabledState)

    const formData = new FormData()
    formData.append('redirect_link', redirectLink)
    formData.append('enable', newEnabledState)
    formData.append('_id', _id)

    debounceApi(formData)
  }

  const fileInputRef = useRef(null)

  const handleFileInputChange = useCallback(event => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 800 * 1024) {
        toast.error('File size should not exceed 800KB')
        return
      }
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

  const handleImageClick = () => {
    fileInputRef.current.click()
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
        <div className='flex items-center justify-center w-[40px] h-full'>
          <IconButton {...listeners} size='small' className='cursor-grab'>
            <DragHandleIcon />
          </IconButton>
        </div>

        <div className='flex max-sm:flex-col my-2 items-center'>
          <Image
            height={70}
            width={70}
            className='rounded'
            src={imgSrc}
            alt='Banner image'
            onClick={handleImageClick}
          />
          <input
            hidden
            type='file'
            accept='image/png, image/jpeg'
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </div>

        <div className='w-full ml-2'>
          <CustomTextField
            placeholder='Redirect link'
            name='redirect_link'
            onChange={e => setRedirectLink(e.target.value)}
            defaultValue={redirectLink}
            className='w-full'
          />
        </div>

        <div className='flex items-center justify-center space-x-2 pr-2'>
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
