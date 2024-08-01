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

// const AddCombinationDialog = ({ open, onClose, dialogData }) => {
//   const { productData, updateProductData } = useProduct()
//   console.log(productData, "productData")
//   console.log(updateProductData, "update product data");
//   console.log("dialog data", dialogData);

//   const validationSchema = yup.object().shape({
//     price: yup.number().required('Price is required').positive('Price must be a positive number'),
//     quantity: yup
//       .string()
//       .required('Quantity is required'),
//       // .positive('Quantity must be a positive number')
//       // .integer('Quantity must be an integer'),
//     sku: yup.string().required('SKU is required'),
//     weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
//     inventoryQty: yup
//       .number()
//       .required('Inventory Quantity is required')
//       .positive('Inventory Quantity must be a positive number')
//       .integer('Inventory Quantity must be an integer'),
//     compareAtPrice: yup.number().positive('Compare At Price must be a positive number'),
//     taxes: yup.string().required('Taxable status is required'),
//     height : yup.number().required("Height is required").positive('Height must be a postive number'),
//     width : yup.number().required("Width is required").positive('Width must be a postive number'),
//     length : yup.number().required("Length is required").positive('length must be a postive number'),
//   })

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset
//   } = useForm({
//     resolver: yupResolver(validationSchema)
//   })

//   useEffect(() => {
//     if (!open) reset()
//   }, [open, reset])

//   // const handleSave = data => {
//   //   // onSave(data)
//   //   updateProductData(prev=>{})
//   //   onClose()
//   // }

//   // const handleChange = e => {
//   //   const { name, value } = e.target
//   //   // const updatedProduct = { ...state.products[0], [name]: value }
//   //   updateProductData({ [name]: value })
//   // }
//   // const handleChange = (e) => {

//   //   const { name, value } = e.target

//   //   updateProductData((prev) => ({
//   //     ...prev,
//   //     [name] : value
//   //   }))
//   // }
//   const handleSave = (data) => {
//     updateProductData(data);  // Update productData with the form data
//     onClose();
//     console.log("data form",data)
//   };

//   return (
//     <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible' } }}>
//       <DialogTitle>Add Variant</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit(handleSave)}>
//           <Controller
//             name='price'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Price'
//                 fullWidth
//                 // type='number'
//                 value={productData.variant_price || ''}
//                 error={!!errors.price}
//                 helperText={errors.price?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_price', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//                 onChange={(e)=>{(e.target.value)}}
//               />
//             )}
//           />
//           <Controller
//             name='quantity'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Quantity'
//                 fullWidth
//                 type='number'
//                 value={productData.variant_quantity ||""}
//                 error={!!errors.quantity}
//                 helperText={errors.quantity?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('quantity', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           <Controller
//             name='sku'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='SKU (stock keep unit)'
//                 fullWidth
//                 value={productData.variant_sku || ''}
//                 error={!!errors.sku}
//                 helperText={errors.sku?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_sku', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           <Controller
//             name='length'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Length'
//                 fullWidth
//                 value={productData.variant_length || ''}
//                 error={!!errors.length}
//                 helperText={errors.length?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_length', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           <Controller
//             name='width'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Width'
//                 fullWidth
//                 value={productData.variant_width || ''}
//                 error={!!errors.width}
//                 helperText={errors.width?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_width', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           <Controller
//             name='height'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Height'
//                 fullWidth
//                 value={productData.variant_height || ''}
//                 error={!!errors.height}
//                 helperText={errors.height?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_height', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           <Controller
//             name='weight'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Weight'
//                 fullWidth
//                 value={productData.variant_weight || ''}
//                 type='number'
//                 error={!!errors.weight}
//                 helperText={errors.weight?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_weight', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           <Controller
//             name='inventoryQty'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Inventory Qty'
//                 fullWidth
//                 value={productData.variant_inventory_qty || ''}
//                 type='number'
//                 error={!!errors.inventoryQty}
//                 helperText={errors.inventoryQty?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_inventory_qty', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           />
//           {/* <Controller
//             name='compareAtPrice'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Compare At Price'
//                 value={productData.variant_compare_at_price || null}
//                 fullWidth
//                 type='number'
//                 error={!!errors.compareAtPrice}
//                 helperText={errors.compareAtPrice?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_compare_at_price', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               />
//             )}
//           /> */}
//           <Controller
//             name='compareAtPrice'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Compare At Price (Optional)'
//                 value={productData.variant_compare_at_price || ''}
//                 fullWidth
//                 type='number'
//                 error={!!errors.compareAtPrice}
//                 helperText={errors.compareAtPrice?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='taxes'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 select
//                 fullWidth
//                 label='Taxable'
//                 value={productData.variant_tax || ''}
//                 error={!!errors.taxes}
//                 helperText={errors.taxes?.message}
//                 margin='normal'
//                 // onChange={e => {
//                 //   handleChange('variant_tax', e.target.value)
//                 //   field.onChange(e)
//                 // }}
//               >
//                 <MenuItem value='true'>True</MenuItem>
//                 <MenuItem value='false'>False</MenuItem>
//               </CustomTextField>
//             )}
//           />
//           <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
//             <Button onClick={onClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
//               Cancel
//             </Button>
//             <Button type='submit' variant='contained'>
//               Save
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default AddCombinationDialog

