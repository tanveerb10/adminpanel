'use client'

// React Imports
import { useEffect, useState, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Components Imports
import { IconButton, InputAdornment, Typography } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import CustomControlledAutoComplete from '@/libs/components/CustomControlledAutoComplete'
import { useProduct } from '@/views/products/allproducts/productContext/ProductStateManagement'
import { generateVariants } from '@/views/products/allproducts/product-settings/add/VariantCombinationTable'

const ProductReview = ({}) => {
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

  const { updateChildData } = useProduct()

  const [variantTableData, setVariantTableData] = useState([])
  const [isOptionChange, setoptionChange] = useState(false)

  const handleChange = useCallback((index, newValue) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      newFormData[index].option_name = newValue
      return newFormData
    })
    !isOptionChange && setoptionChange(true)
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
    setFormData(prevFormData => [
      ...prevFormData,
      {
        option_name: 'Size',
        option_values: [
          {
            option_value: ''
          }
        ]
      }
    ])
  }, [])

  const deleteForm = useCallback(optionIndex => {
    setFormData(prevFormData => {
      const updatedFormData = prevFormData.filter((_, index) => index !== optionIndex)
      return updatedFormData
    })
    setoptionChange(true)
  }, [])

  const variantInput = useCallback((e, optionIndex, variantIndex) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      const newValues = [...newFormData[optionIndex].option_values]
      newValues[variantIndex].option_value = e.target.value

      if (e.target.value.length === 1 && variantIndex === newValues.length - 1) {
        newValues.push({ option_value: '' })
      }

      newFormData[optionIndex].option_values = newValues
      return newFormData
    })
    !isOptionChange && setoptionChange(true)
  }, [])

  useEffect(() => {
    if (isOptionChange) {
      const newVariantTableData = formData.map(option => ({
        option_name: option.option_name,
        option_values: option.option_values?.filter(opt => opt.option_value !== '')
      }))
      if (JSON.stringify(newVariantTableData) !== JSON.stringify(variantTableData)) {
        setVariantTableData(newVariantTableData)
        updateChildData(generateVariants(newVariantTableData))
      }
    }
  }, [formData, isOptionChange])

  useEffect(() => {
    if (variantTableData.length) {
      updateChildData(generateVariants(variantTableData))
    }
  }, [variantTableData])
  return (
    <Card>
      <CardHeader title='Product Variants' />
      <CardContent>
        <Grid container spacing={6}>
          {formData.map((variants, optionIndex) => (
            <Grid key={optionIndex} container spacing={6} item xs={12} className='repeater-item'>
              <Grid item xs={12} md={4}>
                <CustomControlledAutoComplete
                  fullWidth
                  label='Options Name'
                  placeholder='Select or Add Option'
                  initialOptions={[]}
                  value={variants.option_name}
                  onChange={(e, newValue) => handleChange(optionIndex, newValue)}
                />
              </Grid>
              <Grid item xs={12} md={8} alignSelf='end' className=''>
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
                  {formData.length > 1 && (
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => deleteForm(optionIndex)}
                      endIcon={<i className='tabler-trash' />}
                    >
                      Delete
                    </Button>
                  )}
                </div>
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
  )
}

export default ProductReview
