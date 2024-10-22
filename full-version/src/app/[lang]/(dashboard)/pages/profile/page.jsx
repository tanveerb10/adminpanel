'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import fetchFormData from '@/utils/fetchFormData'
import Loader from '@/libs/components/Loader'

const AccountTab = dynamic(() => import('@/views/admin/adminusers/account-settings/account'))
const SecurityTab = dynamic(() => import('@/views/admin/adminusers/account-settings/security'))
const AccountSettings = dynamic(() => import('@views/admin/adminusers/account-settings'))

const viewData = async (setUserData, setError, setLoading) => {
  try {
    const userResponse = await fetchFormData(`/admin/admins/Getselfdetails`, 'GET')

    setUserData(userResponse)
  } catch (error) {
    console.error('Error fetching data:', error)
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

const ProfilePage = () => {
  const { userId, role } = useAuth()
  const isSuperadmin = role === 'superadmin'

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      viewData(setUserData, setError, setLoading, userId)
    }
  }, [userId])

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  if (!userData || !userData.admin) {
    return <div>No data available</div>
  }
  // if (!userId || !isSuperadmin) {
  //   return <div>You are not allowed</div>
  // }
  const isProfile = isSuperadmin ? false : true
  const onlyViewProfile = 'true'
  const tabContentList = {
    account: <AccountTab adminDetail={userData.admin} isProfile={isProfile} onlyViewProfile={onlyViewProfile} />,
    security: <SecurityTab />
  }

  // console.log('exist user', existAdminDetail)
  console.log('user data', userData)
  return (
    <>
      <AccountSettings tabContentList={tabContentList} />
    </>
  )
}

export default ProfilePage
