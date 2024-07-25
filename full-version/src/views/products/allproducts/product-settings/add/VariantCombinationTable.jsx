import * as React from 'react'
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
import { useEffect, useState } from 'react'
import AddCombinationDialog from './AddCombinationDialog'

const cleanData = data => {
  console.log(data, 'data before cleaning')
  return data.map(item => {
    const cleanedItem = { ...item }
    if (Array.isArray(cleanedItem.combinations)) {
      cleanedItem.combinations = cleanedItem.combinations.filter(combination => {
        return combination.combination && combination.price !== undefined && combination.quantity !== undefined
      })
    } else {
      cleanedItem.combinations = []
    }
    return cleanedItem
  })
}

const createDataStructure = data => {
  console.log(data, 'data before structuring')
  return {
    type: 'variants',
    values: data.map(item => {
      // Extract dynamic keys excluding 'combinations'
      const variantKeys = Object.keys(item).filter(key => key !== 'combinations')

      // Generate the combination string from dynamic keys
      const combinationString = variantKeys.map(key => item[key]).join('/') || 'N/A'

      // Ensure price and quantity have default values if not present
      const price = item.price !== undefined ? item.price : 0
      const quantity = item.quantity !== undefined ? item.quantity : 0

      // Map combinations if they exist
      const combinations = item.combinations
        ? item.combinations.map(combination => ({
            combination: combination.combination,
            price: combination.price,
            quantity: combination.quantity
          }))
        : []

      // Return structured data for the current item
      return {
        variant: combinationString,
        price,
        quantity,
        combinations
      }
    })
  }
}

const VariantRow = ({ variant, combinations, selectedItems, handleSelectItems, onSave, handleVariantSave }) => {
  const [variantData, setVariantData] = useState({
    ...variant,
    // price: variant.price || 0,
    // quantity: variant.quantity || 0,
    combinations: variant.combinations || []
  })
  const [allData, setAllData] = useState(variant.combinations || [])

  const [addCombinationDialogOpen, setAddCombinationDialogOpen] = useState(false)

  if (!variant) {
    console.error('Variant is undefined:', variant)
    return null
  }

  useEffect(() => {
    console.log('variantData:', variantData)
    setVariantData(variant)
  }, [variantData])

  useEffect(() => {
    console.log('Received variant props:', variant)
    console.log('variantData:', variantData)
  }, [variant])

  const handleChange = (field, value) => {
    console.log(`Updating field: ${field}, with value: ${value}`)
    setVariantData(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  // useEffect(() => {
  //   onSave(variant.variant, variantData)
  // }, [variantData])

  useEffect(() => {
    setVariantData({ ...variant, combinations: variant.combinations || [] });
  }, [variant]);

  // const handleChange = (field, value) => {
  //   setVariantData(prevData => ({ ...prevData, [field]: value }));
  // };
  
  const handleAddCombination = newCombination => {
    console.log('Adding new combination:', newCombination)

    const updatedCombinations = [...variantData.combinations, newCombination]
    const updatedVariantData = {
      ...variantData,
      combinations: updatedCombinations
    }

    console.log('Updated combinations:', updatedCombinations)
    console.log('Updated variantData before saving:', updatedVariantData)

    setVariantData(updatedVariantData);
    setAllData(updatedCombinations)
  handleSave()
  }
console.log(allData)
  // const handleAddCombination = newCombination => {
  //   console.log("new combo",newCombination)
  //   setVariantData(prevData => ({
  //     ...prevData,
  //     combinations: [...prevData.combinations, newCombination]
  //   }));

  const openAddCombinationDialog = () => {
    setAddCombinationDialogOpen(true)
  }

  const closeAddCombinationDialog = () => {
    setAddCombinationDialogOpen(false)
  }

  const handelRowClick = e => {
    if (e.target.type !== 'checkbox' && e.target.type !== 'file') {
      openAddCombinationDialog()
    }
  }

  console.log(variant, 'variant')
  console.log(combinations)

  
  const handleSave = () => {
    if (onSave) {
      onSave(variant.variant, variantData);
    }
  };

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
          <input type='file' accept='image/*' onChange={e => handleChange('image', e.target.files[0])} />
        </TableCell>
        <TableCell>{variant.variant}</TableCell>
        <TableCell>
          {/* <CustomTextField
            label='Price'
            disabled
            value={variantData.price}
            onChange={e => handleChange('price', e.target.value)}
            fullWidth
          /> */}
          price
        </TableCell>
        <TableCell>
          {/* <CustomTextField
            label='Quantity'
            disabled
            value={variantData.quantity}
            onChange={e => handleChange('quantity', e.target.value)}
            fullWidth
          /> */}
          quantity
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
        onSave={handleAddCombination}
      />
    </>
  )
}

export default function VariantCombinationTable({ productVariantData, onSave }) {
  const cleanedData = cleanData(productVariantData)

  console.log(cleanedData, 'cleanedData')

  const structuredData = createDataStructure(cleanedData)
  console.log(structuredData, 'structureData')
  console.log(productVariantData, 'data from product Variant')

  const [openStates, setOpenStates] = useState({})
  const [selectedItems, setSelectedItems] = useState({})
  const [allVariants, setAllVariants] = useState([])

  const handleSelectItems = itemId => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }))
  }
  console.log(allVariants, 'all variant')

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

  const handleVariantSave = (variantId, newData) => {
    console.log('Saving variant:', variantId, newData)

    const updatedVariants = productVariantData.map(variant =>
      variant.variant === variantId ? { ...variant, ...newData } : variant
    )

    console.log('Updated Variants......:', updatedVariants)

    setAllVariants(updatedVariants)
    onSave(updatedVariants)
  }


  if (!structuredData.values || structuredData.values.length === 0 || !structuredData.type) {
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
    </Grid>
  )
}
