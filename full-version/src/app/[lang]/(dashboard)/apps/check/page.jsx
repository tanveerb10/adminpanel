// Check.jsx
"use client";
import React from 'react';
import { useAbility } from '@/testcontext/AbilityContext';
import { Can } from '@casl/react';

function Check() {
  const { ability, role } = useAbility();
  console.log("role: " ,  role);

  if (!ability) {
    return <div>Loading...</div>; // Or some fallback UI
  }

  return (
    <div>
      <h1>Example Component</h1>
      <p>Role: {role}</p>
      <Can I="dashboard" a="all" ability={ability}>
        {(allowed) => allowed && <p>Dashboard Access</p>}
      </Can>
      <Can I="admin" a="all" ability={ability}>
        {(allowed) => allowed && <button>Admin Action</button>}
      </Can>
      {/* Add more <Can> components as needed for other abilities */}
    </div>
  );
}

export default Check;
