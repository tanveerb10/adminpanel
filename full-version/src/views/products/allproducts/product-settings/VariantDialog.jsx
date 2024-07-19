import React, { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
// import { CardHeader, Card, CardContent } from '@mui/material'
import Button from '@mui/material/Button'

export default function VariantDialog({ open, setOpen, onSave }) {
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

  const handleChange = e => {
    const { name, value } = e.target
    setDialogData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSave(dialogData)
    setOpen(false)
  }
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle> Edit </DialogTitle>
      <DialogContent>
        <CustomTextField fullWidth label='Price' value={dialogData.price} name='price' onChange={handleChange} />
        <CustomTextField
          fullWidth
          label='SKU (stock keep unit)'
          value={dialogData.sku}
          name='sku'
          onChange={handleChange}
        />
        <CustomTextField fullWidth label='Weight' value={dialogData.weight} name='weight' onChange={handleChange} />
        <CustomTextField
          fullWidth
          label='Compare at Price'
          value={dialogData.compareAtPrice}
          name='compareAtPrice'
          onChange={handleChange}
        />
        <CustomTextField
          fullWidth
          label='Inventory Qty'
          value={dialogData.inventoryQty}
          name='inventoryQty'
          onChange={handleChange}
        />
        <CustomTextField
          select
          fullWidth
          label='Taxable'
          value={dialogData.taxes}
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
    </Dialog>
  )
}
