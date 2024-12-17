import React, { useState, useCallback } from 'react'
import { InputAdornment, IconButton, MenuItem, CircularProgress, CardContent, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import CustomTextField from '@/@core/components/mui/TextField'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'

export default function CustomerReviewSearch() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedCustomers, setSelectedCustomers] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const { addCustomerAddress } = useOrder()

  const fetchCustomers = useCallback(async () => {
    if (!searchValue.trim()) {
      toast.error('Please enter a search value.')
      return
    }
    setLoading(true)
    try {
      const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
      const responseData = await fetchData(getCustomerUrl, 'GET')
      if (responseData.success) {
        const customerObject = responseData.totalCustomer

        setOptions(customerObject)
        setMenuOpen(true)
      } else {
        toast.error('Failed to fetch options')
      }
    } catch (error) {
      toast.error('Error fetching customers')
    } finally {
      setLoading(false)
    }
  }, [searchValue])

  const handleSearch = () => {
    fetchCustomers()
  }

  const handleSelectionChange = event => {
    const selectedId = event.target.value
    const customer = options.find(data => data._id === selectedId)
    setSelectedCustomers(customer)
    addCustomerAddress(customer)
    setMenuOpen(false)
  }
  return (
    <CardContent>
      <CustomTextField
        fullWidth
        label='Search Customers'
        placeholder='Add Customer by search '
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleSearch} edge='end'>
                {loading ? <CircularProgress size={24} /> : <SearchIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        select={menuOpen}
        // select
        SelectProps={{
          open: menuOpen,
          onOpen: () => setMenuOpen(true),
          onClose: () => setMenuOpen(false),
          value: selectedCustomers?._id || '',
          onChange: handleSelectionChange,
          renderValue: selected =>
            selected ? `${selectedCustomers.firstname} ${selectedCustomers.lastname}` : 'No customer selected'
        }}
      >
        {options.length > 0 ? (
          options.map(option => (
            <MenuItem key={option._id} value={option._id}>
              <div>
                <Typography>{`${option.firstname} ${option.lastname}`}</Typography>
                <Typography>{`${option.email}`}</Typography>
              </div>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <em>No customers found</em>
          </MenuItem>
        )}
      </CustomTextField>
    </CardContent>
  )
}
