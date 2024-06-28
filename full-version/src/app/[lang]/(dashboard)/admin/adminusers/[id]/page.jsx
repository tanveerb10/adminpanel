// // Next Imports
// import dynamic from 'next/dynamic'

// // Component Imports
// import AccountSettings from '@views/pages/account-settings'

// const AccountTab = dynamic(() => import('@views/pages/account-settings/account'))
// const SecurityTab = dynamic(() => import('@views/pages/account-settings/security'))
// // const BillingPlansTab = dynamic(() => import('@views/pages/account-settings/billing-plans'))
// const NotificationsTab = dynamic(() => import('@views/pages/account-settings/notifications'))
// // const ConnectionsTab = dynamic(() => import('@views/pages/account-settings/connections'))

// // export default function Page({ params }) {

// // Vars
// const tabContentList = () => ({
//   account: <AccountTab />,
//   security: <SecurityTab />,
// //   'billing-plans': <BillingPlansTab />,
//   notifications: <NotificationsTab />,
// //   connections: <ConnectionsTab />
// })

// const AccountSettingsPage = () => {
//   return <AccountSettings tabContentList={tabContentList()} />
// }

// export default AccountSettingsPage

// //   }

// =======================================================================================================================
'use client'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import dynamic from 'next/dynamic'

// // Component Imports
// import AccountSettings from '@views/pages/account-settings'
import { useAuth } from '@/contexts/AuthContext'

const AccountTab = dynamic(() => import('@/views/admin/adminusers/account-settings/account'))
const SecurityTab = dynamic(() => import('@/views/admin/adminusers/account-settings/security'))
const NotificationsTab = dynamic(() => import('@/views/admin/adminusers/account-settings/notifications'))
const AccountSettings = dynamic(() => import('@views/admin/adminusers/account-settings'))

const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()
const generateTimestamp = () => Date.now().toString()
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

// Function to get data using Fetch API
const viewData = async (setUserData, setRoleData, setError, setLoading) => {
  const secret = process.env.NEXT_PUBLIC_SECRET_KEY
  const token = Cookies.get('accessToken')

  console.log({ token })

  if (!secret) {
    setError('Secret key is not defined')
    setLoading(false)
    return
  }

  if (!token) {
    setError('Token is not defined')
    setLoading(false)
    return
  }

  const payloaddata = JSON.stringify({})
  const nonce = generateNonce()
  const timestamp = generateTimestamp()
  const signature = generateSignature(payloaddata, secret, nonce, timestamp)

  try {
    const [userResponse, roleResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'livein-key': 'livein-key',
          Nonce: nonce,
          Timestamp: timestamp,
          Signature: signature,
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
        //   credentials: 'include',
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles`, {
        method: 'GET',
        headers: {
          'Livein-key': 'Livein-key',
          'Content-Type': 'application/json',
          Nonce: nonce,
          Timestamp: timestamp,
          Signature: signature,
          Authorization: `Bearer ${token}`
        }
      })
    ])

    if (!userResponse.ok || !roleResponse.ok) {
      throw new Error(`Failed to fetch data, status: ${userResponse.status}, ${roleResponse.status}`)
    }

    const [userData, roleData] = await Promise.all([userResponse.json(), roleResponse.json()])
    setUserData(userData)
    setRoleData(roleData)
  } catch (error) {
    console.error('Error fetching data:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

const page = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [roleData, setRoleData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { role } = useAuth()

  useEffect(() => {
    viewData(setUserData, setRoleData, setError, setLoading)
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (role !== 'superadmin') {
    return <div>you are not super admin</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!userData || !userData.allAdmin) {
    return <div>No data available</div>
  }

  // if (id === 'addadminuser') {
  //   const tabContentList = {
  //     account: <AccountTab isAddAdmin={true} />
  //   }

  //   return (
  //     <>
  //       <AccountSettings tabContentList={tabContentList} isAddAdmin={true} />
  //     </>
  //   )
  // }

  // if (id === 'addadminuser') {
  //   const tabContentList = {
  //     account: <AccountTab isAddAdmin={true} />
  //   }
  
  //   return (
  //     <>
  //       <AccountSettings tabContentList={tabContentList} isAddAdmin={true} />
  //     </>
  //   )
  // }
  
  // const existAdminDetail = userData.allAdmin.find(admin => admin._id === id)
  // console.log({ existAdminDetail })

  // if (!existAdminDetail) {
  //   setTimeout(()=> router.push('/'),3000)
  //   return <div>wait you are going to redirect...</div>
  // }

  // const tabContentList = () => ({
  //   account: <AccountTab adminDetail={existAdminDetail} roleData={roleData} />,
  //   security: <SecurityTab />,
  //   notifications: <NotificationsTab />
  // })

  // return (
  //   <>
  //     <AccountSettings tabContentList={tabContentList} />
  //   </>
  // )

  if (id === 'addadminuser') {
    const tabContentList = {
      account: <AccountTab isAddAdmin={true} roleData={roleData}/>
    }
  
    return (
      <>
        <AccountSettings tabContentList={tabContentList} isAddAdmin={true} />
      </>
    )
  } else {
    const existAdminDetail = userData.allAdmin.find(admin => admin._id === id)
    if (!existAdminDetail) {
      setTimeout(()=>router.push('/'),3000)
      return <div>wait you are going to redirect...</div>
    }
  
    const tabContentList = {
      account: <AccountTab adminDetail={existAdminDetail} roleData={roleData} />,
      security: <SecurityTab />,
      notifications: <NotificationsTab />
    }
  
    return (
      <>
        <AccountSettings tabContentList={tabContentList} />
      </>
    )
  }
  
}

export default page
