import { useAbility } from '@/testcontext/AbilityContext'

export const hasAbility = requiredAbility => {
    const { ability } = useAbility()
    if (ability) {
      return ability.can(requiredAbility, 'all')
    }
    return false
  }
