import * as React from 'react'
// import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material'
// import { createDataStructure } from '@/utils/productVariantCombination'
// import { createDataStructure, cleanData, cleanCombinationData } from '@/utils/productVariantCombination'
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TextField,
  // IconButton,
  Box,
  Button,
  Collapse,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
// import VariantRow from '@/views/products/allproducts/product-settings/add/VariantRow'
import { useEffect, useState } from 'react'
import AddVariantDialog from '@/views/products/allproducts/product-settings/add/AddVariantDialog'
import EditVariantDialog from '@/views/products/allproducts/product-settings/add/EditVariantDialog'
import AddCombinationDialog from './AddCombinationDialog'
// import EditCombinationDialog from './EditCombinationDialog'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CombinationForm from "./CombinationForm"

// export default function VariantCombinationTable({ data, onSave }) {

//   console.log('data from parent', data)

//   useEffect(() => {

//     if (!Array.isArray(data)) {
//       console.error('Data is not an array')
//       return null
//     }
// },[data])

//   const cleanedData = cleanData(data)
//   console.log("clean", cleanedData);
//   const structuredData = createDataStructure(data)
//   console.log('structure', structuredData)

// //   const structuredData = cleanCombinationData(structuredData1)
// // console.log('cleanstructured', structuredData)
// //   console.log(structuredData)

//   const [openStates, setOpenStates] = useState({})
//   const [allExpanded, setAllExpanded] = useState(false)
//   const [selectedItems, setSelectedItems] = useState({})

//   const handleSelectItems = itemId => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [itemId]: !prevState[itemId]
//     }))
//   }

//   const handleSelectAll = () => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean)
//     const newSelectedItems = {}
//     structuredData.values.forEach(variant => {
//       newSelectedItems[variant.variant] = newSelectAll
//       variant.combinations.forEach(combination => {
//         newSelectedItems[combination.combination] = newSelectAll
//       })
//     })
//     setSelectedItems(newSelectedItems)
//   }
//   const handleToggle = variant => {
//     setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }))
//   }

//   const handleExpandCollapseAll = () => {
//     const newAllExpanded = !allExpanded
//     setAllExpanded(newAllExpanded)
//     setOpenStates(
//       structuredData.values.reduce((acc, variantObj) => {
//         acc[variantObj.variant] = newAllExpanded
//         return acc
//       }, {})
//     )
//   }

//   const handleVariantSave = (variantId, newData) => {
//     const updateVariants = data.map((variant) => (variant.variant === variantId ? { ...variant, ...newData } : variant))
//     onSave(updateVariants)
//     console.log('updateVariants', updateVariants)
//   }
//   if (structuredData.values?.length === 0 || structuredData.type == undefined || structuredData.values == undefined) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No Data Available</Typography>
//         </CardContent>
//       </Card>
//     )
//   }
//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='left'>
//                 <Checkbox
//                   checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
//                   indeterminate={
//                     Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </TableCell>
//               <TableCell align='right'>
//                 Variant
//                 <IconButton aria-label='expand all' size='small' onClick={handleExpandCollapseAll}>
//                   {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                 </IconButton>
//               </TableCell>
//               {/* <TableCell align='right'>Price</TableCell>
//               <TableCell align='right'>Quantity</TableCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {structuredData.values?.map((variantObj, index) => (
//               <VariantRow
//                 key={variantObj.variant + index}
//                 variant={variantObj}
//                 combinations={variantObj.combinations}
//                 open={openStates[variantObj.variant]}
//                 onToggle={() => handleToggle(variantObj.variant)}
//                 selectedItems={selectedItems}
//                 handleSelectItems={handleSelectItems}
//                 onSave={handleVariantSave}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   )
// }

// ====================================================upper one best and updated================================================

// const VariantCombinationTable = ({ data, onSave }) => {
//   const [openStates, setOpenStates] = useState({});
//   const [allExpanded, setAllExpanded] = useState(false);
//   const [selectedItems, setSelectedItems] = useState({});

//   console.log(" data",data)
//   useEffect(() => {
//     if (!Array.isArray(data)) {
//       console.error('Data is not an array');
//       return null;
//     }
//   }, [data]);

//   const cleanedData = cleanData(data);
//   const structuredData = createDataStructure(cleanedData);

//   const handleSelectItems = (itemId) => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [itemId]: !prevState[itemId]
//     }));
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean);
//     const newSelectedItems = {};
//     structuredData.values.forEach(variant => {
//       newSelectedItems[variant.variant] = newSelectAll;
//       variant.combinations.forEach(combination => {
//         newSelectedItems[combination.combination] = newSelectAll;
//       });
//     });
//     setSelectedItems(newSelectedItems);
//   };

//   const handleToggle = (variant) => {
//     setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }));
//   };

//   const handleExpandCollapseAll = () => {
//     const newAllExpanded = !allExpanded;
//     setAllExpanded(newAllExpanded);
//     setOpenStates(
//       structuredData.values.reduce((acc, variantObj) => {
//         acc[variantObj.variant] = newAllExpanded;
//         return acc;
//       }, {})
//     );
//   };

//   const handleVariantSave = (variantId, newData) => {
//     const updateVariants = data.map((variant) => (variant.variant === variantId ? { ...variant, ...newData } : variant));
//     onSave(updateVariants);
//   };

