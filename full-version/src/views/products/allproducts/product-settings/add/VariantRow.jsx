
import React from 'react';
import { TableRow, TableCell, Checkbox, Box, TextField, IconButton, Collapse, Table, TableBody } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CombinationRow from './CombinationRow'; // Adjust import as necessary
import CombinationRow from '@/views/products/allproducts/product-settings/add/CombinationRow'
import VariantDialog from '@/views/products/allproducts/product-settings/VariantDialog'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import Link from '@/components/Link';
import Typography from '@mui/material';

const VariantRow = ({ variant, combinations, open, onToggle, selectedItems, handleSelectItems }) => (
  <>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={variant.variant}>
      <TableCell align='left'>
        <Checkbox checked={selectedItems[variant.variant]} onChange={() => handleSelectItems(variant.variant)} />
      </TableCell>
      <TableCell align='left'>
        <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
      </TableCell>
      <TableCell component='th' scope='row'>
        {combinations.length === 0 ? (
          <OpenDialogOnElementClick
            element={Typography}
            elementProps={{
              children: variant.variant,
              component: Link, // Adjust if using a Link component
              color: 'primary',
              onClick: (e) => e.preventDefault()
            }}
            dialog={VariantDialog}
            dialogProps={{ title: 'check' }}
          />
        ) : (
            <>
              <div className='flex flex-col'>
                <div>
                  
                {variant.variant}
</div>
                <div className=' opacity-50'>

             variant {combinations.length}
                </div>
              </div>
            <IconButton aria-label='expand row' size='small' onClick={onToggle}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </>
        )}
      </TableCell>
      <TableCell align='right'>
        <TextField placeholder='price' />
      </TableCell>
      <TableCell align='right'>
        <TextField placeholder='quantity' />
      </TableCell>
    </TableRow>
    {combinations.length > 0 && (
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  {combinations.map((combination) => (
                    <CombinationRow
                      key={combination.combination}
                      combination={combination}
                      selectedItems={selectedItems}
                      handleSelectItems={handleSelectItems}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    )}
  </>
);

export default VariantRow;
