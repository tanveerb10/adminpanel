// import CustomTextField from '@/@core/components/mui/TextField'
// import Loader from '@/libs/components/Loader'
// import fetchData from '@/utils/fetchData'

// import {
//   Autocomplete,
//   Card,
//   CardContent,
//   CardHeader,
//   IconButton,
//   InputAdornment,
//   MenuItem,
//   Typography
// } from '@mui/material'
// import CustomerReviewCard from '@views/orders/allorders/createorder/customerReview/CustomerReviewCard'
// import React, { useCallback, useEffect, useState } from 'react'
// import SearchIcon from '@mui/icons-material/Search'

// // MUI Imports
// import Chip from '@mui/material/Chip'

// import Checkbox from '@mui/material/Checkbox'
// import ListItemText from '@mui/material/ListItemText'

// const ITEM_HEIGHT = 48
// const ITEM_PADDING_TOP = 8
// const MenuProps = {
//   PaperProps: {
//     style: {
//       width: 250,
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
//     }
//   }
// }

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder'
// ]

// export default function CustomerReview() {
//   const [searchValue, setSearchValue] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [open, setOpen] = useState(false)
//   const [options, setOptions] = useState([])
//   const [customerData, setCustomerData] = useState({})
//   const [error, setError] = useState(null)

//   const allCustomers = useCallback(async () => {
//     if (!searchValue.trim()) return

//     setLoading(true)
//     try {
//       const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
//       const responseData = await fetchData(getCustomerUrl, 'GET')
//       if (responseData.success) {
//         setOptions(responseData.totalCustomer || [])
//         console.log(options, 'option all customer')
//       } else {
//         toast.error('Failed to fetch options')
//       }
//     } catch (error) {
//       setError('Failed to fetch options')
//     } finally {
//       setLoading(false)
//     }
//   }, [searchValue])

//   const handleSearch = () => {
//     allCustomers()
//   }

//   // const handleSelectCustomer = selectedCustomer => {
//   //   setCustomerData(selectedCustomer)
//   // }
//   const [personName, setPersonName] = useState([])
//   const [personNameNative, setPersonNameNative] = useState([])

//   const handleChange = event => {
//     setPersonName(event.target.value)
//   }

//   const handleChangeMultipleNative = event => {
//     const { options } = event.target
//     const value = []

//     for (let i = 0, l = options.length; i < l; i += 1) {
//       if (options[i].selected) {
//         value.push(options[i].value)
//       }
//     }
//     setPersonNameNative(value)
//   }

//   return (
//     <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
//       <CardHeader title='Customer' />
//       <CardContent>
//         {/* =================== */}

//         <Autocomplete
//           sx={{ width: 300 }}
//           open={open}
//           onOpen={() => {
//             setOpen(true)
//           }}
//           onClose={() => {
//             setOpen(false)
//           }}
//           onChange={(event, value) => setCustomerData(value)}
//           isOptionEqualToValue={(option, value) => option.id === value?.id}
//           getOptionLabel={option => option.label || 'No Name'}
//           options={options}
//           loading={loading}
//           renderInput={params => (
//             <CustomTextField
//               {...params}
//               value={searchValue}
//               placeholder='Search for customer'
//               label='Select Customer'
//               onChange={e => setSearchValue(e.target.value)}
//               input={{
//                 ...params.InputProps,
//                 endAdornment: (
//                   <>
//                     {loading && <Loader />}
//                     {params.InputProps.endAdornment}

//                     <InputAdornment position='end'>
//                       <IconButton onClick={handleSearch} edge='end'>
//                         <SearchIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   </>
//                 )
//               }}
//             />
//           )}
//         />

//         {/* //================ */}
//         {/*
//         <CustomTextField
//           select
//           label='Select Customer'
//           value={customerData?._id || ''}
//           fullWidth
//           onChange={e => {
//             const selectedCustomer = options.find(data => data._id === e.target.value)
//             setCustomerData(selectedCustomer)
//           }}
//           sx={{ marginBottom: 2 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position='end'>
//                 <IconButton onClick={() => handleSearch(value)} edge='end'>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             )
//           }}
//         >
//           {options.map(data => (
//             <MenuItem key={data._id} value={data._id}>
//               {data.firstname} {data.lastname}
//             </MenuItem>
//           ))}
//         </CustomTextField>

//         {customerData?._id && <CustomerReviewCard customerData={customerData} />} */}

//         {/* =========================== */}

//         {/* <CustomTextField
//           label='Search for Customer'
//           value={searchValue}
//           onChange={e => setSearchValue(e.target.value)} // Update searchValue as user types
//           fullWidth
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position='end'>
//                 <IconButton onClick={handleSearch} edge='end'>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             )
//           }}
//         />

