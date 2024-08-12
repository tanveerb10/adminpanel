'use client'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductAddHeader from '@/views/products/allproducts/product-settings/add/ProductAddHeader'
import ProductInformation from '@/views/products/allproducts/product-settings/add/ProductInformation'
import ProductImage from '@/views/products/allproducts/product-settings/add/ProductImage'
import ProductVariants from '@/views/products/allproducts/product-settings/add/ProductVariants'
import ProductOrganize from '@/views/products/allproducts/product-settings/add/ProductOrganize'
import fetchData from '@/utils/fetchData'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import Metafield from '@views/products/allproducts/product-settings/add/Metafield'
import { toast } from 'react-toastify'
import { useForm, FormProvider } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
  const { productData, updateProductData, updateChildData } = useProduct()
  const [brandData, setBrandData] = useState([])
  const [loading, setLoading] = useState(false)
  const [singleProductData, setSingleProductData] = useState([])
  // const [validationErrors, setValidationErrors] = useState([])

  const methods = useForm({
    resolver: yupResolver(validationSchema)
    // defaultValues: {parent : productData.parent}
    // defaultValues: { meta: productData.meta }
  })

  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
    fetchData(brandUrl, 'GET')
      .then(response => {
        // console.log('Get brands data', response)
        setBrandData(response)
      })
      .catch(error => {
        console.log('error got', error)
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

  const handleSaveProduct = async data => {
    console.log('Data', data)
    setLoading(true)
    const product = {
      products: formatData,
      images: [
        {
          image_src: 'https://www.dropbox.com/image1.jpg',
          image_position: 1
        }
      ],
      videos: [
        {
          video_src: 'http://example.com/video.mp4'
        }
      ]
    }

    try {
      const response = await fetchData(
        `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/uploadProduct`,
        'POST',
        product
      )
      if (!response.ok) {
        toast.error('Got Error', response.message)
      } else {
        toast.success(response.message)
      }
    } catch (error) {
      console.error('Got Error', error)
      toast.error('Got Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getSingleProduct = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/getproduct/66b21943c355ec500ef1384f`
    fetchData(getSingleProduct, 'GET')
      .then(response => {
        console.log('Get single product data', response)
        setSingleProductData(response)
        // console.log('singgle product data', singleProductData)
        const singleParent = response?.finalProduct?.products[0]
        console.log('singleeeeeee', singleParent)
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
          updateProductData({
            parent: {
              brand_name,
              default_category,
              categories,
              product_description,
              product_title,
              product_type,
              tags,
              published,
              type_standard
            },
            meta: metafields
          })
          console.log(brand_name, 'brand data')
          const childData = response?.finalProduct?.products?.map(childVariant => {
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
            //   // const updateChildData =
          })
          console.log('childddddd', childData)
          updateChildData(childData)
          console.log(productData)
        }
      })
      .catch(error => {
        console.log('error got', error)
      })
  }, [])

  // console.log('singlrProductdata', singleProductData?.finalProduct?.products)
  // useEffect(()=>{},[])

  // console.log('rest ', [...childData])
  // const updateChildData = updateProductData({ child: [...childData] })

  // useEffect(() => {
  //   if (singleProductData?.finalProduct?.products) {
  //     const childData = singleProductData.finalProduct.products.map(product => {
  //       const {
  //         brand_name,
  //         default_category,
  //         categories,
  //         product_description,
  //         product_title,
  //         product_type,
  //         is_deleted,
  //         tags,
  //         published,
  //         type_standard,
  //         metafields,
  //         ...rest
  //       } = product
  //       console.log('rest', rest)
  //       return { ...rest }
  //     })

  //     updateProductData(prevState => ({
  //       ...prevState,
  //       child: childData
  //     }))
  //   }
  // }, [singleProductData])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSaveProduct)}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductAddHeader />
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProductInformation />
            </Grid>
            <Grid item xs={12}>
              <ProductVariants />
            </Grid>
            <Grid item xs={12}>
              <ProductImage />
            </Grid>
            <Grid item xs={12}>
              <ProductOrganize brandName={brandData} />
            </Grid>
            <Grid item xs={12}>
              <Metafield />
            </Grid>
          </Grid>
          {/* {validationErrors.length > 0 && (
            <div>
              {validationErrors.map((error, idx) => (
                <div key={idx}>
                  Variant {error.index + 1}: {error.message}
                </div>
              ))}
            </div>
          )} */}

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
