'use client'

// React Imports
import { useEffect, useReducer } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import { IconButton, InputAdornment, TextField } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import Typography from '@mui/material/Typography'
import VariantCombinationTable from './VariantCombinationTable'

// const ProductVariants = () => {
//   // States
//   const [count, setCount] = useState(1)
//   const [formData, setFormData] = useState([
//     {
//       type: 'Size',
//       values: ['']
//     }
//   ])

//   const handleChange = (index, e) => {
//     const type = e.target.value

//     const newFormData = formData.map((data, i) => {
//       if (i === index) {
//         return {
//           ...data,
//           type: type,
//           values: [...data.values]
//         }
//       }
//       return data
//     })

//     setFormData(newFormData)
//   }

//   const deleteInput = (optionIndex, variantIndex) => {
//     // const newFormData = [...formData]
//     console.log(
//       'delete variant',
//       variantIndex,
//       'option',
//       optionIndex,
//       'variantvalue',
//       variantIndex.value,
//       'optionValue',
//       optionIndex.value
//     )
//     const newFormData = formData.map((data, i) => {
//       if (i === optionIndex) {
//         const newValue = data.values.filter((_, vIndex) => vIndex != variantIndex)
//         return { ...data, values: newValue }
//       }
//       return data
//     })
//     // newFormData[optionIndex].values.splice(variantIndex, 1)
//     console.log('delete input', newFormData)
//     setFormData(newFormData)
//   }

//   const addOption = () => {
//     setFormData([
//       ...formData,
//       {
//         type: 'Size',
//         values: ['']
//       }
//     ])
//     setCount(count + 1)
//   }
//   const deleteForm = optionIndex => {
//     console.log('Deleting option index', optionIndex)
//     console.log('Before delete:', formData)

//     // const newFormData = [...formData]
//     // console.log(newFormData);
//     // newFormData.splice(optionIndex, 1)
//     // console.log({newFormData.splice(optionIndex)})
//     const newFormData = formData.filter((_, index) => index != optionIndex)
//     console.log('New formData after deletion', newFormData)

//     setFormData(newFormData)
//     // console.log(setFormData(newFormData))
//     // You might want to update any other related state or perform additional logic here
//   }

//   const variantInput = (e, optionIndex, variantIndex) => {
//     // const newFormData = [...formData]
//     // newFormData[optionIndex].values[variantIndex] = e.target.value
//     // setFormData(newFormData)
//     const newFormData = formData.map((data, i) => {
//       if (i === optionIndex) {
//         const newValues = data.values.map((value, vIndex) => (vIndex === variantIndex ? e.target.value : value))
//         if (e.target.value.length === 1 && variantIndex === data.values.length - 1) {
//           newValues.push('')
//         }
//         return { ...data, values: newValues }
//         // const newValue = [...data.values]
//         // newValue[variantIndex] = e.target.value
//         // return { ...data, values: newValue }
//       }

//       return data
//     })
//     setFormData(newFormData)
//     // if (e.target.value.length == 1 && variantIndex === formData[optionIndex].values.length - 1) {
//     //   // const newVariants = [...newFormData[optionIndex], '']
//     //   newFormData[optionIndex].values.push('')
//     //   console.log(newFormData)
//     //   setFormData(newFormData)
//     // console.log("variant length", optionIndex)
//     if (e.target.value == '' && formData[optionIndex].values.length > 2) {
//       // const morethanone = variantIndex.
//       newFormData[optionIndex].values.splice(variantIndex, 1)
//     }
//   }

//   console.log('add option', addOption.length)
//   console.log('count length', count)
//   console.log('formdata length', formData.length)

