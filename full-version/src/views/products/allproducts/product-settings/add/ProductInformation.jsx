'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Controller, useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
const RichTextEditor = dynamic(() => import('@/libs/RichTextEditor'), { ssr: false })

const ProductInformation = () => {
  const { productData, updateProductParent } = useProduct()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const handleDescriptionChange = value => {
    updateProductParent({ product_description: value })
  }
  console.log(productData, 'product data information')
  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name='product_title'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label='Product Title'
                  fullWidth
                  placeholder='Product name'
                  onChange={e => {
                    field.onChange(e)
                    updateProductParent({ product_title: e.target.value })
                  }}
                  error={!!errors.product_title}
                  helperText={errors.product_title ? errors.product_title.message : ''}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography className='mbe-1'>Description</Typography>

        <Grid className='p-0 border shadow-none' sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Controller
            name='product_description'
            control={control}
            render={({ field }) => (
              <RichTextEditor
                {...field}
                label
                onChange={value => {
                  field.onChange(value)
                  handleDescriptionChange(value)
                }}
              />
            )}
          />
          {errors.product_description && <Typography color='error'>{errors.product_description.message}</Typography>}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
