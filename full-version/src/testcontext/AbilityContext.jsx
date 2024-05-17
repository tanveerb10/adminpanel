// AbilityContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { defineAbilityFor } from '@/testcontext/roleAbilities';

const AbilityContext = createContext(null);

export const AbilityProvider = ({ children }) => {
  const { data: session, status } = useSession();
  // console.log(session);
  const [ability, setAbility] = useState(null);
  const [role, setRole] = useState(null)
  useEffect(() => {
    console.log("Ability:", ability);
    console.log("Role:", role);
    if (status === 'authenticated' && session?.user) {
      const userRole = session?.user?.role ;
      console.log("user",userRole);
      if (userRole) {
        const user = { role: userRole };
        const userAbility = defineAbilityFor(user);
        setAbility(userAbility);
        setRole(userRole);
      }else {
        setAbility(null)
        setRole(null)
      }
    }else if (status === 'unauthenticated') {
        setAbility(null);
        setRole(null);
      }
    }, [session, status]);


 
  if (status === 'loading') {
    return <div>Loading...</div>; // Or some loading spinner
  }
console.log("ability",ability);
  return (
    <AbilityContext.Provider value={{ability, role}}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => {
  const context = useContext(AbilityContext);
  console.log("context",context);
  if (!context) {
    throw new Error('useAbility must be used within AbilityProvider');
  }
  return context;
};

export default AbilityContext