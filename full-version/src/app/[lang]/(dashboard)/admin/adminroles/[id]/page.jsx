'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import fetchData from '@/utils/fetchData'
import RoleEditDialog from '@views/admin/adminroles/RoleEditDialog'
import { useParams, useRouter } from 'next/navigation'

export default function page() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [getRoleData, setGetRoleData] = useState({})
  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    setLoading(true)
    const singleRoleApi = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/roles/${id}`
    const callRoleApi = async () => {
      try {
        const response = await fetchData(singleRoleApi, 'GET')
        if (!response.success) {
          throw new Error(`Failed to fetch Role Data, status: ${response.message} ${response.status}`)
        }

        console.log('Role get single:', response)
        setGetRoleData(response)
      } catch (err) {
        setError(err)
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }
    callRoleApi()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  } else if (role !== 'superadmin') {
    router.push('/')
    return <div>Wait you are going to redirect because you are not super admin...</div>
  } else if (error) {
    return <div>Error fetching data: {error.message}</div>
  } else if (Object.keys(getRoleData).length === 0) {
    return <div>No data available</div>
  }

  return (
    <div>
      <RoleEditDialog roleData={getRoleData} id={id} />
    </div>
  )
}
