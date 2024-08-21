'use client'

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
  Button,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useEffect, useState, useCallback } from 'react'
import AddVariantValue from '@/views/products/allproducts/product-settings/add/AddVariantValue'
import { useProduct } from '@/views/products/allproducts/productContext/ProductStateManagement'
import { toast } from 'react-toastify'

export const generateVariants = options => {
  const variants = []

  const combineOptions = (index, current) => {
    if (index >= options.length) {
      variants.push({
        ...current,
        variant_sku: '',
        variant_compare_at_price: 0,
        variant_inventory_qty: 0,
        variant_price: 0,
        variant_weight: 0,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0,
        variant_tax: '',
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

const VariantRow = ({ variant, selectedItems, handleSelectItems, index }) => {
  const [variantData, setVariantData] = useState({
    ...variant
  })

  const { productData } = useProduct()

  const [AddVariantValueOpen, setAddVariantValueOpen] = useState(false)

  if (!variant) {
    toast.error('Variant is undefined:', variant)
    return null
  }

  useEffect(() => {
    setVariantData({ ...variant })
  }, [variant])

  const handleChange = useCallback((field, value) => {
    setVariantData(prevState => ({
      ...prevState,
      [field]: value
    }))
  }, [])

  const openAddVariantValue = useCallback(() => {
    setAddVariantValueOpen(true)
  }, [])

  const closeAddVariantValue = useCallback(() => {
    setAddVariantValueOpen(false)
  }, [])

  const handleRowClick = useCallback(
    e => {
      if (e.target.type !== 'checkbox' && e.target.type !== 'file') {
        openAddVariantValue()
      }
    },
    [openAddVariantValue]
  )
  const values = Object.keys(variant)
    .filter(key => key.endsWith('_value'))
    .map(key => variant[key])
    .join('/')

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
        <TableCell>{values}</TableCell>
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
              openAddVariantValue()
            }}
          >
            Add value
          </Button>
        </TableCell>
      </TableRow>

      <AddVariantValue
        open={AddVariantValueOpen}
        onClose={closeAddVariantValue}
        dialogData={variantData}
        variant={variant}
        index={index}
      />
    </>
  )
}
export default function VariantCombinationTable() {
  const { productData } = useProduct()

  // useEffect(() => {
  //   // if (data?.length) {
  //   console.log('------------------------------')
  //   console.log(data, '..................DATAAAAAAAAAA')
  //   console.log('------------------------------')
  //   console.log(JSON.stringify(productData.child))
  //   console.log('------------------------------')
  //   console.log(data !== productData.child)
  //   // console.log(isAddProduct || data?.length)
  //   if (isAddProduct) {
  //     updateChildData(generateVariants(data))
  //     console.log('tanveer')
  //   }
  // }, [data])

  const [openStates, setOpenStates] = useState({})
  const [selectedItems, setSelectedItems] = useState({})

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
