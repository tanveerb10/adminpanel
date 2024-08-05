'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'
// import { IconButton } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
// import Checkbox from '@mui/material/Checkbox'
// import Chip from '@mui/material/Chip'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useProduct } from '../../productContext/ProductStateManagement'
import { TypeOfStandard } from '@views/products/allproducts/product-settings/add/TypeOfStandard'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

const movie = ['hello', 'zebra', 'zoo', 'animal']

const ProductOrganize = ({ brandName }) => {
  const { productData, updateProductData } = useProduct()

  const handleInputChange = e => {
    const { name, value } = e.target
    console.log('name', name, 'value', value)
    updateProductData({ parent: { [name]: value } })
  }

  const handleArrayChange = (name, newValue) => {
    // const { name, value } = e.target
    updateProductData({ parent: { [name]: newValue } })
  }

  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <CustomTextField
          select
          fullWidth
          label='Brand'
          name='brand_name'
          value={productData.parent.brand_name || ''}
          onChange={handleInputChange}
        >
          {brandName?.allBrand?.map(brand => (
            <MenuItem value={brand.brand_name} key={brand._id}>
              {brand.brand_name}
            </MenuItem>
          ))}
          {/* <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
          <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
          <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem> */}
        </CustomTextField>

        <div className='flex items-end gap-4'>
          <CustomCheckboxAutocomplete
            label='Categories'
            placeholder='Categories select'
            fullWidth
            onChange={(event, newValue) => handleArrayChange('categories', newValue)}
            name='categories'
            initialOptions={productData.parent.categories || []}
          />
        </div>

        <CustomTextField
          select
          fullWidth
          label='Published'
          name='published'
          value={productData.parent.published || ''}
          onChange={handleInputChange}
        >
          <MenuItem value='TRUE'>True</MenuItem>
          <MenuItem value='FALSE'>False</MenuItem>
        </CustomTextField>

        <CustomCheckboxAutocomplete
          fullWidth
          label='Enter Tags'
          placeholder='Fashion, Trending, Summer'
          onChange={(event, value) => handleArrayChange('tags', value)}
          name='tags'
          // initialOptions={productData.parent.tags_name}
          initialOptions={productData.parent.tags || []}
        />

        <CustomAutocomplete
          fullWidth
          value={productData.parent.type_standard || ''}
          options={TypeOfStandard}
          onChange={(event, newValue) => {
            updateProductData({ parent: { type_standard: newValue } })
          }}
          getOptionLabel={option => option}
          renderInput={params => <CustomTextField {...params} placeholder='Standard Type' label='Standard Type' />}
        />

        {/* {productData.parent.categories.length()} */}

        {productData.parent.categories.length > 0 ? (
          <CustomAutocomplete
            fullWidth
            value={productData.parent.default_category}
            options={productData.parent.categories || []}
            onChange={(event, newValue) => {
              updateProductData({ parent: { default_category: newValue, product_type: newValue } })
            }}
            getOptionLabel={option => option}
            renderInput={params => (
              <CustomTextField {...params} placeholder='Default Categories' label='Default Categories' />
            )}
          />
        ) : (
          <CustomTextField fullWidth select disabled placeholder='Default Categories' label='Default Categories' />
        )}
      </CardContent>
    </Card>
  )
}
export default ProductOrganize
// console.log(selectedOption)
// const handleArrayChange = (list) => {
//   console.log({list})
//   setProductData(prev=>({...prev,"categories":[...list]}))
// }
{
  /* <CustomCheckboxAutocomplete
              label='Categories'
              placeholder='Categories select'
              fullWidth
              name="categories"
              // onChange={(event,newValue)=> setSelectedOption(newValue)}
              // handleArrayChange={handleArrayChange}
              onChange={handleArrayChange}
            /> */
}
{
  /* <CustomCheckboxAutocomplete
              fullWidth
              label='Enter Tags'
              placeholder='Fashion, Trending, Summer'
              // onChange={(value)=>handleArrayChange("tags", value)}
              // onChange={handleArrayChange}
              onChange={(event,newValue)=>selectedOption(newValue)}
              name="tags"
            /> */
}
