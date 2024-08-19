'use client'
import React, { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import ProductFormWrapper from '@views/products/allproducts/product-settings/add/ProductFormWrapper'

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

export default function Page() {
  const { productData, setProductData } = useProduct()
  const [brandData, setBrandData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [validationErrors, setValidationErrors] = useState([])

  const methods = useForm({
    // defaultValues: {productData.parent, }
    resolver: yupResolver(validationSchema)
  })
  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
    fetchData(brandUrl, 'GET')
      .then(response => {
        // console.log('Get brands data', response)
        setBrandData(response)
      })
      .catch(error => {
        console.log('error got in brand', error)
      })
  }, [])

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

  const variantValidation = data => {
    if (data.variant_sku === '') {
      console.log("it's empty")
    }
    return null
  }
  const submitCheck = data => {
    const metaError = metaValidation(productData.meta, 'check meta atiadat')

    if (metaError) {
      toast.error(metaError)
      return
    }
    const formatData = productData.child.map(child => ({
      ...productData.parent,
      metafields: productData.meta,
      ...child
    }))
    console.log({ formatData })
    console.log('submittt', data)
    const vaariantvalid = variantValidation(formatData)
    console.log({ vaariantvalid })
  }

  const formatData = productData.child.map(child => ({
    ...productData.parent,
    metafields: productData.meta,
    ...child
  }))
  // console.log({ formatData })

  const handleSaveProduct = async data => {
    console.log('fetch Data', formatData)
    console.log('clicked submit')
    console.log('clicked data', data)
    // setLoading(true)
    const product = {
      products: formatData,
      images: productData.images,
      //   [
      //   {
      //     image_src: 'https://www.dropbox.com/image1.jpg',
      //     image_position: 1
      //   }
      // ],
      videos: productData.videos
      // [
      //   {
      //     video_src: 'http://example.com/video.mp4'
      //   }
      // ]
    }

    console.log('final format data', product)

    // try {
    //   const response = await fetchData(
    //     `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/uploadProduct`,
    //     'POST',
    //     product
    //   )
    //   if (!response.ok) {
    //     toast.error('Got Error', response.message)
    //   } else {
    //     toast.success(response.message)
    //   }
    // } catch (error) {
    //   console.error('Got Error', error)
    //   toast.error('Got Error', error.message)
    // } finally {
    //   setLoading(false)
    // }
  }

  useEffect(() => {
    if (id !== 'addnewproduct') {
      const getSingleProduct = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/getproduct/${id}`
      setLoading(true)
      try {
        fetchData(getSingleProduct, 'GET').then(response => {
          handleEdit(response)
          console.log('Get single product data', response)
          // setSingleProductData(response)
          setLoading(false)
        })
      } catch (error) {
        console.log('error got', error)
        setLoading(false)
      }
    }
  }, [])

  const handleEdit = singleProductData => {
    const singleParent = singleProductData?.finalProduct?.products[0]
    console.log('singleeeeeee', singleParent)
    const singleVideo = singleProductData?.finalProduct?.videos
    const singleImage = singleProductData?.finalProduct.images
    // console.log('singleVideo', singleVideo, 'singleImage', singleImage)
    if (singleParent) {
      const {
        brand_name,
        default_category,
        categories,
        product_description,
        product_title,
        product_type,
        is_deleted,
        tags,
        published,
        type_standard,
        metafields,
        ...rest
      } = singleParent

      const parData = {
        brand_name,
        default_category,
        categories,
        product_description,
        product_title,
        product_type,
        tags,
        published,
        type_standard
      }
      const parmeta = metafields

      const childData = singleProductData?.finalProduct?.products?.map(childVariant => {
        const {
          brand_name,
          default_category,
          categories,
          product_description,
          product_title,
          product_type,
          is_deleted,
          tags,
          published,
          type_standard,
          metafields,
          ...rest
        } = childVariant
        return rest
      })

      setProductData({
        parent: parData,
        meta: parmeta,
        videos: singleVideo,
        images: singleImage,
        child: childData
      })
    }
  }

  if (loading) {
    // need to check loading
    return <div>Loading...</div>
  }

  // if (role !== 'superadmin') {
  //   setTimeout(() => router.push('/'), 3000)
  //   return <div>wait you are going to redirect because you are not super admin...</div>
  // }
  if (error) {
    return <div>No data available</div>
  }

  if (id == 'addnewproduct') {
    return (
      // <FormProvider {...methods}>
      //   <form onSubmit={methods.handleSubmit(handleSaveProduct)}>
      //     <Grid container spacing={6}>
      //       <Grid item xs={12}>
      //         <ProductAddHeader />
      //       </Grid>
      //       <Grid container spacing={6}>
      //         <Grid item xs={12}>
      //           <ProductInformation />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <ProductVariants />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <ProductImage />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <ProductOrganize brandName={brandData} />
      //         </Grid>
      //         <Grid item xs={12}>
      //           <Metafield />
      //         </Grid>
      //       </Grid>
      //       <Grid item xs={12}>
      //         <Button variant='contained' type='submit' disabled={loading}>
      //           {loading ? 'Saving...' : 'Save Product'}
      //         </Button>
      //       </Grid>
      //     </Grid>
      //   </form>
      // </FormProvider>
      <ProductFormWrapper onSubmit={handleSaveProduct} brandData={brandData} loading={loading} isAddProduct={true} />
    )
  }
  return (
    // <FormProvider {...methods}>
    //   <form onSubmit={methods.handleSubmit(handleSaveProduct)}>
    //     <Grid container spacing={6}>
    //       <Grid item xs={12}>
    //         <ProductAddHeader />
    //       </Grid>
    //       <Grid container spacing={6}>
    //         <Grid item xs={12}>
    //           <ProductInformation />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <ProductVariants />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <ProductImage />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <ProductOrganize brandName={brandData} />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Metafield />
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Button variant='contained' type='submit' disabled={loading}>
    //           {loading ? 'Saving...' : 'Save Product'}
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </FormProvider>
    <ProductFormWrapper
      onSubmit={handleSaveProduct}
      brandData={brandData}
      loading={loading}
      initialData={productData.parent}
    />
  )
}
