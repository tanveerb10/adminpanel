'use client'

// React Imports

// Components Imports
import { Chip, IconButton, Typography } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import Image from 'next/image'

export default function ProductCard({ key, val, quantity, handleQuantity, handleRemoveOrder }) {
  console.log('quantity card', quantity)
  const { quantity: qty = 1, totalPrice: price } = quantity || {}
  return (
    <div className='flex items-center justify-between space-x-2 pr-2 mt-2 mb-2'>
      <Image height={70} width={70} className='rounded' src={val?.img || '/images/avatars/1.png'} alt='Product image' />
      <div className=''>
        <Typography variant='h6' className='font-semibold'>
          {val?.productTitle}
        </Typography>
        <Chip label={val?.variationName} color='secondary' />
      </div>

      <div className='flex items-center justify-center flex-col'>
        <Typography variant='h6' className='font-semibold'>
          Available
        </Typography>

        <Chip label={val?.available} color='secondary' variant='tonal' />
      </div>
      <CustomTextField
        label='Quantity'
        value={qty}
        onChange={e => handleQuantity(val?.variationId, Number(e.target.value))}
        disabled={val?.available === 0}
        className='w-auto'
      />
      <div className='flex items-center justify-center flex-col'>
        <Typography variant='h6' className='font-semibold'>
          Total
        </Typography>

        <Chip label={`₹${price}`} color='success' variant='tonal' />
      </div>

      <IconButton onClick={() => handleRemoveOrder(val?.variationId)}>
        <i className='tabler-x text-[22px] ' />
      </IconButton>
    </div>
  )
}
