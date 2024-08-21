'use client'
import { Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react'
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
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

const validationSchema = Yup.object().shape({
  product_title: Yup.string().required('Product Title is required'),
  brand_name: Yup.string().required('Brand name is required'),
  default_category: Yup.string().required('Default Category name is required'),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one category is required')
    .required('Categories are required'),
  tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required').required('Tags are required'),
  product_description: Yup.string().required('Product description is required'),
  product_type: Yup.string().required('Product type is required'),
  type_standard: Yup.string().required('Type standard is required'),
  published: Yup.string().required('Published is required')
})

export default function ProductFormWrapper({ onSubmit, initialData, brandData, isAddProduct, id }) {
  const { productData } = useProduct()
  const [loading, setLoading] = useState(false)
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {
      brand_name: '',
      default_category: '',
      categories: [],
      product_title: '',
      product_description: '',
      product_type: '',
      tags: [],
      type_standard: '',
      published: ''
    }
  })

  const metaValidation = meta => {
    if (Object.keys(meta).length == 0) {
      return 'Meta field should not be empty'
    }
    for (const [key, value] of Object.entries(meta)) {
      if (typeof key !== 'string' || typeof value !== 'string') {
        return 'Both key and value must be strings'
      }
      if (!key.trim() || !value.trim()) {
        return 'Both key and value are required in each meta field'
      }
    }
    return null
  }

  const validateVariants = data => {
    for (const child of data) {
      if (!child.variant_sku) {
        return 'Variant SKU cannot be empty'
      }
    }
    return null
  }

  const validateVideos = videos => {
    if (!videos || videos.length === 0 || videos.every(video => !video.video_src)) {
      return 'At least one video must be provided'
    }
    return null
  }

  const validateImages = images => {
    if (!images || images.length === 0 || images.every(image => !image.image_src)) {
      return 'At least one image must be provided'
    }
    return null
  }
  const handleSaveProduct = async data => {
    console.log('clicked submit')
    setLoading(true)
    const videoError = validateVideos(productData.videos)
    if (videoError) {
      toast.error(videoError)
      return
    }

    const imageError = validateImages(productData.images)
    if (imageError) {
      toast.error(imageError)
      return
    }

    const metaError = metaValidation(productData.meta)

    if (metaError) {
      toast.error(metaError)
      return
    }

    const variantError = validateVariants(productData.child)
    if (variantError) {
      toast.error(variantError)
      return
    }

    console.log('clicked data', data)

    const formatData = productData.child.map(child => ({
      ...data,
      metafields: productData.meta,
      ...child
    }))

    const product = {
      products: formatData,
      images: productData.images,
      videos: productData.videos
    }

    console.log('final format data', product)

    try {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}`
      const uploadProduct = `${baseUrl}/admin/products/uploadProduct`
      const editProduct = `${baseUrl}/admin/products/updateProduct/${id}`

      const url = isAddProduct ? uploadProduct : editProduct
      const method = isAddProduct ? 'POST' : 'PUT'
      const response = await fetchData(url, method, product)

      if (!response.success) {
        const errorMessage = response.message || 'An Error Occurred'
        toast.error(`Error: ${errorMessage}`)
        setLoading(false)
        return
      }

      const successMessage = response.message || 'Successfully done'
      toast.success(successMessage)
      setLoading(false)
    } catch (error) {
      console.error('An unexpected error occurred', error)
      toast.error(`Unexpected Error: ${error.message || 'An error occurred'}`)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const { reset } = methods

  useEffect(() => {
    if (productData && productData.parent) {
      reset(productData.parent)
    }
  }, [productData, reset])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSaveProduct)}>
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
