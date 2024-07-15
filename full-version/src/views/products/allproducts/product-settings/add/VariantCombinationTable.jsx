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
// import CombinationRow from '@/views/products/allproducts/product-settings/add/CombinationRow'
// import VariantDialog from '@/views/products/allproducts/product-settings/VariantDialog'
// import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
// import Link from '@/components/Link'
// export default function Testing({ data }) {
//   console.log('data from parent', data)
//   // console.log(typeof [])

//   // Ensure data is an array
//   if (!Array.isArray(data)) {
//     console.error('Data is not an array')
//     return null
//   }

//   const cleanedData = cleanData(data)
//   const structuredData = createDataStructure(cleanedData)

//   console.log(structuredData)

//===================================================structure data======================================
// function createData(checkbox, image, variant, available, price) {
//   return {
//     checkbox,
//     image,
//     variant,
//     price,
//     available,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1
//       }
//     ]
//   }
// }

// const type = structuredData.type
// const checkdataaccess = dataaccess.values.map((index)=> {
//   console.log(index.variant)
//   const com =(index.combinations.map((comaccess) => {
//     console.log(comaccess.combination)
//   }))
// })

// const variantvalue =structuredData.values.map((index) => {
//   const variant = index.variant

//   const combination = index.combinations.map((combine) => {
//     const combinations=(combine.combination)
//     return combinations
//   })
//   return variant
// })
// const rows = [

//   createData(variant, combinations )
//   // createData('Frozen check', 159, 6.0, 24, 4.0, 3.99),
//   // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
//   // createData({structuredData})
// ]

//   function Row(props) {
//     const { row } = props
//     const [open, setOpen] = React.useState(false)

//     return (
//       <React.Fragment>
//       {structuredData.values.map(index => (
//           <>
//         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={index.type}>
//           {/* <TableCell>

//           </TableCell> */}
//           <TableCell align='left'>checkbox</TableCell>
//           <TableCell align='left'>
//             <Box sx={{ p: 2, border: '2px dashed grey' }}>image</Box>
//           </TableCell>
//           <TableCell component='th' scope='row'>
//             variantValue
//             <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </TableCell>
//           {/* <TableCell align='right'>{row.protein}</TableCell> */}
//           <TableCell align='right'>
//             <TextField placeholder='price' />
//           </TableCell>
//           <TableCell align='right'>
//             <TextField placeholder='quantity' />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//             <Collapse in={open} timeout='auto' unmountOnExit>
//               <Box sx={{ margin: 1 }}>
//                 <Table size='small' aria-label='purchases'>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell align='right'>Price</TableCell>
//                       <TableCell align='right'>Available</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
// {/*
//                       <TableRow >
//                         <TableCell align='left'>checkbox</TableCell>
//                         <TableCell>
//                           <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
//                         </TableCell>
//                         <TableCell>hello</TableCell>
//                         <TableCell>{index.variant}</TableCell>
//                       </TableRow>
//                      */}
//                     {index.combinations.map(variantValues => (
//                       <TableRow key={variantValues.combination}>
//                         <TableCell align='left'>checkbox</TableCell>
//                         <TableCell>
//                           <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
//                         </TableCell>
//                         <TableCell component='th' scope='row'>
//                           variantvalue {variantValues.combination}
//                         </TableCell>
//                         <TableCell align='right'>
//                           <TextField placeholder='price' value={variantValues.price} />
//                         </TableCell>
//                         <TableCell align='right'>
//                           <TextField placeholder='quantity' value={variantValues.quantity} />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </Collapse>
//           </TableCell>
//           </TableRow>
//           </>
//            ))}
//       </React.Fragment>
//     )
//   }

//   Row.propTypes = {
//     row: PropTypes.shape({
//       calories: PropTypes.number.isRequired,
//       carbs: PropTypes.number.isRequired,
//       fat: PropTypes.number.isRequired,
//       history: PropTypes.arrayOf(
//         PropTypes.shape({
//           amount: PropTypes.number.isRequired,
//           customerId: PropTypes.string.isRequired,
//           date: PropTypes.string.isRequired
//         })
//       ).isRequired,
//       name: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       protein: PropTypes.number.isRequired
//     }).isRequired
//   }

