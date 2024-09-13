'use client'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import fetchFormData from '@/utils/fetchFormData'

// // Component Imports
// import AccountSettings from '@views/pages/account-settings'
import { useAuth } from '@/contexts/AuthContext'

const AccountTab = dynamic(() => import('@/views/admin/adminusers/account-settings/account'))
const SecurityTab = dynamic(() => import('@/views/admin/adminusers/account-settings/security'))
const NotificationsTab = dynamic(() => import('@/views/admin/adminusers/account-settings/notifications'))
const AccountSettings = dynamic(() => import('@views/admin/adminusers/account-settings'))

// Function to get data using Fetch API
const viewData = async (setUserData, setRoleData, setError, setLoading) => {
  try {
    const [userResponse, roleResponse] = await Promise.all([
      fetchFormData(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/admins`, 'GET'),
      fetchFormData(`${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles`, 'GET')
    ])

    // const [userData, roleData] = await Promise.all([userResponse.json(), roleResponse.json()])
    setUserData(userResponse)
    setRoleData(roleResponse)
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
  }, [viewData])

  if (loading) {
    return <div>Loading...</div>
  }
  const roles = {
    SUPERADMIN: 'superadmin'
  }
  if (role !== roles.SUPERADMIN) {
    return <div>You are not a super admin</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  if (!userData || !userData.allAdmin) {
    return <div>No data available</div>
  }
  if (id === 'addadminuser') {
    const tabContentList = {
      account: <AccountTab isAddAdmin={true} roleData={roleData} />
    }

    return (
      <>
        <AccountSettings tabContentList={tabContentList} isAddAdmin={true} />
      </>
    )
  } else {
    const existAdminDetail = userData.allAdmin.find(admin => admin._id === id)
    if (!existAdminDetail) {
      router.replace('/')
      return <div>Redirecting...</div>
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