//   if (structuredData.values?.length === 0 || !structuredData.type || !structuredData.values) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No Data Available</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <Checkbox checked={Object.values(selectedItems).every(Boolean)} onChange={handleSelectAll} />
//               </TableCell>
//               <TableCell>{structuredData.type}</TableCell>
//               <TableCell>Actions</TableCell>
//               <TableCell align='right'>
//                 <IconButton size='small' onClick={handleExpandCollapseAll}>
//                   {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {structuredData.values.map((variantObj, index) => (
//               <React.Fragment key={index}>
//                 <TableRow>
//                   <TableCell>
//                     <Checkbox checked={selectedItems[variantObj.variant] || false} onChange={() => handleSelectItems(variantObj.variant)} />
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant='h6'>{variantObj.variant}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <VariantRow
//                       variant={variantObj}
//                       onSave={(newData) => handleVariantSave(variantObj.variant, newData)}
//                       handleSelectItems={handleSelectItems}
//                       selectedItems={selectedItems}
//                     />
//                   </TableCell>
//                   <TableCell align='right'>
//                     <IconButton size='small' onClick={() => handleToggle(variantObj.variant)}>
//                       {openStates[variantObj.variant] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell colSpan={4}>
//                     <Collapse in={openStates[variantObj.variant]} timeout='auto' unmountOnExit>
//                       <Box margin={1}>
//                         <Table size='small' aria-label='purchases'>
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>Combination</TableCell>
//                               <TableCell>Selected</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {variantObj.combinations.map((combination, subIndex) => (
//                               <TableRow key={subIndex}>
//                                 <TableCell>{combination.combination}</TableCell>
//                                 <TableCell>
//                                   <Checkbox
//                                     checked={selectedItems[combination.combination] || false}
//                                     onChange={() => handleSelectItems(combination.combination)}
//                                   />
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </React.Fragment>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   );
// };

// export default VariantCombinationTable;

// ==================================================working===============================

// import React from 'react';
// import {
//   Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody, IconButton, Collapse, Box, TextField,Card, CardContent,Typography
// } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { createDataStructure, cleanData } from '@/utils/productVariantCombination';
// import VariantRow from '@/views/products/allproducts/product-settings/add/VariantRow';

// export default function VariantCombinationTable({ data }) {
//   const cleanedData = cleanData(data);
//   const structuredData = createDataStructure(cleanedData);
//   const [openStates, setOpenStates] = React.useState({});
//   const [allExpanded, setAllExpanded] = React.useState(false);
//   const [selectedItems, setSelectedItems] = React.useState({});

//   const handleSelectItems = itemId => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [itemId]: !prevState[itemId]
//     }));
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean);
//     const newSelectedItems = {};
//     structuredData.values.forEach(variant => {
//       newSelectedItems[variant.variant] = newSelectAll;
//       variant.combinations.forEach(combination => {
//         newSelectedItems[combination.combination] = newSelectAll;
//       });
//     });
//     setSelectedItems(newSelectedItems);
//   };

//   const handleToggle = variant => {
//     setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }));
//   };

//   const handleExpandCollapseAll = () => {
//     const newAllExpanded = !allExpanded;
//     setAllExpanded(newAllExpanded);
//     setOpenStates(
//       structuredData.values.reduce((acc, variantObj) => {
//         acc[variantObj.variant] = newAllExpanded;
//         return acc;
//       }, {})
//     );
//   };

//   if (!structuredData.values?.length) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No Data Available</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='left'>
//                 <Checkbox
//                   checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
//                   indeterminate={Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)}
//                   onChange={handleSelectAll}
//                 />
//               </TableCell>
//               <TableCell align='right'>
//                 Variant
//                 <IconButton aria-label='expand all' size='small' onClick={handleExpandCollapseAll}>
//                   {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                 </IconButton>
//               </TableCell>
//               <TableCell align='right'>Price</TableCell>
//               <TableCell align='right'>Quantity</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {structuredData.values.map((variantObj, index) => (
//               <VariantRow
//                 key={variantObj.variant + index}
//                 variant={variantObj}
//                 combinations={variantObj.combinations}
//                 open={openStates[variantObj.variant]}
//                 onToggle={() => handleToggle(variantObj.variant)}
//                 selectedItems={selectedItems}
//                 handleSelectItems={handleSelectItems}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   );
// }

// const VariantCombinationTable = ({ data, onSave }) => {
//   const [openStates, setOpenStates] = useState({});
//   const [allExpanded, setAllExpanded] = useState(false);
//   const [selectedItems, setSelectedItems] = useState({});

//   const handleSave = (updatedVariants) => {
//     onSave(updatedVariants);
//   };

//   const handleToggle = (variant) => {
//     setOpenStates((prevState) => ({
//       ...prevState,
//       [variant]: !prevState[variant],
//     }));
//   };

//   const handleExpandCollapseAll = () => {
//     const newAllExpanded = !allExpanded;
//     setAllExpanded(newAllExpanded);
//     setOpenStates(
//       data.reduce((acc, variant) => {
//         acc[variant.type] = newAllExpanded;
//         return acc;
//       }, {})
//     );
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean);
//     const newSelectedItems = {};
//     data.forEach((variant) => {
//       newSelectedItems[variant.type] = newSelectAll;
//       if (variant.values) {
//         variant.values.forEach((combination) => {
//           newSelectedItems[combination] = newSelectAll;
//         });
//       }
//     });
//     setSelectedItems(newSelectedItems);
//   };

//   const handleSelectItem = (itemId) => {
//     setSelectedItems((prevState) => ({
//       ...prevState,
//       [itemId]: !prevState[itemId],
//     }));
//   };

