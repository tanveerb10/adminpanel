'use client'
import { useEffect, useState } from 'react'
import CustomerAddressForm from '@/views/customers/allcustomers/customerAddress/CustomerAddressForm'
import { useAuth } from '@/contexts/AuthContext'
import fetchData from '@/utils/fetchData'
import { useParams, useRouter } from 'next/navigation'
import Loader from '@/libs/components/Loader'
import CustomerAddressCards from '@/views/customers/allcustomers/customerAddress/CustomerAddressCards'
import { Button, Grid } from '@mui/material'
import AddHeader from '@/libs/components/AddHeader'
export default function page() {
  const [customerAddressData, setCustomerAddressData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectAddress, setSelectAddress] = useState(null)
  const [isAddAddressFlag, setIsAddAddressFlag] = useState(false)
  const { id } = useParams()
  const { role } = useAuth()
  const router = useRouter()
  console.log(id)

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
    if (id !== 'addnewcustomeraddress') {
      fetchIndividualAddress()
    }
  }, [id])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  //   if (role !== 'superadmin') {
  //     setTimeout(() => router.push('/'), 3000)
  //     return <div>wait you are going to redirect because you are not super admin...</div>
  //   }

  if (error) {
    return <div>No data available</div>
  }

  console.log('getindiavidaul', customerAddressData)

  const handleAddCustomerAddressToggle = () => {
    setIsFormVisible(!isFormVisible)
    setIsAddAddressFlag(true)
  }

  // const customerId = customerAddressData.customer_address
  return (
    <>
      {!isFormVisible ? (
        <>
          <Grid>
            <AddHeader title='All Customer Address' />
            <Button onClick={handleAddCustomerAddressToggle}>Add Customer</Button>
          </Grid>
          <CustomerAddressCards handleToggle={handleToggle} addressData={customerAddressData} />
        </>
      ) : (
        <CustomerAddressForm
          selectAddress={selectAddress}
          handleToggle={handleToggle}
          fetchIndividualAddress={fetchIndividualAddress}
          isAddAddress={isAddAddressFlag ? true : null}
        />
      )}
    </>
  )
}
