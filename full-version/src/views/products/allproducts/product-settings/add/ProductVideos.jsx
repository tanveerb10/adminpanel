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

export default function ProductVideos() {
  const { productData, addProductVideos, updateProductVideos, deleteProductVideos } = useProduct()
  const addOption = () => {
    addProductVideos()
  }

  const deleteOption = index => {
    deleteProductVideos(index)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Product Videos' />
          <CardContent>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={12} className=''>
                {productData.videos.map((video, index) => (
                  <Grid className='my-2' key={index}>
                    <CustomTextField
                      fullWidth
                      placeholder='Enter Vidoes Link'
                      value={video.video_src}
                      onChange={e => updateProductVideos(index, e.target.value)}
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
                {productData.videos.length < 5 && (
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => addOption()}
                    endIcon={<i className='tabler-plus' />}
                  >
                    Add Video
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
