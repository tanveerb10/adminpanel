'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'

import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'

import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'

const ProductInformation = () => {
  const { productData, updateProductData } = useProduct()

  const handleInputChange = e => {
    const { name, value } = e.target
    updateProductData({parent : { [name]: value }})
  }

  const handleDescriptionChange = description => {
    updateProductData({parent:{ product_description: description }})
  }
  
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
