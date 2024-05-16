// JSON OBJECT

// abilities.js
import { PureAbility } from '@casl/ability';

const abilitiesJson = {
  admin: [{ action: 'manage', subject: 'all' }],
  user: [{ action: 'read', subject: 'all' }],
  guest: [{ action: 'read', subject: 'Post' }]
};

// Simulate fetching user data (replace with your actual logic)
export function getUser() {
  return {
    id: 1,
    name: 'John Doe',
    admin: false // Change this to false for non-admin user
  };
}

export function defineAbilityFor(user) {
  let rules;

  if (user?.admin) { // Safely access the admin property
    rules = abilitiesJson.admin;
  } else {
    rules = abilitiesJson.user;
  }

  // Create an Ability instance using the rules
  return new PureAbility(rules);
}
