import { useAuth } from '@/contexts/AuthContext'

export const hasAbility = requiredAbility => {
  const { ability } = useAuth()
  if (ability) {
    return ability.can(requiredAbility, 'all')
  }
  return false
}
