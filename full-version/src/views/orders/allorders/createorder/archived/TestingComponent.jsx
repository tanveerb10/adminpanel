'use client'

import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SearchIcon from '@mui/icons-material/Search'
// MUI Imports
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const productData = [
  {
    _id: '6752bce96d6c6164d55a66de',
    product_title: 'Men Blue Denim Jeans - ABCD-12',
    product_description:
      'Stay in the zone while you train in this crop designed with printed panel details to keep you cool. Girls love standing in these tight fitting, printed panel to handle every kind of activity they set their mind to',
    product_brand: '66c6da4af6c5ef7e2ef840d2',
    product_slug: 'men-blue-denim-jeans---abcd-12',
    product_type: 'Jeans',
    default_category: '6752bce96d6c6164d55a66d9',
    is_deleted: false,
    published: 'TRUE',
    type_standard: '128 - Apparel & Accessories > Clothing > Jean',
    uuid: '8922496582',
    createdAt: '2024-12-06T08:59:21.559Z',
    updatedAt: '2024-12-06T08:59:21.559Z',
    product_id: 1,
    __v: 0,
    product_variations: [
      {
        _id: '6752bcec6d6c6164d55a6869',
        product_id: '6752bce96d6c6164d55a66de',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Blue'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: '2XL'
        },
        variation3: null,
        variation_sku: '8912940000005',
        variation_quantity: 100,
        variation_mrp: 899,
        variation_selling_price: 699,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:24.633Z',
        updatedAt: '2024-12-06T08:59:24.633Z',
        product_variations_id: 5,
        __v: 0
      },
      {
        _id: '6752bcec6d6c6164d55a682a',
        product_id: '6752bce96d6c6164d55a66de',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Blue'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'XL'
        },
        variation3: null,
        variation_sku: '8912940000004',
        variation_quantity: 100,
        variation_mrp: 899,
        variation_selling_price: 599,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:24.216Z',
        updatedAt: '2024-12-06T08:59:24.216Z',
        product_variations_id: 4,
        __v: 0
      },
      {
        _id: '6752bceb6d6c6164d55a67eb',
        product_id: '6752bce96d6c6164d55a66de',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Blue'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'L'
        },
        variation3: null,
        variation_sku: '8912940000003',
        variation_quantity: 100,
        variation_mrp: 899,
        variation_selling_price: 599,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:23.513Z',
        updatedAt: '2024-12-06T08:59:23.513Z',
        product_variations_id: 3,
        __v: 0
      },
      {
        _id: '6752bceb6d6c6164d55a67ac',
        product_id: '6752bce96d6c6164d55a66de',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Blue'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'M'
        },
        variation3: null,
        variation_sku: '8912940000002',
        variation_quantity: 100,
        variation_mrp: 899,
        variation_selling_price: 599,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:23.087Z',
        updatedAt: '2024-12-06T08:59:23.087Z',
        product_variations_id: 2,
        __v: 0
      },
      {
        _id: '6752bcea6d6c6164d55a676a',
        product_id: '6752bce96d6c6164d55a66de',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Blue'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'S'
        },
        variation3: null,
        variation_sku: '8912940000001',
        variation_quantity: 100,
        variation_mrp: 899,
        variation_selling_price: 499,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:22.385Z',
        updatedAt: '2024-12-06T08:59:22.385Z',
        product_variations_id: 1,
        __v: 0
      }
    ]
  },
  {
    _id: '6752bced6d6c6164d55a6876',
    product_title: 'LuxeFleece Oversized Hoodie',
    product_description:
      'Wrap yourself in ultimate comfort with our LuxeFleece Oversized Hoodie. Crafted from ultra-soft, premium fleece, this hoodie offers a cozy, relaxed fit perfect for lounging or layering.',
    product_brand: '66e7d57ad536dbc47d8d310f',
    product_slug: 'luxefleece-oversized-hoodie',
    product_type: 'Hoodie',
    default_category: '6752bced6d6c6164d55a6871',
    is_deleted: false,
    published: 'TRUE',
    type_standard: 'Apparel & Accessories > Handbag & Wallet Accessories > Wallet Chains',
    uuid: '8568916903',
    createdAt: '2024-12-06T08:59:25.048Z',
    updatedAt: '2024-12-06T08:59:25.048Z',
    product_id: 2,
    __v: 0,
    product_variations: [
      {
        _id: '6752bcf16d6c6164d55a6a61',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Red'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'L'
        },
        variation3: null,
        variation_sku: '8912940000011',
        variation_quantity: 100,
        variation_mrp: 1599,
        variation_selling_price: 1099,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:29.186Z',
        updatedAt: '2024-12-06T08:59:29.186Z',
        product_variations_id: 11,
        __v: 0
      },
      {
        _id: '6752bcf06d6c6164d55a6a1d',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Red'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'M'
        },
        variation3: null,
        variation_sku: '8912940000010',
        variation_quantity: 100,
        variation_mrp: 1499,
        variation_selling_price: 999,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:28.467Z',
        updatedAt: '2024-12-06T08:59:28.467Z',
        product_variations_id: 10,
        __v: 0
      },
      {
        _id: '6752bcf06d6c6164d55a69d9',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Red'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'S'
        },
        variation3: null,
        variation_sku: '8912940000009',
        variation_quantity: 100,
        variation_mrp: 1499,
        variation_selling_price: 999,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:28.026Z',
        updatedAt: '2024-12-06T08:59:28.026Z',
        product_variations_id: 9,
        __v: 0
      },
      {
        _id: '6752bcef6d6c6164d55a6992',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Yellow'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'L'
        },
        variation3: null,
        variation_sku: '8912940000008',
        variation_quantity: 100,
        variation_mrp: 1599,
        variation_selling_price: 1099,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:27.324Z',
        updatedAt: '2024-12-06T08:59:27.324Z',
        product_variations_id: 8,
        __v: 0
      },
      {
        _id: '6752bcee6d6c6164d55a694b',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Yellow'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'M'
        },
        variation3: null,
        variation_sku: '8912940000007',
        variation_quantity: 100,
        variation_mrp: 1499,
        variation_selling_price: 999,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:26.587Z',
        updatedAt: '2024-12-06T08:59:26.587Z',
        product_variations_id: 7,
        __v: 0
      },
      {
        _id: '6752bcee6d6c6164d55a6904',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Yellow'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'S'
        },
        variation3: null,
        variation_sku: '8912940000006',
        variation_quantity: 100,
        variation_mrp: 1499,
        variation_selling_price: 999,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:26.125Z',
        updatedAt: '2024-12-06T08:59:26.125Z',
        product_variations_id: 6,
        __v: 0
      }
    ]
  }
]
const productData1 = [
  {
    _id: '6752bce96d6c6164d55a66de',
    product_title: 'Men Blue Denim Jeans - ABCD-12',
    product_description:
      'Stay in the zone while you train in this crop designed with printed panel details to keep you cool. Girls love standing in these tight fitting, printed panel to handle every kind of activity they set their mind to',
    product_brand: '66c6da4af6c5ef7e2ef840d2',
    product_slug: 'men-blue-denim-jeans---abcd-12',
    product_type: 'Jeans',
    default_category: '6752bce96d6c6164d55a66d9',
    is_deleted: false,
    published: 'TRUE',
    type_standard: '128 - Apparel & Accessories > Clothing > Jean',
    uuid: '8922496582',
    createdAt: '2024-12-06T08:59:21.559Z',
    updatedAt: '2024-12-06T08:59:21.559Z',
    product_id: 1,
    __v: 0,
    product_variations: [
      {
        _id: '6752bcec6d6c6164d55a682a',
        product_id: '6752bce96d6c6164d55a66de',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Blue'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'XL'
        },
        variation3: null,
        variation_sku: '8912940000004',
        variation_quantity: 100,
        variation_mrp: 899,
        variation_selling_price: 599,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:24.216Z',
        updatedAt: '2024-12-06T08:59:24.216Z',
        product_variations_id: 4,
        __v: 0
      }
    ]
  },
  {
    _id: '6752bced6d6c6164d55a6876',
    product_title: 'LuxeFleece Oversized Hoodie',
    product_description:
      'Wrap yourself in ultimate comfort with our LuxeFleece Oversized Hoodie. Crafted from ultra-soft, premium fleece, this hoodie offers a cozy, relaxed fit perfect for lounging or layering.',
    product_brand: '66e7d57ad536dbc47d8d310f',
    product_slug: 'luxefleece-oversized-hoodie',
    product_type: 'Hoodie',
    default_category: '6752bced6d6c6164d55a6871',
    is_deleted: false,
    published: 'TRUE',
    type_standard: 'Apparel & Accessories > Handbag & Wallet Accessories > Wallet Chains',
    uuid: '8568916903',
    createdAt: '2024-12-06T08:59:25.048Z',
    updatedAt: '2024-12-06T08:59:25.048Z',
    product_id: 2,
    __v: 0,
    product_variations: [
      {
        _id: '6752bcf16d6c6164d55a6a61',
        product_id: '6752bced6d6c6164d55a6876',
        variation1: {
          variation_option_name: 'Color',
          variation_option_value: 'Red'
        },
        variation2: {
          variation_option_name: 'Size',
          variation_option_value: 'L'
        },
        variation3: null,
        variation_sku: '8912940000011',
        variation_quantity: 100,
        variation_mrp: 1599,
        variation_selling_price: 1099,
        variation_weight: 500,
        variation_weight_unit: 'g',
        variation_length: 0,
        variation_width: 0,
        variation_height: 0,
        variation_tax: null,
        country_of_origin: 'IN',
        createdAt: '2024-12-06T08:59:29.186Z',
        updatedAt: '2024-12-06T08:59:29.186Z',
        product_variations_id: 11,
        __v: 0
      }
    ]
  }
]

