'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useProduct } from '../../productContext/ProductStateManagement'
import { TypeOfStandard } from '@views/products/allproducts/product-settings/add/TypeOfStandard'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

const ProductOrganize = ({ brandName }) => {
  const { productData, updateProductData } = useProduct()

  const handleInputChange = e => {
    const { name, value } = e.target
    console.log('name', name, 'value', value)
    updateProductData({ parent: { [name]: value } })
  }

  const handleArrayChange = (name, newValue) => {
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
        </CustomTextField>

        {/* <div className='flex items-end gap-4'> */}
          <CustomCheckboxAutocomplete
            label='Categories'
            placeholder='Categories select'
            fullWidth
            onChange={(event, newValue) => handleArrayChange('categories', newValue)}
            name='categories'
            initialOptions={productData.parent.categories || []}
          />
        {/* </div> */}

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
