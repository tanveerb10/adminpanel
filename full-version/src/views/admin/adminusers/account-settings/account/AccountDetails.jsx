// 'use client'

// // React Imports
// import { useState } from 'react'

// // MUI Imports
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import MenuItem from '@mui/material/MenuItem'
// // import Chip from '@mui/material/Chip'

// // Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AccountDetails = ({ adminDetail, roleData }) => {
//   console.log(adminDetail);
//   console.log(roleData);
//   // States
//   const [formData, setFormData] = useState(adminDetail)
//   const [fileInput, setFileInput] = useState('')
//   const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
//   const [selectedRole, setSelectedRole] = useState(adminDetail.role.role_name)

//   const handleFormChange = (field, value) => {
//     setFormData({ ...formData, [field]: value })
//   }

//   const handleFileInputChange = file => {
//     const reader = new FileReader()
//     const { files } = file.target

//     if (files && files.length !== 0) {
//       reader.onload = () => setImgSrc(reader.result)
//       reader.readAsDataURL(files[0])

//       if (reader.result !== null) {
//         setFileInput(reader.result)
//       }
//     }
//   }

//   const handleFileInputReset = () => {
//     setFileInput('')
//     setImgSrc('/images/avatars/1.png')
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
//         <form onSubmit={e => e.preventDefault()}>
//           <Grid container spacing={6}>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='First Name'
//                 value={formData.firstname}
//                 placeholder='vishal'
//                 onChange={e => handleFormChange('firstname', e.target.value)}
//               />
//             </Grid>
//            <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='Last Name'
//                 value={formData.lastname}
//                 placeholder='sinha'
//                 onChange={e => handleFormChange('lastname', e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='Email'
//                 value={formData.email}
//                 placeholder='vishal.sinha@gmail.com'
//                 onChange={e => handleFormChange('email', e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='Phone Number'
//                 value={formData.phone}
//                 placeholder='84-7567-8901'
//                 onChange={e => handleFormChange('phone', e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Gender'
//                 value={formData.gender}
//                 onChange={e => handleFormChange('gender', e.target.value)}
//               >
//                 <MenuItem value='male'>male</MenuItem>
//                 <MenuItem value='female'>female</MenuItem>
//                 <MenuItem value='others'>others</MenuItem>
//               </CustomTextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Status'
//                 value={formData.status}
//                 onChange={e => handleFormChange('status', e.target.value)}

//               >
//                 <MenuItem value='true'>true</MenuItem>
//                 <MenuItem value='false'>false</MenuItem>

//               </CustomTextField>
//             </Grid>
//              <Grid item xs={12} sm={6}>
//                <CustomTextField
//                 select
//                 fullWidth
//                 label='Role'
//                 value={selectedRole}
//                 // value={formData.role.role_name}
//                 onChange={e => setSelectedRole(e.target.value)}
//               >
//                 {/* <MenuItem>{ role.role_name }</MenuItem> */}
//                 {roleData?.allRole?.map(role => (
//                   <MenuItem value={role.role_name} key={role.role_id}>{ role.role_name}</MenuItem>
//                 )

//                )}
//                </CustomTextField>
//             </Grid>
//            <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='Address'
//                 value={formData.address}
//                 placeholder='Address'
//                 onChange={e => handleFormChange('address', e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='City'
//                 value={formData.city}
//                 placeholder='Mumbai'
//                 onChange={e => handleFormChange('city', e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 label='State'
//                 value={formData.state}
//                 placeholder='Maharashtra'
//                 onChange={e => handleFormChange('state', e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 fullWidth
//                 type='number'
//                 label='Pin Code'
//                 value={formData.pin}
//                 placeholder='123456'
//                 onChange={e => handleFormChange('pin', e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12} className='flex gap-4 flex-wrap'>
//               <Button variant='contained' type='submit'>
//                 Save Changes
//               </Button>
//               <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData(initialData)}>
//                 Reset
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default AccountDetails

// ==========================================================================================================================
// 'use client'

// // React Imports
// import { useState, useEffect } from 'react'

