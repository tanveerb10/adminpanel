//         {/* //================ */}
//         {/*
//         <CustomTextField

//           value={customerData?._id || ''}

//           onChange={e => {
//             const selectedCustomer = options.find(data => data._id === e.target.value)
//             setCustomerData(selectedCustomer)
//           }}
//         >
//           {options.map(data => (
//             <MenuItem key={data._id} value={data._id}>
//               {data.firstname} {data.lastname}
//             </MenuItem>
//           ))}
//         </CustomTextField>

//         {customerData?._id && <CustomerReviewCard customerData={customerData} />} */}

import React, { useState, useCallback } from 'react'
import { InputAdornment, IconButton, MenuItem, CircularProgress, Toast, Typography, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import CustomTextField from '@/@core/components/mui/TextField'

export default function CustomerReview() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [menuOpen, setMenuOpen] = useState(false) // New state to control menu visibility

  const fetchCustomers = useCallback(async () => {
    if (!searchValue.trim()) return

    setLoading(true)
    try {
      const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
      const responseData = await fetchData(getCustomerUrl, 'GET')
      if (responseData.success) {
        const customerNames = responseData.totalCustomer.map(customer => `${customer.firstname} ${customer.lastname}`)
        setOptions(customerNames)
        setMenuOpen(true) // Automatically open menu after fetching options
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
    setSelectedCustomers(event.target.value)
  }

  return (
    <div>
      <CustomTextField
        fullWidth
        label='Search Customers'
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
        SelectProps={{
          open: menuOpen, // Control menu visibility
          onOpen: () => setMenuOpen(true), // Allow manual opening
          onClose: () => setMenuOpen(false), // Close menu when needed
          multiple: true,
          value: selectedCustomers,
          onChange: handleSelectionChange,
          renderValue: selected => (selected.length === 0 ? 'No customers selected' : selected.join(', '))
        }}
      >
        {options.length > 0 ? (
          options.map(option => {
            console.log('option', option)
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem disabled>
            <em>No customers found</em>
          </MenuItem>
        )}
      </CustomTextField>
    </div>
  )
}