//   return (
//     <Grid container className='flex flex-col gap-3'>
//       <Card>
//         <CardHeader title='Product Variants' />
//         <CardContent>
//           <Grid container spacing={6}>
//             <CustomCheckboxAutocomplete />
//             {formData.map((variants, optionIndex) => (
//               <Grid key={optionIndex} item xs={12} className='repeater-item'>
//                 {/* <CustomCheckboxAutocomplete/> */}
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
//                     {/* <CustomCheckboxAutocomplete /> */}
//                   </Grid>
//                   <Grid item xs={12} md={8} alignSelf='end'>
//                     <Typography>Option Value</Typography>
//                     <div className='flex flex-col items-center gap-6'>
//                       {
//                         Array.isArray(variants.values) &&
//                           variants.values.map((variant, variantIndex) => (
//                             <CustomTextField
//                               key={variantIndex}
//                               fullWidth
//                               // label='Option Value'
//                               className='variant-input'
//                               placeholder='Enter Variant Value'
//                               value={variant}
//                               onChange={e => variantInput(e, optionIndex, variantIndex)}
//                               // onKeyDown={e => {
//                               //   console.log(e.key)
//                               //   if (e.key === 'Backspace' && !formData[i]) {
//                               //     deleteInput(i)
//                               //   }
//                               // }}
//                               InputProps={{
//                                 endAdornment: (
//                                   <InputAdornment position='end'>
//                                     {variantIndex > 0 && (
//                                       <IconButton
//                                         onClick={() => {
//                                           deleteInput(optionIndex, variantIndex)
//                                           console.log('option', optionIndex, 'variant', variantIndex)
//                                         }}
//                                         className='min-is-fit'
//                                       >
//                                         <i className='tabler-x' />
//                                       </IconButton>
//                                     )}
//                                   </InputAdornment>
//                                 )
//                               }}
//                             />
//                           ))

//                         // : <CustomTextField placeholder='block' disabled />
//                       }

//                       {/* <IconButton onClick={() => setCount(count + 1)} className='min-is-fit'>
//                       <i className='tabler-plus' />
//                     </IconButton> */}
//                       <Button
//                         variant='outlined'
//                         color='error'
//                         onClick={() => deleteForm(optionIndex)}
//                         endIcon={<i className='tabler-trash' />}
//                       >
//                         delete
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             ))}
//             <Grid item xs={12} gap={2}>
//               {formData.length < 3 ? (
//                 <Button variant='contained' onClick={addOption} startIcon={<i className='tabler-plus' />}>
//                   Add Another Option
//                 </Button>
//               ) : null}
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//       <Card>
//         <VariantCombinationTable data={formData} />
//       </Card>
//     </Grid>
//   )
// }

// export default ProductVariants

// ==============================woroking========================

// import React, { useState } from 'react';
// import { Grid, Card, CardHeader, CardContent, Button, MenuItem, Typography, IconButton, InputAdornment } from '@mui/material';
// import CustomTextField from '@core/components/mui/TextField';
// import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete';
// import VariantCombinationTable from './VariantCombinationTable';

// const ProductVariants = () => {
//   const [formData, setFormData] = useState([{ type: 'Size', values: [''] }]);

//   const handleChange = (index, e) => {
//     const newFormData = formData.map((data, i) =>
//       i === index ? { ...data, type: e.target.value } : data
//     );
//     setFormData(newFormData);
//   };

//   const deleteInput = (optionIndex, variantIndex) => {
//     const newFormData = formData.map((data, i) =>
//       i === optionIndex ? { ...data, values: data.values.filter((_, vIndex) => vIndex !== variantIndex) } : data
//     );
//     setFormData(newFormData);
//   };

//   const addOption = () => {
//     setFormData([...formData, { type: 'Size', values: [''] }]);
//   };

//   const deleteForm = (optionIndex) => {
//     setFormData(formData.filter((_, index) => index !== optionIndex));
//   };

//   const variantInput = (e, optionIndex, variantIndex) => {
//     const newFormData = formData.map((data, i) => {
//       if (i === optionIndex) {
//         const newValues = data.values.map((value, vIndex) =>
//           vIndex === variantIndex ? e.target.value : value
//         );
//         if (e.target.value.length === 1 && variantIndex === data.values.length - 1) {
//           newValues.push('');
//         }
//         return { ...data, values: newValues };
//       }
//       return data;
//     });
//     setFormData(newFormData);
//   };

