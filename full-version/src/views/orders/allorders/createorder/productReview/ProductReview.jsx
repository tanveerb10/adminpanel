'use client'

// React Imports
import React, { useState } from 'react'

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
import Image from 'next/image'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import ProductCard from '@/views/orders/allorders/createorder/productReview/ProductCard'

const ProductReview = ({}) => {
  const ButtonProps = {
    className: 'cursor-pointer bs-full mr-5',
    variant: 'tonal',
    size: 'medium',
    children: 'Select Order'
  }

  const { removeOrder, orders } = useOrder()
  // const { removeOrder } = useOrder()
  const orders1 = [
    {
      variationName: 'Blue/2XL',
      variationId: '6752bcec6d6c6164d55a6869',
      price: 699,
      available: 100,
      productId: '6752bce96d6c6164d55a66de',
      productTitle: 'Men Blue Denim Jeans - ABCD-12'
    }
  ]

  const initialData = (orders || []).reduce((acc, data) => {
    acc[data.variationId] = {
      available: data.available,
      price: data.price,
      variationId: data.variationId,
      totalPrice: data.price * 1,
      quantity: 1
    }
    return acc
  }, {})

  const [quantity, setQuantity] = useState(initialData)

  console.log('quantity', quantity)
  console.log('orders from price', orders)

  // const handleQuantity = (index, newQuantity) => {
  //   console.log('helloo')
  //   const updatedQuantity = [...quantity]
  //   updatedQuantity[index].quantity = newQuantity
  //   updatedQuantity[index].totalPrice = updatedQuantity[index].price * newQuantity
  //   setQuantity(updatedQuantity)
  // }
  const handleQuantity = (variationId, newQuantity) => {
    setQuantity(prev => ({
      ...prev,
      [variationId]: {
        ...prev[variationId],
        quantity: newQuantity,
        totalPrice: prev[variationId].price * newQuantity
      }
    }))
  }

  const grandTotal = Object.values(quantity).reduce((acc, item) => acc + item.totalPrice, 0)

  const handleRemoveOrder = variationId => {
    removeOrder(variationId)
    setQuantity(prev => {
      const updated = { ...prev }
      delete updated[variationId]
      return updated
    })
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
            // quantity={quantity}
            quantity={quantity[val.variationId] || { quantity: 1, totalPrice: val.price }}
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
