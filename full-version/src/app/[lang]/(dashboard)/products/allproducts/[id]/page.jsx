'use client'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState} from 'react'
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
  const [brandData, setBrandData] = useState([])
  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
  const responsedata = fetchData(brandUrl, 'GET')
  
      .then(response => {
        console.log('Get brands data', response)
        setBrandData(response)
      })
      .catch(error => {
        console.log('error got', error)
      })
  }, [])

  console.log(productData.child.length, 'length')

  // const result = []
  // for (const item of productData.child) {
  //   const newDataStructure = {...productData.parent, meta :productData.meta, ...item}
  //   result.push(newDataStructure)
  // }

  const res = productData.child.map(child => ({ ...productData.parent, metafields: productData.meta, ...child }))
  console.log(res, 'result')
  const handleSaveProduct = async () => {
    const product = {
      products: res,
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
    const response = await fetchData(
      `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/uploadProduct`,
      'POST',
      product
    )
    console.log('Product Data', response)
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
          <ProductOrganize brandName={ brandData} />
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
