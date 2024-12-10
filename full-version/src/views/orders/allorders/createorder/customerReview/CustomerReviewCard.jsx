import CustomTextField from '@/@core/components/mui/TextField'
import { Card, CardContent, CardHeader, MenuItem, Typography } from '@mui/material'
import React from 'react'

const customerData = {
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
    country: 'india',
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
}

export default function CustomerReviewCard() {
  return (
    <Card>
      <CardHeader title='Customer' />
      <CardContent>
        <Typography>
          {customerData?.firstname} {customerData?.lastname}
        </Typography>
        <Typography>
          {customerData?.email} {customerData?.phone}
        </Typography>
        <Typography>
          {customerData?.default_address.address1} {customerData.default_address.address2}
          {customerData.default_address.pin} {customerData.default_address.city} {customerData.default_address.country}
        </Typography>
        <Typography>same as shipping address</Typography>
      </CardContent>
    </Card>
  )
}
