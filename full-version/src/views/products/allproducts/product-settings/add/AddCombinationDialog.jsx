// import React, { useState } from 'react'
// import { Dialog, DialogTitle, DialogContent, DialogActions, DialogCloseButton, Button, MenuItem } from '@mui/material'
// import CustomTextField from '@/@core/components/mui/TextField'

import React, { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@/@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

const AddCombinationDialog = ({ open, onClose, onSave }) => {
  const [combination, setCombination] = useState({
    price: '',
    sku: '',
    weight: '',
    compareAtPrice: '',
    inventoryQty: '',
    taxes: ''
  })

  const handleChange = (field, value) => {
    setCombination(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(combination)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogCloseButton onClose={onClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle>Add Variant </DialogTitle>
      <DialogContent>
        <CustomTextField
          label='Combination'
          value={combination.combination}
          onChange={e => handleChange('combination', e.target.value)}
          fullWidth
        />
        <CustomTextField
          label='Price'
          value={combination.price}
          onChange={e => handleChange('price', e.target.value)}
          fullWidth
          type='number'
        />
        <CustomTextField
          label='Quantity'
          value={combination.quantity}
          onChange={e => handleChange('quantity', e.target.value)}
          fullWidth
          type='number'
        />

        <CustomTextField
          fullWidth
          label='SKU (stock keep unit)'
          value={combination.sku}
          name='sku'
          onChange={e => handleChange('sku', e.target.value)}
        />
        <CustomTextField
          fullWidth
          label='Weight'
          value={combination.weight}
          name='weight'
          onChange={e => handleChange('weight', e.target.value)}
        />
          <CustomTextField
          fullWidth
          label='Inventory Qty'
          value={combination.inventoryQty}
          name='inventoryQty'
          onChange={e => handleChange('inventoryQty', e.target.value)}
        />
       <CustomTextField
          fullWidth
          label='Compare At Price'
          value={combination.compareAtPrice}
          name='compareAtPrice'
          onChange={e => handleChange('compareAtPrice', e.target.value)}
        />
        <CustomTextField
          select
          fullWidth
          label='Taxable'
          value={combination.taxes}
          name='taxes'
          onChange={e => handleChange('taxes', e.target.value)}
        >
          <MenuItem value='true'>True</MenuItem>
          <MenuItem value='false'>False</MenuItem>
        </CustomTextField>
      </DialogContent>
      <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button onClick={onClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Cancel
        </Button>
        <Button onClick={handleSave} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCombinationDialog
