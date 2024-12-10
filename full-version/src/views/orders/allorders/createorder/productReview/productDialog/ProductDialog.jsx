'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import fetchData from '@/utils/fetchData'

// Component Imports
import DialogCloseButton from '@/components/dialogs/DialogCloseButton'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material'
import Loader from '@/libs/components/Loader'
import CustomTextField from '@/@core/components/mui/TextField'
import SearchIcon from '@mui/icons-material/Search'

const ProductDialog = ({ open, setOpen }) => {
  const [productData, setProductData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchValue, setSearchValue] = useState('m')

  const handleClose = () => {
    setOpen(false)
  }

  const fetchProducts = async (searchValue = '') => {
    const productUrl = `/admin/products/allProduct/?q=${searchValue}`

    try {
      setLoading(true)
      const responseData = await fetchData(productUrl, 'GET')
      console.log('Get products data', responseData)
      setProductData(responseData.allProduct)

      setError(null)
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred'
      setError(errorMessage)

      console.error('error got', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProducts(searchValue)
  }, [searchValue])

  //   if (loading) {
  //     return (
  //       <div className='flex items-center justify-center'>
  //         <Loader />
  //       </div>
  //     )
  //   }
  if (error) {
    return <div>{error.message || 'An unknown error occurred.'}</div>
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

      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add Product
      </DialogTitle>

      <DialogContent>
        {!loading ? (
          <CustomTextField
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder='Search Order'
            className='is-full sm:is-auto'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => handleSearch(value)} edge='end'>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        ) : (
          <div className='flex items-center justify-center'>
            <Loader />
          </div>
        )}
      </DialogContent>

      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' type='submit' disabled={loading}>
          {loading ? <Loader size={20} /> : 'Submit'}
        </Button>
        <Button variant='tonal' type='button' color='secondary' onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductDialog
