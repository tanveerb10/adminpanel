'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { defineAbilityFor } from '@/contexts/roleAbilities'

const AuthContext = createContext({ role: '', ability: null, email: '', userId: '' })

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    role: '',
    email: '',
    userId: ''
  })

  const [ability, setAbility] = useState(null)

  const updateUserDetails = update => {
    setUserDetails(prev => ({
      ...prev,
      ...update
    }))
  }

  useEffect(() => {
    const token = Cookies.get('accessToken')
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken, 'am three')

        const { role, email, userId } = decodedToken
        const userAbility = defineAbilityFor(decodedToken)

        updateUserDetails({ role, email, userId })
        setAbility(userAbility)
      } catch (error) {
        console.error('Failed to decode token:', error)
        updateUserDetails({ role: '', email: '', userId: '' })
        setAbility(null)
      }
    } else {
      updateUserDetails({ role: '', email: '', userId: '' })
      setAbility(null)
    }
  }, [])

  return <AuthContext.Provider value={{ ...userDetails, ability }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