//   return (
//     <Grid container className='flex flex-col gap-3'>
//       <Card>
//         <CardHeader title='Product Variants' />
//         <CardContent>
//           <Grid container spacing={6}>
//             <CustomCheckboxAutocomplete />
//             {formData.map((variants, optionIndex) => (
//               <Grid key={optionIndex} item xs={12} className='repeater-item'>
//                 <Grid container spacing={6}>
//                   <Grid item xs={12} md={4}>
//                     <CustomTextField
//                       select
//                       fullWidth
//                       label='Options Name'
//                       value={variants.type}
//                       onChange={(e) => handleChange(optionIndex, e)}
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
//                       {Array.isArray(variants.values) && variants.values.map((variant, variantIndex) => (
//                         <CustomTextField
//                           key={variantIndex}
//                           fullWidth
//                           placeholder='Enter Variant Value'
//                           value={variant}
//                           onChange={(e) => variantInput(e, optionIndex, variantIndex)}
//                           InputProps={{
//                             endAdornment: (
//                               <InputAdornment position='end'>
//                                 {variantIndex > 0 && (
//                                   <IconButton onClick={() => deleteInput(optionIndex, variantIndex)} className='min-is-fit'>
//                                     <i className='tabler-x' />
//                                   </IconButton>
//                                 )}
//                               </InputAdornment>
//                             )
//                           }}
//                         />
//                       ))}
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
//       <Card>
//         <VariantCombinationTable data={formData} />
//       </Card>
//     </Grid>
//   );
// };

// export default ProductVariants;

// ===========================================best and updated one ================================================
// const ProductVariants = ({setProductData}) => {
//   const [formData, setFormData] = useState([{ type: 'Size', values: [''] }]);
//   const [variantTableData, setVariantTableData] = useState([])

//   const handleChange = (index, e) => {
//     const newFormData = formData.map((data, i) =>
//       i === index ? { ...data, type: e.target.value } : data
//     );
//     setFormData(newFormData);
//   };

//   const deleteInput = (optionIndex, variantIndex) => {
//     const newFormData = formData.map((data, i) =>
//       i === optionIndex ? { ...data, values: data.values.filter((_, vIndex) => vIndex !== variantIndex) } : data
//     );
//     setFormData(newFormData);
//   };

//   const addOption = () => {
//     setFormData([...formData, { type: 'Size', values: [''] }]);
//   };

//   const deleteForm = (optionIndex) => {
//     setFormData(formData.filter((_, index) => index !== optionIndex));
//   };

//   const variantInput = (e, optionIndex, variantIndex) => {
//     const newFormData = formData.map((data, i) => {
//       if (i === optionIndex) {
//         const newValues = data.values.map((value, vIndex) =>
//           vIndex === variantIndex ? e.target.value : value
//         );
//         if (e.target.value.length === 1 && variantIndex === data.values.length - 1) {
//           newValues.push('');
//         }
//         return { ...data, values: newValues };
//       }
//       return data;
//     });
//     setFormData(newFormData);
//   };

//   useEffect(() => {
//    setProductData(prev=>({...prev,variants:variantTableData}))
//  },[variantTableData])

//   useEffect(() => {
//     const newVariantTableData = formData.map(option => ({
//       type: option.type,
//       values : option.values.filter(value => value !== '')
//     }))
//     setVariantTableData(newVariantTableData)
//   },[formData])
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
//                       onChange={(e) => handleChange(optionIndex, e)}
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
//                       {Array.isArray(variants.values) && variants.values.map((variant, variantIndex) => (
//                         <CustomTextField
//                           key={variantIndex}
//                           fullWidth
//                           placeholder='Enter Variant Value'
//                           value={variant}
//                           onChange={(e) => variantInput(e, optionIndex, variantIndex)}
//                           InputProps={{
//                             endAdornment: (
//                               <InputAdornment position='end'>
//                                 {variantIndex > 0 && (
//                                   <IconButton onClick={() => deleteInput(optionIndex, variantIndex)} className='min-is-fit'>
//                                     <i className='tabler-x' />
//                                   </IconButton>
//                                 )}
//                               </InputAdornment>
//                             )
//                           }}
//                         />
//                       ))}
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
//       <Card>
//         <VariantCombinationTable data={variantTableData} onSave={setVariantTableData} />
//       </Card>
//     </Grid>
//   );
// };

// export default ProductVariants;



