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
// import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useProduct } from '../../productContext/ProductStateManagement'
const movie = ['hello', 'zebra', 'zoo', 'animal']

const ProductOrganize = () => {
  const { productData, updateProductData } = useProduct()

  const handleInputChange = e => {
    const { name, value } = e.target
    updateProductData({parent :{ [name]: value }})
  }

  const handleArrayChange = (name, newValue) => {
    // const { name, value } = e.target
    updateProductData({parent:{ [name]: newValue }})
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
          value={productData.brand_name || ''}
          onChange={handleInputChange}
        >
          <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
          <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
          <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
        </CustomTextField>
        <div className='flex items-end gap-4'>
          <CustomCheckboxAutocomplete
            label='Categories'
            placeholder='Categories select'
            fullWidth
            onChange={(event, newValue) => handleArrayChange('categories', newValue)}
            // onChange={handleInputChange}
            name='categories'
            initialOptions={productData.categories || []}
          />
        </div>
        <CustomTextField
          select
          fullWidth
          label='Published'
          name='published'
          value={productData.published || ''}
          onChange={handleInputChange}
        >
          <MenuItem value='true'>true</MenuItem>
          <MenuItem value='false'>False</MenuItem>
        </CustomTextField>

        <CustomCheckboxAutocomplete
          fullWidth
          label='Enter Tags'
          placeholder='Fashion, Trending, Summer'
          onChange={(event, value) => handleArrayChange('tags', value)}
          name='tags'
          // initialOptions={selectedOption.tags}
          initialOptions={productData.tags || []}
        />
        
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
