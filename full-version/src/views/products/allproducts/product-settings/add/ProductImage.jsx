'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CustomTextField from '@/@core/components/mui/TextField'
import { IconButton, InputAdornment } from '@mui/material'

import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Grid } from '@mui/material'

const ProductImage = () => {
  const { productData, addProductImages, updateProductImages, deleteProductImages } = useProduct()
  const addOption = () => {
    addProductImages()
  }

  const deleteOption = index => {
    deleteProductImages(index)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Product Images' />
          <CardContent>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={12} className=''>
                {productData.images.map((img, index) => (
                  <Grid className='my-2' key={index}>
                    <CustomTextField
                      fullWidth
                      placeholder='Enter Image Link'
                      value={img.image_src}
                      onChange={e => updateProductImages(index, e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            {index > 0 && (
                              <IconButton className='min-is-fit' onClick={() => deleteOption(index)}>
                                <i className='tabler-x' />
                              </IconButton>
                            )}
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
    </Grid>
  )
}
export default ProductImage