// =======================================================Working=======================================
//   const [open, setOpen] = React.useState(false)

//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               {/* <TableCell /> */}
//               <TableCell align='left'>checkbox</TableCell>
//               {/* <TableCell align='right'>Calories</TableCell> */}
//               <TableCell align='right'>Variant</TableCell>
//               <TableCell align='right'>Price</TableCell>
//               <TableCell align='right'>quantity</TableCell>
//             </TableRow>
//           </TableHead>
//           {/* <TableBody>
//             <TableCell >hello</TableCell>
//           </TableBody> */}
//           <TableBody>
//             {/* {rows.map(row => (
//               <Row key={row.variantValues} row={row} />
//             ))} */}
//               {structuredData.values.map(index => (
//           <>
//         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={index.type}>
//           {/* <TableCell>

//           </TableCell> */}
//           <TableCell align='left'>checkbox</TableCell>
//           <TableCell align='left'>
//             <Box sx={{ p: 2, border: '2px dashed grey' }}>image</Box>
//           </TableCell>
//           <TableCell component='th' scope='row'>
//             {index.variant}
//             <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </TableCell>
//           {/* <TableCell align='right'>{row.protein}</TableCell> */}
//           <TableCell align='right'>
//             <TextField placeholder='price' />
//           </TableCell>
//           <TableCell align='right'>
//             <TextField placeholder='quantity' />
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//             <Collapse in={open} timeout='auto' unmountOnExit>
//               <Box sx={{ margin: 1 }}>
//                 <Table size='small' aria-label='purchases'>
//                   {/* <TableHead>
//                     <TableRow>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Customer</TableCell>
//                       <TableCell align='right'>Price</TableCell>
//                       <TableCell align='right'>Available</TableCell>
//                     </TableRow>
//                   </TableHead> */}
//                   <TableBody>
// {/*
//                       <TableRow >
//                         <TableCell align='left'>checkbox</TableCell>
//                         <TableCell>
//                           <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
//                         </TableCell>
//                         <TableCell>hello</TableCell>
//                         <TableCell>{index.variant}</TableCell>
//                       </TableRow>
//                      */}
//                     {index.combinations.map(variantValues => (
//                       <TableRow key={variantValues.combination}>
//                         <TableCell align='left'>checkbox</TableCell>
//                         <TableCell>
//                           <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
//                         </TableCell>
//                         <TableCell component='th' scope='row'>
//                            {variantValues.combination}
//                         </TableCell>
//                         <TableCell align='right'>
//                           <TextField placeholder='price' value={variantValues.price} />
//                         </TableCell>
//                         <TableCell align='right'>
//                           <TextField placeholder='quantity' value={variantValues.quantity} />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </Collapse>
//           </TableCell>
//           </TableRow>
//           </>
//            ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   )
// }

// =======================================================Cleaning=======================================
// export default function Testing({ data }) {
//   console.log('data from parent', data)

//   if (!Array.isArray(data)) {
//     console.error('Data is not an array')
//     return null
//   }

//   const cleanedData = cleanData(data)
//   const structuredData = createDataStructure(cleanedData)

//   console.log(structuredData)

//   const [open, setOpen] = React.useState({})
//   const handleToggle = (variant) => {
//     setOpen(prevState => ({...prevState,[variant]: !prevState[variant]}))
//   }

//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='left'><Checkbox/></TableCell>

//               <TableCell align='right'>Variant</TableCell>
//               <TableCell align='right'>Price</TableCell>
//               <TableCell align='right'>quantity</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {structuredData.values.map(index => (
//               <>
//                 <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={index.variant}>
//                   <TableCell align='left'><Checkbox/></TableCell>
//                   <TableCell align='left'>
//                     <Box sx={{ p: 2, border: '2px dashed grey' }}>image</Box>
//                   </TableCell>
//                   <TableCell component='th' scope='row'>
//                     {index.variant}
//                     <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
//                       {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                   </TableCell>