// // MUI Imports
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import MenuItem from '@mui/material/MenuItem'
// import { InputAdornment, IconButton, debounce } from '@mui/material'

// import { useForm, Controller } from 'react-hook-form'

// // Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// // STATES OF INDIA
// let states = [
//   'Andhra Pradesh',
//   'Arunachal Pradesh',
//   'Assam',
//   'Bihar',
//   'Chhattisgarh',
//   'Goa',
//   'Gujarat',
//   'Haryana',
//   'Himachal Pradesh',
//   'Jammu and Kashmir',
//   'Jharkhand',
//   'Karnataka',
//   'Kerala',
//   'Madhya Pradesh',
//   'Maharashtra',
//   'Manipur',
//   'Meghalaya',
//   'Mizoram',
//   'Nagaland',
//   'Odisha',
//   'Punjab',
//   'Rajasthan',
//   'Sikkim',
//   'Tamil Nadu',
//   'Telangana',
//   'Tripura',
//   'Uttarakhand',
//   'Uttar Pradesh',
//   'West Bengal',
//   'Andaman and Nicobar Islands',
//   'Chandigarh',
//   'Dadra and Nagar Haveli',
//   'Daman and Diu',
//   'Delhi',
//   'Lakshadweep',
//   'Puducherry'
// ]

// const AccountDetails = ({ adminDetail, roleData, isAddAdmin }) => {
//   // States
//   const [formData, setFormData] = useState(adminDetail || {})
//   const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
//   const [selectedRole, setSelectedRole] = useState(adminDetail?.role?.role_name || '')
//   const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
//   // ===========
//   // const [isReadOnly, setIsReadOnly] = useState(true)
//   useEffect(() => {
//     if (adminDetail) {
//       setFormData(adminDetail)
//       setSelectedRole(adminDetail.role.role_name)
//     }
//   }, [adminDetail])

//   const handleFormChange = debounce((field, value) => {
//     setFormData(prevState => ({ ...prevState, [field]: value }))
//   },300)

//   const handleFileInputChange = file => {
//     const reader = new FileReader()
//     const { files } = file.target

//     if (files && files.length !== 0) {
//       reader.onload = () => setImgSrc(reader.result)
//       reader.readAsDataURL(files[0])
//     }
//   }

//   const handleFileInputReset = () => {
//     setImgSrc('/images/avatars/1.png')
//   }

//   const handleRoleChange = e => {
//     const newRole = e.target.value
//     setSelectedRole(newRole)
//     setFormData(prevState => ({
//       ...prevState,
//       role: { ...prevState.role, role_name: newRole }
//     }))
//   }
//   // =============
//   const {
//     handleSubmit,
//     formState: { errors },
//     control,
//     reset
//   } = useForm({defaultValues:admin || {}})

