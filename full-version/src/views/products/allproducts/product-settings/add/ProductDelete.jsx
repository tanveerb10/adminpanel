'use client'

import { Typography, Button, CardContent, CardHeader, Card, Grid } from '@mui/material'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'

const ProductDelete = () => {
  const { productData, updateProductParent } = useProduct()

  const currentStatus = productData.parent.is_deleted ? 'Deactivated' : 'Activated'
  const status = productData.parent.is_deleted
  const name = productData.parent.product_title

  const handleSubmit = () => {
    console.log(currentStatus)
    console.log(!status)
    updateProductParent({ is_deleted: !status })
  }

  return (
    <Card>
      <CardHeader title={`${currentStatus} product`} />
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Currently {name} product is {currentStatus}
        </Typography>
        <Grid container gap={5}>
          <Button variant='contained' color='success' disabled={!status} onClick={handleSubmit}>
            Activate Product
          </Button>

          <Button variant='contained' color='error' disabled={status} onClick={handleSubmit}>
            Deactivate Product
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductDelete
