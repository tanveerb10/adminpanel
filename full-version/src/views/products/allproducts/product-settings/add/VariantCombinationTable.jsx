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
import { useEffect, useState, useCallback, useMemo } from 'react'
import AddCombinationDialog from './AddCombinationDialog'
import { useProduct } from '../../productContext/ProductStateManagement'

const generateVariants = options => {
  const variants = []

  const combineOptions = (index, current) => {
    if (index >= options.length) {
      // Create a values string from current option values
      const values = Object.keys(current)
        .filter(key => key.endsWith('_value'))
        .map(key => current[key])
        .join('/')

      variants.push({
        ...current,
        values,
        variant_sku: '',
        variant_compare_at_price: 0,
        variant_inventory_qty: 0,
        variant_price: 0,
        variant_weight: 0,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0,
        variant_tax: 0,
        country_of_origin: 'IN'
      })
      return
    }

    const { option_name, option_values } = options[index]

    option_values.forEach(value => {
      combineOptions(index + 1, {
        ...current,
        [`option${index + 1}_name`]: option_name,
        [`option${index + 1}_value`]: value.option_value
      })
    })
  }

  combineOptions(0, {})
  return variants
}

const VariantRow = ({ variant, selectedItems, handleSelectItems,index }) => {
  const [variantData, setVariantData] = useState({
    ...variant
  })

  const { productData } = useProduct()
  
  const [addCombinationDialogOpen, setAddCombinationDialogOpen] = useState(false)

  if (!variant) {
    console.error('Variant is undefined:', variant)
    return null
  }

  // useEffect(() => {
  //   console.log('variantData:', variantData)
  //   setVariantData(variant)
  // }, [variantData])

  // const handleChange = (field, value) => {
  //   console.log(`Updating field: ${field}, with value: ${value}`)
  //   setVariantData(prevState => ({
  //     ...prevState,
  //     [field]: value
  //   }))
  // }

  // useEffect(() => {
  //   setVariantData({ ...variant, combinations: variant.combinations || [] })
  // }, [variant])

  // const openAddCombinationDialog = () => {
  //   setAddCombinationDialogOpen(true)
  // }

  // const closeAddCombinationDialog = () => {
  //   setAddCombinationDialogOpen(false)
  // }

  // const handelRowClick = e => {
  //   if (e.target.type !== 'checkbox' && e.target.type !== 'file') {
  //     openAddCombinationDialog()
  //   }
  // }

  useEffect(() => {
    setVariantData({ ...variant, combinations: variant.combinations || [] })
  }, [variant])

  const handleChange = useCallback((field, value) => {
    setVariantData(prevState => ({
      ...prevState,
      [field]: value
    }))
  }, [])

  const openAddCombinationDialog = useCallback(() => {
    setAddCombinationDialogOpen(true)
  }, [])

  const closeAddCombinationDialog = useCallback(() => {
    setAddCombinationDialogOpen(false)
  }, [])

  const handleRowClick = useCallback(
    e => {
      if (e.target.type !== 'checkbox' && e.target.type !== 'file') {
        openAddCombinationDialog()
      }
    },
    [openAddCombinationDialog]
  )

  return (
    <>
      <TableRow onClick={handleRowClick}>
        <TableCell>
          <Checkbox
            checked={selectedItems[variant.variant] || false}
            onChange={() => handleSelectItems(variant.variant)}
          />
        </TableCell>
        <TableCell>
          <input type='file' accept='image/*' onChange={e => handleChange('image', e.target.files[0])} />
        </TableCell>
        <TableCell>{variantData.values}</TableCell>
        <TableCell>
          <CustomTextField label='Price' disabled value={productData.child[index].variant_price} fullWidth />
        </TableCell>
        <TableCell>
          <CustomTextField label='Quantity' disabled value={productData.child[index].variant_inventory_qty} fullWidth />
        </TableCell>

        <TableCell>
          <Button
            variant='contained'
            onClick={e => {
              e.stopPropagation()
              openAddCombinationDialog()
            }}
          >
            Add value
          </Button>
        </TableCell>
      </TableRow>

      <AddCombinationDialog
        open={addCombinationDialogOpen}
        onClose={closeAddCombinationDialog}
        dialogData={variantData}
        variant={variant}
        index={index}
      />
    </>
  )
}
export default function VariantCombinationTable({ data }) {
  // const structuredData = generateVariants(data)
  const { productData ,updateProductData } = useProduct()

  useEffect(() => {
    const values = { child: generateVariants(data) }
    updateProductData(values)
  }, [data])
  console.log(productData.child)

  const [openStates, setOpenStates] = useState({})
  const [selectedItems, setSelectedItems] = useState({})

  // const handleSelectItems = itemId => {
  //   setSelectedItems(prevState => ({
  //     ...prevState,
  //     [itemId]: !prevState[itemId]
  //   }))
  // }
  // console.log(allVariants, 'all variant')

  // const handleSelectAll = () => {
  //   const newSelectAll = !Object.values(selectedItems).every(Boolean)
  //   const newSelectedItems = {}
  //   structuredData.forEach(variant => {
  //     newSelectedItems[variant.variant] = newSelectAll
  //     variant.forEach(combination => {
  //       newSelectedItems[combination.combination] = newSelectAll
  //     })
  //   })
  //   setSelectedItems(newSelectedItems)
  // }

  // const handleToggle = variant => {
  //   setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }))
  // }

  // if (!structuredData || structuredData?.length === 0 || !Array.isArray(structuredData)) {
  //   console.log(
  //     structuredData?.values,
  //     'structured value',
  //     structuredData?.values?.length,
  //     'structuredData length',
  //     structuredData?.type,
  //     'structuredData type'
  //   )
  //   return (
  //     <Card>
  //       <CardContent>
  //         <Typography>No Data Available</Typography>
  //       </CardContent>
  //     </Card>
  //   )
  // }

  const handleSelectItems = useCallback(itemId => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }))
  }, [])

  const handleSelectAll = useCallback(() => {
    const newSelectAll = !Object.values(selectedItems).every(Boolean)
    const newSelectedItems = {}
    structuredData.forEach(variant => {
      newSelectedItems[variant.variant] = newSelectAll
      variant.combinations.forEach(combination => {
        newSelectedItems[combination.combination] = newSelectAll
      })
    })
    setSelectedItems(newSelectedItems)
  }, [productData, selectedItems])

  const handleToggle = useCallback(variant => {
    setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }))
  }, [])

  if (!productData.child || productData.child.length === 0) {
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
              <TableCell>Image</TableCell>
              <TableCell>Variant's</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData?.child?.map((variantObj, index) => (
              <VariantRow
                key={index}
                variant={variantObj}
                index={index}
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