//   const handleFormSubmit = data => {
//     console.log('submitted', data)
//   }
//   return (
//     <Card>
//       <CardContent className='mbe-4'>
//         <div className='flex max-sm:flex-col items-center gap-6'>
//           <img height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
//           <div className='flex flex-grow flex-col gap-4'>
//             {/* =========== */}
//             {/* <Button variant='contained' onClick={()=> setIsReadOnly(false)}>Edit</Button>   */}
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
//                 name='firstname'
//                 control={control}
//                 defaultValue={formData.firstname}
//                 rules={{ required: 'First name is required' }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='First Name'
//                     // value={formData.firstname}
//                     placeholder='vishal'
//                     error={Boolean(errors.firstname)}
//                     helperText={errors.firstname?.message}
//                     // {...register('first name is required')}
//                     // onChange={e => handleFormChange('firstname', e.target.value)}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='lastname'
//                 control={control}
//                 defaultValue={formData.lastname}
//                 rules={{ required: 'Last name is required' }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Last Name'
//                     // value={formData.lastname}
//                     placeholder='sinha'
//                     // onChange={e => handleFormChange('lastname', e.target.value)}
//                     error={Boolean(errors.lastname)}
//                     helperText={errors.lastname?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='email'
//                 control={control}
//                 defaultValue={formData.email}
//                 rules={{
//                   required: 'Email is required',
//                   pattern: {
//                     value:
//                       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                     message: 'Enter a valid email'
//                   }
//                 }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Email'
//                     // value={formData.email}
//                     placeholder='vishal.sinha@gmail.com'
//                     error={Boolean(errors.email)}
//                     helperText={errors.email?.message}
//                     // onChange={e => handleFormChange('email', e.target.value)}
//                   />
//                 )}
//               />
//             </Grid>
//             {isAddAdmin && (
//               <Grid item xs={12} sm={6}>
//                 <CustomTextField
//                   fullWidth
//                   label='Password'
//                   type={isNewPasswordShown ? 'text' : 'password'}
//                   placeholder='············'
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position='end'>
//                         <IconButton
//                           edge='end'
//                           onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
//                           onMouseDown={e => e.preventDefault()}
//                         >
//                           <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </Grid>
//             )}
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='phone'
//                 rules={{
//                   required: 'The phone number is required',
//                   pattern: {
//                     value: /^[0-9]+$/,
//                     message: 'Enter a valid phone number'
//                   },
//                   minLength: {
//                     value: 10,
//                     message: 'Phone number must be exactly 10 digits'
//                   },
//                   maxLength: {
//                     value: 10,
//                     message: 'Phone number must be exactly 10 digits'
//                   }
//                 }}
//                 control={control}
//                 defaultValue={formData.phone}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Phone Number'
//                     // value={formData.phone}
//                     placeholder='84-7567-8901'
//                     // onChange={e => handleFormChange('phone', e.target.value)}
//                     error={Boolean(errors.phone)}
//                     helperText={errors.phone?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               {/* <Controller
//                 name='gender'
//                 control={control}
//                 defaultValue={formData.gender}
//                 rules={{ required: 'Select gender' }}
//                 render={({ field }) => ( */}
//               <CustomTextField
//                 // {...field}
//                 select
//                 fullWidth
//                 label='Gender'
//                 value={formData.gender}
//                 onChange={e => handleFormChange('gender', e.target.value)}
//               >
//                 <MenuItem value='male'>male</MenuItem>
//                 <MenuItem value='female'>female</MenuItem>
//                 <MenuItem value='others'>others</MenuItem>
//                 {/* error={Boolean(errors.gender)}
//                     helperText={errors.gender?.message} */}
//               </CustomTextField>
//               {/* )}
//               /> */}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Status'
//                 value={formData.status}
//                 onChange={e => handleFormChange('status', e.target.value)}
//               >
//                 <MenuItem value='true'>true</MenuItem>
//                 <MenuItem value='false'>false</MenuItem>
//               </CustomTextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <CustomTextField select fullWidth label='Role' value={selectedRole} onChange={handleRoleChange}>
//                 {roleData?.allRole?.map(role => (
//                   <MenuItem value={role.role_name} key={role.role_id}>
//                     {role.role_name}
//                   </MenuItem>
//                 ))}
//               </CustomTextField>
//               {/* <CustomTextField select fullWidth
//                 label='Role'
//                 {isAddAdmin && value=''}
//                 {!isAddAdmin && value={selectedRole}}
//                 onChange={handleRoleChange}>
//                 {roleData?.allRole?.map(role => (
//                   <MenuItem value={role.role_name} key={role.role_id}>
//                     {role.role_name}
//                   </MenuItem>
//                 ))}
//               </CustomTextField> */}
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='address'
//                 control={control}
//                 defaultValue={formData.address}
//                 rules={{ required: 'Address required' }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='Address'
//                     placeholder='Address'
//                     // value={formData.address}
//                     // onChange={e => handleFormChange('address', e.target.value)}
//                     error={Boolean(errors.address)}
//                     helperText={errors.address?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='city'
//                 control={control}
//                 defaultValue={formData.city}
//                 rules={{ required: 'City required' }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     label='City'
//                     // value={formData.city}
//                     placeholder='Mumbai'
//                     // onChange={e => handleFormChange('city', e.target.defaultValue)}
//                     error={Boolean(errors.city)}
//                     helperText={errors.city?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//             <Controller
//                 name='state'
//                 control={control}
//                 defaultValue={formData.state}
//                 rules={{ required: 'City required' }}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                 fullWidth
//                 label='State check'
//                 // value={formData.state}
//                 placeholder='Maharashtra'
//                     // onChange={e => handleFormChange('state', e.target.value)}
//                     />
//                   )}
//               />
//             </Grid>
//             {/* ============================================================ */}
//             {/* <Grid item xs={12} sm={6}>
//             <Controller
//                 name='state'
//                 control={control}
//                 defaultValue={formData.state}
//                 rules={{ required: 'state required' }}
//                 render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 select
//                 fullWidth
//                 label='State'
//                 // value={formData.state}
//                 // onChange={e => handleFormChange('state', e.target.value)}
//               >
//                 {states.map(state => (
//                   <MenuItem value={state} key={state}>
//                     {state}
//                   </MenuItem>
//                 ))}
//                      error={Boolean(errors.state)}
//                      helperText={errors.state?.message}
//                   </CustomTextField>
//                   )}
//                   />
//               </Grid> */}
//             <Grid item xs={12} sm={6}>
//               <Controller
//                 name='pin'
//                 control={control}
//                 rules={{
//                   required: ' pin code number required',
//                   pattern: {
//                     value: /^[0-9]+$/,
//                     message: 'Enter valid pin code number'
//                   },
//                   minLength: {
//                     value: 6,
//                     message: 'Pincode must be exactly 6 digits'
//                   },
//                   maxLength: {
//                     value: 6,
//                     message: 'Pincode must be exactly 6 digits'
//                   }
//                 }}
//                 defaultValue={formData.pin}
//                 render={({ field }) => (
//                   <CustomTextField
//                     {...field}
//                     fullWidth
//                     type='number'
//                     label='Pin Code'
//                     // value={formData.pin}
//                     placeholder='123456'
//                     // onChange={e => handleFormChange('pin', e.target.value)}
//                     error={Boolean(errors.pin)}
//                     helperText={errors.pin?.message}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid item xs={12} className='flex gap-4 flex-wrap'>
//               <Button variant='contained' type='submit'>
//                 Save Changes
//               </Button>
//               <Button variant='tonal' type='reset' color='secondary' onClick={() => setFormData(adminDetail)}>
//                 Reset
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default AccountDetails

