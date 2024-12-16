import { useState } from 'react'
import CustomerReviewCard from '@/views/orders/allorders/createorder/customerReview/CustomerReviewCard'
import CustomerReviewSearch from '@/views/orders/allorders/createorder/customerReview/CustomerReviewSearch'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import { Card } from '@mui/material'

export default function CustomerReview() {
  const { customerAddress } = useOrder()

  return (
    <Card sx={{ maxWidth: 600, marginTop: 3 }}>
      {customerAddress?._id ? <CustomerReviewCard /> : <CustomerReviewSearch />}
    </Card>
  )
}
