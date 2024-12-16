'use client'
import CreateOrder from '@views/orders/allorders/createorder/index'
import { OrderProvider } from '@/views/orders/allorders/orderContext/OrderStateManagement'

export default function page({}) {
  return (
    <OrderProvider>
      <CreateOrder />
    </OrderProvider>
  )
}