//   const handleVariantSave = (variantType, newData) => {
//     const updateVariants = data.map((variant) =>
//       variant.type === variantType ? { ...variant, ...newData } : variant
//     );
//     onSave(updateVariants);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label='variant-combination-table'>
//         <TableHead>
//           <TableRow>
//             <TableCell>
//               <Checkbox checked={Object.values(selectedItems).every(Boolean)} onChange={handleSelectAll} />
//             </TableCell>
//             <TableCell>{/* Replace with your variant type header */}</TableCell>
//             <TableCell>Actions</TableCell>
//             <TableCell align='right'>
//               <IconButton size='small' onClick={handleExpandCollapseAll}>
//                 {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//               </IconButton>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((variant, index) => (
//             <React.Fragment key={index}>
//               <TableRow>
//                 <TableCell>
//                   <Checkbox checked={selectedItems[variant.type] || false} onChange={() => handleSelectItem(variant.type)} />
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant='h6'>{variant.type}</Typography>
//                 </TableCell>
//                 <TableCell>
//                   {/* Replace VariantRow with your custom component */}
//                   <VariantRow
//                     variant={variant}
//                     onSave={(newData) => handleVariantSave(variant.type, newData)}
//                     handleSelectItem={handleSelectItem}
//                     selectedItems={selectedItems}
//                   />
//                 </TableCell>
//                 <TableCell align='right'>
//                   <IconButton size='small' onClick={() => handleToggle(variant.type)}>
//                     {openStates[variant.type] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={4}>
//                   <Collapse in={openStates[variant.type]} timeout='auto' unmountOnExit>
//                     <Box margin={1}>
//                       <Table size='small' aria-label='combination-table'>
//                         <TableHead>
//                           <TableRow>
//                             <TableCell>Combination</TableCell>
//                             <TableCell>Selected</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {variant.values &&
//                             variant.values.map((combination, subIndex) => (
//                               <TableRow key={subIndex}>
//                                 <TableCell>{combination}</TableCell>
//                                 <TableCell>
//                                   <Checkbox
//                                     checked={selectedItems[combination] || false}
//                                     onChange={() => handleSelectItem(combination)}
//                                   />
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                         </TableBody>
//                       </Table>
//                     </Box>
//                   </Collapse>
//                 </TableCell>
//               </TableRow>
//             </React.Fragment>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default VariantCombinationTable;

// ================================================== come along with suggestion ======================================
// const VariantCombinationTable = ({ data, onSave }) => {
//   const [open, setOpen] = useState(false);
//   const [currentVariant, setCurrentVariant] = useState(null);

//   const handleClickOpen = (variant) => {
//     setCurrentVariant(variant);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCurrentVariant(null);
//   };

//   const handleSave = () => {
//   const updatedVariants = data.map(variant =>
//     variant.id === currentVariant.id ? currentVariant : variant
//   );
//   onSave(updatedVariants);
//   handleClose();
// };

//   const handleChange = (key, value) => {
//     setCurrentVariant({ ...currentVariant, [key]: value });
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//       <TableHead>
//   <TableRow>
//     {data && data.length > 0 ? (
//       Object.keys(data[0]).map((key) => (
//         <TableCell key={key}>{key}</TableCell>
//       ))
//     ) : (
//       <TableCell>No Data</TableCell>
//     )}
//     <TableCell>Actions</TableCell>
//   </TableRow>
// </TableHead>

//         <TableBody>
//           {data.map((variant, index) => (
//             <TableRow key={index}>
//               {Object.values(variant).map((value, i) => (
//                 <TableCell key={i}>{value}</TableCell>
//               ))}
//               <TableCell>
//                 <Button variant="outlined" onClick={() => handleClickOpen(variant)}>Edit</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {currentVariant && (
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Edit Variant</DialogTitle>
//           <DialogContent>
//             {Object.keys(currentVariant).map((key, index) => (
//               <TextField
//                 key={index}
//                 label={key}
//                 value={currentVariant[key]}
//                 onChange={(e) => handleChange(key, e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//             ))}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">Cancel</Button>
//             <Button onClick={handleSave} color="primary">Save</Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </TableContainer>
//   );
// };

// export default VariantCombinationTable;

// ==========================================================working with new structure===============================================

// const cleanData = (data) => {
//   return data.map(item => {
//     const cleanedItem = { ...item };
//     if (Array.isArray(cleanedItem.combinations)) {
//       cleanedItem.combinations = cleanedItem.combinations.filter(combination => {
//         return combination.combination && combination.price !== undefined && combination.quantity !== undefined;
//       });
//     } else {
//       cleanedItem.combinations = [];
//     }
//     return cleanedItem;
//   });
// };

// const createDataStructure = (data) => {
//   return {
//     type: 'variants',
//     values: data.map(item => ({
//       variant: item.variant,
//       price: item.price,
//       quantity: item.quantity,
//       combinations: item.combinations ? item.combinations.map(combination => ({
//         combination: combination.combination,
//         price: combination.price,
//         quantity: combination.quantity
//       })) : []
//     }))
//   };
// };

// const VariantRow = ({ variant, combinations, open, onToggle, selectedItems, handleSelectItems, onSave }) => {
//   const [variantData, setVariantData] = useState({ ...variant });

//   const handleChange = (field, value) => {
//     setVariantData(prevState => ({
//       ...prevState,
//       [field]: value
//     }));
//   };

//   const handleCombinationChange = (index, field, value) => {
//     const updatedCombinations = variantData.combinations.map((comb, i) =>
//       i === index ? { ...comb, [field]: value } : comb
//     );
//     setVariantData(prevState => ({
//       ...prevState,
//       combinations: updatedCombinations
//     }));
//   };

//   useEffect(() => {
//     onSave(variant.variant, variantData);
//   }, [variantData]);

