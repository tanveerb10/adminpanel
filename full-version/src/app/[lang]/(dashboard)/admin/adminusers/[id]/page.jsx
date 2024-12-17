'use client'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import fetchData from '@/utils/fetchData'

// // Component Imports
import { useAuth } from '@/contexts/AuthContext'
import Loader from '@/libs/components/Loader'

const AccountTab = dynamic(() => import('@/views/admin/adminusers/account-settings/account'), { ssr: false })
const SecurityTab = dynamic(() => import('@/views/admin/adminusers/account-settings/security'), { ssr: false })
const AccountSettings = dynamic(() => import('@views/admin/adminusers/account-settings'), { ssr: false })

// Function to get data using Fetch API
const viewData = async (setUserData, setRoleData, setError, setLoading, id) => {
  try {
    setLoading(true)
    const roleResponse = await fetchData(`/admin/roles/allroles`, 'GET')
    setRoleData(roleResponse)
    if (id !== 'addadminuser') {
      const userResponse = await fetchData(`/admin/admins/getadmin/${id}`, 'GET')
      if (!userResponse || !userResponse.admin) {
        throw new Error('User not found or invalid ID')
      }
      setUserData(userResponse)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    if (error.message.includes('User not found')) {
      setError('The user ID is invalid or the user does not exist.')
    } else {
      setError('Failed to load data. Please try again.')
    }
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
  const { role } = useAuth()

  useEffect(() => {
    viewData(setUserData, setRoleData, setError, setLoading, id)
  }, [id])

  if (loading) return <Loader />

  if (role !== 'superadmin') return <div>You are not a super admin</div>

  if (error) return <div>Error: {error}</div>

  const isAddAdmin = id === 'addadminuser'
  if (!userData && !isAddAdmin) {
    return <div>No user data available</div>
  }

  const tabContentList = {
    account: <AccountTab adminDetail={userData?.admin} roleData={roleData} isAddAdmin={isAddAdmin} />,
    // ...(isAddAdmin ? {} : { security: <SecurityTab adminId={userData?.admin?._id} isSuperAdmin={true} /> })
    security: <SecurityTab adminId={userData?.admin?._id} isSuperAdmin={true} />
  }

  return (
    <>
      <AccountSettings tabContentList={tabContentList} isAddAdmin={isAddAdmin} />
    </>
  )

  // } else {
  // const existAdminDetail = userData.admin

  // if (!existAdminDetail) {
  //   router.replace('/')
  //   return <div>Redirecting...</div>
  // }
}
// }

export default page
