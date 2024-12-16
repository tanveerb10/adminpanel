'use client'

// React Imports

import React, { useEffect, useState, useCallback, useMemo } from 'react'
// MUI Imports
import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from '@mui/material'
import Loader from '@/libs/components/Loader'
import CustomTextField from '@/@core/components/mui/TextField'

import { TableContainer, Paper, Table, TableRow, TableCell, Checkbox, TableBody, Typography } from '@mui/material'

import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
// MUI Imports

const initialCheckedState = data =>
  data.map(product => ({
    parentId: product._id,
    selectedVariants: new Set(),
    isChecked: false
  }))

const ProductDialog = ({ open, setOpen }) => {
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(() => initialCheckedState(productData))
  const [disableVariant, setDisableVariant] = useState([])

  const { addOrder, orders } = useOrder()

  useEffect(() => {
    setChecked(initialCheckedState(productData))
  }, [productData])

  const getProductVariations = useCallback(
    parentId => productData.find(product => product._id === parentId)?.product_variations || [],
    [productData]
  )

  const handleCheck = parentId => {
    const variations = getProductVariations(parentId).map(v => v._id)
    setChecked(prev =>
      prev.map(item => {
        if (item.parentId === parentId) {
          const isChecked = !item.isChecked

          return {
            ...item,
            isChecked,
            selectedVariants: isChecked ? new Set(variations) : new Set()
          }
        }
        return item
      })
    )
  }

  const toggleSetValue = (set, value) => {
    const newSet = new Set(set)
    if (newSet.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }
    return newSet
  }

  const handleVariantCheck = (variantId, parentId) => {
    setChecked(prev =>
      prev.map(item => {
        if (item.parentId === parentId) {
          const variations = getProductVariations(parentId).map(v => v._id)
          const newVariants = toggleSetValue(item.selectedVariants, variantId)
          const isChecked = newVariants.size === variations.length

          return {
            ...item,
            selectedVariants: newVariants,
            isChecked
          }
        }
        return item
      })
    )
  }

  const resetCheckedState = () => setChecked(initialCheckedState(productData))

  const selectedData = useMemo(() => {
    const productMap = Object.fromEntries(productData.map(product => [product._id, product]))
    return checked
      .filter(item => item.isChecked || item.selectedVariants.size > 0)
      .flatMap(val => {
        const product = productMap[val.parentId]
        if (!product) {
          console.warn(`Product with ID ${val.parentId} not found in productData.`)
          return []
        }

        console.log('sselectled val', product)

        return Array.from(val.selectedVariants)
          .map(variantId => {
            const variation = product.product_variations.find(v => v._id === variantId)
            if (!variation) {
              console.warn(`Variation with ID ${variantId} not found for product ID ${val.parentId}.`)
              return null
            }

            return {
              variationName: [
                variation.variation1?.variation_option_value,
                variation.variation2?.variation_option_value,
                variation.variation3?.variation_option_value
              ]
                .filter(Boolean)
                .join('/'),
              variationId: variation._id,
              price: variation.variation_selling_price,
              available: variation.variation_quantity,
              productId: val.parentId || null,
              productTitle: product.product_title
            }
          })
          .filter(Boolean)
      })
  }, [checked, productData])

  const handleClose = () => {
    setOpen(false)
  }

  const fetchProducts = async () => {
    const productUrl = `/admin/products/getAllProductWithVariantData`

    try {
      setLoading(true)
      const responseData = await fetchData(productUrl, 'GET')
      console.log('Get products data', responseData)
      setProductData(responseData.data)

      // setError(null)
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred'
      // setError(errorMessage)

      console.error('error got', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  console.log('checked', selectedData)

  const handleDisableVariant = () => {
    const variantIds = orders.map(val => val.variationId)
    setDisableVariant(variantIds)
  }

  // useEffect(() => {
  //   const updatedChecked = checked.map(item => {
  //     const disableVariants = orders.map(order => order.variationId)
  //     const isVariantDisabled = Array.from(item.selectedVariants).some(variantId => disableVariants.includes(variantId))

  //     if (isVariantDisabled) {
  //       return {
  //         ...item,
  //         selectedVariants: new Set(
  //           Array.from(item.selectedVariants).filter(variantId => !disableVariants.includes(variantId))
  //         ),
  //         isChecked: false // Or determine based on remaining variants
  //       }
  //     }

  //     return item
  //   })

  //   setChecked(updatedChecked)
  // }, [orders, checked])

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      aria-labelledby='add-banner-dialog-title'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <div className='flex justify-between '>
        <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-2 sm:pbs-5 sm:pbe-0 sm:pli-5'>
          Add Product
        </DialogTitle>
        <div className='p-2 sm:pbs-5 sm:pbe-0 sm:pli-5'>
          <CustomTextField label='Search Product' />
        </div>
        <div className='p-2 sm:pbs-5 sm:pbe-0 sm:pli-5'>
          <Button color='error' variant='tonal' className='' onClick={() => resetCheckedState()}>
            Reset
          </Button>
        </div>
      </div>

      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {productData.map(row => {
                const { isChecked, selectedVariants } = checked.find(item => item.parentId === row._id) || {}

                const variations = getProductVariations(row._id)
                const parentIndeterminate =
                  !isChecked && selectedVariants?.size > 0 && selectedVariants?.size < variations.length

                return (
                  <React.Fragment key={row._id}>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell>
                        <Checkbox
                          checked={isChecked}
                          indeterminate={parentIndeterminate}
                          onClick={() => handleCheck(row._id)}
                          // disabled={disableVariant.includes(row._id)}
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <div className='flex max-sm:flex-col items-center gap-6'>
                          <img
                            height={50}
                            width={50}
                            className='rounded'
                            src={'/images/avatars/1.png'}
                            alt={row.product_title}
                          />
                        </div>
                      </TableCell>
                      <TableCell component='th' scope='row' align='left'>
                        <Typography variant='h6' className='font-semibold'>
                          {row.product_title}
                        </Typography>
                      </TableCell>
                      <TableCell component='th' scope='row' align='left'>
                        <Typography variant='h6' className='font-semibold'>
                          Available
                        </Typography>
                      </TableCell>
                      <TableCell component='th' scope='row' align='left'>
                        <Typography variant='h6' className='font-semibold'>
                          Price
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Box sx={{ margin: 1 }}>
                          <Table size='small' aria-label='purchases'>
                            <TableBody>
                              {variations.map(
                                ({
                                  _id,
                                  variation1,
                                  variation2,
                                  variation3,
                                  variation_selling_price,
                                  variation_quantity
                                }) => {
                                  const isVariantChecked = selectedVariants?.has(_id)
                                  return (
                                    <TableRow key={_id}>
                                      <TableCell component='th' scope='row'>
                                        <Checkbox
                                          checked={isVariantChecked}
                                          onClick={() => handleVariantCheck(_id, row._id)}
                                          disabled={disableVariant.includes(_id)}
                                        />
                                      </TableCell>

                                      <TableCell>
                                        {[
                                          variation1?.variation_option_value,
                                          variation2?.variation_option_value,
                                          variation3?.variation_option_value
                                        ]
                                          .filter(Boolean)
                                          .join('/')}
                                      </TableCell>
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />
                                      <TableCell component='th' scope='row' align='right'>
                                        <Chip label={variation_quantity} color='secondary' variant='tonal' />
                                      </TableCell>
                                      <TableCell component='th' scope='row' align='right'>
                                        <Chip label={variation_selling_price} color='success' variant='tonal' />
                                      </TableCell>
                                    </TableRow>
                                  )
                                }
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions className='justify-end pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='tonal' type='button' color='secondary' onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            addOrder(selectedData)
            handleDisableVariant()

            handleClose()
          }}
          disabled={loading || selectedData.length <= 0}
        >
          {loading ? <Loader size={20} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductDialog

{
  /* {!loading ? (
          <CustomTextField
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder='Search Order'
            className='is-full sm:is-auto'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => handleSearch(value)} edge='end'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        ) : (
          <div className='flex items-center justify-center'>
            <Loader />
          </div> */
}
{
  /* )} */
}
// const productData = [
//   {
//     _id: '6752bce96d6c6164d55a66de',
//     product_title: 'Men Blue Denim Jeans - ABCD-12',
//     product_description:
//       'Stay in the zone while you train in this crop designed with printed panel details to keep you cool. Girls love standing in these tight fitting, printed panel to handle every kind of activity they set their mind to',
//     product_brand: '66c6da4af6c5ef7e2ef840d2',
//     product_slug: 'men-blue-denim-jeans---abcd-12',
//     product_type: 'Jeans',
//     default_category: '6752bce96d6c6164d55a66d9',
//     is_deleted: false,
//     published: 'TRUE',
//     type_standard: '128 - Apparel & Accessories > Clothing > Jean',
//     uuid: '8922496582',
//     createdAt: '2024-12-06T08:59:21.559Z',
//     updatedAt: '2024-12-06T08:59:21.559Z',
//     product_id: 1,
//     __v: 0,
//     product_variations: [
//       {
//         _id: '6752bcec6d6c6164d55a6869',
//         product_id: '6752bce96d6c6164d55a66de',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Blue'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: '2XL'
//         },
//         variation3: null,
//         variation_sku: '8912940000005',
//         variation_quantity: 100,
//         variation_mrp: 899,
//         variation_selling_price: 699,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:24.633Z',
//         updatedAt: '2024-12-06T08:59:24.633Z',
//         product_variations_id: 5,
//         __v: 0
//       },
//       {
//         _id: '6752bcec6d6c6164d55a682a',
//         product_id: '6752bce96d6c6164d55a66de',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Blue'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'XL'
//         },
//         variation3: null,
//         variation_sku: '8912940000004',
//         variation_quantity: 100,
//         variation_mrp: 899,
//         variation_selling_price: 599,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:24.216Z',
//         updatedAt: '2024-12-06T08:59:24.216Z',
//         product_variations_id: 4,
//         __v: 0
//       },
//       {
//         _id: '6752bceb6d6c6164d55a67eb',
//         product_id: '6752bce96d6c6164d55a66de',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Blue'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'L'
//         },
//         variation3: null,
//         variation_sku: '8912940000003',
//         variation_quantity: 100,
//         variation_mrp: 899,
//         variation_selling_price: 599,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:23.513Z',
//         updatedAt: '2024-12-06T08:59:23.513Z',
//         product_variations_id: 3,
//         __v: 0
//       },
//       {
//         _id: '6752bceb6d6c6164d55a67ac',
//         product_id: '6752bce96d6c6164d55a66de',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Blue'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'M'
//         },
//         variation3: null,
//         variation_sku: '8912940000002',
//         variation_quantity: 100,
//         variation_mrp: 899,
//         variation_selling_price: 599,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:23.087Z',
//         updatedAt: '2024-12-06T08:59:23.087Z',
//         product_variations_id: 2,
//         __v: 0
//       },
//       {
//         _id: '6752bcea6d6c6164d55a676a',
//         product_id: '6752bce96d6c6164d55a66de',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Blue'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'S'
//         },
//         variation3: null,
//         variation_sku: '8912940000001',
//         variation_quantity: 100,
//         variation_mrp: 899,
//         variation_selling_price: 499,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:22.385Z',
//         updatedAt: '2024-12-06T08:59:22.385Z',
//         product_variations_id: 1,
//         __v: 0
//       }
//     ]
//   },
//   {
//     _id: '6752bced6d6c6164d55a6876',
//     product_title: 'LuxeFleece Oversized Hoodie',
//     product_description:
//       'Wrap yourself in ultimate comfort with our LuxeFleece Oversized Hoodie. Crafted from ultra-soft, premium fleece, this hoodie offers a cozy, relaxed fit perfect for lounging or layering.',
//     product_brand: '66e7d57ad536dbc47d8d310f',
//     product_slug: 'luxefleece-oversized-hoodie',
//     product_type: 'Hoodie',
//     default_category: '6752bced6d6c6164d55a6871',
//     is_deleted: false,
//     published: 'TRUE',
//     type_standard: 'Apparel & Accessories > Handbag & Wallet Accessories > Wallet Chains',
//     uuid: '8568916903',
//     createdAt: '2024-12-06T08:59:25.048Z',
//     updatedAt: '2024-12-06T08:59:25.048Z',
//     product_id: 2,
//     __v: 0,
//     product_variations: [
//       {
//         _id: '6752bcf16d6c6164d55a6a61',
//         product_id: '6752bced6d6c6164d55a6876',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Red'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'L'
//         },
//         variation3: null,
//         variation_sku: '8912940000011',
//         variation_quantity: 100,
//         variation_mrp: 1599,
//         variation_selling_price: 1099,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:29.186Z',
//         updatedAt: '2024-12-06T08:59:29.186Z',
//         product_variations_id: 11,
//         __v: 0
//       },
//       {
//         _id: '6752bcf06d6c6164d55a6a1d',
//         product_id: '6752bced6d6c6164d55a6876',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Red'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'M'
//         },
//         variation3: null,
//         variation_sku: '8912940000010',
//         variation_quantity: 100,
//         variation_mrp: 1499,
//         variation_selling_price: 999,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:28.467Z',
//         updatedAt: '2024-12-06T08:59:28.467Z',
//         product_variations_id: 10,
//         __v: 0
//       },
//       {
//         _id: '6752bcf06d6c6164d55a69d9',
//         product_id: '6752bced6d6c6164d55a6876',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Red'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'S'
//         },
//         variation3: null,
//         variation_sku: '8912940000009',
//         variation_quantity: 100,
//         variation_mrp: 1499,
//         variation_selling_price: 999,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:28.026Z',
//         updatedAt: '2024-12-06T08:59:28.026Z',
//         product_variations_id: 9,
//         __v: 0
//       },
//       {
//         _id: '6752bcef6d6c6164d55a6992',
//         product_id: '6752bced6d6c6164d55a6876',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Yellow'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'L'
//         },
//         variation3: null,
//         variation_sku: '8912940000008',
//         variation_quantity: 100,
//         variation_mrp: 1599,
//         variation_selling_price: 1099,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:27.324Z',
//         updatedAt: '2024-12-06T08:59:27.324Z',
//         product_variations_id: 8,
//         __v: 0
//       },
//       {
//         _id: '6752bcee6d6c6164d55a694b',
//         product_id: '6752bced6d6c6164d55a6876',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Yellow'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'M'
//         },
//         variation3: null,
//         variation_sku: '8912940000007',
//         variation_quantity: 100,
//         variation_mrp: 1499,
//         variation_selling_price: 999,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:26.587Z',
//         updatedAt: '2024-12-06T08:59:26.587Z',
//         product_variations_id: 7,
//         __v: 0
//       },
//       {
//         _id: '6752bcee6d6c6164d55a6904',
//         product_id: '6752bced6d6c6164d55a6876',
//         variation1: {
//           variation_option_name: 'Color',
//           variation_option_value: 'Yellow'
//         },
//         variation2: {
//           variation_option_name: 'Size',
//           variation_option_value: 'S'
//         },
//         variation3: null,
//         variation_sku: '8912940000006',
//         variation_quantity: 100,
//         variation_mrp: 1499,
//         variation_selling_price: 999,
//         variation_weight: 500,
//         variation_weight_unit: 'g',
//         variation_length: 0,
//         variation_width: 0,
//         variation_height: 0,
//         variation_tax: null,
//         country_of_origin: 'IN',
//         createdAt: '2024-12-06T08:59:26.125Z',
//         updatedAt: '2024-12-06T08:59:26.125Z',
//         product_variations_id: 6,
//         __v: 0
//       }
//     ]
//   }
// ]

//   if (loading) {
//     return (
//       <div className='flex items-center justify-center'>
//         <Loader />
//       </div>
//     )
//   }
// if (error) {
//   return <div>{error.message || 'An unknown error occurred.'}</div>
// }
