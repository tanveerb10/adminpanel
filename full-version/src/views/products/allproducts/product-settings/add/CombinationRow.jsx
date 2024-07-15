import React from 'react';
import { TableRow, TableCell, Checkbox, Box, Typography, TextField } from '@mui/material';
// import { OpenDialogOnElementClick, VariantDialog } from 'your-component-library'; // Adjust imports as necessary
import VariantDialog from '@/views/products/allproducts/product-settings/VariantDialog'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import Link from '@/components/Link';
// import Typography from '@mui/material';

const CombinationRow = ({ combination, selectedItems, handleSelectItems }) => {
  const typographyProps = {
    children: combination.combination,
    component: Link, // Adjust if using a Link component
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
          dialogProps={{ title: 'check' }}
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
