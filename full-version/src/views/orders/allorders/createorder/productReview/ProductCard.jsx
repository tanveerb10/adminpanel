'use client'

// Components Imports
import { Chip, IconButton, Typography } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import Image from 'next/image'

export default function ProductCard({ val, quantity, handleQuantity, handleRemoveOrder }) {
  if (!val) return null

  const { quantity: qty = 1, totalPrice: price = val.price || 0 } = quantity || {}

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

        <Chip label={val?.available || 0} color='secondary' variant='tonal' />
      </div>
      <CustomTextField
        label='Quantity'
        type='number'
        value={qty}
        onChange={e => {
          const newQuantity = Math.max(0, Math.min(val?.available, Number(e.target.value)))
          handleQuantity(val?.variationId, newQuantity)
        }}
        inputProps={{ min: 0, max: val?.available }}
        disabled={val?.available === 0}
        className='w-auto'
      />
      <div className='flex items-center justify-center flex-col'>
        <Typography variant='h6' className='font-semibold'>
          Total
        </Typography>

        <Chip label={`₹${price}`} color='success' variant='tonal' />
      </div>

      <IconButton onClick={() => handleRemoveOrder(val?.variationId)} aria-label='Remove order'>
        <i className='tabler-x' style={{ fontSize: '22px' }} />
      </IconButton>
    </div>
  )
}
