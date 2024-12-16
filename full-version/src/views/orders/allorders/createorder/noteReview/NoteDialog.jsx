'use client'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'

const NoteDialog = ({ open, setOpen }) => {
  const { wordCount, handleWordCount, note } = useOrder()

  const handleClose = () => {
    setOpen(false)
  }

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

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-2 sm:pbe-2 sm:pli-16'>
        {note.length > 0 ? 'Edit Note' : 'Add Note'}
      </DialogTitle>

      <DialogContent>
        <CustomTextField
          variant='outlined'
          multiline
          rows={5}
          fullWidth
          placeholder='Add Note'
          value={note}
          onChange={e => handleWordCount(e.target.value)}
        />
        <div className='text-end'>{wordCount} / 5000</div>
      </DialogContent>

      <DialogActions className='justify-end pbs-0 sm:pbe-2 sm:pli-2'>
        <Button variant='contained' onClick={handleClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default NoteDialog
