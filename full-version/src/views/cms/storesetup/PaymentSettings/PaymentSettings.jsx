'use client'
import { useState, useEffect } from 'react'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import PaymentContainer from '@/views/cms/storesetup/PaymentSettings/PaymentContainer'
import CreatePayment from '@/views/cms/storesetup/PaymentSettings/CreatePayment'
import { Button } from '@mui/material'
export default function PaymentSettings() {
  const [getPaymentData, setGetPaymentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [gatewayList, setGatewayList] = useState([])

  const paymentApi = async () => {
    try {
      setLoading(true)
      const paymentSettingURL = `/admin/cms/getAllPaymentSettings`

      const responseData = await fetchData(paymentSettingURL, 'GET')
      if (responseData.success) {
        setGetPaymentData(responseData.data)
        const gateway = responseData.data.map(item => item.payment_gateway)
        // console.log('gateway payment', gateway)
        // console.log('gate')
        setGatewayList(gateway)
      }
      if (!responseData.success) {
        throw new Error(responseData.message || 'Error occurred during Getting data')
      }
    } catch (err) {
      setError(err || 'Error Get')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    paymentApi()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div>
        <p>{error || 'An error occured'}</p>
        <Button onClick={paymentApi} variant='contained'>
          Retry
        </Button>
      </div>
    )
  }

  // useEffect(() => {
  //   console.log('gateway', getPaymentData)
  // }, [getPaymentData])
  // const gateway = getPaymentData.map(item => item?.payment_gateway)
  return (
    <>
      {getPaymentData.length > 0 ? (
        <PaymentContainer getPaymentData={getPaymentData} paymentApi={paymentApi} gatewayList={gatewayList} />
      ) : (
        <CreatePayment paymentApi={paymentApi} isAddPayment={true} gatewayList={gatewayList} />
      )}
    </>
  )
}
