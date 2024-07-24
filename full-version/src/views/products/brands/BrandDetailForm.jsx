// 'use client'
// import React, { useState, useEffect, useCallback } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import debounce from 'lodash.debounce'
// import { Card, CardContent, Button, Typography, Grid, MenuItem, InputAdornment, IconButton } from '@mui/material'
// import CustomTextField from '@core/components/mui/TextField'
// import { useParams } from 'next/navigation'
// import { toast } from 'react-toastify'
// import fetchData from '@/utils/fetchData'

// const BrandDetailForm = ({ isAddBrand, brandData }) => {
//   // console.log('brand id', brandId)
//   console.log('data brand', brandData)
//   const initialFormData = {
//     name: brandData?.brand?.brand_name || '',
//     imgSrc: brandData?.brand?.brand_image_src || '',
//     productCount: brandData?.brand?.products_count || '',
//     description: brandData?.brand?.brand_description || '',
//     status: brandData?.brand?.is_deleted || false,
//     sortOrder: brandData?.brand?.sort_order || '',
//     imgAlt: brandData?.brand?.brand_image_alt || ''
//   }
//   const [formData, setFormData] = useState(initialFormData || {})

//   const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

//   const validationSchema = yup.object().shape({
//     name: yup.string().required('Brand name is required'),
//     description: yup.string().required('Brand description is required'),
//     productCount: yup.number().required('Product count is required'),
//     sortOrder: yup.string().required('Sort order is required'),
//     // status: yup.string().required('Status required'),
//     imgSrc: yup.string().required('Brand image is required'),
//     status: yup.string().required('Is Deleted is required'),
//     brandSlug: yup.string(),
//     imgAlt: yup.string()
//   })

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     setValue,
//     reset
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: brandData || {
//       name: '',
//       description: '',
//       productCount: '',
//       imgSrc: '',
//       sortOrder: '',
//       status: '',
//       brandSlug: '',
//       imgAlt: ''
//     }
//   })

//   useEffect(() => {
//     if (brandData) {
//       setFormData(initialFormData)
//       reset(initialFormData)
//     }
//   }, [brandData, reset])

//   const handleFormChange = useCallback(
//     debounce((field, value) => {
//       console.log(field, "field", value , "value")
//       setFormData(prevState => ({ ...prevState, [field]: value }))
//     }, 300),
//     []
//   )

//   const handleFileInputChange = event => {
//     const file = event.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = e => setImgSrc(e.target.result)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleFileInputReset = () => {
//     setImgSrc('/images/avatars/1.png')
//   }

//   const { id } = useParams()
//   const handleFormSubmit = async (formData) => {
//     try {
//       console.log(formData, "form Data")
//       const apiUrl = isAddBrand
//         ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/createBrand`
//         : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/updateBrand/${id}`
//       const response = await fetchData(apiUrl, isAddBrand ? 'POST' : 'PUT',formData)
//       console.log('API Response:', response)
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message || 'An Error occurred')
//     }
//   }

//   return (
//     <Card>
//       <CardContent className='mbe-4'>
//         <div className='flex max-sm:flex-col items-center gap-6'>
//           <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
//           <div className='flex flex-grow flex-col gap-4'>
//             <div className='flex flex-col sm:flex-row gap-4'>
//               <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
//                 Upload New Photo
//                 <input
//                   hidden
//                   type='file'
//                   accept='image/png, image/jpeg'
//                   onChange={handleFileInputChange}
//                   id='account-settings-upload-image'
//                 />
//               </Button>
//               <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
//                 Reset
//               </Button>
//             </div>
//             <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
//           </div>
//         </div>
//       </CardContent>
//       <CardContent>
//         <form onSubmit={handleSubmit(handleFormSubmit)}>
//           <Grid container spacing={6}>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='name'
//                 control={control}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Brand Name'
//                     placeholder='Brand Name'
//                     error={Boolean(errors.name)}
//                     helperText={errors.name?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='description'
//                 control={control}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Brand Description'
//                     placeholder='Brand Description'
//                     error={Boolean(errors.description)}
//                     helperText={errors.description?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='brandSlug'
//                 control={control}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Brand Slug'
//                     placeholder='Brand Slug'
//                     error={Boolean(errors.brandSlug)}
//                     helperText={errors.brandSlug?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='imgSrc'
//                 control={control}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Image Link'
//                     placeholder='Image Link'
//                     error={Boolean(errors.imgSrc)}
//                     helperText={errors.imgSrc?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='imgAlt'
//                 control={control}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
                    
