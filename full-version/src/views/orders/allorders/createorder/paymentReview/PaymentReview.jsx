import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'

export default function PaymentReview() {
  return (
    <Card>
      <CardHeader title='Payment' />
      <CardContent>
        <Grid container spacing={6} className=''>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Subtotal</Typography>
            <Typography>0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Add discount</Typography>
            <Typography>0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Add shipping or delivery</Typography>
            <Typography>0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Estimated tax</Typography>
            <Typography>0</Typography>
          </Grid>
          <Grid item xs={12} sm={6} className='flex justify-between'>
            <Typography>Total</Typography>
            <Typography>0</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
