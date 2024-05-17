
"use client";
import React from 'react';
import { useAbility } from '@/testcontext/AbilityContext';
import { Can } from '@casl/react';

function Check() {
 const {ability,role} = useAbility()
 
// console.log("role", role );
console.log("useAbility page",ability);
console.log("role page",role);
  if (!ability) {
    return <div>Loading...</div>; // Or some fallback UI
  }

  return (
    <div>
      <h1>Example Component</h1>
      <p>Role : {role}</p>
      <Can I="manage" a="all" ability={ability}>
        {
        (allowed) => allowed && <p>This content is readable by everyone.</p>
        }
      </Can>
      <Can I="read" a="Manager" ability={ability}>
        {(allowed) => allowed && <button id='999'>manager Action</button>}
      </Can>      
      <Can I="read" a="Catalog" ability={ability}>
        {(allowed) => allowed && <button id='999'>catalog Action</button>}
      </Can>      
    </div>
  );
}

export default Check;