//   return (
//     <>
//       <TableRow>
//         <TableCell>
//           <Checkbox
//             checked={selectedItems[variant.variant] || false}
//             onChange={() => handleSelectItems(variant.variant)}
//           />
//         </TableCell>
//         <TableCell>
//           <IconButton size='small' onClick={onToggle}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//           {variant.variant}
//         </TableCell>
//       </TableRow>
//       {open && (
//         <>
//           <TableRow>
//             <TableCell colSpan={2}>
//               <TextField
//                 label="Price"
//                 value={variantData.price}
//                 onChange={(e) => handleChange('price', e.target.value)}
//                 fullWidth
//               />
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={2}>
//               <TextField
//                 label="Quantity"
//                 value={variantData.quantity}
//                 onChange={(e) => handleChange('quantity', e.target.value)}
//                 fullWidth
//               />
//             </TableCell>
//           </TableRow>
//           {variantData.combinations.map((combination, index) => (
//             <React.Fragment key={index}>
//               <TableRow>
//                 <TableCell colSpan={2}>
//                   <TextField
//                     label="Combination"
//                     value={combination.combination}
//                     onChange={(e) => handleCombinationChange(index, 'combination', e.target.value)}
//                     fullWidth
//                   />
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={2}>
//                   <TextField
//                     label="Combination Price"
//                     value={combination.price}
//                     onChange={(e) => handleCombinationChange(index, 'price', e.target.value)}
//                     fullWidth
//                   />
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={2}>
//                   <TextField
//                     label="Combination Quantity"
//                     value={combination.quantity}
//                     onChange={(e) => handleCombinationChange(index, 'quantity', e.target.value)}
//                     fullWidth
//                   />
//                 </TableCell>
//               </TableRow>
//             </React.Fragment>
//           ))}
//         </>
//       )}
//     </>
//   );
// };

// export default function VariantCombinationTable({ data, onSave }) {
//   console.log('data from parent', data);

//   useEffect(() => {
//     if (!Array.isArray(data)) {
//       console.error('Data is not an array');
//       return null;
//     }
//   }, [data]);

//   const cleanedData = cleanData(data);
//   console.log('clean', cleanedData);
//   const structuredData = createDataStructure(cleanedData);
//   console.log('structure', structuredData);

//   const [openStates, setOpenStates] = useState({});
//   const [allExpanded, setAllExpanded] = useState(false);
//   const [selectedItems, setSelectedItems] = useState({});

//   const handleSelectItems = itemId => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [itemId]: !prevState[itemId]
//     }));
//   };

//   const handleSelectAll = () => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean);
//     const newSelectedItems = {};
//     structuredData.values.forEach(variant => {
//       newSelectedItems[variant.variant] = newSelectAll;
//       variant.combinations.forEach(combination => {
//         newSelectedItems[combination.combination] = newSelectAll;
//       });
//     });
//     setSelectedItems(newSelectedItems);
//   };

//   const handleToggle = variant => {
//     setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }));
//   };

//   const handleExpandCollapseAll = () => {
//     const newAllExpanded = !allExpanded;
//     setAllExpanded(newAllExpanded);
//     setOpenStates(
//       structuredData.values.reduce((acc, variantObj) => {
//         acc[variantObj.variant] = newAllExpanded;
//         return acc;
//       }, {})
//     );
//   };

//   const handleVariantSave = (variantId, newData) => {
//     const updatedVariants = data.map(variant =>
//       variant.variant === variantId ? { ...variant, ...newData } : variant
//     );
//     onSave(updatedVariants);
//     console.log('updatedVariants', updatedVariants);
//   };

//   if (!structuredData.values || structuredData.values.length === 0 || !structuredData.type) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No Data Available</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='left'>
//                 <Checkbox
//                   checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
//                   indeterminate={
//                     Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </TableCell>
//               <TableCell align='right'>
//                 Variant
//                 <IconButton aria-label='expand all' size='small' onClick={handleExpandCollapseAll}>
//                   {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {structuredData.values.map((variantObj, index) => (
//               <VariantRow
//                 key={variantObj.variant + index}
//                 variant={variantObj}
//                 combinations={variantObj.combinations}
//                 open={openStates[variantObj.variant]}
//                 onToggle={() => handleToggle(variantObj.variant)}
//                 selectedItems={selectedItems}
//                 handleSelectItems={handleSelectItems}
//                 onSave={handleVariantSave}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   );
// }


//=============================================================damn corrected code======================================
// const cleanData = data => {
//   return data.map(item => {
//     const cleanedItem = { ...item }
//     if (Array.isArray(cleanedItem.combinations)) {
//       cleanedItem.combinations = cleanedItem.combinations.filter(combination => {
//         return combination.combination && combination.price !== undefined && combination.quantity !== undefined
//       })
//     } else {
//       cleanedItem.combinations = []
//     }
//     return cleanedItem
//   })
// }

// const createDataStructure = data => {
//   return {
//     type: 'variants',
//     values: data.map(item => ({
//       variant: item.variant,
//       price: item.price,
//       quantity: item.quantity,
//       combinations: item.combinations
//         ? item.combinations.map(combination => ({
//             combination: combination.combination,
//             price: combination.price,
//             quantity: combination.quantity
//           }))
//         : []
//     }))
//   }
// }

// const variantHeader = data => {
//   return data.map(item => ({
//     value: item.value
//   }))
// }
// const VariantRow = ({ variant, combinations, open, onToggle, selectedItems, handleSelectItems, onSave }) => {
//   const [variantData, setVariantData] = useState({ ...variant, combinations: variant.combinations || [] });
//   const [addCombinationDialogOpen, setAddCombinationDialogOpen] = useState(false)
//   const [editCombinationDialogOpen, setEditCombinationDialogOpen] = useState(false)
//   const [currentCombination, setCurrentCombination] = useState(null)

//   if (!variant) {
//     console.error('Variant is undefined:', variant)
//     return null
//   }

