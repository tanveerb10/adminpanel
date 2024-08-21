'use client'

// MUI Imports
import { MenuItem, CardContent, CardHeader, Card, Grid } from '@mui/material'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useProduct } from '../../productContext/ProductStateManagement'
import { TypeOfStandard } from '@/data/typeOfStandard/TypeOfStandard'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import { useFormContext, Controller } from 'react-hook-form'

const ProductOrganize = ({ brandName }) => {
  const { productData, updateProductParent } = useProduct()
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Controller
              name='brand_name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  fullWidth
                  label='Brand'
                  onChange={e => {
                    field.onChange(e)
                    updateProductParent({ brand_name: e.target.value })
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
                  label='Categories'
                  placeholder='Categories select'
                  fullWidth
                  initialOptions={productData.parent.categories || []}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductParent({ categories: newValue })
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
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    {...field}
                    options={productData.parent.categories || []}
                    onChange={(event, newValue) => {
                      field.onChange(newValue)
                      updateProductParent({ default_category: newValue, product_type: newValue })
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
              render={({ field }) => (
                <CustomCheckboxAutocomplete
                  {...field}
                  fullWidth
                  label='Enter Tags'
                  placeholder='Fashion, Trending, Summer'
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductParent({ tags: newValue })
                  }}
                  initialOptions={productData.parent.tags || []}
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
                  options={TypeOfStandard}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductParent({ type_standard: newValue })
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
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Published'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    updateProductParent({ published: e.target.value })
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
        </Grid>
      </CardContent>
    </Card>
  )
}
export default ProductOrganize
