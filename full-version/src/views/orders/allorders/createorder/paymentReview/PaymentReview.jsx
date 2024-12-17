import { Button, Card, CardContent, CardHeader, Chip, Divider, Grid, IconButton, Typography } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import OptionMenu from '@core/components/option-menu'
import { useEffect, useState } from 'react'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function PaymentReview() {
  const {
    handleAllReset,
    handlePaymentMethod,
    paymentMethod,
    grandTotal,
    customerAddress,
    totalQuantity,
    orders,
    ipAddress,
    note
  } = useOrder()

  const [responseData, setResponseData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTaxApi = async () => {
    const data = {
      products: orders.map(order => ({ variationId: order.variationId, quantity: order.quantity })),
      customerState: customerAddress?.default_address?.state,
      customerId: customerAddress?._id
    }
    setLoading(true)
    setError(null)
    try {
      const taxUrl = `/admin/orders/calculateTaxAndShippingCost`

      const responseData = await fetchData(taxUrl, 'POST', data)
      console.log(responseData)
      if (responseData.success) {
        setResponseData(responseData)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  console.log(responseData, 'tax api data')

  useEffect(() => {
    fetchTaxApi()
  }, [orders])

  const handleChangeMethod = () => {
    if (paymentMethod === 'prepaid') {
      handlePaymentMethod('cod')
    } else {
      handlePaymentMethod('prepaid')
    }
  }

  const createOrder = async () => {
    const formatData = {
      customerId: customerAddress?._id || '',
      customerState: customerAddress?.default_address?.state || '',
      shippingAddress: {
        firstName: customerAddress?.firstname || '',
        lastName: customerAddress?.lastname || '',
        name: 'a',
        line1: customerAddress?.default_address?.address1 || '',
        line2: customerAddress?.default_address?.address2 || '',
        city: customerAddress?.default_address?.city || '',
        state: customerAddress?.default_address?.state || '',
        pin: customerAddress?.default_address?.pin || '',
        country: customerAddress?.default_address?.country || '',
        phone: customerAddress?.default_address?.phone || ''
      },
      billingAddress: {
        firstName: customerAddress?.firstname || '',
        lastName: customerAddress?.lastname || '',
        name: 'b',
        line1: customerAddress?.default_address?.address1 || '',
        line2: customerAddress?.default_address?.address2 || '',
        city: customerAddress?.default_address?.city || '',
        state: customerAddress?.default_address?.state || '',
        pin: customerAddress?.default_address?.pin || '',
        country: customerAddress?.default_address?.country || '',
        phone: customerAddress?.default_address?.phone || ''
      },
      customerNote: note,
      payment_gateway: paymentMethod,
      coupon_code: 'abc',
      products: orders.map(order => ({ variation: order.variationId, quantity: order.quantity })),
      location: ipAddress
    }
    const ApiURL = '/admin/orders/createOrder'
    try {
      const responseData = await fetchData(ApiURL, 'POST', formatData)
      if (responseData?.success) {
        toast.success(responseData?.message || 'Added available config option')
        handleAllReset()
      } else {
        throw new Error(responseData?.message || 'failed to get available option')
      }
    } catch (err) {
      toast.error(err)
    }
  }

  const finalTotal = grandTotal + responseData.ShippingCost || grandTotal
  return (
    <Card>
      <CardHeader title='Payment' />
      <CardContent>
        <Grid container spacing={6} className=''>
          <Grid item xs={12} className='flex justify-between'>
            <Typography>Subtotal</Typography>
            <Typography>{`${totalQuantity} items`}</Typography>
            <Typography>{`₹${grandTotal}`}</Typography>
          </Grid>
          <Grid item xs={12} className='flex justify-between'>
            <Typography>Add discount</Typography>
            <Typography>-</Typography>
            <Typography>₹0</Typography>
          </Grid>
          <Grid item xs={12} className='flex justify-between'>
            <Typography>Add shipping</Typography>
            <Typography>-</Typography>
            <Typography>{`₹${responseData.ShippingCost}` || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} className='flex justify-between'>
            <Typography>Estimated tax</Typography>
            <Typography>-</Typography>
            <Typography>{`₹${responseData.totalTax}` || 'N/A'}</Typography>
          </Grid>

          <Grid item xs={12} className='flex justify-between'>
            <Typography>Payment Method</Typography>
            <Typography className='font-bold'>
              {paymentMethod.length > 0 ? paymentMethod.toUpperCase() : 'Not Set'}
            </Typography>
            {paymentMethod && (
              <IconButton onClick={() => handleChangeMethod()}>
                <i className='tabler-arrows-exchange text-[20px]' />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={12} className='flex justify-between'>
            <Typography className='font-bold'>Total</Typography>
            <Chip color='success' label={`₹${finalTotal}`} variant='tonal' />
          </Grid>
          <Divider />
          <Grid item xs={12} className='flex justify-between'>
            <Button variant='tonal' color='error' size='small' onClick={() => handleAllReset()}>
              Reset
            </Button>

            {paymentMethod.length <= 0 ? (
              <Button variant='tonal' color='primary' size='small'>
                Select Payment
                <OptionMenu
                  icon='tabler-chevron-down'
                  options={[
                    {
                      text: 'Prepaid',
                      menuItemProps: {
                        onClick: () => handlePaymentMethod('prepaid')
                      }
                    },
                    {
                      text: 'COD',
                      menuItemProps: {
                        onClick: () => handlePaymentMethod('cash_on_delivery')
                      }
                    }
                  ]}
                />
              </Button>
            ) : (
              <Button variant='contained' color='primary' onClick={createOrder} size='small'>
                Create Order
              </Button>
            )}
          </Grid>
        </Grid>

        {/* <div className='flex justify-between'>
          <Button variant='tonal' color='error' onClick={() => handleAllReset()}>
            Reset
          </Button>

          {paymentMethod.length <= 0 ? (
            <Button variant='tonal' color='primary'>
              Select Payment
              <OptionMenu
                icon='tabler-chevron-down'
                options={[
                  {
                    text: 'Prepaid',
                    menuItemProps: {
                      onClick: () => handlePaymentMethod('prepaid')
                    }
                  },
                  {
                    text: 'COD',
                    menuItemProps: {
                      onClick: () => handlePaymentMethod('cod')
                    }
                  }
                ]}
              />
            </Button>
          ) : (
            <Button variant='contained' color='primary' onClick={createOrder}>
              Create Order
            </Button>
          )}
        </div> */}
      </CardContent>
    </Card>
  )
}
