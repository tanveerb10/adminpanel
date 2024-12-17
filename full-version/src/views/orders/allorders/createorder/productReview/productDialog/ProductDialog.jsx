'use client'

// React Imports

import React, { useEffect, useState, useCallback, useMemo } from 'react'
// MUI Imports
import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, TableHead } from '@mui/material'
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

  const { addOrder, orders, addOrderForProduct, addOrderForVariant, removeOrderForProduct, removeOrderForVariant } =
    useOrder()

  useEffect(() => {
    setChecked(initialCheckedState(productData))
  }, [productData])

  const getProductVariations = useCallback(
    parentId => productData.find(product => product._id === parentId)?.product_variations || [],
    [productData]
  )

  const handleAddProductToOrder = (parentId, variantId, type) => {
    const product = productData.find(p => p._id === parentId)
    const variant = product?.product_variations.find(v => v._id === variantId)

    if (product && variant) {
      if (type === 'addVariant') {
        addOrderForVariant({
          parentId,
          variantId,
          product,
          variant
        })
      }
      if (type === 'addProduct') {
        addOrderForProduct({
          parentId,
          variantId,
          product,
          variant
        })
      }
    }
  }

  const handleCheck = parentId => {
    const variations = getProductVariations(parentId).map(v => v._id)
    setChecked(prev =>
      prev.map(item => {
        if (item.parentId === parentId) {
          const isChecked = !item.isChecked

          if (isChecked) {
            handleAddProductToOrder(parentId, variations, 'addProduct')
          } else {
            removeOrderForProduct(parentId)
          }

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

          if (newVariants.has(variantId)) {
            handleAddProductToOrder(parentId, variantId, 'addVariant')
          } else {
            removeOrderForVariant(parentId, variantId)
          }

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
    resetCheckedState()
    setDisableVariant([])
    setOpen(false)
  }

  const fetchProducts = async () => {
    const productUrl = `/admin/products/getAllProductWithVariantData`

    try {
      setLoading(true)
      const responseData = await fetchData(productUrl, 'GET')

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

  const handleDisableVariant = () => {
    const variantIds = orders.map(val => val.variationId)
    setDisableVariant(variantIds)
  }

  useEffect(() => {
    handleDisableVariant()
  }, [orders])

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
                                          checked={isVariantChecked || disableVariant.includes(_id)}
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
        {/* <TableContainer component={Paper}>
          <Table>
            {productData.map(row => {
              const { isChecked, selectedVariants } = checked.find(item => item.parentId === row._id) || {}
              const variations = getProductVariations(row._id)
              const parentIndeterminate =
                !isChecked && selectedVariants?.size > 0 && selectedVariants?.size < variations.length

              return (
                <React.Fragment key={row._id}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={isChecked}
                          indeterminate={parentIndeterminate}
                          onClick={() => handleCheck(row._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <img
                          height={50}
                          width={50}
                          className='rounded'
                          src={'/images/avatars/1.png'}
                          alt={row.product_title}
                        />
                      </TableCell>
                      <TableCell>{row.product_title}</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  {variations.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box sx={{ margin: 1 }}>
                          <Table size='small'>
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
                                      <TableCell>
                                        <Checkbox
                                          checked={isVariantChecked}
                                          onClick={() => handleVariantCheck(_id, row._id)}
                                          disabled={disableVariant.includes(_id)}
                                        />
                                      </TableCell>
                                      <TableCell />
                                      <TableCell>
                                        {[
                                          variation1?.variation_option_value,
                                          variation2?.variation_option_value,
                                          variation3?.variation_option_value
                                        ]
                                          .filter(Boolean)
                                          .join('/')}
                                      </TableCell>
                                      <TableCell align='right'>
                                        <Chip label={variation_quantity} color='secondary' variant='tonal' />
                                      </TableCell>
                                      <TableCell align='right'>
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
                  )}
                </React.Fragment>
              )
            })}

            <TableBody>
              {productData.map(row => {
                const { isChecked, selectedVariants } = checked.find(item => item.parentId === row._id) || {}
                const variations = getProductVariations(row._id)
                const parentIndeterminate =
                  !isChecked && selectedVariants?.size > 0 && selectedVariants?.size < variations.length

                return (
                  <React.Fragment key={row._id}>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={isChecked}
                          indeterminate={parentIndeterminate}
                          onClick={() => handleCheck(row._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <img
                          height={50}
                          width={50}
                          className='rounded'
                          src={'/images/avatars/1.png'}
                          alt={row.product_title}
                        />
                      </TableCell>
                      <TableCell>{row.product_title}</TableCell>
                      <TableCell>Available</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>

                    {variations.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Box sx={{ margin: 1 }}>
                            <Table size='small'>
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
                                        <TableCell>
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
                                        <TableCell align='right'>
                                          <Chip label={variation_quantity} color='secondary' variant='tonal' />
                                        </TableCell>
                                        <TableCell align='right'>
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
                    )}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer> */}
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