//   useEffect(() => {
//     console.log('variantData:', variantData);
//   }, [variantData]);
  

//   const handleChange = (field, value) => {
//     console.log(`Updating field: ${field}, with value: ${value}`);
//     setVariantData(prevState => ({
//       ...prevState,
//       [field]: value
//     }))
//   }

//   const handleCombinationChange = (index, field, value) => {
//     console.log(`Updating combination at index: ${index}, field: ${field}, with value: ${value}`);

//     const updatedCombinations = variantData.combinations.map((comb, i) =>
//       i === index ? { ...comb, [field]: value } : comb
//     )
//     setVariantData(prevState => ({
//       ...prevState,
//       combinations: updatedCombinations
//     }))
//   }

//   useEffect(() => {
//     onSave(variant.variant, variantData)
//   }, [variantData])

//   const handleAddCombination = newCombination => {
//     const updatedCombinations = [...variantData.combinations, newCombination]
//     setVariantData(prevState => ({
//       ...prevState,
//       combinations: updatedCombinations
//     }))
//   }

//   const handleEditCombination = updatedCombination => {
//     const updatedCombinations = variantData.combinations.map(comb =>
//       comb.combination === updatedCombination.combination ? updatedCombination : comb
//     )
//     setVariantData(prevState => ({
//       ...prevState,
//       combinations: updatedCombinations
//     }))
//   }

//   const openAddCombinationDialog = () => {
//     setAddCombinationDialogOpen(true)
//   }

//   const openEditCombinationDialog = combination => {
//     setCurrentCombination(combination)
//     setEditCombinationDialogOpen(true)
//   }

//   const closeAddCombinationDialog = () => {
//     setAddCombinationDialogOpen(false)
//   }

//   const closeEditCombinationDialog = () => {
//     setEditCombinationDialogOpen(false)
//   }
//   console.log(variant, 'variant')
//   console.log(combinations)
//   return (
//     <>
//       <TableRow>
//         <TableCell>
//           <Checkbox
//             checked={selectedItems[variant.variant] || false}
//             onChange={() => handleSelectItems(variant.variant)}
//           />
//         </TableCell>
//         <TableCell>
//           {variant.variant}
//           <IconButton size='small' onClick={onToggle}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell>
//           <Button variant='contained' onClick={openAddCombinationDialog}>
//             Add Combination
//           </Button>
//         </TableCell>
//       </TableRow>
//       {open && (
//         <>
//           <TableRow>
//             <TableCell colSpan={3}>
//               <TextField
//                 label='Price'
//                 value={variantData.price}
//                 onChange={e => handleChange('price', e.target.value)}
//                 fullWidth
//               />
//             </TableCell>
//           </TableRow>
//           <TableRow>
//             <TableCell colSpan={3}>
//               <TextField
//                 label='Quantity'
//                 value={variantData.quantity}
//                 onChange={e => handleChange('quantity', e.target.value)}
//                 fullWidth
//               />
//             </TableCell>
//           </TableRow>
//           {variantData.combinations.map((combination, index) => (
//             <React.Fragment key={index}>
//               <TableRow>
//                 <TableCell colSpan={2}>
//                 <TextField
//           label='Combination'
//           value={combination.combination}
//           onChange={(e) => {
//             console.log('Combination Change Triggered');
//             handleCombinationChange(index, 'combination', e.target.value);
//           }}
//           fullWidth
//         />
//                 </TableCell>
//                 <TableCell>
//                   <Button variant='contained' onClick={() => openEditCombinationDialog(combination)}>
//                     Edit
//                   </Button>
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={3}>
//                   <TextField
//                     label='Combination Price'
//                     value={combination.price}
//                     onChange={e => handleCombinationChange(index, 'price', e.target.value)}
//                     fullWidth
//                     type='number'
//                   />
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={3}>
//                   <TextField
//                     label='Combination Quantity'
//                     value={combination.quantity}
//                     onChange={e => handleCombinationChange(index, 'quantity', e.target.value)}
//                     fullWidth
//                     type='number'
//                   />
//                 </TableCell>
//               </TableRow>
//             </React.Fragment>
//           ))}
//         </>
//       )}
//       <AddCombinationDialog
//         open={addCombinationDialogOpen}
//         onClose={closeAddCombinationDialog}
//         onSave={handleAddCombination}
//       />
//       {currentCombination && (
//         <EditCombinationDialog
//           open={editCombinationDialogOpen}
//           onClose={closeEditCombinationDialog}
//           combination={currentCombination}
//           onSave={handleEditCombination}
//         />
//       )}
//     </>
//   )
// }

// export default function VariantCombinationTable({ data, onSave }) {
//   const cleanedData = cleanData(data)
//   const structuredData = createDataStructure(cleanedData)
//   console.log(structuredData, 'std')
//   console.log(data, 'data')
//   const variantHead = variantHeader(data)
//   console.log(variantHead, 'vh')
//   const [openStates, setOpenStates] = useState({})
//   const [allExpanded, setAllExpanded] = useState(false)
//   const [selectedItems, setSelectedItems] = useState({})
//   const [addDialogOpen, setAddDialogOpen] = useState(false)
//   const [editDialogOpen, setEditDialogOpen] = useState(false)
//   const [currentVariant, setCurrentVariant] = useState(null)

//   const handleSelectItems = itemId => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [itemId]: !prevState[itemId]
//     }))
//   }

//   const handleSelectAll = () => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean)
//     const newSelectedItems = {}
//     structuredData.values.forEach(variant => {
//       newSelectedItems[variant.variant] = newSelectAll
//       variant.combinations.forEach(combination => {
//         newSelectedItems[combination.combination] = newSelectAll
//       })
//     })
//     setSelectedItems(newSelectedItems)
//   }

