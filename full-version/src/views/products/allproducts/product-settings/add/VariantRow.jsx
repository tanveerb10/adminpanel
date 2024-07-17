import React from 'react'
import { TableRow, TableCell, Checkbox, Box, TextField, IconButton, Collapse, Table, TableBody } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CombinationRow from '@/views/products/allproducts/product-settings/add/CombinationRow'
import VariantDialog from '@/views/products/allproducts/product-settings/VariantDialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import Link from '@/components/Link'
import Typography from '@mui/material/Typography'

const VariantRow = ({ variant, combinations, open, onToggle, selectedItems, handleSelectItems }) => {
  // const typographyProps = {
  //   children: variant.variant,
  //   component: Link,
  //   color: 'primary',
  //   onClick: (e) => e.preventDefault()
  // };
  return (
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
                onClick: e => e.preventDefault()
              }}
              dialog={VariantDialog}
              dialogProps={{ title: 'check' }}
            />
          ) : (
            <>
              <div className='flex flex-col'>
                <div>{variant.variant}</div>
                <div className=' opacity-50'>variant {combinations.length}</div>
              </div>
              {combinations.length > 0 && (<IconButton aria-label='expand row' size='small' onClick={onToggle}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>)}
            </>
          )}
        </TableCell>
        {/* {combinations.length == 0 && (
          <> */}
            <TableCell align='right'>
              <TextField placeholder='price' />
            </TableCell>
            <TableCell align='right'>
              <TextField placeholder='quantity' />
            </TableCell>
          {/* </>
        )} */}
      </TableRow>
      {combinations.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size='small' aria-label='purchases'>
                  <TableBody>
                    {combinations.map(combination => (
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
  )
}

export default VariantRow

// ====================================================working==============================

// import React from 'react';
// import { TableRow, TableCell, Checkbox, Box, TextField, IconButton, Collapse, Table, TableBody } from '@mui/material';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CombinationRow from '@/views/products/allproducts/product-settings/add/CombinationRow';
// // import VariantDialog from '@/views/products/allproducts/product-settings/VariantDialog';
// // import { OpenDialogOnElementClick } from '@/components/Dialogs';

// export default function VariantRow({
//   variant, combinations, open, onToggle, selectedItems, handleSelectItems
// }) {
//   const allCombinationsSelected = combinations.every(comb => selectedItems[comb.combination]);

//   return (
//     <>

//       <TableRow>
//         <TableCell align='left'>
//           <Checkbox
//             checked={selectedItems[variant.variant]}
//             indeterminate={!selectedItems[variant.variant] && (selectedItems[variant.variant] || allCombinationsSelected)}
//             onChange={() => handleSelectItems(variant.variant)}
//           />
//         </TableCell>
//         <TableCell>
//           <IconButton aria-label='expand row' size='small' onClick={onToggle}>
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//           {variant.variant}
//         </TableCell>
//         <TableCell align='right'>
//           <TextField
//             value={variant.price}
//             onChange={() => {}}
//             size='small'
//           />
//         </TableCell>
//         <TableCell align='right'>
//           <TextField
//             value={variant.quantity}
//             onChange={() => {}}
//             size='small'
//           />
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout='auto' unmountOnExit>
//             <Box margin={1}>
//               <Table size='small' aria-label='combinations'>
//                 <TableBody>
//                   {combinations.map((comb, index) => (
//                     <CombinationRow
//                       key={comb.combination + index}
//                       combination={comb}
//                       selectedItems={selectedItems}
//                       handleSelectItems={handleSelectItems}
//                     />
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   );
// }
