import { Card, CardContent, Chip, Grid, IconButton, Typography } from '@mui/material'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import PaymentDetailForm from '@/views/cms/storesetup/PaymentSettings/PaymentDetailForm'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

export default function PaymentCard({ detail, paymentApi, gatewayList }) {
  // console.log('get payment data', detail)
  const IconProps = {
    className: 'tabler-edit text-[22px] text-Secondary',
    variant: 'tonal',
    size: 'medium'
  }

  const deletePayment = async () => {
    try {
      const apiUrl = `/admin/cms/deletePaymentSettings/${detail._id}`
      const response = await fetchData(apiUrl, 'DELETE')

      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.success(response.message || 'Successfully Deleted')
        paymentApi()
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid className='flex justify-between'>
          <Grid>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              {detail?.display_name || 'No payment available'}
              <span style={{ fontSize: '0.9rem', fontWeight: 'normal', marginLeft: '10px' }}>
                {`(${detail?.payment_type || 'No type available'})`}
              </span>
            </Typography>
          </Grid>
          <Grid className='gap-2'>
            <Chip
              variant='outlined'
              color={detail?.status ? 'success' : 'error'}
              label={detail?.status ? 'Active' : 'Inactive'}
              sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            />

            <IconButton onClick={deletePayment}>
              <i className='tabler-trash text-[22px] text-Secondary text-red-500' />
            </IconButton>
            <IconButton>
              <OpenDialogOnElementClick
                element={IconButton}
                elementProps={IconProps}
                dialog={PaymentDetailForm}
                dialogProps={{ detail: detail, paymentApi: paymentApi, gatewayList: gatewayList }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid className='flex justify-between'>
          <Grid>
            <Typography>{detail?.payment_message || 'No message available'}</Typography>
          </Grid>

          <Grid>
            <Chip
              variant='outlined'
              color='primary'
              label={detail?.payment_type}
              sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
