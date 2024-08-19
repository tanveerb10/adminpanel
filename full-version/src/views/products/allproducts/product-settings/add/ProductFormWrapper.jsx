'use client'
import { Grid, Button } from '@mui/material'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductAddHeader from '@/views/products/allproducts/product-settings/add/ProductAddHeader'
import ProductInformation from '@/views/products/allproducts/product-settings/add/ProductInformation'
import ProductImage from '@/views/products/allproducts/product-settings/add/ProductImage'
import ProductVideos from '@/views/products/allproducts/product-settings/add/ProductVideos'
import ProductVariants from '@/views/products/allproducts/product-settings/add/ProductVariants'
import ProductOrganize from '@/views/products/allproducts/product-settings/add/ProductOrganize'
import Metafield from '@/views/products/allproducts/product-settings/add/Metafield'
import ProductDelete from '@/views/products/allproducts/product-settings/add/ProductDelete'
import { useProduct } from '../../productContext/ProductStateManagement'
// import { useEffect } from 'react'

const validationSchema = Yup.object().shape({
  product_title: Yup.string().required('Product Title is required'),
  brand_name: Yup.string().required('Brand name is required'),
  default_category: Yup.string().required('Default Category name is required'),
  categories: Yup.array().of(Yup.string()).required('Categories are required'),
  tags: Yup.array().of(Yup.string()).required('Tags are required'),
  product_description: Yup.string().required('Product description is required'),
  product_type: Yup.string().required('Product type is required'),
  type_standard: Yup.string().required('Type standard is required'),
  published: Yup.string().required('Published is required')

  // meta: Yup.object()
  //   .test('is-empty', 'Meta field should not be empty', value => {
  //     return Object.keys(value).length > 0
  //   })
  //   .test('key-value-pairs', 'Both key and value are required in each meta field', value => {
  //     return Object.entries(value).every(([key, val]) => key.trim() !== '' && val.trim() !== '')
  //   })

  // variant_sku: '',
  // variant_inventory_qty: 0,
  // variant_compare_at_price: null,
  // variant_price: 0,
  // variant_weight: 0,
  // variant_length: 0,
  // variation_weight_unit: "g",
  // variant_width: 0,
  // variant_height: 0,

  // const metafield = {}
})
export default function ProductFormWrapper({ onSubmit, initialData, brandData, loading, isAddProduct }) {
  const { productData } = useProduct()
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData
  })

  const { reset } = methods

  // Use useEffect to reset form values when productData changes
  useEffect(() => {
    if (productData) {
      reset(productData.parent) // Reset the form values when productData changes
    }
  }, [productData, reset])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductAddHeader />
          </Grid>
          <Grid item xs={12}>
            <ProductInformation />
          </Grid>
          <Grid item xs={12}>
            <ProductVariants isAddProduct={isAddProduct} />
          </Grid>
          <Grid item xs={12}>
            <ProductImage />
          </Grid>
          <Grid item xs={12}>
            <ProductVideos />
          </Grid>
          <Grid item xs={12}>
            <ProductOrganize brandName={brandData} />
          </Grid>
          {!isAddProduct && (
            <Grid item xs={12}>
              <ProductDelete />
            </Grid>
          )}
          <Grid item xs={12}>
            <Metafield />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' type='submit' disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}
