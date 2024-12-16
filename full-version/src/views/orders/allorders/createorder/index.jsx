'use client'
import React from 'react'
import ProductReview from '@views/orders/allorders/createorder/productReview/ProductReview'
import PaymentReview from '@views/orders/allorders/createorder/paymentReview/PaymentReview'
import CustomerReview from '@views/orders/allorders/createorder/customerReview/CustomerReview'
import { Button, Grid, IconButton } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'
import OptionMenu from '@core/components/option-menu'

export default function CreateOrder() {
  // const { orders, customerAddress, handleAllReset } = useOrder()
  const { orders, handleAllReset } = useOrder()

  const customerAddress = {
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
      state: 'Punjab',
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
    updatedAt: '2024-12-13T09:37:29.523Z',
    customer_id: 3,
    __v: 0
  }
  const sampleFormatData = {
    // customerId: '673b017226f821a0ed544992',
    coupon_code: 'abc',
    // customerState: 'Bihar',
    products: [
      {
        variation: '6752bcea6d6c6164d55a676a',
        quantity: 1
      }
    ],
    payment_gateway: 'prepaid',
    // shippingAddress: {
    //   firstName: 'amar',
    //   lastName: 'nimbale',
    //   name: 'a',
    //   line1: 'a-line',
    //   line2: 'Aajad nagar',
    //   city: 'mumbai',
    //   state: 'maharastra',
    //   pin: '400074',
    //   country: 'India',
    //   phone: '7040082974'
    // },
    // billingAddress: {
    //   firstName: 'amar',
    //   lastName: 'nimbale',
    //   name: 'a',
    //   line1: 'a-line',
    //   line2: 'Aajad nagar',
    //   city: 'mumbai',
    //   state: 'maharastra',
    //   pin: '400074',
    //   country: 'India',
    //   phone: '7040082974'
    // },
    customerNote: 'this is customer Note',
    location: '198.157.55'
  }

  console.log('format data', orders, 'cutomer', customerAddress)
  const formatData = {
    customerId: customerAddress._id,
    customerState: customerAddress.default_address.state,
    shippingAddress: {
      firstName: customerAddress.firstname,
      lastName: customerAddress.lastname,
      name: 'a',
      line1: customerAddress.default_address.address1,
      line2: customerAddress.default_address.address2,
      city: customerAddress.default_address.city,
      state: customerAddress.default_address.state,
      pin: customerAddress.default_address.pin,
      country: customerAddress.default_address.country,
      phone: customerAddress.default_address.phone
    },
    billingAddress: {
      firstName: customerAddress.firstname,
      lastName: customerAddress.lastname,
      name: 'b',
      line1: customerAddress.default_address.address1,
      line2: customerAddress.default_address.address2,
      city: customerAddress.default_address.city,
      state: customerAddress.default_address.state,
      pin: customerAddress.default_address.pin,
      country: customerAddress.default_address.country,
      phone: customerAddress.default_address.phone
    }
  }

  const createOrder = async () => {
    const ApiURL = '/admin/orders/createOrder'
    try {
      const responseData = await fetchData(ApiURL, 'POST')
      if (responseData.success) {
        toast.success(responseData.message || 'Added available config option')
      } else {
        throw new Error(responseData.message || 'failed to get available option')
      }
    } catch (err) {
      toast.error(err)
    }
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12}>
        <ProductReview />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomerReview />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PaymentReview />
      </Grid>
      <Grid item xs={12} sm={6} className='gap-5' spacing={3}>
        <Button variant='tonal' color='error' onClick={() => handleAllReset()}>
          Reset
        </Button>
        <Button variant='tonal' color='primary'>
          Create Order
          <OptionMenu
            icon='tabler-chevron-down'
            options={[
              {
                text: 'Prepaid'
              },
              {
                text: 'COD'
              }
            ]}
          />
        </Button>
      </Grid>
    </Grid>
  )
}