// =======================================================================================================================================================

'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import debounce from 'lodash.debounce'
import { Card, CardContent, Button, Typography, Grid, MenuItem, InputAdornment, IconButton } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '@core/components/mui/TextField'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { useParams } from 'next/navigation'

// STATES OF INDIA
let states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry'
]

// Function to generate nonce
const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()

// Function to generate a timestamp
const generateTimestamp = () => Date.now().toString()

// Function to generate a signature
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

const AccountDetails = ({ adminDetail, roleData, isAddAdmin }) => {
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [selectedRole, setSelectedRole] = useState(adminDetail?.role?.role_name || '')
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)
  const [formData, setFormData] = useState(adminDetail || {})


  const validationSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    role: yup.string().required('Role is required'),
    status: yup.string().required('Status required'),
    gender: yup.string().required('Gender is required'),
    pin: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
      .required('Pin code is required')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: adminDetail || {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      password: '',
      state: '',
      pin: '',
      gender: '',
      role: '',
      status: ''
    }
  })

  useEffect(() => {
    if (adminDetail) {
      reset(adminDetail)
      setValue('role', adminDetail?.role?.role_name)
    }
  }, [adminDetail, reset])

  const handleFormChange = useCallback(
    debounce((field, value) => {
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

  // const handleRoleChange = e => {
  //   const newRole = e.target.value // Ensure newRole is a string
  //   setValue('role', newRole) // Set the value in react-hook-form
  //   setSelectedRole(newRole) // Update the selectedRole state
  // }
  const handleRoleChange = e => {
    const newRole = e.target.value
    setValue('role', newRole, { shouldValidate: true }) // Update the role value and trigger validation
    setSelectedRole(newRole) // Update state for selected role
  }

  // const handleFormSubmit = async (data) => {
  // console.log('submitted', data)

  // const secret = process.env.NEXT_PUBLIC_SECRET_KEY
  // const token = Cookies.get('accessToken')

  // if (!secret) {
  //   // setError('Secret key is not defined')
  //   console.log('Secret key is not defined')
  //   // setLoading(false)
  //   return
  // }

  // if (!token) {
  //   console.log('Token is not defined')
  //   // setLoading(false)
  //   return
  // }

  // const nonce = generateNonce()
  // const timestamp = generateTimestamp()
  // const signature = generateSignature(JSON.stringify(payload), secret, nonce, timestamp)

  // try {
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/adminsignup`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'livein-key': 'livein-key',
  //     Nonce: nonce,
  //     Timestamp: timestamp,
  //     Signature: signature,
  //     Authorization: `Bearer ${token}`
  //   },
  //   body: JSON.stringify(data)
  // })
  // const response = await apiAuthentication.post('/admin/admins/adminlogin', data )
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch userData, status: ${response.status}`)
  // }

  //     const data = await response.json()
  //     console.log('Admin created successfully:', data)
  //     handleClose()
  //   } catch (error) {
  //     // setError('Failed to create new role')
  //     console.error('Error:', error)
  //   }
  // }
  const { id } = useParams()
  const handleFormSubmit = async (formData) => {
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY
    const token = Cookies.get('accessToken')

    if (!secret) {
      // setError('Secret key is not defined')
      console.log('Secret key is not defined')
      // setLoading(false)
      return
    }

    if (!token) {
      console.log('Token is not defined')
      // setLoading(false)
      return
    }

    const nonce = generateNonce()
    const timestamp = generateTimestamp()
    const signature = generateSignature(JSON.stringify(formData), secret, nonce, timestamp)

    const apiUrl = isAddAdmin
    ? `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/adminsignup`
      : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/updateadmin/${id}`
      // : `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins/updateadmin/667d7383d2d5a5b2ace21143`

    try {
      const response = await fetch(apiUrl, {
        method: isAddAdmin ?  'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'livein-key': 'livein-key',
          Nonce: nonce,
          Timestamp: timestamp,
          Signature: signature,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch data, status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log('Data submitted successfully:', responseData)

      // Handle success scenario (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error('Error submitting data:', error.message)
      // Handle error scenario (e.g., show error message to the user)
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
                name='firstname'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='First Name'
                    placeholder='First Name'
                    error={Boolean(errors.firstname)}
                    helperText={errors.firstname?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastname'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Last Name'
                    placeholder='Last Name'
                    error={Boolean(errors.lastname)}
                    helperText={errors.lastname?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Email'
                    placeholder='Email'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            {isAddAdmin && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Password'
                      type={isNewPasswordShown ? 'text' : 'password'}
                      placeholder='············'
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                              onMouseDown={e => e.preventDefault()}
                            >
                              <i className={isNewPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Phone Number'
                    placeholder='Phone Number'
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Gender'
                    error={Boolean(errors.gender)}
                    helperText={errors.gender?.message}
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='others'>Others</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='status'
                control={control}
                defaultValue={adminDetail?.status || ''}
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
            <Grid item xs={12} sm={6}>
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='Role'
                    value={selectedRole || ''}
                    onChange={handleRoleChange}
                    error={Boolean(errors.role)}
                    helperText={errors.role?.message}
                  >
                    {roleData?.allRole?.map(role => (
                      <MenuItem value={role.role_name} key={role.role_id}>
                        {role.role_name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Address'
                    placeholder='Address'
                    error={Boolean(errors.address)}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='City'
                    placeholder='City'
                    error={Boolean(errors.city)}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    select
                    fullWidth
                    label='State'
                    error={Boolean(errors.state)}
                    helperText={errors.state?.message}
                    onChange={e => {
                      field.onChange(e)
                      handleFormChange('state', e.target.value)
                    }}
                  >
                    {states.map(state => (
                      <MenuItem value={state} key={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='pin'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='number'
                    label='Pincode'
                    placeholder='Pin code'
                    error={Boolean(errors.pin)}
                    helperText={errors.pin?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'>
                {isAddAdmin ? 'Add Admin' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