// const ProductVariants = ({ setProductData }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     dispatch({ type: 'GENERATE_VARIANTS' });
//   }, [state.options]);

//   useEffect(() => {
//     setProductData(prev => ({ ...prev, variants: state.variants }));
//   }, [state.variants, setProductData]);

//   const handleOptionTypeChange = (index, optionType) => {
//     dispatch({ type: 'UPDATE_OPTION_TYPE', index, optionType });
//   };

//   const handleOptionValueChange = (optionIndex, valueIndex, value) => {
//     dispatch({ type: 'UPDATE_OPTION_VALUE', optionIndex, valueIndex, value });
//     if (value.length === 1 && valueIndex === state.options[optionIndex].values.length - 1) {
//       dispatch({ type: 'ADD_OPTION_VALUE', optionIndex });
//     }
//   };

//   const OptionInput = ({ option, optionIndex, onOptionTypeChange, onOptionValueChange, onDeleteOption, onDeleteOptionValue }) => (
//     <Grid item xs={12} className="repeater-item">
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={4}>
//           <CustomTextField
//             select
//             fullWidth
//             label="Option Name"
//             value={option.type}
//             onChange={(e) => onOptionTypeChange(optionIndex, e.target.value)}
//           >
//             <MenuItem value="Size">Size</MenuItem>
//             <MenuItem value="Color">Color</MenuItem>
//             <MenuItem value="Weight">Weight</MenuItem>
//           </CustomTextField>
//         </Grid>
//         <Grid item xs={12} md={8} alignSelf="end">
//           <Typography>Option Value</Typography>
//           <div className="flex flex-col items-center gap-6">
//             {option.values.map((value, valueIndex) => (
//               <CustomTextField
//                 key={valueIndex}
//                 fullWidth
//                 placeholder="Enter Variant Value"
//                 value={value}
//                 onChange={(e) => onOptionValueChange(optionIndex, valueIndex, e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       {valueIndex > 0 && (
//                         <IconButton onClick={() => onDeleteOptionValue(valueIndex)} className="min-is-fit">
//                           <i className="tabler-x" />
//                         </IconButton>
//                       )}
//                     </InputAdornment>
//                   )
//                 }}
//               />
//             ))}
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={onDeleteOption}
//               endIcon={<i className="tabler-trash" />}
//             >
//               Delete
//             </Button>
//           </div>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
  
//   return (
//     <Grid container className="flex flex-col gap-3">
//       <Card>
//         <CardHeader title="Product Variants" />
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
//                 onDeleteOptionValue={(valueIndex) => dispatch({ type: 'DELETE_OPTION_VALUE', optionIndex, valueIndex })}
//               />
//             ))}
//             {state.options.length < 3 && (
//               <Grid item xs={12}>
//                 <Button variant="contained" onClick={() => dispatch({ type: 'ADD_OPTION' })} startIcon={<i className="tabler-plus" />}>
//                   Add Another Option
//                 </Button>
//               </Grid>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//       <Card>
//         <VariantCombinationTable data={state.variants} onSave={(variants) => dispatch({ type: 'SET_VARIANTS', variants })} />
//       </Card>
//     </Grid>
//   );
// };

// export default ProductVariants;

const initialState = {
  options: [{ type: 'Size', values: [''] }],
  variants: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_OPTION':
      return { ...state, options: [...state.options, { type: 'Size', values: [''] }] }
    case 'DELETE_OPTION':
      return { ...state, options: state.options.filter((_, index) => index !== action.index) }
    case 'UPDATE_OPTION_TYPE':
      return {
        ...state,
        options: state.options.map((option, index) =>
          index === action.index ? { ...option, type: action.optionType } : option
        )
      }
    case 'UPDATE_OPTION_VALUE':
      return {
        ...state,
        options: state.options.map((option, optionIndex) =>
          optionIndex === action.optionIndex
            ? {
                ...option,
                values: option.values.map((value, valueIndex) =>
                  valueIndex === action.valueIndex ? action.value : value
                )
              }
            : option
        )
      }
    case 'ADD_OPTION_VALUE':
      return {
        ...state,
        options: state.options.map((option, index) =>
          index === action.optionIndex ? { ...option, values: [...option.values, ''] } : option
        )
      }
    case 'DELETE_OPTION_VALUE':
      return {
        ...state,
        options: state.options.map((option, optionIndex) =>
          optionIndex === action.optionIndex
            ? { ...option, values: option.values.filter((_, valueIndex) => valueIndex !== action.valueIndex) }
            : option
        )
      }
    case 'GENERATE_VARIANTS':
      return { ...state, variants: generateVariants(state.options) }
    default:
      return state
  }
}

