// AbilityContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { defineAbilityFor } from '@/testcontext/roleAbilities';

const AbilityContext = createContext(null);

export const AbilityProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [ability, setAbility] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = session.user;
      console.log("User:", user); // Debugging log
      console.log("User Role:", user.role); // Debugging log
    console.log("User Ability:", user.ability); // Debugging log
    if (user.role && user.ability) {
      const userAbility = defineAbilityFor(user);
      setAbility(userAbility);
      setRole(user.role);
    } else {
      setAbility(null);
      setRole(null);
    }
  } else if (status === 'unauthenticated') {
    setAbility(null);
    setRole(null);
  }
}, [session, status]);
  if (status === 'loading') {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <AbilityContext.Provider value={{ ability, role }}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within AbilityProvider');
  }
  return context;
};

export default AbilityContext;
