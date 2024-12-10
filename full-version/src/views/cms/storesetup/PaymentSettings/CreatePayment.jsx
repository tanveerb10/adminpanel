import { Button, Grid } from '@mui/material'
import React from 'react'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import PaymentDetailForm from '@/views/cms/storesetup/PaymentSettings/PaymentDetailForm'

export default function CreatePayment({ paymentApi, isAddPayment, gatewayList }) {
  return (
    <Grid className='backdrop-blur-[20px] rounded-lg shadow-lg bg-black/15 h-full w-full flex flex-col justify-center items-center'>
      <AddHeader title='No Payment method found. Start by adding a new Method!' />
      <OpenDialogOnElementClick
        element={Button}
        dialog={PaymentDetailForm}
        elementProps={{
          variant: 'contained',
          style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333', marginTop: '20px' },
          children: 'Create Payment Method'
        }}
        dialogProps={{ paymentApi: paymentApi, isAddPayment: isAddPayment, gatewayList: gatewayList }}
      />
    </Grid>
  )
}
