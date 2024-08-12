'use client'

// MUI Imports
import { MenuItem, CardContent, CardHeader, Card, Grid, useFormControl } from '@mui/material'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useProduct } from '../../productContext/ProductStateManagement'
import { TypeOfStandard } from '@views/products/allproducts/product-settings/add/TypeOfStandard'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import { useFormContext, Controller } from 'react-hook-form'

const ProductOrganize = ({ brandName }) => {
  const { productData, updateProductData } = useProduct()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  // const handleInputChange = e => {
  //   const { name, value } = e.target
  //   console.log('name', name, 'value', value)
  //   updateProductData({ parent: { [name]: value } })
  // }

  const handleArrayChange = (name, newValue) => {
    updateProductData({ parent: { [name]: newValue } })
  }
const movie = ['hello','movie','sjkdl']
  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        {/* <Grid container spacing={6}>
          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <CustomCheckboxAutocomplete
              label='Categories'
              placeholder='Categories select'
              fullWidth
              onChange={(event, newValue) => handleArrayChange('categories', newValue)}
              name='categories'
              initialOptions={productData.parent.categories || []}
            />
          </Grid>

          
          <Grid item xs={12}>
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
          </Grid>
          

          <Grid item xs={12}>
            <CustomCheckboxAutocomplete
              fullWidth
              label='Enter Tags'
              placeholder='Fashion, Trending, Summer'
              onChange={(event, value) => handleArrayChange('tags', value)}
              name='tags'
              initialOptions={productData.parent.tags || []}
            />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
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
          </Grid>
        </Grid> */}
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Controller
              name='brand_name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                {...field}
                select
                value={productData.parent.brand_name || ''}
                  fullWidth
                  label='Brand'
                  onChange={e => {
                    field.onChange(e)
                    updateProductData({ parent: { brand_name: e.target.value } })
                  }}
                  error={!!errors.brand_name}
                  helperText={errors.brand_name ? errors.brand_name.message : ''}
                >
                  {brandName?.allBrand?.map(brand => (
                    <MenuItem value={brand.brand_name} key={brand._id}>
                      {brand.brand_name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='categories'
              control={control}
              render={({ field }) => (
                <CustomCheckboxAutocomplete
                {...field}
                value={productData.parent.categories || []}
                label='Categories'
                  placeholder='Categories select'
                  fullWidth
                  initialOptions={productData.parent.categories || []}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    // handleArrayChange('categories', newValue)
                    updateProductData({ parent: { categories: newValue } })
                  }}
                  error={!!errors.categories}
                  helperText={errors.categories ? errors.categories.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {productData.parent.categories.length > 0 ? (
              <Controller
                name='default_category'
                control={control}
                defaultValue={productData.parent.default_category || ''}
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    {...field}
                    options={productData.parent.categories || []}
                    onChange={(event, newValue) => {
                      field.onChange(newValue)
                      updateProductData({ parent: { default_category: newValue, product_type: newValue } })
                    }}
                    getOptionLabel={option => option}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        placeholder='Default Categories'
                        label='Default Categories'
                        error={!!errors.default_category}
                        helperText={errors.default_category ? errors.default_category.message : ''}
                      />
                    )}
                  />
                )}
              />
            ) : (
              <CustomTextField fullWidth select disabled placeholder='Default Categories' label='Default Categories' />
            )}
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='tags'
              control={control}
              // rules={{ required: 'Please add something' }}
              render={({ field }) => (
                <CustomCheckboxAutocomplete
                {...field}
                value={productData.parent.tags || []}
                  fullWidth
                  label='Enter Tags'
                  placeholder='Fashion, Trending, Summer'
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductData({ parent: { tags: newValue } })
                    // handleArrayChange('tags', newValue)
                  }}
                  initialOptions={productData.parent.tags}
                  error={!!errors.tags}
                  helperText={errors.tags ? errors.tags.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='type_standard'
              control={control}
              render={({ field }) => (
                <CustomAutocomplete
                {...field}
                  fullWidth
                  value={productData.parent.type_standard || ''}
                  options={TypeOfStandard}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductData({ parent: { type_standard: newValue } })
                  }}
                  getOptionLabel={option => option}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      placeholder='Standard Type'
                      label='Standard Type'
                      error={!!errors.type_standard}
                      helperText={errors.type_standard ? errors.type_standard.message : ''}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='published'
              control={control}
              defaultValue={productData.parent.published || ''}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Published'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    updateProductData({ parent: { published: e.target.value } })
                  }}
                  error={!!errors.published}
                  helperText={errors.published ? errors.published.message : ''}
                >
                  <MenuItem value='TRUE'>True</MenuItem>
                  <MenuItem value='FALSE'>False</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomCheckboxAutocomplete 
              onChange={(event, newValue) => handleArrayChange('check', newValue)}
              initialOptions={productData.parent.tags}
          /></Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default ProductOrganize
