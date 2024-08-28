'use client'

// React Imports
import { Fragment, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'
import { getLocalizedUrl } from '@/utils/i18n'
import { useRouter, useParams } from 'next/navigation'

// Third-party Imports
import classnames from 'classnames'

const BrandConfirmationDialog = ({ open, setOpen, type, id, status }) => {
  // States
  const [secondDialog, setSecondDialog] = useState(false)
  const [userInput, setUserInput] = useState(false)

  const router = useRouter()
  const { lang: locale } = useParams()

  // Vars
  const Wrapper = type === 'suspend-brand' ? 'div' : Fragment

  const handleSecondDialogClose = () => {
    setSecondDialog(false)
    setOpen(false)
  }

  const handleConfirmation = value => {
    setUserInput(value)
    setSecondDialog(true)
    setOpen(false)
  }

  const handleDeleteBrand = async () => {
    try {

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands/deactivateBrand/${id}`
      const responseData = await fetchData(apiUrl, 'POST', {})

      console.log('API Response:', responseData)
      if (responseData.success === true) {
        setTimeout(() => router.push(getLocalizedUrl(`/products/brands`, locale)), 5000)
        return toast.success(responseData.message)
      }
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
    }
  }

  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i className='tabler-alert-circle text-[88px] mbe-6 text-warning' />
          <Wrapper
            {...(type === 'suspend-brand' && {
              className: 'flex flex-col items-center gap-5'
            })}
          >
            <Typography variant='h5'>
              {status
                ? 'Are you sure you want to Activate this brand?'
                : 'Are you sure you want to deactivate this brand?'}
            </Typography>

          </Wrapper>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button
            variant='contained'
            onClick={() => {
              handleConfirmation(true)
              handleDeleteBrand()
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

      {/* Delete brand Dialog */}
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
                    ? 'This brand has been Deactivated successfully.'
                    : 'This brand has been deactivated successfully.'}
                </Typography>
                <Typography>You are going to redirect at brands page.</Typography>
              </>
            ) : (
              <Typography>{status ? 'Brand Activation Cancelled!' : 'Brand Deactivation Cancelled!'}</Typography>

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

export default BrandConfirmationDialog
