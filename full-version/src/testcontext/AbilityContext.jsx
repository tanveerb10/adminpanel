// AbilityContext.js
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { defineAbilityFor } from '@/testcontext/roleAbilities'

const AbilityContext = createContext(null)

export const AbilityProvider = ({ children }) => {
  const { data: session, status } = useSession()
  const [ability, setAbility] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = session.user
      console.log('User:', user) // Debugging log
      console.log('User Role:', user.role) // Debugging log
      console.log('User Ability:', user.ability) // Debugging log
      if (user.role && user.ability) {
        const userAbility = defineAbilityFor(user)
        setAbility(userAbility)
        setRole(user.role)
      } else {
        setAbility(null)
        setRole(null)
      }
    } else if (status === 'unauthenticated') {
      setAbility(null)
      setRole(null)
    }
  }, [session, status])
  const loaderColor = 'sky-300'; // Change this to your desired color class

  if (status === 'loading') {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-opacity-50">
        <div className={`h-8 w-8 animate-spin rounded-full border-4 border-solid ${loaderColor}`}>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  
  
  
  return <AbilityContext.Provider value={{ ability, role }}>{children}</AbilityContext.Provider>
}

export const useAbility = () => {
  const context = useContext(AbilityContext)
  if (!context) {
    throw new Error('useAbility must be used within AbilityProvider')
  }
  return context
}

export default AbilityContext