const generateVariants = options => {
  if (options.length === 0) return []

  const [firstOption, ...restOptions] = options
  const firstValues = firstOption.values.filter(Boolean)

  if (restOptions.length === 0) {
    return firstValues.map(value => ({ [firstOption.type]: value }))
  }

  const restVariants = generateVariants(restOptions)

  return firstValues.flatMap(value => restVariants.map(variant => ({ [firstOption.type]: value, ...variant })))
}

const ProductVariants = ({ setProductData }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({ type: 'GENERATE_VARIANTS' });
  }, [state.options]);
  
  useEffect(() => {
    setProductData(prev => ({ ...prev, variants: state.variants }));
  }, [state.variants, setProductData]);

  const handleOptionTypeChange = (index, optionType) => {
    dispatch({ type: 'UPDATE_OPTION_TYPE', index, optionType });
  };

  const handleOptionValueChange = (optionIndex, valueIndex, value) => {
    dispatch({ type: 'UPDATE_OPTION_VALUE', optionIndex, valueIndex, value });
    if (value.length === 1 && valueIndex === state.options[optionIndex].values.length - 1) {
      dispatch({ type: 'ADD_OPTION_VALUE', optionIndex });
    }
  };

  const OptionInput = ({ option, optionIndex, onOptionTypeChange, onOptionValueChange, onDeleteOption, onDeleteOptionValue }) => (
    <Grid item xs={12} className="repeater-item">
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <CustomTextField
            select
            fullWidth
            label="Option Name"
            value={option.type}
            onChange={(e) => onOptionTypeChange(optionIndex, e.target.value)}
          >
            <MenuItem value="Size">Size</MenuItem>
            <MenuItem value="Color">Color</MenuItem>
            <MenuItem value="Weight">material</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} md={8} alignSelf="end">
          <Typography>Option Value</Typography>
          <div className="flex flex-col items-center gap-6">
            {option.values.map((value, valueIndex) => (
              <CustomTextField
                key={valueIndex}
                fullWidth
                placeholder="Enter Variant Value"
                value={value}
                onChange={(e) => onOptionValueChange(optionIndex, valueIndex, e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {valueIndex > 0 && (
                        <IconButton onClick={() => onDeleteOptionValue(valueIndex)} className="min-is-fit">
                          <i className="tabler-x" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  )
                }}
              />
            ))}
            <Button
              variant="outlined"
              color="error"
              onClick={onDeleteOption}
              endIcon={<i className="tabler-trash" />}
            >
              Delete
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
  console.log(state.variants)
  return (
    <Grid container className="flex flex-col gap-3">
      <Card>
        <CardHeader title="Product Variants" />
        <CardContent>
          <Grid container spacing={6}>
            {state.options.map((option, optionIndex) => (
              <OptionInput
                key={optionIndex}
                option={option}
                optionIndex={optionIndex}
                onOptionTypeChange={handleOptionTypeChange}
                onOptionValueChange={handleOptionValueChange}
                onDeleteOption={() => dispatch({ type: 'DELETE_OPTION', index: optionIndex })}
                onDeleteOptionValue={(valueIndex) => dispatch({ type: 'DELETE_OPTION_VALUE', optionIndex, valueIndex })}
              />
            ))}
            {state.options.length < 3 && (
              <Grid item xs={12}>
                <Button variant="contained" onClick={() => dispatch({ type: 'ADD_OPTION' })} startIcon={<i className="tabler-plus" />}>
                  Add Another Option
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <VariantCombinationTable
            data={state.variants}
            onSave={(updatedVariant) => {
              dispatch({ type: 'SET_VARIANTS', variants: state.variants.map(v => v.id === updatedVariant.id ? updatedVariant : v) });
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductVariants;