//

let exper = 0

//=========================================experimental=======================

const validationSchema = yup.object().shape({
  variant_price: yup.number().required('Price is required').positive('Price must be a positive number'),
  // quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
  variant_sku: yup.string().required('SKU is required'),
  variant_weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
  variant_inventory_qty: yup
    .number()
    .required('Inventory Quantity is required')
    .positive('Inventory Quantity must be a positive number')
    .integer('Inventory Quantity must be an integer'),
  variant_compare_at_price: yup.number().positive('Compare At Price must be a positive number'),
  variant_tax: yup.string().required('Taxable status is required'),
  variant_height: yup.number().required('Height is required').positive('Height must be a positive number'),
  variant_length: yup.number().required('Length is required').positive('Length must be a positive number'),
  variant_width: yup.number().required('Width is required').positive('Width must be a positive number')
})

const AddCombinationDialog = ({ open, onClose, dialogData, variant, index }) => {
  const { productData, updateProductData } = useProduct()

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
      reset(dialogData) // Update form values when the dialog is opened
    }
  }, [open, dialogData, reset])

  const handleSave = data => {
    console.log(data, 'check raw form Data')
    const newData = productData.child
    newData[index] = data
    updateProductData({ child: newData }) // Update productData with the form data
    console.log(variant)
    onClose()
  }
