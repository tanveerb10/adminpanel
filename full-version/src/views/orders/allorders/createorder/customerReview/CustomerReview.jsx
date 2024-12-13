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
import CustomerReviewCard from './CustomerReviewCard'

export default function CustomerReview() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [selectedCustomers, setSelectedCustomers] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false) // New state to control menu visibility
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

  // const handleSelectionChange = event => {
  //   const selectedCustomer = options.find(data => data._id === event.target.value)

  //   setSelectedCustomers(selectedCustomer)

  //   // setSelectedCustomers(event.target.value)
  // }

  const handleSelectionChange = event => {
    const selectedId = event.target.value // Multiple selection support
    const customer = options.find(data => data._id === selectedId)
    setSelectedCustomers(customer)
    setMenuOpen(false)
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
        // select
        SelectProps={{
          open: menuOpen, // Control menu visibility
          onOpen: () => setMenuOpen(true), // Allow manual opening
          onClose: () => setMenuOpen(false), // Close menu when needed
          value: selectedCustomers?._id || '',
          onChange: handleSelectionChange,
          renderValue: selected =>
            selected ? `${selectedCustomers.firstname} ${selectedCustomers.lastname}` : 'No customer selected'
        }}
      >
        {options.length > 0 ? (
          options.map(option => {
            console.log('option', option)
            return (
              <MenuItem key={option._id} value={option._id}>
                {`${option.firstname} ${option.lastname}`}
              </MenuItem>
            )
          })
        ) : (
          <MenuItem disabled>
            <em>No customers found</em>
          </MenuItem>
        )}
      </CustomTextField>

      {selectedCustomers?._id && <CustomerReviewCard customerData={selectedCustomers} />}
    </div>
  )
}
