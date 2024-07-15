import React from 'react'

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
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      {/* <Card> */}
      <DialogTitle> Edit </DialogTitle>
      <DialogContent>
        <CustomTextField fullWidth label='Price' />
        <CustomTextField fullWidth label='SKU (stock keep unit)' />
        <CustomTextField fullWidth label='Weight' />
        <CustomTextField fullWidth label='Compare at Price' />
        <CustomTextField fullWidth label='Inventory Qty' />
        
        <CustomTextField select fullWidth label='Taxable'>
          <MenuItem value='true'>True</MenuItem>
          <MenuItem value='false'>False</MenuItem>
        </CustomTextField>
      </DialogContent>
      <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button onClick={handleClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
          Discard
        </Button>
        <Button type='submit' variant='contained' onClick={handleClose}>
          Done
        </Button>
      </DialogActions>
      {/* </Card> */}
    </Dialog>
  )
}