//                     label='Image Alt'
//                     placeholder='Image Alt'
//                     error={Boolean(errors.imgAlt)}
//                     helperText={errors.imgAlt?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='productCount'
//                 control={control}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     type='number'
//                     label='Product Count'
//                     placeholder='Product Count'
//                     error={Boolean(errors.productCount)}
//                     helperText={errors.productCount?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             {!isAddBrand && (
//               <Grid item xs={12} sm={6}>
//               <Controller
//                 name='status'
//                 control={control}
//                 defaultValue={brandData?.status || ''}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     select
//                     fullWidth
//                     label='Status'
//                     error={Boolean(errors.status)}
//                     helperText={errors.status?.message}
//                   >
//                     <MenuItem value='true'>True</MenuItem>
//                     <MenuItem value='false'>False</MenuItem>
//                   </CustomTextField>
//                 )}
//               />
//             </Grid>
//           )}
            
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='sortOrder'
//                 control={control}
//                 defaultValue={brandData?.status || ''}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     select
//                     fullWidth
//                     label='sortOrder'
//                     error={Boolean(errors.sortOrder)}
//                     helperText={errors.sortOrder?.message}
//                   >
//                     <MenuItem value='yes'>Yes</MenuItem>
//                     <MenuItem value='no'>No</MenuItem>
//                   </CustomTextField>
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button variant='contained' type='submit'>
//                 {isAddBrand ? 'Add Brand' : 'Save Changes'}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default BrandDetailForm


'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import debounce from 'lodash.debounce'
import { Card, CardContent, Button, Typography, Grid, MenuItem } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

const BrandDetailForm = ({ isAddBrand, brandData }) => {
  const initialFormData = {
    name: brandData?.brand?.brand_name || '',
    imgSrc: brandData?.brand?.brand_image_src || '',
    productCount: brandData?.brand?.products_count || '',
    description: brandData?.brand?.brand_description || '',
    status: brandData?.brand?.is_deleted || false,
    sortOrder: brandData?.brand?.sort_order || '',
    imgAlt: brandData?.brand?.brand_image_alt || ''
  }
  const [formData, setFormData] = useState(initialFormData)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const validationSchema = yup.object().shape({
    name: yup.string().required('Brand name is required'),
    description: yup.string().required('Brand description is required'),
    productCount: yup.number().required('Product count is required'),
    sortOrder: yup.string().required('Sort order is required'),
    imgSrc: yup.string().required('Brand image is required'),
    status: yup.string().required('Is Deleted is required'),
    brandSlug: yup.string(),
    imgAlt: yup.string()
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormData
  })

  useEffect(() => {
    if (brandData) {
      reset(initialFormData)
    }
  }, [brandData, reset])

  const handleFormChange = useCallback(
    debounce((field, value) => {
      console.log(field, "field", value , "value")
      setFormData(prevState => ({ ...prevState, [field]: value }))
    }, 300),
    []
  )

  const handleFileInputChange = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => setImgSrc(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputReset = () => {
    setImgSrc('/images/avatars/1.png')
  }

  const { id } = useParams()
  const handleFormSubmit = async (formData) => {
    try {
      console.log('Form Data:', formData)
      const apiUrl = isAddBrand
        ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/createBrand`
        : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/updateBrand/${id}`
      const response = await fetchData(apiUrl, isAddBrand ? 'POST' : 'PUT', formData)
      console.log('API Response:', response)
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
    }
  }

  return (
    <Card>
      <CardContent className='mbe-4'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Upload New Photo
                <input
                  hidden
                  type='file'
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange}
                  id='account-settings-upload-image'
                />
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleFileInputReset}>
                Reset
              </Button>
            </div>
            <Typography>Allowed JPG, GIF or PNG. Max size of 800K</Typography>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Brand Name'
                    placeholder='Brand Name'
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='description'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Brand Description'
                    placeholder='Brand Description'
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='brandSlug'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Brand Slug'
                    placeholder='Brand Slug'
                    error={Boolean(errors.brandSlug)}
                    helperText={errors.brandSlug?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='imgSrc'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Image Link'
                    placeholder='Image Link'
                    error={Boolean(errors.imgSrc)}
                    helperText={errors.imgSrc?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='imgAlt'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Image Alt'
                    placeholder='Image Alt'
                    error={Boolean(errors.imgAlt)}
                    helperText={errors.imgAlt?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='productCount'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Product Count'
                    placeholder='Product Count'
                    error={Boolean(errors.productCount)}
                    helperText={errors.productCount?.message}
                  />
                )}
              />
            </Grid>
            {!isAddBrand && (
              <Grid item xs={12} sm={6}>
              <Controller
                name='status'
                control={control}
                defaultValue={brandData?.status || ''}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Status'
                    error={Boolean(errors.status)}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value='true'>True</MenuItem>
                    <MenuItem value='false'>False</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
          )}
            
            <Grid item xs={12} sm={6}>
              <Controller
                name='sortOrder'
                control={control}
                defaultValue={brandData?.sortOrder || ''}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Sort Order'
                    error={Boolean(errors.sortOrder)}
                    helperText={errors.sortOrder?.message}
                  >
                    <MenuItem value='yes'>Yes</MenuItem>
                    <MenuItem value='no'>No</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                {isAddBrand ? 'Add Brand' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default BrandDetailForm
