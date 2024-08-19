'use client'
import React, { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import ProductFormWrapper from '@views/products/allproducts/product-settings/add/ProductFormWrapper'

export default function Page() {
  const { productData, setProductData } = useProduct()
  const [brandData, setBrandData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [validationErrors, setValidationErrors] = useState([])

  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
    fetchData(brandUrl, 'GET')
      .then(response => {
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
      // ...productData.parent,
      ...data,
      metafields: productData.meta,
      ...child
    }))
    // setLoading(true)
    const product = {
      products: formatData,
      images: productData.images,
      videos: productData.videos
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
      <ProductFormWrapper onSubmit={handleSaveProduct} brandData={brandData} loading={loading} isAddProduct={true} />
    )
  }
  return (
    <ProductFormWrapper
      onSubmit={handleSaveProduct}
      brandData={brandData}
      loading={loading}
      initialData={productData.parent}
    />
  )
}
