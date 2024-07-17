'use client'

// React Imports
import { useEffect, useState } from 'react'

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


// import React, { useState } from 'react';
// import { Grid, Card, CardHeader, CardContent, TextField, Button, Typography, IconButton, MenuItem, InputAdornment, Checkbox } from '@mui/material';
// import { CustomTextField, CustomCheckboxAutocomplete, OpenDialogOnElementClick, VariantDialog, VariantCombinationTable } from 'your-component-library'; // Adjust imports as necessary

const ProductVariants = ({setProductData}) => {
  const [formData, setFormData] = useState([{ type: 'Size', values: [''] }]);

  const handleChange = (index, e) => {
    const newFormData = formData.map((data, i) =>
      i === index ? { ...data, type: e.target.value } : data
    );
    setFormData(newFormData);
  };

  const deleteInput = (optionIndex, variantIndex) => {
    const newFormData = formData.map((data, i) => 
      i === optionIndex ? { ...data, values: data.values.filter((_, vIndex) => vIndex !== variantIndex) } : data
    );
    setFormData(newFormData);
  };

  const addOption = () => {
    setFormData([...formData, { type: 'Size', values: [''] }]);
  };

  const deleteForm = (optionIndex) => {
    setFormData(formData.filter((_, index) => index !== optionIndex));
  };

  const variantInput = (e, optionIndex, variantIndex) => {
    const newFormData = formData.map((data, i) => {
      if (i === optionIndex) {
        const newValues = data.values.map((value, vIndex) => 
          vIndex === variantIndex ? e.target.value : value
        );
        if (e.target.value.length === 1 && variantIndex === data.values.length - 1) {
          newValues.push('');
        }
        return { ...data, values: newValues };
      }
      return data;
    });
    setFormData(newFormData);
  };

  useEffect(() => {
   setProductData(prev=>({...prev,variants:formData}))
 },[formData,setProductData])
  
  // const addVariant = () => {
  //   setProductData(prev => ({ ...prev, variants: [...prev.variants, { name: '', value: '' }] }));
  // };

  return (
    <Grid container className='flex flex-col gap-3'>
      <Card>
        <CardHeader title='Product Variants' />
        <CardContent>
          <Grid container spacing={6}>
            {/* <CustomCheckboxAutocomplete /> */}
            {formData.map((variants, optionIndex) => (
              <Grid key={optionIndex} item xs={12} className='repeater-item'>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={4}>
                    <CustomTextField
                      select
                      fullWidth
                      label='Options Name'
                      value={variants.type}
                      onChange={(e) => handleChange(optionIndex, e)}
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
                      {Array.isArray(variants.values) && variants.values.map((variant, variantIndex) => (
                        <CustomTextField
                          key={variantIndex}
                          fullWidth
                          placeholder='Enter Variant Value'
                          value={variant}
                          onChange={(e) => variantInput(e, optionIndex, variantIndex)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {variantIndex > 0 && (
                                  <IconButton onClick={() => deleteInput(optionIndex, variantIndex)} className='min-is-fit'>
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
        <VariantCombinationTable data={formData} />
      </Card>
    </Grid>
  );
};

export default ProductVariants;



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