//   const handleToggle = variant => {
//     setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }))
//   }

//   const handleExpandCollapseAll = () => {
//     const newAllExpanded = !allExpanded
//     setAllExpanded(newAllExpanded)
//     setOpenStates(
//       structuredData.values.reduce((acc, variantObj) => {
//         acc[variantObj.variant] = newAllExpanded
//         return acc
//       }, {})
//     )
//   }

//   const handleVariantSave = (variantId, newData) => {
//     const updatedVariants = data.map(variant => (variant.variant === variantId ? { ...variant, ...newData } : variant))
//     onSave(updatedVariants)
//     console.log('updatedVariants', updatedVariants)
//   }

//   const handleAddVariant = newVariant => {
//     const updatedVariants = [...data, { ...newVariant, combinations: [] }]
//     onSave(updatedVariants)
//   }

//   const handleEditVariant = updatedVariant => {
//     handleVariantSave(updatedVariant.variant, updatedVariant)
//   }

//   const openAddDialog = () => {
//     setAddDialogOpen(true)
//   }

//   const openEditDialog = variant => {
//     setCurrentVariant(variant)
//     setEditDialogOpen(true)
//   }

//   const closeAddDialog = () => {
//     setAddDialogOpen(false)
//   }

//   const closeEditDialog = () => {
//     setEditDialogOpen(false)
//   }

//   if (!structuredData.values || structuredData.values.length === 0 || !structuredData.type) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No Data Available</Typography>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Grid container className='mt-5 p-3'>
//       <Button variant='contained' onClick={openAddDialog}>
//         Add Variant
//       </Button>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='left'>
//                 <Checkbox
//                   checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
//                   indeterminate={
//                     Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </TableCell>
//               <TableCell align='right'>
//                 Variant
//                 <IconButton aria-label='expand all' size='small' onClick={handleExpandCollapseAll}>
//                   {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {structuredData.values?.map((variantObj, index) => (
//               <VariantRow
//                 key={variantObj.variant + index}
//                 variant={variantObj}
//                 combinations={variantObj.combinations}
//                 open={openStates[variantObj.variant]}
//                 onToggle={() => handleToggle(variantObj.variant)}
//                 selectedItems={selectedItems}
//                 handleSelectItems={handleSelectItems}
//                 onSave={handleVariantSave}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <AddVariantDialog open={addDialogOpen} onClose={closeAddDialog} onSave={handleAddVariant} />
//       {currentVariant && (
//         <EditVariantDialog
//           open={editDialogOpen}
//           onClose={closeEditDialog}
//           variant={currentVariant}
//           onSave={handleEditVariant}
//         />
//       )}
//     </Grid>
//   )
// }

// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Button, TextField, Card, CardContent, Typography, Grid, Paper } from '@material-ui/core';
// import { KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';


// ===================================================second best try===================================
const cleanData = (data) => {
  console.log(data, 'data before cleaning');
  return data.map(item => {
    const cleanedItem = { ...item };
    if (Array.isArray(cleanedItem.combinations)) {
      cleanedItem.combinations = cleanedItem.combinations.filter(combination => {
        return combination.combination && combination.price !== undefined && combination.quantity !== undefined;
      });
    } else {
      cleanedItem.combinations = [];
    }
    return cleanedItem;
  });
};

// const cleanData = (data) => {
//   return data.map(item => {
//     const cleanedItem = { ...item };
//     if (Array.isArray(cleanedItem.combinations)) {
//       cleanedItem.combinations = cleanedItem.combinations.filter(combination => {
//         return combination.combination && combination.price !== undefined && combination.quantity !== undefined;
//       });
//     } else {
//       cleanedItem.combinations = [];
//     }
//     return cleanedItem;
//   });
// };

// const createDataStructure = (data) => {
//   return {
//     type: 'variants',
//     values: data.map(item => ({
//       variant: item.variant,
//       price: item.price,
//       quantity: item.quantity,
//       combinations: item.combinations
//         ? item.combinations.map(combination => ({
//             combination: combination.combination,
//             price: combination.price,
//             quantity: combination.quantity,
//           }))
//         : [],
//     })),
//   };
// };


// const createDataStructure = (data) => {
//   console.log(data, 'data before structuring');
//   return {
//     type: 'variants',
//     values: data.map(item => ({
//       variant: item.variant,
//       price: item.price,
//       quantity: item.quantity,
//       combinations: item.combinations
//         ? item.combinations.map(combination => ({
//             combination: combination.combination,
//             price: combination.price,
//             quantity: combination.quantity
//           }))
//         : []
//     }))
//   };
// };

// working structure data ===============
// const createDataStructure = (data) => {
//   console.log(data, 'data before structuring');

//   // Extract unique options for each variant type
//   const variantOptions = {};
//   const variantCombinations = [];

//   data.forEach(item => {
//     Object.keys(item).forEach(key => {
//       if (!variantOptions[key]) {
//         variantOptions[key] = new Set();
//       }
//       variantOptions[key].add(item[key]);
//     });
//   });

//   // Convert Sets to arrays
//   const optionsStructured = {};
//   Object.keys(variantOptions).forEach(key => {
//     optionsStructured[key] = Array.from(variantOptions[key]);
//   });

//   // Map combinations
//   data.forEach(item => {
//     variantCombinations.push({
//       ...item
//     });
//   });

//   return {
//     type: 'variants',
//     values: variantCombinations.map(combination => ({
//       combination,
//       // Assuming `price` and `quantity` are attributes of the combination
//       price: combination.price || null,
//       quantity: combination.quantity || null
//     })),
//     options: optionsStructured
//   };
// };

