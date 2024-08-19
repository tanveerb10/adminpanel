'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import CustomTextField from '@/@core/components/mui/TextField'
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
// Third-party Imports
import { useDropzone } from 'react-dropzone'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Grid } from '@mui/material'

// // Styled Dropzone Component
// const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
//   '& .dropzone': {
//     minHeight: 'unset',
//     padding: theme.spacing(12),
//     [theme.breakpoints.down('sm')]: {
//       paddingInline: theme.spacing(5)
//     },
//     '&+.MuiList-root .MuiListItem-root .file-name': {
//       fontWeight: theme.typography.body1.fontWeight
//     }
//   }
// }))

// const ProductImage = ({ setProductData }) => {
//   // States
//   const [files, setFiles] = useState([])
//   const { state, dispatch } = useProduct()

//   const [productImage, setProductImage] = useState([
//     {
//       position: '',
//       image: ''
//     }
//   ])
//   // Hooks
//   const { getRootProps, getInputProps } = useDropzone({
//     // multiple:true,
//     // onDrop: acceptedFiles => {
//     //   setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file))])
//     //   setProductData(prev =>({...prev, images:[...prev.images,...acceptedFiles]}))
//     multiple: true,
//     onDrop: acceptedFiles => {
//       setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
//       dispatch({ type: 'SET_PRODUCT_DATA', name: 'images', value: [...state.images, ...acceptedFiles] })
//     }
//   })

//   const renderFilePreview = file => {
//     if (file.type.startsWith('image')) {
//       return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
//     } else {
//       return <i className='tabler-file-description' />
//     }
//   }

//   const handleRemoveFile = file => {
//     // const uploadedFiles = files
//     // const filtered = uploadedFiles.filter(i => i.name !== file.name)

//     // setFiles([...filtered])
//     // setProductData(prev=>({...prev, images:[...filtered]}))
//     const updatedFiles = files.filter(f => f.name !== file.name)
//     setFiles(updatedFiles)
//     dispatch({ type: 'SET_PRODUCT_DATA', name: 'images', value: updatedFiles })
//   }

//   const handleRemoveAllFiles = () => {
//     setFiles([])
//     dispatch({ type: 'SET_PRODUCT_DATA', name: 'images', value: [] })
//   }

//   const addOption = (e) => {
//     setProductImage({
//       position: '',
//       image : ""
//     })
//   }

//   const fileList = files.map(file => (
//     <ListItem key={file.name} className='pis-4 plb-3'>
//       <div className='file-details'>
//         <div className='file-preview'>{renderFilePreview(file)}</div>
//         <div>
//           <CustomTextField className='file-name font-medium' color='text.primary'>
//             {file.name}
//           </CustomTextField>
//           <CustomTextField className='file-size' variant='body2'>
//             {Math.round(file.size / 100) / 10 > 1000
//               ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
//               : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
//           </CustomTextField>
//         </div>
//       </div>
//       <IconButton onClick={() => handleRemoveFile(file)}>
//         <i className='tabler-x text-xl' />
//       </IconButton>
//     </ListItem>
//   ))

//   // const handleRemoveAllFiles = () => {
//   //   setFiles([])
//   // }

//   return (
//     <Grid gap={20}>
//       {/* <Grid>
//         <Dropzone>
//           <Card>
//             <CardHeader
//               title='Product Image'
//               action={
//                 <CustomTextField
//                   component={Link}
//                   href='/'
//                   onClick={e => e.preventDefault()}
//                   color='primary'
//                   className='font-medium'
//                 >
//                   Add media from URL
//                 </CustomTextField>
//               }
//               sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
//             />
//             <CardContent>
//               <div {...getRootProps({ className: 'dropzone' })}>
//                 <input {...getInputProps()} />
//                 <div className='flex items-center flex-col gap-2 text-center'>
//                   <CustomAvatar variant='rounded' skin='light' color='secondary'>
//                     <i className='tabler-upload' />
//                   </CustomAvatar>
//                   <CustomTextField variant='h4'>Drag and Drop Your Image Here.</CustomTextField>
//                   <CustomTextField color='text.disabled'>or</CustomTextField>
//                   <Button variant='tonal' size='small'>
//                     Browse Image
//                   </Button>
//                 </div>
//               </div>
//               {files.length ? (
//                 <>
//                   <List>{fileList}</List>
//                   <div className='buttons'>
//                     <Button color='error' variant='tonal' onClick={handleRemoveAllFiles}>
//                       Remove All
//                     </Button>
//                     <Button variant='contained'>Upload Files</Button>
//                   </div>
//                 </>
//               ) : null}
//             </CardContent>
//           </Card>
//         </Dropzone>
//       </Grid> */}
//       <Grid>
//         <Card>
//           <CardHeader title='Product Variants' />
//           <CardContent>
//             <Grid container spacing={6}>
//               <Grid container spacing={6} item xs={12} className='repeater-item'>
//                 <Grid item xs={12} md={8} alignSelf='end' className=''>

