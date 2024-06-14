'use client'

import { useAuth } from "@/contexts/AuthContext";

const Customizer = () => {
  const { role, ability } = useAuth()

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Roles: {role}</p>
      <p>Abilities: {ability?.rules ? ability.rules.map(rule => rule.action).join(', ') : ''}</p>
   
    </div>
  )
}

export default Customizer