// last and final code of variant
// const createDataStructure = (data) => {
//   console.log('Data before structuring:', data);

//   if (!data || data.length === 0) {
//     return { type: 'variants', values: [] };
//   }

//   const structuredData = {
//     type: 'variants',
//     values: data.map(item => {
//       console.log('Processing item:', item);

//       // Get the dynamic keys from the item
//       const keys = Object.keys(item);

//       // Assume the first key as the variant key
//       const variantKey = keys[0];
//       const variant = item[variantKey] || 'N/A';

//       // Look for 'price' and 'quantity' keys dynamically
//       const priceKey = keys.find(key => key.toLowerCase().includes('price')) || 'price';
//       const quantityKey = keys.find(key => key.toLowerCase().includes('quantity')) || 'quantity';

//       // Extract the dynamic properties
//       const price = item[priceKey] !== undefined ? item[priceKey] : 0;
//       const quantity = item[quantityKey] !== undefined ? item[quantityKey] : 0;

//       // Handle combinations if they exist
//       const combinations = item.combinations && Array.isArray(item.combinations)
//         ? item.combinations.map(combination => {
//             console.log('Processing combination:', combination);
//             return {
//               combination: combination.combination || 'N/A',
//               price: combination.price !== undefined ? combination.price : 0,
//               quantity: combination.quantity !== undefined ? combination.quantity : 0
//             };
//           })
//         : [];

//       return {
//         variant,
//         price,
//         quantity,
//         combinations
//       };
//     })
//   };

//   console.log('Structured Data:', structuredData);
//   return structuredData;
// };

const createDataStructure = (data) => {
  console.log(data, 'data before structuring');
  return {
    type: 'variants',
    values: data.map(item => {
      // Extract dynamic keys excluding 'combinations'
      const variantKeys = Object.keys(item).filter(key => key !== 'combinations');
      
      // Generate the combination string from dynamic keys
      const combinationString = variantKeys.map(key => item[key]).join('/') || 'N/A';

      // Ensure price and quantity have default values if not present
      const price = item.price !== undefined ? item.price : 0;
      const quantity = item.quantity !== undefined ? item.quantity : 0;

      // Map combinations if they exist
      const combinations = item.combinations 
        ? item.combinations.map(combination => ({
            combination: combination.combination,
            price: combination.price,
            quantity: combination.quantity
          })) 
        : [];

      // Return structured data for the current item
      return {
        variant: combinationString,
        price,
        quantity,
        combinations
      };
    })
  };
};

