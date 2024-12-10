import React from 'react'
import ProductReview from '@views/orders/allorders/createorder/productReview/ProductReview'
import PaymentReview from '@views/orders/allorders/createorder/paymentReview/PaymentReview'
import CustomerReviewCard from '@views/orders/allorders/createorder/customerReview/CustomerReviewCard'
import ProductDialog from '@/views/orders/allorders/createorder/productReview/productDialog/ProductDialog'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import {
  TestingComponent,
  TestingComponent1,
  TestingComponent2,
  TestingComponent3
} from '@/views/orders/allorders/createorder/archived/TestingComponent'
import { Button } from '@mui/material'
export default function CreateOrder() {
  const ButtonProps = {
    className: 'cursor-pointer bs-full',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Banners'
  }
  return (
    <div>
      <TestingComponent />
      {/* <CustomerReviewCard />
      <PaymentReview /> */}
      {/* <OpenDialogOnElementClick element={Button} elementProps={ButtonProps} dialog={ProductDialog} /> */}
    </div>
  )
}
