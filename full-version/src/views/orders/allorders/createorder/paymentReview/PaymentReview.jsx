import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'

export default function PaymentReview() {
  const { productTotal } = useOrder()
  return (
    <Card>
      <CardHeader title='Payment' />
      <CardContent>
        <Grid container spacing={6} className=''>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Subtotal</Typography>
            <Typography>-</Typography>
            <Typography>₹0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Add discount</Typography>
            <Typography>-</Typography>
            <Typography>₹0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Add shipping</Typography>
            <Typography>-</Typography>
            <Typography>₹0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Estimated tax</Typography>
            <Typography>-</Typography>
            <Typography>₹0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Total</Typography>
            <Typography>-</Typography>
            <Typography>{`₹${productTotal}`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
