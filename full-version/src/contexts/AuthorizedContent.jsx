import { useAuth } from '@/contexts/AuthContext'

export default function AuthorizedContent({ children, allowedRoles }) {
  const { role } = useAuth()
  const isAuthorized = allowedRoles.includes(role)
  return isAuthorized ? children : null
}