console.log(productData, "prdouctData")
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
                // value={productData.variant_price || ''}
                error={!!errors.price}
                helperText={errors.price?.message}
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
                // value={productData.variant_sku || ''}
                error={!!errors.sku}
                helperText={errors.sku?.message}
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
                // value={productData.variant_length || ''}
                error={!!errors.length}
                helperText={errors.length?.message}
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
                // value={productData.variant_width || ''}
                error={!!errors.width}
                helperText={errors.width?.message}
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
                // value={productData.variant_height || ''}
                error={!!errors.height}
                helperText={errors.height?.message}
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
                // value={productData.variant_weight || ''}
                error={!!errors.weight}
                helperText={errors.weight?.message}
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
                // value={productData.variant_inventory_qty || ''}
                error={!!errors.inventoryQty}
                helperText={errors.inventoryQty?.message}
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
                // value={productData.variant_inventory_qty || ''}
                fullWidth
                type='number'
                error={!!errors.compareAtPrice}
                helperText={errors.compareAtPrice?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_tax'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='Taxable'
                // value={productData.variant_tax || ''}
                error={!!errors.taxes}
                helperText={errors.taxes?.message}
                margin='normal'
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

//====================================working without states============================================================
// const AddCombinationDialog = ({ open, onClose, dialogData }) => {
//   const { productData, updateProductData } = useProduct();

//   const validationSchema = yup.object().shape({
//     variant_price: yup.number().required('Price is required').positive('Price must be a positive number'),
//     // quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
//     variant_sku: yup.string().required('SKU is required'),
//     variant_weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
//     variant_inventory_qty: yup.number().required('Inventory Quantity is required').positive('Inventory Quantity must be a positive number').integer('Inventory Quantity must be an integer'),
//     variant_compare_at_price: yup.number().positive('Compare At Price must be a positive number'),
//     variant_tax: yup.string().required('Taxable status is required'),
//     variant_height: yup.number().required('Height is required').positive('Height must be a positive number'),
//     variant_length: yup.number().required('Length is required').positive('Length must be a positive number'),
//     variant_width: yup.number().required('Width is required').positive('Width must be a positive number'),
//   });

//   const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
//     resolver: yupResolver(validationSchema)
//   });

//   useEffect(() => {
//     if (!open) reset();
//   }, [open, reset]);

//   const handleSave = (data) => {
//     console.log(data, "check raw form Data")
//     updateProductData(data);  // Update productData with the form data
//     console.log(productData)
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible' } }}>
//       <DialogTitle>Add Variant</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit(handleSave)}>
//           <Controller
//             name='variant_price'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Price'
//                 fullWidth
//                 // value={productData.variant_price || ''}
//                 error={!!errors.price}
//                 helperText={errors.price?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           {/* <Controller
//             name='variant_quantity'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Quantity'
//                 fullWidth
//                 type='number'
//                 // value={productData.variant_quantity || ''}
//                 error={!!errors.quantity}
//                 helperText={errors.quantity?.message}
//                 margin='normal'
//               />
//             )}
//           /> */}
//           <Controller
//             name='variant_sku'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='SKU (stock keep unit)'
//                 fullWidth
//                 // value={productData.variant_sku || ''}
//                 error={!!errors.sku}
//                 helperText={errors.sku?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_length'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Length'
//                 fullWidth
//                 // value={productData.variant_length || ''}
//                 error={!!errors.length}
//                 helperText={errors.length?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_width'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Width'
//                 fullWidth
//                 // value={productData.variant_width || ''}
//                 error={!!errors.width}
//                 helperText={errors.width?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_height'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Height'
//                 fullWidth
//                 // value={productData.variant_height || ''}
//                 error={!!errors.height}
//                 helperText={errors.height?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_weight'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Weight'
//                 fullWidth
//                 type='number'
//                 // value={productData.variant_weight || ''}
//                 error={!!errors.weight}
//                 helperText={errors.weight?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_inventory_qty'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Inventory Qty'
//                 fullWidth
//                 type='number'
//                 // value={productData.variant_inventory_qty || ''}
//                 error={!!errors.inventoryQty}
//                 helperText={errors.inventoryQty?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_compare_at_price'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 label='Compare At Price'
//                 // value={productData.variant_inventory_qty || ''}
//                 fullWidth
//                 type='number'
//                 error={!!errors.compareAtPrice}
//                 helperText={errors.compareAtPrice?.message}
//                 margin='normal'
//               />
//             )}
//           />
//           <Controller
//             name='variant_tax'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 select
//                 fullWidth
//                 label='Taxable'
//                 value={productData.variant_tax || ''}
//                 error={!!errors.taxes}
//                 helperText={errors.taxes?.message}
//                 margin='normal'
//               >
//                 <MenuItem value='true'>True</MenuItem>
//                 <MenuItem value='false'>False</MenuItem>
//               </CustomTextField>
//             )}
//           />
//           <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
//             <Button onClick={onClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
//               Cancel
//             </Button>
//             <Button type='submit' variant='contained'>
//               Save
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddCombinationDialog
