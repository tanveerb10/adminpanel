'use client'

// React Imports
import React, { useEffect, useMemo, useState } from 'react'

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
  const ButtonProps = {
    className: 'cursor-pointer bs-full mr-5',
    variant: 'tonal',
    size: 'medium',
    children: 'Select Order'
  }

  const { removeOrder, orders = [], handleProductTotal, setOrders, updateQuantity } = useOrder()

  const generateInitialData = orders =>
    orders.reduce((acc, data) => {
      acc[data.variationId] = {
        available: data.available || 0,
        price: data.price || 0,
        variationId: data.variationId,
        totalPrice: (data.price || 0) * 1,
        quantity: 1
      }
      return acc
    }, {})

  const [quantity, setQuantity] = useState(() => generateInitialData(orders))
  useEffect(() => {
    setQuantity(generateInitialData(orders))
  }, [orders])

  console.log('quantity', quantity)
  console.log('orders from price', orders)

  const handleQuantity = (variationId, newQuantity) => {
    if (!quantity[variationId]) return
    setQuantity(prev => ({
      ...prev,
      [variationId]: {
        ...prev[variationId],
        quantity: newQuantity,
        totalPrice: prev[variationId].price * newQuantity
      }
    }))
  }

  // const grandTotal = useMemo(() => Object.values(quantity).reduce((acc, item) => acc + item.totalPrice, 0), [quantity])
  const grandTotal = useMemo(() => Object.values(quantity).reduce((acc, item) => acc + item.totalPrice, 0), [quantity])

  const handleRemoveOrder = async variationId => {
    try {
      await removeOrder(variationId)
      setQuantity(prev => {
        const updated = { ...prev }
        delete updated[variationId]
        return updated
      })
    } catch (error) {
      console.error(`Failed to remove order for variationId: ${variationId}`, error)
    }
  }

  handleProductTotal(grandTotal)
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
            quantity={
              quantity[val.variationId] || { quantity: 1, totalPrice: val.price || 0, available: val.available || 0 }
            }
            handleQuantity={handleQuantity}
            handleRemoveOrder={handleRemoveOrder}
          />
        ))}
        <Chip label={grandTotal} />
      </CardContent>
    </Card>
  )
}

export default ProductReview
