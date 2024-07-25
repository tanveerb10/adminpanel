import React from 'react';
import { TableRow, TableCell, Checkbox, Box, Typography, TextField } from '@mui/material';

import VariantDialog from '@/views/products/allproducts/product-settings/VariantDialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import Link from '@/components/Link'

const CombinationRow = ({ combination, selectedItems, handleSelectItems, onSave }) => {
  const handleDialogSave = (newData) => {
    console.log("newData combination", newData, combination.combination)
    onSave(combination.combination, newData)
  }
  const typographyProps = {
    children: combination.combination,
    component: Link, 
    color: 'primary',
    onClick: (e) => e.preventDefault()
  };
  return (
    <TableRow key={combination.combination}>
      <TableCell align='left'>
        <Checkbox
          checked={selectedItems[combination.combination]}
          onChange={() => handleSelectItems(combination.combination)}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
      </TableCell>
      <TableCell component='th' scope='row'>
        <OpenDialogOnElementClick
          element={Typography}
          elementProps={typographyProps}
          dialog={VariantDialog}
          dialogProps={{ title: 'Edit',onSave:handleDialogSave }}
        />
      </TableCell>
      <TableCell align='right'>
        <TextField placeholder='price' value={combination.price} />
      </TableCell>
      <TableCell align='right'>
        <TextField placeholder='quantity' value={combination.quantity} />
      </TableCell>
    </TableRow>
  );
};

export default CombinationRow;


// ======================================working===========================

// import React from 'react';
// import { TableRow, TableCell, Checkbox, TextField, IconButton } from '@mui/material';

// export default function CombinationRow({ combination, selectedItems, handleSelectItems }) {
//   return (
//     <TableRow>
//       <TableCell align='left'>
//         <Checkbox
//           checked={selectedItems[combination.combination]}
//           onChange={() => handleSelectItems(combination.combination)}
//         />
//       </TableCell>
//       <TableCell component='th' scope='row'>
//         {combination.combination}
//       </TableCell>
//       <TableCell align='right'>
//         <TextField
//           value={combination.price}
//           onChange={() => {}}
//           size='small'
//         />
//       </TableCell>
//       <TableCell align='right'>
//         <TextField
//           value={combination.quantity}
//           onChange={() => {}}
//           size='small'
//         />
//       </TableCell>
//     </TableRow>
//   );
// }