//                   <TableCell align='right'>
//                     <TextField placeholder='price' />
//                   </TableCell>
//                   <TableCell align='right'>
//                     <TextField placeholder='quantity' />
//                   </TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout='auto' unmountOnExit>
//                       <Box sx={{ margin: 1 }}>
//                         <Table size='small' aria-label='purchases'>
//                           <TableBody>
//                             {index.combinations.map(variantValues => (
//                               <TableRow key={variantValues.combination}>
//                                 <TableCell align='left'><Checkbox/></TableCell>
//                                 <TableCell>
//                                   <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
//                                 </TableCell>
//                                 <TableCell component='th' scope='row'>
//                                   {variantValues.combination}
//                                 </TableCell>
//                                 <TableCell align='right'>
//                                   <TextField placeholder='price' value={variantValues.price} />
//                                 </TableCell>
//                                 <TableCell align='right'>
//                                   <TextField placeholder='quantity' value={variantValues.quantity} />
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                           </TableBody>
//                         </Table>
//                       </Box>
//                     </Collapse>
//                   </TableCell>
//                 </TableRow>
//               </>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   )
// }

// =======================================================More update and robust=======================================

// const CombinationRow = ({ combination, selectedItems, handleSelectItems }) => {
//   const typographyProps = {
//     children: combination.combination,
//     component: Link,
//     color: 'primary',
//     onClick: e => e.preventDefault()
//   }
//   return (
//     <TableRow key={combination.combination}>
//       <TableCell align='left'>
//         <Checkbox
//           checked={selectedItems[combination.combination]}
//           onChange={() => handleSelectItems(combination.combination)}
//         />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ p: 2, border: '2px dashed grey' }}>Image</Box>
//       </TableCell>
//       <TableCell component='th' scope='row'>
        
//         <OpenDialogOnElementClick
//           element={Typography}
//           elementProps={typographyProps}
//           dialog={VariantDialog}
//           dialogProps={{ title: 'check' }}
//         />
//       </TableCell>
//       <TableCell align='right'>
//         <TextField placeholder='price' value={combination.price} />
//       </TableCell>
//       <TableCell align='right'>
//         <TextField placeholder='quantity' value={combination.quantity} />
//       </TableCell>
//     </TableRow>
//   )
// }

// const VariantRow = ({ variant, combinations, open, onToggle, selectedItems,handleSelectItems }) => (
//   <>
//     <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={variant.variant}>
//       <TableCell align='left'>
//         <Checkbox checked={selectedItems[variant.variant]} onChange={() => handleSelectItems(variant.variant)} />
//       </TableCell>
//       <TableCell align='left'>
//         <Box sx={{ p: 2, border: '2px dashed grey' }}>image</Box>
//       </TableCell>
//       <TableCell component='th' scope='row'>
//         {combinations.length === 0 ? (
//           <OpenDialogOnElementClick
//             element={Typography}
//             elementProps={{
//               children: variant.variant,
//               component: Link,
//               color: 'primary',
//               onClick: e => e.preventDefault()
//             }}
//             dialog={VariantDialog}
//             dialogProps={{ title: 'check' }}
//           />
//         ) : (
//           <>
//             {variant.variant}

//             <IconButton aria-label='expand row' size='small' onClick={onToggle}>
//               {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>
//           </>
//         )}
//       </TableCell>
//       <TableCell align='right'>
//         <TextField placeholder='price' />
//       </TableCell>
//       <TableCell align='right'>
//         <TextField placeholder='quantity' />
//       </TableCell>
//     </TableRow>
//     {console.log('comb lenght', combinations.length, combinations)}
//     {combinations.length > 0 && (
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout='auto' unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Table size='small' aria-label='purchases'>
//                 <TableBody>
//                   {combinations.map(combination => (
//                     <CombinationRow
//                       key={combination.combination}
//                       combination={combination}
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
//     )}
//   </>
// )

export default function VariantCombinationTable({ data }) {
  
  console.log('data from parent', data)

  if (!Array.isArray(data)) {
    console.error('Data is not an array')
    return null
  }

  const cleanedData = cleanData(data)
  const structuredData = createDataStructure(cleanedData)

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
