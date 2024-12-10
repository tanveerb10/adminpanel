'use client'
import { useState, useEffect } from 'react'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import AddHeader from '@/libs/components/AddHeader'
import PaymentDetailForm from '@/views/cms/storesetup/PaymentSettings/PaymentDetailForm'
import PaymentCard from '@/views/cms/storesetup/PaymentSettings/PaymentCard'
import { Button, Grid } from '@mui/material'

import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'

export default function PaymentContainer({ getPaymentData, paymentApi, gatewayList }) {
  console.log(gatewayList, 'gate way list')
  const paymentDetails = getPaymentData.map(data => ({
    name: data?.display_name,
    type: data?.payment_type,
    message: data?.payment_message,
    minOrderValue: data?.min_order_value,
    maxOrderValue: data?.max_order_value,
    status: data?.status,
    clientTestId: data?.client_test_id,
    clientLiveId: data?.client_live_id,
    clientTestSecret: data?.client_test_secret,
    clientLiveSecret: data?.client_live_secret,
    merchantTestId: data?.merchant_test_id,
    merchantLiveId: data?.merchant_live_id,
    threeTestUrl: data?.three_test_url,
    threeLiveUrl: data?.three_live_url,
    saltTest: data?.salt_test,
    salt_test: data?.salt_test,
    salt_test_index: data?.salt_test_index,
    saltLiveIndex: data?.salt_live_index,
    payment_environment: data?.payment_environment,
    id: data?._id
  }))

  const ButtonProps = {
    className: 'cursor-pointer bs-full',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Payment'
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <AddHeader title='Payment Methods' />
        </div>
        <div className='mb-3'>
          <OpenDialogOnElementClick
            element={Button}
            elementProps={ButtonProps}
            dialog={PaymentDetailForm}
            dialogProps={{ paymentApi: paymentApi, isAddPayment: true, gatewayList: gatewayList }}
          />
        </div>
      </div>
      <div>
        {getPaymentData.map((paymentDetail, index) => (
          <PaymentCard key={index} detail={paymentDetail} paymentApi={paymentApi} gatewayList={gatewayList} />
        ))}
      </div>
    </div>
  )
}
