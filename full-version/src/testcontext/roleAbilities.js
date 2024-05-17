// roleAbilities.js
import { PureAbility } from '@casl/ability';

const abilitiesJson = {
  admin: [{ action: 'manage', subject: 'all' }],
  support: [{ action: 'read', subject: 'Support' }],
  manager: [{ action: 'read', subject: 'Manager' }],
  catalog: [{ action: 'read', subject: 'Catalog' }],
  superadmin: [{ action: 'manage', subject: 'all' }],
};

export function defineAbilityFor(user) {
  const rules = abilitiesJson[user.role] || abilitiesJson.guest;
  const role = user.role

  console.log(rules);
  console.log(role);
  return new PureAbility(rules);
}