const VariantRow = ({ variant, combinations, selectedItems, handleSelectItems, onSave }) => {
  const [variantData, setVariantData] = useState({
    ...variant,
    price: variant.price || 0,
    quantity: variant.quantity || 0,
    combinations: variant.combinations || [],
  });

  const [addCombinationDialogOpen, setAddCombinationDialogOpen] = useState(false);
  // const [editCombinationDialogOpen, setEditCombinationDialogOpen] = useState(false);
  

  if (!variant) {
    console.error('Variant is undefined:', variant);
    return null;
  }

  useEffect(() => {
    console.log('variantData:', variantData);
  }, [variantData]);

  useEffect(() => {
    console.log('Received variant props:', variant);
    console.log('variantData:', variantData);
  }, [variant]);

  const handleChange = (field, value) => {
    console.log(`Updating field: ${field}, with value: ${value}`);
    setVariantData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // const handleCombinationChange = (index, field, value) => {
  //   console.log(`Updating combination at index: ${index}, field: ${field}, with value: ${value}`);

  //   const updatedCombinations = variantData.combinations.map((comb, i) =>
  //     i === index ? { ...comb, [field]: value } : comb
  //   );
  //   setVariantData(prevState => ({
  //     ...prevState,
  //     combinations: updatedCombinations,
  //   }));
  // };

  useEffect(() => {
    onSave(variant.variant, variantData);
  }, [variantData]);

  const handleAddCombination = (newCombination) => {
    const updatedCombinations = [...variantData.combinations, newCombination];
    setVariantData(prevState => ({
      ...prevState,
      combinations: updatedCombinations,
    }));
  };

  // const handleEditCombination = (updatedCombination) => {
  //   const updatedCombinations = variantData.combinations.map(comb =>
  //     comb.combination === updatedCombination.combination ? updatedCombination : comb
  //   );
  //   setVariantData(prevState => ({
  //     ...prevState,
  //     combinations: updatedCombinations,
  //   }));
  // };

  const openAddCombinationDialog = () => {
    setAddCombinationDialogOpen(true);
  };

  const closeAddCombinationDialog = () => {
    setAddCombinationDialogOpen(false);
  };


  const handelRowClick = (e) => {
    if (e.target.type !== "checkbox" && e.target.type !=="file") {
      openAddCombinationDialog()
    }
  }
  
  console.log(variant, 'variant');
  console.log(combinations);


  return (
    <>
      <TableRow onClick={handelRowClick}>
        <TableCell>
          <Checkbox
            checked={selectedItems[variant.variant] || false}
            onChange={() => handleSelectItems(variant.variant)}
          />
        </TableCell>
        <TableCell>
          <input type="file" accept="image/*" onChange={(e) => handleChange('image', e.target.files[0])} />
        </TableCell>
        <TableCell>
          {variant.variant}
          {/* <IconButton size='small' onClick={onToggle}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell>
              <CustomTextField
                label='Price'
                value={variantData.price}
                onChange={e => handleChange('price', e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <CustomTextField
                label='Quantity'
                disabled
                value={variantData.quantity}
                onChange={e => handleChange('quantity', e.target.value)}
                fullWidth
              />
            </TableCell>
          
        <TableCell>
          <Button variant='contained' onClick={(e) => { e.stopPropagation(); openAddCombinationDialog()  }}>
            Add value
          </Button>
        </TableCell>
      </TableRow>
      {/* {open && (
        <>
          <TableRow>
            <TableCell colSpan={3}>
              <TextField
                label='Price'
                value={variantData.price}
                onChange={e => handleChange('price', e.target.value)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>
              <TextField
                label='Quantity'
                value={variantData.quantity}
                onChange={e => handleChange('quantity', e.target.value)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          {variantData.combinations.map((combination, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell colSpan={2}>
                  <TextField
                    label='Combination'
                    value={combination.combination}
                    onChange={(e) => {
                      console.log('Combination Change Triggered');
                      handleCombinationChange(index, 'combination', e.target.value);
                    }}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button variant='contained' onClick={() => openEditCombinationDialog(combination)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <TextField
                    label='Combination Price'
                    value={combination.price}
                    onChange={e => handleCombinationChange(index, 'price', e.target.value)}
                    fullWidth
                    type='number'
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <TextField
                    label='Combination Quantity'
                    value={combination.quantity}
                    onChange={e => handleCombinationChange(index, 'quantity', e.target.value)}
                    fullWidth
                    type='number'
                  />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </>
      )} */}
      <AddCombinationDialog
        open={addCombinationDialogOpen}
        onClose={closeAddCombinationDialog}
        onSave={handleAddCombination}
      />
      {/* {currentCombination && (
        <EditCombinationDialog
          open={editCombinationDialogOpen}
          onClose={closeEditCombinationDialog}
          combination={currentCombination}
          onSave={handleEditCombination}
        />
      )} */}
    </>
  );
};

export default function VariantCombinationTable({ data, onSave }) {
  const cleanedData = cleanData(data);
  
console.log(cleanedData, 'cleanedData');

  const structuredData = createDataStructure(cleanedData);
  console.log(structuredData, 'structureData');
  console.log(data, 'data');
  
  
  const [openStates, setOpenStates] = useState({});
  // const [allExpanded, setAllExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  // const [addDialogOpen, setAddDialogOpen] = useState(false);
  // const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
  

  const handleSelectItems = (itemId) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleSelectAll = () => {
    const newSelectAll = !Object.values(selectedItems).every(Boolean);
    const newSelectedItems = {};
    structuredData.values.forEach(variant => {
      newSelectedItems[variant.variant] = newSelectAll;
      variant.combinations.forEach(combination => {
        newSelectedItems[combination.combination] = newSelectAll;
      });
    });
    setSelectedItems(newSelectedItems);
  };

  const handleToggle = (variant) => {
    setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }));
  };

  // const handleExpandCollapseAll = () => {
  //   const newAllExpanded = !allExpanded;
  //   setAllExpanded(newAllExpanded);
  //   setOpenStates(
  //     structuredData.values.reduce((acc, variantObj) => {
  //       acc[variantObj.variant] = newAllExpanded;
  //       return acc;
  //     }, {})
  //   );
  // };

  const handleVariantSave = (variantId, newData) => {
    const updatedVariants = data.map(variant => (variant.variant === variantId ? { ...variant, ...newData } : variant));
    onSave(updatedVariants);
    console.log('updatedVariants', updatedVariants);
  };


  const openDialog = variant => {
    setCurrentVariant(variant)
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    setCurrentVariant(null)
  }
  // const handleAddVariant = (newVariant) => {
  //   const updatedVariants = [...data, { ...newVariant, combinations: [] }];
  //   onSave(updatedVariants);
  // };

  // const handleEditVariant = (updatedVariant) => {
  //   handleVariantSave(updatedVariant.variant, updatedVariant);
  // };

  // const openAddDialog = () => {
  //   setAddDialogOpen(true);
  // };

  // const openEditDialog = (variant) => {
  //   setCurrentVariant(variant);
  //   setEditDialogOpen(true);
  // };

  // const closeAddDialog = () => {
  //   setAddDialogOpen(false);
  // };

  // const closeEditDialog = () => {
  //   setEditDialogOpen(false);
  // };

  if (!structuredData.values || structuredData.values.length === 0 || !structuredData.type) {
    return (
      <Card>
        <CardContent>
          <Typography>No Data Available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container className='mt-5 p-3'>
      {/* <Button variant='contained' onClick={openAddDialog}>
        Add Variant
      </Button> */}
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>
                <Checkbox
                  checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
                  indeterminate={
                    Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Image</TableCell>
            <TableCell>Variant's</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Action</TableCell>
              {/* <TableCell align='right'>
                Variant */}
                {/* <IconButton aria-label='expand all' size='small' onClick={handleExpandCollapseAll}> */}
                  {/* {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
                {/* </IconButton> */}
              {/* </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {structuredData.values?.map((variantObj, index) => (
             <VariantRow
             key={variantObj.variant + index}
             variant={variantObj}
             combinations={variantObj.combinations}
             open={openStates[variantObj.variant]}
             onToggle={() => handleToggle(variantObj.variant)}
             selectedItems={selectedItems}
             handleSelectItems={handleSelectItems}
             onSave={handleVariantSave}
           />           
            ))}
          </TableBody>
        </Table>
       
      </TableContainer>
      {/* <AddVariantDialog open={addDialogOpen} onClose={closeAddDialog} onSave={handleAddVariant} /> */}
      {/* {currentVariant && (
        <EditVariantDialog
          open={editDialogOpen}
          onClose={closeEditDialog}
          variant={currentVariant}
          onSave={handleEditVariant}
        />
      )} */}
    </Grid>
  );
}
