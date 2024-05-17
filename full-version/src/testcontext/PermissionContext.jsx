'use client'

import { createContext, useContext, useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

const PermissionsContext = createContext({ role: [] }) // for string change

console.log(PermissionsContext)

export const PermissionsProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [role, setRole] = useState([]) // for string change

  if (status === 'loading') {
    ;<p>Loading</p>
  }

  useEffect(() => {
    if (session?.user) {
      setRole(session?.user?.role)
    } else {
      setRole([]) // for string change
    }
  }, [session])

  return <PermissionsContext.Provider value={{ role }}>{children}</PermissionsContext.Provider>
}

export const usePermissions = () => {
  const context = useContext(PermissionsContext)

  if (!context) {
    throw new Error('usePermissions must be used within PermissionsProvider')
  }

  return context
}
