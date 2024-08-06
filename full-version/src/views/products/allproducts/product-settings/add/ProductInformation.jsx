'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'

import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import RichTextEditor from '@/libs/RichTextEditor'

const ProductInformation = () => {
  const { productData, updateProductData } = useProduct()

  const handleInputChange = e => {
    const { name, value } = e.target
    updateProductData({ parent: { [name]: value } })
  }

  const handleDescriptionChange = value => {
    console.log(value, 'description')
    updateProductData({ parent: { product_description: value } })
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

        <Grid className='p-0 border shadow-none' sx={{ boxShadow: 3, borderRadius: 2 }}>
          <RichTextEditor value={productData.parent.product_description || ''} onChange={handleDescriptionChange} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