//                   <div className='flex flex-col items-center gap-6'>
//                     {/* {Array.isArray(variants.option_values) &&
//                       variants.option_values.map((variant, variantIndex) => ( */}
//                     <CustomTextField
//                       // key={variantIndex}
//                       fullWidth
//                       placeholder='Enter Variant Value'
//                       // value={variant.option_value}
//                       // onChange={e => variantInput(e, optionIndex, variantIndex)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position='end'>
//                             {/* {variantIndex > 0 && ( */}
//                             <IconButton
//                               // onClick={() => deleteInput(optionIndex, variantIndex)}
//                               className='min-is-fit'
//                             >
//                               <i className='tabler-x' />
//                             </IconButton>
//                             {/* )} */}
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                     {/* ))}( */}
//                     <Button
//                       variant='outlined'
//                       color='primary'
//                       // onClick={() => deleteForm(optionIndex)}
//                       onClick={addOption}
//                       endIcon={<i className='tabler-plus' />}
//                     >
//                       Add Image
//                     </Button>
//                     {/* ) */}
//                   </div>
//                 </Grid>
//               </Grid>

//               <Grid item xs={12} gap={2}>
//                 {/* {formData.length < 3 && ( */}
//                 <Button
//                   variant='contained'
//                   // onClick={addOption}
//                   startIcon={<i className='tabler-plus' />}
//                 >
//                   Add Another Option
//                 </Button>
//                 {/* )} */}
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// }

// export default ProductImage

const ProductImage = () => {
  // const [addProductImage, setAddProductImage] = useState([
  //   {
  //     position: 1,
  //     image: ''
  //   }
  // ])

  // const { productData, updateProductData } = useProduct()
  // console.log(productData)
  // console.log(productData.images)

  // const addOption = () => {
  //   // const newObj = { position: addProductImage.length + 1, image: '' }
  //   // const newObj = { image_position: productData.images.length + 1, image_src: '' }
  //   // setAddProductImage(prevState => [...prevState, newObj])
  //   // updateProductData.images(prevState => [...prevState, newObj])
  //   // console.log(Array.isArray(addProductImage))
  //   // console.log(addProductImage, 'addop')
  //   console.log('heillo add')
  // }

  // const deleteOption = index => {
  //   console.log(index, 'induuu delte')
  //   const updateDelete = productData.images.filter((_, i) => i !== index)
  //   // setAddProductImage(prevState => prevState.filter((_, i) => i !== index))
  //   const arrayUpdatePosition = updateDelete.map((item, i) => ({ ...item, image_position: i + 1 }))
  //   // console.log(addProductImage, 'delete')
  //   // setAddProductImage(arrayUpdatePosition)
  //   productData.images(arrayUpdatePosition)
  // }
  // // console.log(addProductImage.length)

  // const handleChange = (index, e) => {
  //   console.log(e)
  //   const newImages = [...productData.images]
  //   newImages[index].image_src = e.target.value
  //   // setAddProductImage(newImages)
  //   // updateProductData.images(newImages)
  // }

  const { productData, addProductImages, updateProductImages, deleteProductImages } = useProduct()
  const addOption = () => {
    addProductImages()
  }

  const deleteOption = index => {
    deleteProductImages(index)
  }
  return (
    <Grid>
      <Card>
        <CardHeader title='Product Images' />
        <CardContent>
          <Grid container gap={7} xs={12} className='flex flex-col'>
            <Grid item xs={12} className=''>
              {productData.images.map((img, index) => (
                <Grid className='my-2' key={index}>
                  {/* {console.log(img)} */}
                  <CustomTextField
                    fullWidth
                    placeholder='Enter Image Link'
                    value={img.image_src}
                    onChange={e => updateProductImages(index, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton className='min-is-fit' onClick={() => deleteOption(index)}>
                            <i className='tabler-x' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid>
              {productData.images.length < 5 && (
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => addOption()}
                  endIcon={<i className='tabler-plus' />}
                >
                  Add Image
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default ProductImage
