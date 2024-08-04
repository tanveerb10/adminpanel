'use client'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import ProductSettings from '@/views/products/allproducts/product-settings/index'
import ProductAddHeader from '@/views/products/allproducts/product-settings/add/ProductAddHeader'
import ProductInformation from '@/views/products/allproducts/product-settings/add/ProductInformation'
import ProductImage from '@/views/products/allproducts/product-settings/add/ProductImage'
import ProductVariants from '@/views/products/allproducts/product-settings/add/ProductVariants'
import ProductOrganize from '@/views/products/allproducts/product-settings/add/ProductOrganize'
import fetchData from '@/utils/fetchData'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import Metafield from '@views/products/allproducts/product-settings/add/Metafield'

// const [productData, setProductData] = useState({})
// const tagUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/tags/${id}`

// const { state, addProduct, updateProduct } = useProduct()

// const [imageData, setImageData] = useState({ image_src: '', image_position: 1 });
// const [videoData, setVideoData] = useState({ video_src: '' });

export default function Page() {
  const { productData } = useProduct()
  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
    fetchData(brandUrl, 'GET')
      .then(response => {
        console.log('Get brands data', response)
      })
      .catch(error => {
        console.log('error got', error)
      })
  }, [])

  const handleSaveProduct = () => {
    console.log('Product Data', productData)
  }

  return (
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
          <ProductOrganize />
        </Grid>
        <Grid item xs={12}>
          <Metafield />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' onClick={handleSaveProduct}>
          Save Product
        </Button>
      </Grid>
    </Grid>
  )
}
