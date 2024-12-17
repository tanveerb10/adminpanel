import { Button, Card, CardContent, Typography } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import OptionMenu from '@core/components/option-menu'

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
        <div className='flex justify-between'>
          <Typography variant='h6' className='font-semibold'>
            Customer Information
          </Typography>

          <OptionMenu
            iconClassName='text-[20px] text-textSecondary'
            options={[
              {
                text: 'Remove',
                menuItemProps: {
                  onClick: () => removeCustomerAddress()
                },
                icon: 'tabler-trash text-[15px] text-textSecondary'
              }
            ]}
          />
        </div>
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
          <Typography>{customerAddress?.default_address?.address1 || 'N/A'}</Typography>
          <Typography>{customerAddress?.default_address?.address2 || ''}</Typography>
          <Typography>
            {customerAddress?.default_address?.city || 'N/A'} {customerAddress?.default_address?.pin || ''}
          </Typography>
          <Typography>{customerAddress?.default_address?.country || 'N/A'}</Typography>
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
