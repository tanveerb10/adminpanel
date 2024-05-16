// JSON OBJECT

// AbilityContext.js
"use client";
import React, { createContext, useState, useEffect } from 'react';
import { defineAbilityFor, getUser } from '@/testcontext/roleAbilities';

const AbilityContext = createContext(null);

export function AbilityProvider({ children }) {
  const [ability, setAbility] = useState(null);

  useEffect(() => {
    const user = getUser();
    const ability = defineAbilityFor(user);
    setAbility(ability);
  }, []);

  if (!ability) {
    return <div>Loading...</div>; // Or some loading spinner
  }

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

export default AbilityContext;
