import React, { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from '@/@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
// import { CardHeader, Card, CardContent } from '@mui/material'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import Button from '@mui/material/Button'

export default function VariantDialog({ open, setOpen }) {
  const [dialogData, setDialogData] = useState({
    price: '',
    sku: '',
    weight: '',
    compareAtPrice: '',
    inventoryQty: '',
    taxes: ''
  })

  const handleClose = () => {
    setOpen(false)
  }

  const [variantData, setVariantData] = useState([])
  console.log(variantData)
  const handleChange = e => {
    const { name, value } = e.target
    setDialogData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    setVariantData((prev)=>[...prev, dialogData])
  }
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      {/* <Card> */}
      <DialogTitle> Edit </DialogTitle>
      <DialogContent>
        <CustomTextField fullWidth label='Price' value={variantData.price} name='price' onChange={handleChange} />
        <CustomTextField
          fullWidth
          label='SKU (stock keep unit)'
          value={variantData.sku}
          name='sku'
          onChange={handleChange}
        />
        <CustomTextField fullWidth label='Weight' value={variantData.weight} name='weight' onChange={handleChange} />
        <CustomTextField
          fullWidth
          label='Compare at Price'
          value={variantData.compareAtPrice}
          name='compareAtPrice'
          onChange={handleChange}
        />
        <CustomTextField
          fullWidth
          label='Inventory Qty'
          value={variantData.inventoryQty}
          name='inventoryQty'
          onChange={handleChange}
        />
        <CustomTextField
          select
          fullWidth
          label='Taxable'
          value={variantData.taxes}
          name='taxes'
          onChange={handleChange}
        >
          <MenuItem value='true'>True</MenuItem>
          <MenuItem value='false'>False</MenuItem>
        </CustomTextField>
      </DialogContent>
      <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Discard
        </Button>
        <Button type='submit' variant='contained' onClick={handleSubmit}>
          Done
        </Button>
      </DialogActions>
      {/* </Card> */}
    </Dialog>
  )
}
