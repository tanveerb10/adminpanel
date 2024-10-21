'use client'
import { useEffect, useState } from 'react'
import CustomerAddressForm from '@/views/customers/allcustomers/customerAddress/CustomerAddressForm'
import fetchData from '@/utils/fetchData'
import { useParams } from 'next/navigation'
import Loader from '@/libs/components/Loader'
import CustomerAddressCards from '@/views/customers/allcustomers/customerAddress/CustomerAddressCards'
import { Button, Grid } from '@mui/material'
import AddHeader from '@/libs/components/AddHeader'
export default function CustomerAddressToggleParent({ id }) {
  const [customerAddressData, setCustomerAddressData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectAddress, setSelectAddress] = useState(null)
  const [isAddAddressFlag, setIsAddAddressFlag] = useState(false)
  //   const { id } = useParams()
  const fetchIndividualAddress = async () => {
    try {
      setLoading(true)
      const url = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/customers/getcustomeraddresses/${id}`
      const responseData = await fetchData(url, 'GET')
      if (responseData.success) {
        setCustomerAddressData(responseData)
      } else {
        setError('Error in fetching')
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = address => {
    console.log('address of single customer for form', address)
    setIsFormVisible(!isFormVisible)
    setSelectAddress(address)
  }

  useEffect(() => {
    fetchIndividualAddress()
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }
  if (error) {
    return <div>No data available</div>
  }

  const handleAddCustomerAddressToggle = () => {
    setIsFormVisible(!isFormVisible)
    setIsAddAddressFlag(true)
  }
  return (
    <>
      {!isFormVisible ? (
        <>
          <Grid className='flex justify-between'>
            <AddHeader title='All Customer Address' />
            <Button onClick={handleAddCustomerAddressToggle} variant='tonal'>
              Add Address
            </Button>
          </Grid>
          <CustomerAddressCards handleToggle={handleToggle} addressData={customerAddressData} />
        </>
      ) : (
        <CustomerAddressForm
          selectAddress={selectAddress}
          handleToggle={handleToggle}
          fetchIndividualAddress={fetchIndividualAddress}
          isAddAddress={isAddAddressFlag ? true : null}
          id={id}
        />
      )}
    </>
  )
}
