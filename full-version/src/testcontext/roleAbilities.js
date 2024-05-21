// roleAbilities.js
import { PureAbility } from '@casl/ability';

export function defineAbilityFor(user) {
  if (!user?.ability) {
    return new PureAbility([]); // Return an empty ability if user.ability is undefined
  }

  const rules = user.ability.map(action => ({ action, subject: 'all' }));
  console.log('Rules:', rules);
  return new PureAbility(rules);
}
