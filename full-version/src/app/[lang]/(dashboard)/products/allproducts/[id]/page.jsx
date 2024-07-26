'use client'
import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import ProductSettings from '@/views/products/allproducts/product-settings/index'
import ProductAddHeader from '@/views/products/allproducts/product-settings/add/ProductAddHeader'
import ProductInformation from '@/views/products/allproducts/product-settings/add/ProductInformation'
import ProductImage from '@/views/products/allproducts/product-settings/add/ProductImage'
import ProductVariants from '@/views/products/allproducts/product-settings/add/ProductVariants'
import ProductInventory from '@/views/products/allproducts/product-settings/add/ProductInventory'
import ProductPricing from '@/views/products/allproducts/product-settings/add/ProductPricing'
import ProductOrganize from '@/views/products/allproducts/product-settings/add/ProductOrganize'
// import {CheckboxAutocomplete} from '@/libs/components/CheckboxAutocomplete'
// import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import fetchData from '@/utils/fetchData'
// import VariantCombinationTable from '@/views/products/allproducts/product-settings/add/VariantCombinationTable'
import {ProductProvider} from '@views/products/allproducts/productContext/ProductStateManagement'
export default function Page() {
  // const movie = [
  //   { label: 'The Shawshank Redemption', year: 1994 },
  //   { label: 'The Godfather', year: 1972 },
  //   { label: 'The Godfather: Part II', year: 1974 },
  //   { label: 'The Dark Knight', year: 2008 },
  //   { label: '12 Angry Men', year: 1957 },
  //   { label: "Schindler's List", year: 1993 },
  //   { label: 'Pulp Fiction', year: 1994 },
  //   { label: 'Amadeus', year: 1984 },
  //   { label: 'To Kill a Mockingbird', year: 1962 },
  //   { label: 'Toy Story 3', year: 2010 },
  //   { label: 'Logan', year: 2017 },
  //   { label: 'Full Metal Jacket', year: 1987 },
  //   { label: 'Dangal', year: 2016 },
  //   { label: 'The Sting', year: 1973 },
  //   { label: '2001: A Space Odyssey', year: 1968 },
  //   { label: "Singin' in the Rain", year: 1952 },
  //   { label: 'Toy Story', year: 1995 },
  //   { label: 'Bicycle Thieves', year: 1948 },
  //   { label: 'The Kid', year: 1921 },
  //   { label: 'Inglourious Basterds', year: 2009 },
  //   { label: 'Snatch', year: 2000 },
  //   { label: '3 Idiots', year: 2009 },
  //   { label: 'Monty Python and the Holy Grail', year: 1975 }
  // ]

  const [productData, setProductData] = useState({
    title: '',
    description: '',
    images: [],
    brand: '',
    categories: [],
    published: '',
    tags: [],
    countryOfOrigin: '',
    variants: []
  })

  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
    // const tagUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/tags/${id}`
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
    // <ProductProvider></ProductProvider>
    <Grid container spacing={6}>
      {/* ============================================================== */}
      {/* <Grid item xs={12}>
        <CustomCheckboxAutocomplete placeholder='test check' label='test option' optionKey='label' initialOptions={movie}/>
      </Grid> */}
      {/* ============================================================== */}
      <Grid item xs={12}>
        <ProductAddHeader />
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ProductInformation setProductData={setProductData} />
        </Grid>
        {/* <Grid item xs={12}>
            <ProductImage />
          </Grid> */}
        <Grid item xs={12}>
          <ProductVariants setProductData={setProductData} />
        </Grid>
        <Grid item xs={12}>
          <ProductImage setProductData={setProductData} />
        </Grid>
        <Grid item xs={12}>
          <ProductOrganize setProductData={setProductData} />
        </Grid>
        {/* <Grid item xs={12}>
            <ProductInventory />
          </Grid> */}
      </Grid>
      {/* <Grid item xs={12} md={8}>
      </Grid> */}
      {/* <Grid item xs={12} md={4}> */}
      {/* <Grid container spacing={6}> */}
      {/* <Grid item xs={12}>
                <ProductPricing />
              </Grid> */}

      {/* </Grid> */}

      {/* </Grid> */}
      {/* <Grid>
            <ProductVariants />
          </Grid> */}
      {/* <Testing/> */}
      <Grid item xs={12}>
        <Button variant='contained' onClick={handleSaveProduct}>
          Save Product
        </Button>
      </Grid>
    </Grid>
  )
}
