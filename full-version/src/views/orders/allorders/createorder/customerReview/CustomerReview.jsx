import CustomTextField from '@/@core/components/mui/TextField'
import { Card, CardContent, CardHeader, MenuItem, Typography } from '@mui/material'
import React from 'react'

const customerData = [
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
  return (
    <Card>
      <CardHeader title='Customer' />
      <CardContent>
        <CustomTextField select label='Customer' fullWidth>
          {customerData.map(data => (
            <MenuItem value={data._id}>{data.firstname}</MenuItem>
          ))}
        </CustomTextField>
        <Typography>hello</Typography>
      </CardContent>
    </Card>
  )
}
