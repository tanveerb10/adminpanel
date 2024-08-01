'use client'

// MUI Imports
// import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'

import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'
// import { useEffect, useState } from 'react'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
// const ProductInformation = () => {
//   //   const [infoData, setInfoData] = useState({
//   //     title: "",
//   //     description:""
//   // })
//   // useEffect(() => {
//   //   setProductData((prev)=>({...prev}))
//   //  },[infoData,setProductData])
//   // const handleOnChange = e => {
//   //   const newInfoData = {...infoData,e.target.value}
//   // }
//   const { state, dispatch } = useProduct()

//   const handleInputChange = e => {
//     const { name, value } = e.target
//     // setProductData(prev => ({ ...prev, [name]: value }))
//     dispatch({ type: 'SET_PRODUCT_DATA', name, value })
//   }

//   const handleDescriptionChange = description => {
//     console.log(description)
//     // setProductData((prev)=>({...prev,description}))
//     dispatch({ type: 'SET_PRODUCT_DATA', name: 'description', value: description })
//   }
//   return (
//     <Card>
//       <CardHeader title='Product Information' />
//       <CardContent>
//         <Grid container spacing={6} className='mbe-6'>
//           <Grid item xs={12}>
//             <CustomTextField
//               fullWidth
//               label='Product Title'
//               name='title'
//               placeholder='Product name'
//               value={state.title}
//               onChange={handleInputChange}
//             />
//           </Grid>
//         </Grid>
//         <Typography className='mbe-1'>Description</Typography>
//         <Card className='p-0 border shadow-none'>
//           <CardContent className='p-0'>
//             <AppReactDraftWysiwyg onChange={handleDescriptionChange} name='description' />
//           </CardContent>
//         </Card>
//       </CardContent>
//     </Card>
//   )
// }

// export default ProductInformation

const ProductInformation = () => {
  const { productData, updateProductData } = useProduct()

  const handleInputChange = e => {
    const { name, value } = e.target
    // const updatedProduct = { ...state.products[0], [name]: value }
    updateProductData({parent : { [name]: value }})
  }

  const handleDescriptionChange = description => {
    // const updatedProduct = { ...state.products[0], product_description: description }
    updateProductData({parent:{ product_description: description }})
  }

  console.log(productData, "product data context")
  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Product Title'
              name='product_title'
              placeholder='Product name'
              value={productData.parent.product_title || ''}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Typography className='mbe-1'>Description</Typography>
        <Card className='p-0 border shadow-none'>
          <CardContent className='p-0'>
            <AppReactDraftWysiwyg
              onChange={handleDescriptionChange}
              initialContent={productData.parent.product_description || ''}
              name='description'
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