//         {loading && <Loader />}

//         {options.length > 0 && (
//           <div>
//             <ul style={{ listStyleType: 'none', padding: 0 }}>
//               {options.map(customer => (
//                 <MenuItem
//                   key={customer._id}
//                   onClick={() => handleSelectCustomer(customer)} // Set the customer data when a result is selected
//                 >
//                   {customer.firstname} {customer.lastname}
//                 </MenuItem>
//               ))}
//             </ul>
//           </div>
//         )}

//         {customerData && (
//           <div>
//             <h3>
//               {customerData.firstname} {customerData.lastname}
//             </h3>

//           </div>
//         )}

//         {error && <p style={{ color: 'red' }}>{error}</p>} */}
//         {/* ============================= */}

//         <div className='flex gap-4 flex-col'>
//           <div>
//             <CustomTextField
//               select
//               fullWidth
//               label='Default'
//               value={personName}
//               id='select-multiple-default'
//               SelectProps={{ MenuProps, multiple: true, onChange: handleChange }}
//             >
//               {names.map(name => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </CustomTextField>
//           </div>

//           <div>
//             <CustomTextField
//               fullWidth
//               label='Placeholder'
//               value={searchValue}
//               onChange={e => setSearchValue(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position='end'>
//                     <IconButton onClick={() => handleSearch(value)} edge='end'>
//                       <SearchIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//               SelectProps={{
//                 MenuProps,
//                 multiple: true,
//                 displayEmpty: true,
//                 onChange: handleChange,
//                 renderValue: selected => {
//                   if (selected.length === 0) {
//                     return <em>Placeholder</em>
//                   }
//                   return selected.join(', ')
//                 }
//               }}
//             >
//               <MenuItem disabled value=''>
//                 <em>Placeholder</em>
//               </MenuItem>
//               {names.map(name => (
//                 <MenuItem key={name} value={name}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </CustomTextField>
//           </div>

//         </div>

//       </CardContent>
//     </Card>
//   )
// }

