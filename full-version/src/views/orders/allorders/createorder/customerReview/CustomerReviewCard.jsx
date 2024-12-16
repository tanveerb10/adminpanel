import { Button, Card, CardContent, Typography } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'

export default function CustomerReviewCard() {
  const { customerAddress, removeCustomerAddress } = useOrder()
  if (!customerAddress.default_address) {
    return (
      <div className='flex flex-col justify-center items-center pt-5 pb-5'>
        <Typography variant='h5' className='font-semibold'>
          There's no Customer address. Click below button to add.
        </Typography>
        <Button variant='tonal' color='primary'>
          Add Address
        </Button>
      </div>
    )
  }
  return (
    <CardContent>
      <div style={{ marginBottom: '1rem' }}>
        <Typography variant='h6' className='font-semibold'>
          Customer Information
        </Typography>
        <Button variant='tonal' color='error' onClick={() => removeCustomerAddress()}>
          Remove
        </Button>
        <Typography variant='body1'>
          {customerAddress?.firstname} {customerAddress?.lastname}
        </Typography>
        <Typography variant='body1'>{customerAddress?.email || 'N/A'}</Typography>
        <Typography variant='body1'>{customerAddress?.phone || 'N/A'}</Typography>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <Typography variant='h6' className='font-semibold'>
          Billing Address
        </Typography>
        <Typography variant='body2'>
          {customerAddress?.default_address?.address1 || 'N/A'} {customerAddress?.default_address?.address2 || ''}
          {customerAddress?.default_address?.pin || ''} {customerAddress?.default_address?.city || 'N/A'}{' '}
          {customerAddress?.default_address?.country || 'N/A'}
        </Typography>
      </div>

      <div>
        <Typography variant='h6' className='font-semibold'>
          Shipping Address
        </Typography>
        <Typography variant='body2'>
          <Typography>{customerAddress?.default_address?.address1 || 'N/A'}</Typography>
          <Typography>{customerAddress?.default_address?.address2 || ''}</Typography>
          <Typography>
            {customerAddress?.default_address?.city || 'N/A'} {customerAddress?.default_address?.pin || ''}
          </Typography>
          <Typography>{customerAddress?.default_address?.country || 'N/A'}</Typography>
        </Typography>
      </div>
    </CardContent>
  )
}
