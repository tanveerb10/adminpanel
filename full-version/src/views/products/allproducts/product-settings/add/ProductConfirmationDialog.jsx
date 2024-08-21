'use client'

// React Imports
import { Fragment, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

const ProductConfirmationDialog = ({ open, setOpen, type, status }) => {
  // States
  const [secondDialog, setSecondDialog] = useState(false)
  const [userInput, setUserInput] = useState(false)

  // Vars
  const Wrapper = type === 'suspend-product' ? 'div' : Fragment

  const handleSecondDialogClose = () => {
    setSecondDialog(false)
    setOpen(false)
  }

  const handleConfirmation = value => {
    setUserInput(value)
    setSecondDialog(true)
    setOpen(false)
  }

  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i className='tabler-alert-circle text-[88px] mbe-6 text-warning' />
          <Wrapper
            {...(type === 'suspend-product' && {
              className: 'flex flex-col items-center gap-5'
            })}
          >
            <Typography variant='h5'>
              {status
                ? 'Are you sure you want to Activate this product?'
                : 'Are you sure you want to deactivate this product?'}
            </Typography>
          </Wrapper>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button
            variant='contained'
            onClick={() => {
              handleConfirmation(true)
            }}
          >
            Yes
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              handleConfirmation(false)
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete product Dialog */}
      <Dialog open={secondDialog} onClose={handleSecondDialogClose}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i
            className={classnames('text-[88px] mbe-5 sm:mbe-8', {
              'tabler-circle-check': userInput,
              'text-success': userInput,
              'tabler-circle-x': !userInput,
              'text-error': !userInput
            })}
          />
          <Typography variant='h3' className='mbe-5'>
            {status ? 'Activated' : 'Deactivated'}
          </Typography>
          <Typography color='text.primary' variant='h5'>
            {userInput ? (
              <>
                <Typography>
                  {status
                    ? 'This product has been Deactivated successfully.'
                    : 'This product has been deactivated successfully.'}
                </Typography>
                <Typography>You are going to redirect at products page.</Typography>
              </>
            ) : (
              <Typography>{status ? 'product Activation Cancelled!' : 'product Deactivation Cancelled!'}</Typography>
            )}
          </Typography>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ProductConfirmationDialog
