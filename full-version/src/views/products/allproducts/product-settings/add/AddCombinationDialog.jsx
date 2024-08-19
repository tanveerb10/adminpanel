'use client'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '@/@core/components/mui/TextField'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'

const validationSchema = yup.object().shape({
  variant_price: yup.number().required('Price is required').positive('Price must be a positive number'),
  variant_sku: yup.string().required('SKU is required'),
  variant_weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
  variant_inventory_qty: yup
    .number()
    .required('Inventory Quantity is required')
    .positive('Inventory Quantity must be a positive number')
    .integer('Inventory Quantity must be an integer'),
  variant_compare_at_price: yup.number().positive('Compare At Price must be a positive number'),
  // variant_tax: yup.string().required('Taxable status is required'),
  variant_height: yup.number().required('Height is required').positive('Height must be a positive number'),
  variant_length: yup.number().required('Length is required').positive('Length must be a positive number'),
  variant_width: yup.number().required('Width is required').positive('Width must be a positive number')
})

const AddCombinationDialog = ({ open, onClose, dialogData, variant, index }) => {
  const { productData, updateProductData, updateChildData } = useProduct()
  // console.log(variant, 'varrriaiaannnt')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: variant
  })
  useEffect(() => {
    if (open) {
      reset(dialogData)
    }
  }, [open, dialogData, reset])

  const handleSave = data => {
    const newData = productData.child
    newData[index] = data
    updateChildData(newData)
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogTitle>Add Variant</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Controller
            name='variant_price'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Price'
                fullWidth
                type='number'
                placeholder='Price'
                error={!!errors.variant_price}
                helperText={errors.variant_price?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_sku'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='SKU (stock keep unit)'
                fullWidth
                placeholder='SKU (sku keep unit)'
                error={!!errors.variant_sku}
                helperText={errors.variant_sku?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_length'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Length'
                fullWidth
                placeholder='Length'
                type='number'
                error={!!errors.variant_length}
                helperText={errors.variant_length?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_width'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Width'
                fullWidth
                placeholder='Width'
                type='number'
                error={!!errors.variant_width}
                helperText={errors.variant_width?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_height'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Height'
                fullWidth
                type='number'
                placeholder='Height'
                error={!!errors.variant_height}
                helperText={errors.variant_height?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_weight'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Weight'
                fullWidth
                type='number'
                placeholder='Weight'
                error={!!errors.variant_weight}
                helperText={errors.variant_weight?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_inventory_qty'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Inventory Qty'
                fullWidth
                type='number'
                placeholder='Inventory Quantity'
                error={!!errors.variant_inventory_qty}
                helperText={errors.variant_inventory_qty?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_compare_at_price'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Compare At Price'
                fullWidth
                placeholder='Compare at price'
                type='number'
                error={!!errors.variant_compare_at_price}
                helperText={errors.variant_compare_at_price?.message}
                margin='normal'
              />
            )}
          />
          <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
            <Button onClick={onClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCombinationDialog
