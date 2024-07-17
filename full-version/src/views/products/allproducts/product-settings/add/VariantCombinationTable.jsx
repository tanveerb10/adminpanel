import * as React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { createDataStructure, cleanData } from '@/utils/productVariantCombination'
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
  // TextField,
  IconButton,
  // Box,
  // Collapse,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import VariantRow from '@/views/products/allproducts/product-settings/add/VariantRow'

export default function VariantCombinationTable({ data }) {
  
  console.log('data from parent', data)

  if (!Array.isArray(data)) {
    console.error('Data is not an array')
    return null
  }

  const cleanedData = cleanData(data)
  console.log("clean", cleanedData);
  const structuredData = createDataStructure(cleanedData)
console.log('structure', structuredData)

  console.log(structuredData)

  const [openStates, setOpenStates] = React.useState({})
  const [allExpanded, setAllExpanded] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState({})
 
  const handleSelectItems = itemId => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }))
  }

  const handleSelectAll = () => {
    const newSelectAll = !Object.values(selectedItems).every(Boolean)
    const newSelectedItems = {}
    structuredData.values.forEach(variant => {
      newSelectedItems[variant.variant] = newSelectAll
      variant.combinations.forEach(combination => {
        newSelectedItems[combination.combination] = newSelectAll
      })
    })
    setSelectedItems(newSelectedItems)
  }
  const handleToggle = variant => {
    setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }))
  }

  const handleExpandCollapseAll = () => {
    const newAllExpanded = !allExpanded
    setAllExpanded(newAllExpanded)
    setOpenStates(
      structuredData.values.reduce((acc, variantObj) => {
        acc[variantObj.variant] = newAllExpanded
        return acc
      }, {})
    )
  }
  if (structuredData.values?.length === 0 || structuredData.type == undefined || structuredData.values == undefined) {
    return (
      <Card>
        <CardContent>
          <Typography>No Data Available</Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <Grid container className='mt-5 p-3'>
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
              <TableCell align='right'>
                Variant
                <IconButton aria-label='expand all' size='small' onClick={handleExpandCollapseAll}>
                  {allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Quantity</TableCell>
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
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

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
