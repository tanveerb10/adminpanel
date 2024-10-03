'use client'

// React Imports
import { useState } from 'react'

// MUI Imports

import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import { toast } from 'react-toastify'
import { MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import Loader from '@/libs/components/Loader'

// STATES OF INDIA
let states = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry'
]

const TaxDialog = ({ open, setOpen, taxApi }) => {
  const [taxRate, setTaxRate] = useState(0)
  const [selectedState, setSelectedState] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log(taxApi, '===============================================')
  const handleClose = () => {
    setOpen(false)
    setError(null)
    setTaxRate(0)
    setSelectedState('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    if (taxRate <= 0 || !selectedState) {
      setError(taxRate ? 'Tax Rate is required' : 'State is required')
      toast.error(taxRate ? 'Tax Rate is required' : 'State is required')
      setLoading(false)
      return
    }

    const payloadData = {
      rate: taxRate,
      state: selectedState
    }
    console.log(payloadData, 'payload data')

    const setRateURL = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/tax_rate`

    try {
      const responseData = await fetchData(setRateURL, 'POST', payloadData)
      if (responseData.success) {
        toast.success('Tax added successfully')
        taxApi()
      } else {
        toast.error('Something went wrong')
      }
    } catch (err) {
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      scroll='body'
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Set Tax Rate
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
          <CustomTextField
            label='Tax Rate'
            variant='outlined'
            fullWidth
            placeholder='Enter Tax Rate'
            value={taxRate}
            onChange={e => setTaxRate(Number(e.target.value) || 0)}
            margin='normal'
          />
          <CustomTextField
            label='States'
            variant='outlined'
            select
            fullWidth
            placeholder='Select State'
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            margin='normal'
          >
            {states.map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </CustomTextField>
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader size={20} /> : 'Submit'}
          </Button>
          <Button variant='tonal' type='button' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default TaxDialog
