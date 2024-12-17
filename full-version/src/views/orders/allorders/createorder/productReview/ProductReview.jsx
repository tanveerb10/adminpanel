'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Components Imports
import { Chip } from '@mui/material'
import ProductDialog from '@/views/orders/allorders/createorder/productReview/productDialog/ProductDialog'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import ProductCard from '@/views/orders/allorders/createorder/productReview/ProductCard'

const ProductReview = ({}) => {
  const { removeOrder, orders = [], updateQuantity, grandTotal } = useOrder()

  const handleQuantity = (variationId, newQuantity) => {
    updateQuantity(variationId, newQuantity)
  }

  const handleRemoveOrder = async variationId => {
    try {
      await removeOrder(variationId)
    } catch (error) {
      console.error(`Failed to remove order for variationId: ${variationId}`, error)
    }
  }

  const ButtonProps = {
    className: 'cursor-pointer bs-full mr-5',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Product'
  }
  return (
    <Card>
      <Grid className='flex justify-between items-center'>
        <CardHeader title='Create Order' />
        <OpenDialogOnElementClick element={Button} elementProps={ButtonProps} dialog={ProductDialog} />
      </Grid>
      <CardContent>
        {orders.map(val => (
          <ProductCard
            key={val.variationId}
            val={val}
            quantity={{ quantity: val.quantity, totalPrice: val.totalPrice }}
            handleQuantity={handleQuantity}
            handleRemoveOrder={handleRemoveOrder}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default ProductReview
