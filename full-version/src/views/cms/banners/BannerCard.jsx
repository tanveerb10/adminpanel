'use client'
import { Card, CardContent, CardHeader, IconButton, Switch, Typography } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { useSortable } from '@dnd-kit/sortable'
import fetchData from '@/utils/fetchData'
import { useState, useCallback } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'

// export default function BannerCard({ _id, image_link, redirect_link, enable }) {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })

//   const [currentEnabled, setCurrentEnabled] = useState(enable)
//   const [link, setLink] = useState({ image_link, redirect_link })

//   const debounceApi = useCallback(
//     debounce(async updatedData => {
//       try {
//         const apiUrl = `/admin/cms/updateBannerSettings/${_id}`

//         const response = await fetchData(apiUrl, 'PUT', updatedData)
//         console.log('API Response:', response)

//         if (!response.success) {
//           console.log('error response', response.message)
//           toast.error(response.message)
//         }
//         if (response.success) {
//           return toast.success(response.message || 'SuccessFully Updated')
//         }
//       } catch (error) {
//         console.error('API Error:', error)
//         toast.error(error.message || 'An Error occurred')
//       }
//     }, 500),
//     []
//   )

//   const handleDelete = async () => {
//     const apiUrl = `/admin/cms/deleteBannerSettings/${_id}`
//     try {
//       const response = await fetchData(apiUrl, 'DELETE')
//       console.log('API Response:', response)

//       if (!response.success) {
//         console.log('error response', response.message)
//         toast.error(response.message)
//       }
//       if (response.success) {
//         return toast.success(response.message || 'SuccessFully Updated')
//       }
//     } catch (error) {
//       console.error('API Error:', error)
//       toast.error(error.message || 'An Error occurred')
//     }
//   }

//   const handleSave = () => {
//     // const newEnabledState = !currentEnabled
//     // setCurrentEnabled(newEnabledState)

//     const updatedData = {
//       image_link: link.image_link,
//       redirect_link: link.redirect_link,
//       enable: currentEnabled,

//       _id
//     }

//     debounceApi(updatedData)
//   }

//   const handleToggleSwitch = async () => {
//     const newEnabledState = !currentEnabled
//     setCurrentEnabled(newEnabledState)

//     const updatedData = {
//       fields: [
//         {
//           enable: newEnabledState,

//           _id
//         }
//       ]
//     }
//     try {
//       await debounceApi(updatedData)
//       setCurrentEnabled(newEnabledState)
//     } catch (error) {
//       console.error('Error toggling switch:', error)
//     }

//     // debounceApi(updatedData)
//   }

//   const handleLinkChange = (name, value) => {
//     setLink(prev => ({ ...prev, [name]: value }))
//   }

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition,
//         maxWidth: '100%',
//         marginBottom: '10px',
//         boxSizing: 'border-box'
//       }}
//       {...attributes}
//     >
//       <Card className='flex items-center min-h-[70px]'>
//         {/* Drag Icon */}
//         <div className='flex items-center justify-center w-[40px] h-full'>
//           <IconButton {...listeners} size='small' className='cursor-grab'>
//             <DragHandleIcon />
//           </IconButton>
//         </div>
//         {/* Card Content */}
//         <div className='flex-1 flex flex-col justify-center gap-2 my-2'>
//           <CustomTextField
//             placeholder='Image link'
//             name='image_link'
//             onChange={e => handleLinkChange('image_link', e.target.value)}
//             defaultValue={link.image_link}
//           />
//           <CustomTextField
//             placeholder='Redirect link'
//             name='redirect_link'
//             onChange={e => handleLinkChange('redirect_link', e.target.value)}
//             defaultValue={link.redirect_link}
//           />
//         </div>
//         {/* Action Buttons */}
//         <div className='flex flex-col items-center justify-center space-x-2 pr-2'>
//           <Switch
//             checked={currentEnabled}
//             onChange={() => setCurrentEnabled(!currentEnabled)}
//             color='primary'
//             size='small'
//           />

//           <IconButton onClick={handleSave} size='small'>
//             <i className='tabler-device-floppy text-[22px] text-green-500' />
//           </IconButton>

//           <IconButton onClick={handleDelete}>
//             <i className='tabler-trash text-[22px] text-Secondary text-red-500 ' />
//           </IconButton>
//         </div>
//       </Card>
//     </div>
//   )
// }

const useBannerApi = (_id, fetchBanner) => {
  const [loading, setLoading] = useState(false)

  const updateBanner = useCallback(
    async updatedData => {
      setLoading(true)
      try {
        const apiUrl = `/admin/cms/updateBannerSettings/${_id}`
        const response = await fetchData(apiUrl, 'PUT', updatedData)

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

export default function BannerCard({ _id, image_link, redirect_link, enable, fetchBanner }) {
  console.log(fetchBanner, 'from card')
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id })

  const [currentEnabled, setCurrentEnabled] = useState(enable)
  const [link, setLink] = useState({ image_link, redirect_link })

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
    const updatedData = {
      image_link: link.image_link,
      redirect_link: link.redirect_link,
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