import React, { useState, useCallback } from 'react'
import { InputAdornment, IconButton, MenuItem, CircularProgress, Toast, Typography, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import CustomTextField from '@/@core/components/mui/TextField'

// export default function CustomerReview() {
//   const [searchValue, setSearchValue] = useState('')
//   const [loading, setLoading] = useState(false)

//   const [options, setOptions] = useState([])
//   const [error, setError] = useState(null)
//   const [personName, setPersonName] = useState([])

//   const allCustomers = useCallback(async () => {
//     if (!searchValue.trim()) return

//     setLoading(true)
//     try {
//       const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
//       const responseData = await fetchData(getCustomerUrl, 'GET')
//       if (responseData.success) {
//         // setOptions(responseData.totalCustomer || []) // Ensure you set fetched customers here
//         const customerNames = responseData.totalCustomer.map(customer => `${customer.firstname} ${customer.lastname}`)
//         setOptions(customerNames)
//       } else {
//         toast.error('Failed to fetch options')
//       }
//     } catch (error) {
//       setError('Failed to fetch options')
//     } finally {
//       setLoading(false)
//     }
//   }, [searchValue])

//   const handleSearch = () => {
//     allCustomers()
//   }

//   const handleChange = event => {
//     setPersonName(event.target.value)
//   }

//   console.log('options', options)
//   return (
//     <div>
//       {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
//       <CustomTextField
//         fullWidth
//         label='Search Customers'
//         value={searchValue}
//         onChange={e => setSearchValue(e.target.value)}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position='end'>
//               <IconButton onClick={handleSearch} edge='end'>
//                 {loading ? <CircularProgress size={24} /> : <SearchIcon />}
//               </IconButton>
//             </InputAdornment>
//           )
//         }}
//         SelectProps={{
//           MenuProps: { PaperProps: { style: { maxHeight: 200 } } }, // Custom max height for dropdown
//           multiple: true,
//           displayEmpty: true,
//           value: personName,
//           onChange: handleChange,
//           renderValue: selected => {
//             if (selected.length === 0) {
//               return <em>Select Customers</em>
//             }
//             return selected.join(', ')
//           }
//         }}
//       >
//         <MenuItem disabled value=''>
//           <em>Select Customers</em>
//         </MenuItem>
//         {(options.length > 0 ? options : names).map(name => (
//           <MenuItem key={name} value={name}>
//             {name}
//           </MenuItem>
//         ))}
//       </CustomTextField>
//     </div>
//   )
// }

// export default function CustomerReview() {
//   const [searchValue, setSearchValue] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [options, setOptions] = useState([])
//   const [error, setError] = useState(null)
//   const [personName, setPersonName] = useState([])

//   const allCustomers = useCallback(async () => {
//     if (!searchValue.trim()) return

//     setLoading(true)
//     try {
//       const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
//       const responseData = await fetchData(getCustomerUrl, 'GET')
//       if (responseData.success) {
//         const customerNames = responseData.totalCustomer.map(customer => `${customer.firstname} ${customer.lastname}`)
//         setOptions(customerNames)
//       } else {
//         toast.error('Failed to fetch options')
//       }
//     } catch (error) {
//       setError('Failed to fetch options')
//     } finally {
//       setLoading(false)
//     }
//   }, [searchValue])

//   const handleSearch = () => {
//     allCustomers()
//   }

//   const handleChange = event => {
//     setPersonName(event.target.value)
//   }

//   return (
//     <div>
//       {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
//       <CustomTextField
//         fullWidth
//         label='Search Customers'
//         value={searchValue}
//         onChange={e => setSearchValue(e.target.value)}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position='end'>
//               <IconButton onClick={handleSearch} edge='end'>
//                 {loading ? <CircularProgress size={24} /> : <SearchIcon />}
//               </IconButton>
//             </InputAdornment>
//           )
//         }}
//         SelectProps={{
//           MenuProps: { PaperProps: { style: { maxHeight: 200 } } }, // Custom max height for dropdown
//           multiple: true,
//           displayEmpty: true,
//           value: personName,
//           onChange: handleChange,
//           renderValue: selected => {
//             if (selected.length === 0) {
//               return <em>Select Customers</em>
//             }
//             return selected.join(', ')
//           }
//         }}
//       >
//         <MenuItem disabled value=''>
//           <em>Select Customers</em>
//         </MenuItem>

//         {/* Display options dynamically */}
//         {options.length === 0 ? (
//           <MenuItem disabled>
//             <em>No customers found</em>
//           </MenuItem>
//         ) : (
//           options.map(name => (
//             <MenuItem key={name} value={name}>
//               {name}
//             </MenuItem>
//           ))
//         )}
//       </CustomTextField>
//     </div>
//   )
// }

// export default function CustomerReview() {
//   const [searchValue, setSearchValue] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [options, setOptions] = useState([])
//   const [selectedCustomers, setSelectedCustomers] = useState([])
//   const [menuOpen, setMenuOpen] = useState(false) // New state to control menu visibility

//   const fetchCustomers = useCallback(async () => {
//     if (!searchValue.trim()) return

//     setLoading(true)
//     try {
//       const getCustomerUrl = `/admin/customers/allcustomers?q=${searchValue}`
//       const responseData = await fetchData(getCustomerUrl, 'GET')
//       if (responseData.success) {
//         const customerNames = responseData.totalCustomer.map(customer => `${customer.firstname} ${customer.lastname}`)
//         setOptions(customerNames)
//         setMenuOpen(true) // Automatically open menu after fetching options
//       } else {
//         toast.error('Failed to fetch options')
//       }
//     } catch (error) {
//       toast.error('Error fetching customers')
//     } finally {
//       setLoading(false)
//     }
//   }, [searchValue])

//   const handleSearch = () => {
//     fetchCustomers()
//   }

//   const handleSelectionChange = event => {
//     setSelectedCustomers(event.target.value)
//   }

//   return (
//     <div>
//       <Typography variant='h6' gutterBottom>
//         Search and Select Customers
//       </Typography>
//       <TextField
//         fullWidth
//         label='Search Customers'
//         value={searchValue}
//         onChange={e => setSearchValue(e.target.value)}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position='end'>
//               <IconButton onClick={handleSearch} edge='end'>
//                 {loading ? <CircularProgress size={24} /> : <SearchIcon />}
//               </IconButton>
//             </InputAdornment>
//           )
//         }}
//         select={menuOpen}
//         SelectProps={{
//           open: menuOpen, // Control menu visibility
//           onOpen: () => setMenuOpen(true), // Allow manual opening
//           onClose: () => setMenuOpen(false), // Close menu when needed
//           multiple: true,
//           value: selectedCustomers,
//           onChange: handleSelectionChange,
//           renderValue: selected => (selected.length === 0 ? 'No customers selected' : selected.join(', '))
//         }}
//       >
//         {options.length > 0 ? (
//           options.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))
//         ) : (
//           <MenuItem disabled>
//             <em>No customers found</em>
//           </MenuItem>
//         )}
//       </TextField>
//     </div>
//   )
// }

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
      <Typography variant='h6' gutterBottom>
        Search and Select Customers
      </Typography>
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
          options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <em>No customers found</em>
          </MenuItem>
        )}
      </CustomTextField>
    </div>
  )
}
