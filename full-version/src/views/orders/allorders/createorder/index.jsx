'use client'
import { useEffect } from 'react'
import ProductReview from '@views/orders/allorders/createorder/productReview/ProductReview'
import PaymentReview from '@views/orders/allorders/createorder/paymentReview/PaymentReview'
import CustomerReview from '@views/orders/allorders/createorder/customerReview/CustomerReview'
import NoteCard from '@views/orders/allorders/createorder/noteReview/NoteCard'
import { Grid } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'

export default function CreateOrder() {
  const { orders, customerAddress, handleIp } = useOrder()

  const ipApi = () => {
    fetch('https://api.ipify.org?format=json&ipVersion=ipv4', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Your IP address is: ', data.ip)
        handleIp(data.ip)
      })
      .catch(error => {
        console.error('Error fetching IP address: ', error)
      })
  }
  useEffect(() => {
    ipApi()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12}>
        <ProductReview />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomerReview />
      </Grid>
      <Grid item xs={12} sm={6}>
        {customerAddress['_id'] && !!orders.length && <PaymentReview />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <NoteCard />
      </Grid>
    </Grid>
  )
}
