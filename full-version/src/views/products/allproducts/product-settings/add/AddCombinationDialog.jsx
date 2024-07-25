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

const AddCombinationDialog = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    price: '',
    quantity: '',
    sku: '',
    weight: '',
    inventoryQty: '',
    compareAtPrice: '',
    taxes: ''
  })
  const validationSchema = yup.object().shape({
    price: yup.number().required('Price is required').positive('Price must be a positive number'),
    quantity: yup
      .number()
      .required('Quantity is required')
      .positive('Quantity must be a positive number')
      .integer('Quantity must be an integer'),
    sku: yup.string().required('SKU is required'),
    weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
    inventoryQty: yup
      .number()
      .required('Inventory Quantity is required')
      .positive('Inventory Quantity must be a positive number')
      .integer('Inventory Quantity must be an integer'),
    compareAtPrice: yup.number().positive('Compare At Price must be a positive number'),
    taxes: yup.string().required('Taxable status is required')
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formData
  })

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  const handleSave = data => {
    onSave(data)
    onClose()
  }

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogTitle>Add Variant</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Controller
            name='price'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Price'
                fullWidth
                type='number'
                value={formData.price}
                error={!!errors.price}
                helperText={errors.price?.message}
                margin='normal'
                onChange={e => {
                  handleChange('price', e.target.value)
                  field.onChange(e)
                }}
              />
            )}
          />
          <Controller
            name='quantity'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Quantity'
                fullWidth
                type='number'
                value={formData.quantity}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                margin='normal'
                onChange={e => {
                  handleChange('quantity', e.target.value)
                  field.onChange(e)
                }}
              />
            )}
          />
          <Controller
            name='sku'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='SKU (stock keep unit)'
                fullWidth
                value={formData.sku}
                error={!!errors.sku}
                helperText={errors.sku?.message}
                margin='normal'
                onChange={e => {
                  handleChange('sku', e.target.value)
                  field.onChange(e)
                }}
              />
            )}
          />
          <Controller
            name='weight'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Weight'
                fullWidth
                value={formData.weight}
                type='number'
                error={!!errors.weight}
                helperText={errors.weight?.message}
                margin='normal'
                onChange={e => {
                  handleChange('weight', e.target.value)
                  field.onChange(e)
                }}
              />
            )}
          />
          <Controller
            name='inventoryQty'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Inventory Qty'
                fullWidth
                value={formData.inventoryQty}
                type='number'
                error={!!errors.inventoryQty}
                helperText={errors.inventoryQty?.message}
                margin='normal'
                onChange={e => {
                  handleChange('inventoryQty', e.target.value)
                  field.onChange(e)
                }}
              />
            )}
          />
          <Controller
            name='compareAtPrice'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Compare At Price'
                value={formData.compareAtPrice}
                fullWidth
                type='number'
                error={!!errors.compareAtPrice}
                helperText={errors.compareAtPrice?.message}
                margin='normal'
                onChange={e => {
                  handleChange('compareAtPrice', e.target.value)
                  field.onChange(e)
                }}
              />
            )}
          />
          <Controller
            name='taxes'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='Taxable'
                value={formData.taxes}
                error={!!errors.taxes}
                helperText={errors.taxes?.message}
                margin='normal'
                onChange={e => {
                  handleChange('taxes', e.target.value)
                  field.onChange(e)
                }}
              >
                <MenuItem value='true'>True</MenuItem>
                <MenuItem value='false'>False</MenuItem>
              </CustomTextField>
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
