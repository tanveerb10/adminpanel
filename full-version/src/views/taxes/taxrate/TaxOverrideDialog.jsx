'use client'

// React Imports
import { useEffect, useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

const TaxOverrideDialog = ({ open, setOpen, taxOverrideApi, setTaxOverrideFlag, taxApi }) => {
  const validationSchema = yup.object().shape({
    taxRate: yup.number().required('Tax Rate is required').positive('Tax Rate must be positive'),
    selectedState: yup.string().required('State is required')
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      taxRate: '',
      selectedState: '',
      categoryName: ''
    }
  })
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const handleClose = () => {
    setOpen(false)
    reset()
  }

  useEffect(() => {
    if (open && setTaxOverrideFlag) {
      const fetchCategories = async () => {
        setLoadingData(true)
        try {
          const categoryUrl = `/admin/categories`
          const response = await fetchData(categoryUrl, 'GET')

          const categories = response.allCategory.map(option => option.category_name)

          setCategoryData(categories)
        } catch (error) {
          toast.error('Error fetching categories')
        } finally {
          setLoadingData(false)
        }
      }
      fetchCategories()
    }
  }, [open, setTaxOverrideFlag])
  const onSubmit = async data => {
    setLoading(true)

    if (setTaxOverrideFlag && !data.categoryName) {
      toast.error('Category is required')
      setLoading(false)
      return
    }

    const payloadData = {
      rate: data.taxRate,
      state: data.selectedState,
      // category: setTaxOverrideFlag ? data.categoryName : null
      ...(setTaxOverrideFlag && { category: data.categoryName })
    }
    console.log(payloadData, 'payload data')

    const setRateOverrideURL = `/admin/products/tax_override`
    const setRateURL = `/admin/products/tax_rate`
    const url = setTaxOverrideFlag ? setRateOverrideURL : setRateURL
    try {
      const responseData = await fetchData(url, 'POST', payloadData)
      if (responseData.success) {
        toast.success('Tax added successfully')

        setTaxOverrideFlag ? taxOverrideApi() : taxApi()
      }
      if (!responseData.success) {
        console.log(responseData.message, 'fail response')
        throw new Error('Something went wrong' || responseData.message)
      }
    } catch (err) {
      toast.error(err)
      console.log(err)
    } finally {
      setLoading(false)
      handleClose()
    }
  }
  if (loadingData) {
    return <Loader />
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
        {setTaxOverrideFlag ? 'Set Tax Override Rate' : 'Set Tax Rate'}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
          <Controller
            name='taxRate'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Tax Rate'
                variant='outlined'
                fullWidth
                placeholder='Enter Tax Rate'
                margin='normal'
                error={!!errors.taxRate}
                helperText={errors.taxRate?.message}
              />
            )}
          />

          {/* State Selection */}
          <Controller
            name='selectedState'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='States'
                variant='outlined'
                select
                fullWidth
                placeholder='Select State'
                margin='normal'
                error={!!errors.selectedState}
                helperText={errors.selectedState?.message}
              >
                {states.map(state => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* Category Selection */}
          {setTaxOverrideFlag && (
            <Controller
              name='categoryName'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  label='Category'
                  variant='outlined'
                  select
                  fullWidth
                  placeholder='Select Category'
                  margin='normal'
                >
                  {categoryData.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          )}
        </DialogContent>

        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' type='submit' disabled={loading}>
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

export default TaxOverrideDialog
