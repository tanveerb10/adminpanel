'use client'

// React Imports
import { useEffect, useReducer, memo, useState, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
// import Typography from '@mui/material/Typography'
import VariantCombinationTable from './VariantCombinationTable'
import debounce from 'lodash.debounce'
import { useProduct } from '@/views/products/allproducts/productContext/ProductStateManagement'

const ProductVariants = () => {
  const [formData, setFormData] = useState([
    {
      option_name: 'Size',
      option_values: [
        {
          option_value: ''
        }
      ]
    }
  ])
  const [variantTableData, setVariantTableData] = useState([])

  // const handleChange = (index, e) => {
  //   const newFormData = formData.map((data, i) =>
  //     i === index ? { ...data, option_name: e.target.value } : data
  //   );
  //   setFormData(newFormData);
  // };

  // const deleteInput = (optionIndex, variantIndex) => {
  //   const newFormData = formData.map((data, i) =>
  //     i === optionIndex ? { ...data, option_values: data.option_values.filter((_, vIndex) => vIndex !== variantIndex) } : data
  //   );
  //   setFormData(newFormData);
  // };

  // const addOption = () => {
  //   setFormData([...formData, { option_name: 'Size', option_values: [''] }]);
  // };

  // const deleteForm = (optionIndex) => {
  //   setFormData(formData.filter((_, index) => index !== optionIndex));
  // };

  // const variantInput = (e, optionIndex, variantIndex) => {
  //   const newFormData = formData.map((data, i) => {
  //     if (i === optionIndex) {
  //       const newValues = data.option_values.map((value, vIndex) =>
  //         vIndex === variantIndex ? e.target.value : value
  //       );
  //       if (e.target.value.length === 1 && variantIndex === data.option_values.length - 1) {
  //         newValues.push('');
  //       }
  //       return { ...data, option_values: newValues };
  //     }
  //     return data;
  //   });
  //   setFormData(newFormData);
  // };

  const handleChange = useCallback((index, e) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      newFormData[index].option_name = e.target.value
      return newFormData
    })
  }, [])

  const deleteInput = useCallback((optionIndex, variantIndex) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      newFormData[optionIndex].option_values = newFormData[optionIndex].option_values.filter(
        (_, vIndex) => vIndex !== variantIndex
      )
      return newFormData
    })
  }, [])

  const addOption = useCallback(() => {
    setFormData(prevFormData => [...prevFormData, { option_name: 'Size', option_values: [{
      option_value: ''
    }] }])
  }, [])

  const deleteForm = useCallback(optionIndex => {
    setFormData(prevFormData => prevFormData.filter((_, index) => index !== optionIndex))
  }, [])
  const variantInput = useCallback((e, optionIndex, variantIndex) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      const newValues = [...newFormData[optionIndex].option_values]
      newValues[variantIndex].option_value = e.target.value

      if (e.target.value.length === 1 && variantIndex === newValues.length - 1) {
        newValues.push({option_value: ''})
      }

      newFormData[optionIndex].option_values = newValues
      return newFormData
    })
  }, [])

  useEffect(() => {
    const newVariantTableData = formData.map(option => ({
      option_name: option.option_name,
      option_values: option.option_values.filter(opt => opt.option_value !== '')
    }))
    setVariantTableData(newVariantTableData)
  }, [formData])
  // const addVariant = () => {
  //   setProductData(prev => ({ ...prev, variants: [...prev.variants, { name: '', value: '' }] }));
  // };

  console.log('formData', formData)
  console.log('variant data table', variantTableData)
  return (
    <Grid container className='flex flex-col gap-3'>
      <Card>
        <CardHeader title='Product Variants' />
        <CardContent>
          <Grid container spacing={6}>
            {formData.map((variants, optionIndex) => (
              <Grid key={optionIndex} item xs={12} className='repeater-item'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={4}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Options Name'
                      value={variants.option_name}
                      onChange={e => handleChange(optionIndex, e)}
                      defaultValue='Size'
                    >
                      <MenuItem value='Size'>Size</MenuItem>
                      <MenuItem value='Color'>Color</MenuItem>
                      <MenuItem value='Weight'>Material</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} md={8} alignSelf='end'>
                    <Typography>Option Value</Typography>
                    <div className='flex flex-col items-center gap-6'>
                      {Array.isArray(variants.option_values) &&
                        variants.option_values.map((variant, variantIndex) => (
                          <CustomTextField
                            key={variantIndex}
                            fullWidth
                            placeholder='Enter Variant Value'
                            value={variant.option_value}
                            onChange={e => variantInput(e, optionIndex, variantIndex)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  {variantIndex > 0 && (
                                    <IconButton
                                      onClick={() => deleteInput(optionIndex, variantIndex)}
                                      className='min-is-fit'
                                    >
                                      <i className='tabler-x' />
                                    </IconButton>
                                  )}
                                </InputAdornment>
                              )
                            }}
                          />
                        ))}
                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => deleteForm(optionIndex)}
                        endIcon={<i className='tabler-trash' />}
                      >
                        Delete
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} gap={2}>
              {formData.length < 3 && (
                <Button variant='contained' onClick={addOption} startIcon={<i className='tabler-plus' />}>
                  Add Another Option
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <VariantCombinationTable data={variantTableData} />
      </Card>
    </Grid>
  )
}

export default ProductVariants
