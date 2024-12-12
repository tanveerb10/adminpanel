import CustomTextField from '@/@core/components/mui/TextField'
import Loader from '@/libs/components/Loader'
import fetchData from '@/utils/fetchData'

import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography
} from '@mui/material'
import CustomerReviewCard from '@views/orders/allorders/createorder/customerReview/CustomerReviewCard'
import React, { useCallback, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
const apiCustomerData = [
  {
    _id: '66f102833c6960e2b7830f4f',
    firstname: 'check2',
    lastname: 'user2',
    email: 'check2@gmail.com',
    phone: 1234567890,
    verified_email: true,
    marketing_optin: true,
    device_token: null,
    default_address: null,
    total_spent: null,
    status: false,
    createdAt: '2024-09-23T05:54:11.038Z',
    updatedAt: '2024-10-14T09:16:39.737Z',
    customer_id: 2,
    __v: 0
  },
  {
    _id: '66f7bcf9e633bc0aa52d21e2',
    firstname: 'raj',
    lastname: 'Nimbale',
    email: 'raj@gmail.com',
    phone: 9988776655,
    verified_email: true,
    marketing_optin: true,
    device_token: null,
    default_address: {
      _id: '670e110b154129ffb3db31e4',
      address_name: 'hiii',
      customer_id: '66f7bcf9e633bc0aa52d21e2',
      firstname: 'tanweer',
      lastname: 'lastname',
      address1: 'ddress1',
      address2: 'address2',
      city: 'mumbai',
      state: 'state',
      pin: '400074',
      country: 'country',
      phone: 7040000000,
      createdAt: '2024-10-15T06:51:55.120Z',
      updatedAt: '2024-10-18T11:41:48.485Z',
      customer_address_id: 7,
      __v: 0
    },
    total_spent: null,
    status: true,
    createdAt: '2024-09-28T08:23:21.460Z',
    updatedAt: '2024-12-07T07:01:10.937Z',
    customer_id: 3,
    __v: 0
  },
  {
    _id: '6710ae4a4baf7326138c6566',
    firstname: 'Chinmay',
    lastname: 'Dandekar',
    email: 'chinmay@gmail.com',
    phone: 123456789,
    verified_email: false,
    marketing_optin: false,
    device_token: null,
    default_address: {
      _id: '671245685f60c03012d0fbb9',
      address_name: 'andheri',
      customer_id: '6710ae4a4baf7326138c6566',
      firstname: 'shaikh',
      lastname: 'tanveer',
      address1: 'andheri',
      address2: 'check',
      city: 'mumbai',
      state: 'Maharashtra',
      pin: '123452',
      country: 'India',
      phone: 1234567890,
      createdAt: '2024-10-18T11:24:24.246Z',
      updatedAt: '2024-10-19T08:07:28.377Z',
      customer_address_id: 8,
      __v: 0
    },
    total_spent: null,
    status: true,
    createdAt: '2024-10-17T06:27:22.126Z',
    updatedAt: '2024-10-18T11:24:24.338Z',
    customer_id: 4,
    __v: 0
  }
]

export default function CustomerReview() {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [customerData, setCustomerData] = useState({})
  const [error, setError] = useState(null)

  console.log('customer data', customerData)

  const allCustomers = useCallback(async () => {
    if (!searchValue.trim()) return

    setLoading(true)
    try {
      const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
      const responseData = await fetchData(getCustomerUrl, 'GET')
      if (responseData.success) {
        setOptions(responseData.totalCustomer || [])
        console.log(options, 'option all customer')
      } else {
        toast.error('Failed to fetch options')
      }
    } catch (error) {
      setError('Failed to fetch options')
    } finally {
      setLoading(false)
    }
  }, [searchValue])

  const handleSearch = () => {
    allCustomers()
  }

  const handleSelectCustomer = selectedCustomer => {
    setCustomerData(selectedCustomer)
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <CardHeader title='Customer' />
      <CardContent>
        {/* =================== */}

        <Autocomplete
          sx={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          onChange={(event, value) => setCustomerData(value)}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          getOptionLabel={option => option.label || 'No Name'}
          options={options}
          loading={loading}
          renderInput={params => (
            <CustomTextField
              {...params}
              placeholder='Search for customer'
              label='Select Customer'
              input={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <Loader /> : null}
                    {params.InputProps.endAdornment}

                    <InputAdornment position='start'>
                      <IconButton onClick={''} edge='end'>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  </>
                )
              }}
            />
          )}
        />

        {/* //================ */}

        <CustomTextField
          select
          label='Select Customer'
          value={customerData?._id || ''}
          fullWidth
          onChange={e => {
            const selectedCustomer = options.find(data => data._id === e.target.value)
            setCustomerData(selectedCustomer)
          }}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => handleSearch(value)} edge='end'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        >
          {options.map(data => (
            <MenuItem key={data._id} value={data._id}>
              {data.firstname} {data.lastname}
            </MenuItem>
          ))}
        </CustomTextField>

        {customerData?._id && <CustomerReviewCard customerData={customerData} />}

        {/* =========================== */}

        <CustomTextField
          label='Search for Customer'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)} // Update searchValue as user types
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleSearch} edge='end'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Loading indicator */}
        {loading && <Loader />}

        {/* Display search results */}
        {options.length > 0 && (
          <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {options.map(customer => (
                <MenuItem
                  key={customer._id}
                  onClick={() => handleSelectCustomer(customer)} // Set the customer data when a result is selected
                >
                  {customer.firstname} {customer.lastname}
                </MenuItem>
              ))}
            </ul>
          </div>
        )}

        {/* If customerData is selected, show details */}
        {customerData && (
          <div>
            <h3>
              {customerData.firstname} {customerData.lastname}
            </h3>
            {/* You can add more details here based on what you need to display for the selected customer */}
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* ============================= */}
      </CardContent>
    </Card>
  )
}

// <Card>
//   <CardHeader title='Customer' />
//   <CardContent>
//     <CustomTextField
//       select
//       label='Customer'
//       value={customerData?._id || ''}
//       fullWidth
//       onChange={e => {
//         const selectedCustomer = apiCustomerData.find(data => data._id === e.target.value)
//         setCustomerData(selectedCustomer)
//       }}
//     >
//       {apiCustomerData.map(data => (
//         <MenuItem value={data?._id} key={data?._id}>
//           {data?.firstname} {data?.lastname}
//         </MenuItem>
//       ))}
//     </CustomTextField>
//     <CustomerReviewCard customerData={customerData} />
//   </CardContent>
// </Card>
