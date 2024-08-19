'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
// import RichTextEditor from '@/libs/RichTextEditor'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Controller, useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
const RichTextEditor = dynamic(() => import('@/libs/RichTextEditor'), { ssr: false })

const ProductInformation = () => {
  const { productData, updateProductParent } = useProduct()
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()
  console.log('doing console from oarent information', productData)

  const handleDescriptionChange = value => {
    updateProductParent({ product_description: value })
  }

  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            {/* <CustomTextField
              fullWidth
              label='Product Title'
              name='product_title'
              placeholder='Product name'
              value={productData.parent.product_title || ''}
              // onChange={handleInputChange}
              {...register('product_title', {
                onChange: (e)=>updateProductData({ parent: { 'product_title': e.target.value } })
              })}
              error={!!errors.product_title}
              helperText={errors.product_title ? errors.product_title.message : ""}
            />  */}
            <Controller
              name='product_title'
              control={control}
              // defaultValue={product_title || ''}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  // value={productData.parent.product_title || ''}
                  label='Product Title'
                  fullWidth
                  placeholder='Product name'
                  // value={field.value || ''}
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
                // value={productData.parent.product_description || ''}
                // value={field.value}
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
