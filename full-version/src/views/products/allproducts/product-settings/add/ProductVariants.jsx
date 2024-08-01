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
// import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
// import Typography from '@mui/material/Typography'
import VariantCombinationTable from './VariantCombinationTable'
import debounce from 'lodash.debounce'
import { useProduct } from '@/views/products/allproducts/productContext/ProductStateManagement'

// const initialState = {
//   options: [{ type: 'Size', values: [''] }],
//   variants: []
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_OPTION':
//       return { ...state, options: [...state.options, { type: 'Size', values: [''] }] }
//     case 'DELETE_OPTION':
//       return { ...state, options: state.options.filter((_, index) => index !== action.index) }
//     case 'UPDATE_OPTION_TYPE':
//       return {
//         ...state,
//         options: state.options.map((option, index) =>
//           index === action.index ? { ...option, type: action.optionType } : option
//         )
//       }
//     case 'UPDATE_OPTION_VALUE':
//       return {
//         ...state,
//         options: state.options.map((option, optionIndex) =>
//           optionIndex === action.optionIndex
//             ? {
//                 ...option,
//                 values: option.values.map((value, valueIndex) =>
//                   valueIndex === action.valueIndex ? action.value : value
//                 )
//               }
//             : option
//         )
//       }
//     case 'ADD_OPTION_VALUE':
//       return {
//         ...state,
//         options: state.options.map((option, index) =>
//           index === action.optionIndex ? { ...option, values: [...option.values, ''] } : option
//         )
//       }
//     case 'DELETE_OPTION_VALUE':
//       return {
//         ...state,
//         options: state.options.map((option, optionIndex) =>
//           optionIndex === action.optionIndex
//             ? { ...option, values: option.values.filter((_, valueIndex) => valueIndex !== action.valueIndex) }
//             : option
//         )
//       }
//     case 'GENERATE_VARIANTS':
//       return { ...state, variants: generateVariants(state.options) }
//     default:
//       return state
//   }
// }

// const generateVariants = options => {
//   if (options.length === 0) return []

//   const [firstOption, ...restOptions] = options
//   const firstValues = firstOption.values.filter(Boolean)

//   if (restOptions.length === 0) {
//     return firstValues.map(value => ({ [firstOption.type]: value }))
//   }

//   const restVariants = generateVariants(restOptions)

//   return firstValues.flatMap(value => restVariants.map(variant => ({ [firstOption.type]: value, ...variant })))
// }

// const ProductVariants = () => {
//   const { state, dispatch } = useProduct()

//   useEffect(() => {
//     dispatch({ type: 'GENERATE_VARIANTS' })
//   }, [state.options, dispatch])

//   useEffect(() => {
//     setProductData(prev => ({ ...prev, variants: state.variants }))
//   }, [state.variants])

//   const handleOptionTypeChange = (index, optionType) => {
//     dispatch({ type: 'UPDATE_OPTION_TYPE', index, optionType })
//   }

//   const debouncedOptionValueChange = debounce((dispatch, optionIndex, valueIndex, value) => {
//     dispatch({ type: 'UPDATE_OPTION_VALUE', optionIndex, valueIndex, value })
//   }, 300)

//   const handleOptionValueChange = (optionIndex, valueIndex, value) => {
//     debouncedOptionValueChange(dispatch, optionIndex, valueIndex, value)
//     if (value.length === 1 && valueIndex === state.options[optionIndex].values.length - 1) {
//       dispatch({ type: 'ADD_OPTION_VALUE', optionIndex })
//     }
//   }

//   const OptionInput = memo(
//     ({ option, optionIndex, onOptionTypeChange, onOptionValueChange, onDeleteOption, onDeleteOptionValue }) => (
//       <Grid item xs={12} className='repeater-item'>
//         <Grid container spacing={6}>
//           <Grid item xs={12} md={4}>
//             <CustomTextField
//               select
//               fullWidth
//               label='Option Name'
//               value={option.type}
//               onChange={e => onOptionTypeChange(optionIndex, e.target.value)}
//             >
//               <MenuItem value='Size'>Size</MenuItem>
//               <MenuItem value='Color'>Color</MenuItem>
//               <MenuItem value='Material'>Material</MenuItem>
//             </CustomTextField>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <div className='flex flex-col items-center gap-6'>
//               {option.values.map((value, valueIndex) => (
//                 <CustomTextField
//                   key={valueIndex}
//                   fullWidth
//                   label='Option Value'
//                   placeholder='Enter Variant Value'
//                   value={value}
//                   onChange={e => onOptionValueChange(optionIndex, valueIndex, e.target.value)}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position='end'>
//                         {valueIndex > 0 && (
//                           <IconButton
//                             onClick={() => onDeleteOptionValue(optionIndex, valueIndex)}
//                             className='min-is-fit'
//                           >
//                             <i className='tabler-x' />
//                           </IconButton>
//                         )}
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               ))}
//               <Button
//                 variant='outlined'
//                 color='error'
//                 onClick={() => onDeleteOption(optionIndex)}
//                 endIcon={<i className='tabler-trash' />}
//               >
//                 Delete
//               </Button>
//             </div>
//           </Grid>
//         </Grid>
//       </Grid>
//     )
//   )