export const TestingComponent = () => {
  const [checked, setChecked] = useState([{ parentId: '', variant: [], isChecked: false }])

  const handleCheck = data => {
    console.log('Previous state:', checked, 'coming data', data)

    setChecked(prev => {
      prev?.map(item =>
        item.parentId === data
          ? { ...item, isChecked: !item.isChecked }
          : { ...item, parentId: data, isChecked: !prev.isChecked }
      )
      console.log('New data:', data)

      // if (prev.map(item => item.parentId === data)) {
      //   console.log('New data:', data)
      //   return { ...prev, parentId: data, isChecked: !prev.isChecked }
      // }
      // return { ...prev, isChecked: !prev.isChecked }
    })
  }

  const handleVariantCheck = (data, parentId) => {
    console.log('handfle varuaint', data, parentId)
    // setChecked(prev => {
    //   if (prev.variant.includes(data)) {
    //     const filterData = prev.variant.filter(val => val !== data)
    //     return {
    //       ...prev,
    //       variant: filterData
    //     }
    //   }
    //   return {
    //     ...prev,
    //     variant: [...prev.variant, data]
    //   }
    // })
  }

  // setChecked(prev => {
  // const getIdObject = productData.find(value => value._id == data)
  // const allChecked = getIdObject.product_variations.map(id => id._id)
  // setUnderChecked(prev => {
  //   return [...prev].filter(value => !allChecked.includes(value))
  // })
  // const checkFilter = prev.filter(value => value != data)
  // return [...checkFilter]
  // const getIdObject = productData.find(value => value._id == data)
  // const allChecked = getIdObject.product_variations.map(id => id._id)
  // setUnderChecked(prev => [...prev, ...allChecked])
  // return [...prev, data]
  // })

  // const handleCheck = data => {
  //   setChecked(prev => {
  //     if (prev?.parent == data) {
  //        const getIdObject = productData.find(value => value._id == data)
  //        const allChecked = getIdObject.product_variations.map(id => id._id)
  //       setUnderChecked(prev => {
  //         return [...prev].filter(value => !allChecked.includes(value))
  //       })

  //       const checkFilter = prev.filter(value => value != data)
  //       return [...checkFilter]
  //     }
  //     const getIdObject = productData.find(value => value._id == data)
  //     const allChecked = getIdObject.product_variations.map(id => id._id)
  //     setUnderChecked(prev => [...prev, ...allChecked])

  //     return [...prev, data]
  //   })
  // }

  // const handleVariantCheck = (data, parentId) => {
  //   console.log('handfle varuaint', data, parentId)
  //   setUnderChecked(prev => {
  //     if (prev?.includes(data)) {
  //       const checkFilter = prev.filter(value => value != data)

  //       // setChecked(prev => {
  //       //   if (prev?.includes(parentId)) {
  //       //     const checkFilter = prev.filter(value => value != parentId)

  //       //     return [...checkFilter]
  //       //   }
  //       //   return [...prev, parentId]
  //       // })

  //       return [...checkFilter]
  //     }

  //     return [...prev, data]
  //   })

  //   setChecked(prev => {
  //     if (!prev.includes(parentId)) {
  //       return [...prev, parentId]
  //     }
  //     if (underChecked.length <= 0) {
  //       return checked.filter(val => val != parentId)
  //     }

  //     return [...prev]
  //   })
  // }

  console.log('check', checked)
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {productData.map((row, idx) => {
            return (
              <>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={row}>
                  <TableCell>
                    <Checkbox
                      // checked={checked.map(val => val.parentId == row._id)}
                      // checked={checked.parentId === row._id}
                      checked={checked?.map(item => item.isChecked)}
                      onClick={() => handleCheck(row._id)}
                    />
                  </TableCell>
                  <TableCell align='left'>
                    <div className='flex max-sm:flex-col items-center gap-6'>
                      <img height={50} width={50} className='rounded' src={'/images/avatars/1.png'} alt='Profile' />
                    </div>
                  </TableCell>
                  <TableCell component='th' scope='row' align='left'>
                    <Typography>{row.product_title}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Box sx={{ margin: 1 }}>
                      <Table size='small' aria-label='purchases'>
                        <TableBody>
                          {row.product_variations.map(variantRow => (
                            <TableRow key={variantRow._id}>
                              <TableCell component='th' scope='row'>
                                <Checkbox
                                  // checked={underChecked.includes(variantRow._id)}
                                  // checked={checked?.variant.includes(variantRow._id)}
                                  checked={checked?.map(item => item.variant.includes(variantRow._id))}
                                  // onClick={() => handleUnderCheck(variantRow._id)}
                                  onClick={() => handleVariantCheck(variantRow._id, row._id)}
                                />
                              </TableCell>

                              {/* <TableCell>{`${variantRow?.variation1?.variation_option_value || ''}${`/${variantRow?.variation2?.variation_option_value}` || ''}${`/${variantRow?.variation3?.variation_option_value}` ?? ''}`}</TableCell> */}
                              <TableCell>
                                {[
                                  variantRow?.variation1?.variation_option_value,
                                  variantRow?.variation2?.variation_option_value,
                                  variantRow?.variation3?.variation_option_value
                                ]
                                  .filter(Boolean)
                                  .join('/')}
                              </TableCell>
                              <TableCell align='right'>
                                <CustomTextField label='Price' value={variantRow?.variation_selling_price} />
                              </TableCell>
                              <TableCell align='right'>
                                <CustomTextField label='Quantity' value={variantRow?.variation_quantity} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableCell>
                </TableRow>
              </>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// const permissionsData = [
//   {
//     category: 'Dashboard',
//     permissions: ['Summary', 'Analytics', 'Reports']
//   },
//   {
//     category: 'Admin',
//     permissions: ['Admin Users', 'Admin Roles']
//   },
//   {
//     category: 'Customers',
//     permissions: ['All Customers', 'Customer Segment']
//   },
//   {
//     category: 'Products',
//     permissions: ['All Products', 'Brands', 'Categories', 'Bulk Import', 'Inventory', 'Metas', 'productfilter', 'Tags']
//   },
//   {
//     category: 'Offers',
//     permissions: ['All Coupons', 'Customer Coupons']
//   },
//   {
//     category: 'Orders',
//     permissions: ['All Orders', 'Bulk Processing', 'Transactions', 'Archived Orders']
//   },
//   {
//     category: 'CMS',
//     permissions: [
//       'Store Setup',
//       'Style',
//       'Banners',
//       'Stories',
//       'SEO',
//       'Pages',
//       'Media',
//       'Google',
//       'Facebook',
//       'Social Profiles'
//     ]
//   },
//   {
//     category: 'Payments',
//     permissions: ['Cash on Delivery', 'Razorpay', 'PhonePe']
//   },
//   {
//     category: 'Shipping',
//     permissions: ['Shipping Zones', 'Shipping Charges', 'Pincodes']
//   },
//   {
//     category: 'Taxes',
//     permissions: ['Tax Rate', 'Tax Group']
//   },
//   {
//     category: 'Email',
//     permissions: ['SMTP Settings', 'Templates', 'Send Emails']
//   },
//   {
//     category: 'Notifications',
//     permissions: ['Firebase Setup', 'Notification Templates', 'Send Notifications']
//   },
//   {
//     category: 'SMS',
//     permissions: ['SMS Setup', 'SMS Templates']
//   },
//   {
//     category: 'Shippers',
//     permissions: ['Delhivery Setup', 'BlueDart Setup', 'Shiprocket Setup', 'Shipdelight Setup']
//   }
// ]

// export const generateVariants = options => {
//   const variants = []

//   const combineOptions = (index, current) => {
//     if (index >= options.length) {
//       variants.push({
//         ...current,
//         variant_sku: '',
//         variant_compare_at_price: 0,
//         variant_inventory_qty: 0,
//         variant_price: 0,
//         variant_weight: 0,
//         variant_length: 0,
//         variant_width: 0,
//         variant_height: 0,
//         variant_tax: '',
//         country_of_origin: 'IN'
//       })
//       return
//     }

//     const { option_name, option_values } = options[index]

//     option_values.forEach(value => {
//       combineOptions(index + 1, {
//         ...current,
//         [`option${index + 1}_name`]: option_name,
//         [`option${index + 1}_value`]: value.option_value
//       })
//     })
//   }

//   combineOptions(0, {})
//   return variants
// }

// const VariantRow = ({ variant, selectedItems, handleSelectItems, index }) => {
//   const [variantData, setVariantData] = useState({
//     ...variant
//   })

//   if (!variant) {
//     toast.error('Variant is undefined:', variant)
//     return null
//   }

//   useEffect(() => {
//     setVariantData({ ...variant })
//   }, [variant])

//   const handleChange = useCallback((field, value) => {
//     setVariantData(prevState => ({
//       ...prevState,
//       [field]: value
//     }))
//   }, [])

//   const openAddVariantValue = useCallback(() => {
//     setAddVariantValueOpen(true)
//   }, [])

//   const closeAddVariantValue = useCallback(() => {
//     setAddVariantValueOpen(false)
//   }, [])

//   const handleRowClick = useCallback(
//     e => {
//       if (e.target.type !== 'checkbox' && e.target.type !== 'file') {
//         openAddVariantValue()
//       }
//     },
//     [openAddVariantValue]
//   )
//   const values = Object.keys(variant)
//     .filter(key => key.endsWith('_value'))
//     .map(key => variant[key])
//     .join('/')

//   return (
//     <>
//       <TableRow onClick={handleRowClick}>
//         <TableCell>
//           <Checkbox
//             checked={selectedItems[variant.variant] || false}
//             onChange={() => handleSelectItems(variant.variant)}
//           />
//         </TableCell>
//         <TableCell>
//           <div className='flex max-sm:flex-col items-center gap-6'>
//             <img height={50} width={50} className='rounded' src={'/images/avatars/1.png'} alt='Profile' />
//           </div>
//         </TableCell>
//         <TableCell>{productData.product_title}</TableCell>
//         <TableCell>
//           <CustomTextField label='Price' value={productData[index].variant_price} fullWidth />
//         </TableCell>
//         <TableCell>
//           <CustomTextField label='Quantity' disabled value={productData[index].variant_inventory_qty} fullWidth />
//         </TableCell>
//       </TableRow>
//     </>
//   )
// }
// export const TestingComponent1 = () => {
//   const [selectedItems, setSelectedItems] = useState({})

//   const handleSelectItems = useCallback(itemId => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [itemId]: !prevState[itemId]
//     }))
//   }, [])

//   const handleSelectAll = useCallback(() => {
//     const newSelectAll = !Object.values(selectedItems).every(Boolean)
//     const newSelectedItems = {}
//     structuredData.forEach(variant => {
//       newSelectedItems[variant.variant] = newSelectAll
//     })
//     setSelectedItems(newSelectedItems)
//   }, [productData, selectedItems])

//   if (!productData || productData.length === 0) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No Data Available</Typography>
//         </CardContent>
//       </Card>
//     )
//   }
//   return (
//     <Grid container className='mt-5 p-3'>
//       <TableContainer component={Paper}>
//         <Table aria-label='collapsible table'>
//           <TableHead>
//             <TableRow>
//               <TableCell align='left'>
//                 <Checkbox
//                   checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
//                   indeterminate={
//                     Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)
//                   }
//                   onChange={handleSelectAll}
//                 />
//               </TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Price</TableCell>
//               <TableCell>Quantity</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {productData?.map((variantObj, index) => (
//               <VariantRow
//                 key={index}
//                 variant={variantObj}
//                 index={index}
//                 selectedItems={selectedItems}
//                 handleSelectItems={handleSelectItems}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Grid>
//   )
// }

///========================================================================

// function Row(props) {
//   const { row } = props
//   const [open, setOpen] = useState(true)
//   console.log('row props', row)
//   return (
//     <>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <Checkbox />
//         </TableCell>
//         <TableCell align='left'>
//           <div className='flex max-sm:flex-col items-center gap-6'>
//             <img height={50} width={50} className='rounded' src={'/images/avatars/1.png'} alt='Profile' />
//           </div>
//         </TableCell>
//         <TableCell component='th' scope='row' align='left'>
//           <Typography>{row.product_title}</Typography>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout='auto' unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Table size='small' aria-label='purchases'>
//                 <TableBody>
//                   {row.product_variations.map(variantRow => (
//                     <TableRow key={variantRow.date}>
//                       <TableCell component='th' scope='row'>
//                         <Checkbox />
//                       </TableCell>

//                       <TableCell>{`${variantRow.variation1.variation_option_value}/${variantRow.variation2.variation_option_value}/${variantRow?.variation3?.variation_option_value || ''}`}</TableCell>
//                       <TableCell align='right'>
//                         <CustomTextField label='Price' value={variantRow.variation_selling_price} />
//                       </TableCell>
//                       <TableCell align='right'>
//                         <CustomTextField label='Quantity' value={variantRow.variation_quantity} />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </>
//   )
// }

// ======================================role===========================

// export const TestingComponent2 = () => {
//   const [roleName, setRoleName] = useState('')
//   const [selectedPermissions, setSelectedPermissions] = useState({})
//   const [expanded, setExpanded] = useState(true)
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)

//   const resetForm = () => {
//     setRoleName('')
//     setSelectedPermissions({})
//     setError(null)
//   }
//   const handleClose = () => {
//     resetForm()
//     setOpen(false)
//   }
//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false)
//   }
//   const togglePermission = (category, permission) => {
//     setSelectedPermissions(prev => {
//       const categoryPermissions = prev[category] || []
//       if (categoryPermissions.includes(permission)) {
//         return {
//           ...prev,
//           [category]: categoryPermissions.filter(perm => perm !== permission)
//         }
//       } else {
//         return {
//           ...prev,
//           [category]: [...categoryPermissions, permission]
//         }
//       }
//     })
//   }

//   // Toggle select all for a category
//   const handleSelectAllCategory = category => {
//     // Check if all permissions are selected for the category
//     const allSelected =
//       (selectedPermissions[category] || []).length ===
//       permissionsData.find(cat => cat.category === category).permissions.length

//     // Update state to either select or deselect all permissions for the category
//     setSelectedPermissions(prev => ({
//       ...prev,
//       [category]: allSelected ? [] : permissionsData.find(cat => cat.category === category).permissions
//     }))
//   }

//   const handleSelectAllPermissions = () => {
//     const allSelected = permissionsData.every(
//       cat => (selectedPermissions[cat.category] || []).length === cat.permissions.length
//     )

//     const newSelections = allSelected
//       ? {}
//       : permissionsData.reduce((acc, cat) => {
//           acc[cat.category] = cat.permissions
//           return acc
//         }, {})
//     setSelectedPermissions(newSelections)
//   }

//   const isSelectAllChecked = permissionsData.every(
//     cat => (selectedPermissions[cat.category] || []).length === cat.permissions.length
//   )

//   return (
//     <>
//       <>
//         <CustomTextField
//           label='Role Name'
//           variant='outlined'
//           fullWidth
//           placeholder='Enter Role Name'
//           value={roleName}
//           onChange={e => setRoleName(e.target.value)}
//           margin='normal'
//         />
//         <Typography variant='h5' className='min-is-[225px]'>
//           Role Permissions
//         </Typography>
//         <div className='overflow-x-auto'>
//           <FormControlLabel
//             className='mie-0 capitalize'
//             control={
//               <Checkbox
//                 onChange={handleSelectAllPermissions}
//                 indeterminate={!isSelectAllChecked && Object.keys(selectedPermissions).length > 0}
//                 checked={isSelectAllChecked}
//               />
//             }
//             label='Select All'
//           />
//           {permissionsData.map(categoryData => {
//             const isCategoryChecked =
//               (selectedPermissions[categoryData.category] || []).length === categoryData.permissions.length
//             const isCategoryIndeterminate =
//               !isCategoryChecked && (selectedPermissions[categoryData.category] || []).length > 0
//             return (
//               <Accordion
//                 key={categoryData.category}
//                 expanded={expanded === categoryData.category}
//                 onChange={handleChange(categoryData.category)}
//               >
//                 <AccordionSummary
//                   id={`${categoryData.category}-header`}
//                   aria-controls={`${categoryData.category}-content`}
//                 >
//                   <FormControlLabel
//                     label={`${categoryData.category} (${(selectedPermissions[categoryData.category] || []).length}/${categoryData.permissions.length})`}
//                     control={
//                       <Checkbox
//                         aria-label={`Select all ${categoryData.category} permissions`}
//                         onChange={() => handleSelectAllCategory(categoryData.category)}
//                         checked={isCategoryChecked}
//                         indeterminate={isCategoryIndeterminate}
//                         onClick={event => event.stopPropagation()}
//                         onFocus={event => event.stopPropagation()}
//                       />
//                     }
//                   />
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <FormGroup>
//                     {categoryData.permissions.map(permission => (
//                       <FormControlLabel
//                         className='mie-0'
//                         key={permission}
//                         control={
//                           <Checkbox
//                             checked={(selectedPermissions[categoryData.category] || []).includes(permission)}
//                             onChange={() => togglePermission(categoryData.category, permission)}
//                           />
//                         }
//                         label={permission}
//                       />
//                     ))}
//                   </FormGroup>
//                 </AccordionDetails>
//               </Accordion>
//             )
//           })}
//         </div>
//       </>

//       {error && toast.error(error)}
//     </>
//   )
// }