//   return (
//     <Grid container className='flex flex-col gap-3'>
//       <Card>
//         <CardHeader title='Product Variants' />
//         <CardContent>
//           <Grid container spacing={6}>
//             {state.options.map((option, optionIndex) => (
//               <OptionInput
//                 key={optionIndex}
//                 option={option}
//                 optionIndex={optionIndex}
//                 onOptionTypeChange={handleOptionTypeChange}
//                 onOptionValueChange={handleOptionValueChange}
//                 onDeleteOption={() => dispatch({ type: 'DELETE_OPTION', index: optionIndex })}
//                 onDeleteOptionValue={valueIndex => dispatch({ type: 'DELETE_OPTION_VALUE', optionIndex, valueIndex })}
//               />
//             ))}
//             {state.options.length < 3 && (
//               <Grid item xs={12}>
//                 <Button
//                   variant='contained'
//                   onClick={() => dispatch({ type: 'ADD_OPTION' })}
//                   startIcon={<i className='tabler-plus' />}
//                 >
//                   Add Another Option
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardContent>
//           <VariantCombinationTable
//             productVariantData={state.variants}
//             onSave={updatedVariant => {
//               dispatch({
//                 type: 'SET_VARIANTS',
//                 variants: state.variants.map(v => (v.id === updatedVariant.id ? updatedVariant : v))
//               })
//             }}
//           />
//         </CardContent>
//       </Card>
//     </Grid>
//   )
// }

// export default ProductVariants

// const ProductVariants = () => {
//   const [formData, setFormData] = useState([{ type: 'Size', values: [''] }])

//   const handleChange = (index, e) => {
//     const newFormData = formData.map((data, i) => (i === index ? { ...data, type: e.target.value } : data))
//     setFormData(newFormData)
//   }

//   const deleteInput = (optionIndex, variantIndex) => {
//     const newFormData = formData.map((data, i) =>
//       i === optionIndex ? { ...data, values: data.values.filter((_, vIndex) => vIndex !== variantIndex) } : data
//     )
//     setFormData(newFormData)
//   }

//   const addOption = () => {
//     setFormData([...formData, { type: 'Size', values: [''] }])
//   }

//   const deleteForm = optionIndex => {
//     setFormData(formData.filter((_, index) => index !== optionIndex))
//   }

//   const variantInput = (e, optionIndex, variantIndex) => {
//     const newFormData = formData.map((data, i) => {
//       if (i === optionIndex) {
//         const newValues = data.values.map((value, vIndex) => (vIndex === variantIndex ? e.target.value : value))
//         if (e.target.value.length === 1 && variantIndex === data.values.length - 1) {
//           newValues.push('')
//         }
//         return { ...data, values: newValues }
//       }
//       return data
//     })
//     setFormData(newFormData)
//   }

//   // useEffect(() => {
//   //   setProductData(prev => ({ ...prev, variants: formData }))
//   // }, [formData])

//   // const addVariant = () => {
//   //   setProductData(prev => ({ ...prev, variants: [...prev.variants, { name: '', value: '' }] }));
//   // };

//   return (
//     <Grid container className='flex flex-col gap-3'>
//       <Card>
//         <CardHeader title='Product Variants' />
//         <CardContent>
//           <Grid container spacing={6}>
//             {/* <CustomCheckboxAutocomplete /> */}
//             {formData.map((variants, optionIndex) => (
//               <Grid key={optionIndex} item xs={12} className='repeater-item'>
//                 <Grid container spacing={6}>
//                   <Grid item xs={12} md={4}>
//                     <CustomTextField
//                       select
//                       fullWidth
//                       label='Options Name'
//                       value={variants.type}
//                       onChange={e => handleChange(optionIndex, e)}
//                       defaultValue='Size'
//                     >
//                       <MenuItem value='Size'>Size</MenuItem>
//                       <MenuItem value='Color'>Color</MenuItem>
//                       <MenuItem value='Weight'>Material</MenuItem>
//                     </CustomTextField>
//                   </Grid>
//                   <Grid item xs={12} md={8} alignSelf='end'>
//                     <Typography>Option Value</Typography>
//                     <div className='flex flex-col items-center gap-6'>
//                       {Array.isArray(variants.values) &&
//                         variants.values.map((variant, variantIndex) => (
//                           <CustomTextField
//                             key={variantIndex}
//                             fullWidth
//                             placeholder='Enter Variant Value'
//                             value={variant}
//                             onChange={e => variantInput(e, optionIndex, variantIndex)}
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position='end'>
//                                   {variantIndex > 0 && (
//                                     <IconButton
//                                       onClick={() => deleteInput(optionIndex, variantIndex)}
//                                       className='min-is-fit'
//                                     >
//                                       <i className='tabler-x' />
//                                     </IconButton>
//                                   )}
//                                 </InputAdornment>
//                               )
//                             }}
//                           />
//                         ))}
//                       <Button
//                         variant='outlined'
//                         color='error'
//                         onClick={() => deleteForm(optionIndex)}
//                         endIcon={<i className='tabler-trash' />}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             ))}
//             <Grid item xs={12} gap={2}>
//               {formData.length < 3 && (
//                 <Button variant='contained' onClick={addOption} startIcon={<i className='tabler-plus' />}>
//                   Add Another Option
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//       {/* <Card>
//         <VariantCombinationTable data={formData} />
//       </Card> */}
//     </Grid>
//   )
// }

// export default ProductVariants

// ===========================================best and updated one ================================================

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
