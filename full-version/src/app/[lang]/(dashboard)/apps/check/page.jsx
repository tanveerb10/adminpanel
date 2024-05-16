// 'use client'

// import Grid from '@mui/material/Grid'

// import { usePermissions } from "@/testcontext/PermissionContext.jsx"

// import DistributedBarChartOrder from '@views/dashboards/crm/DistributedBarChartOrder'
// import LineAreaYearlySalesChart from '@views/dashboards/crm/LineAreaYearlySalesChart'
// import CardStatVertical from '@/components/card-statistics/Vertical'
// import BarChartRevenueGrowth from '@views/dashboards/crm/BarChartRevenueGrowth'
// import AuthorizedContent from "@/testcontext/AuthorizedContent"

// export default function Check() {
  
//   const {role} = usePermissions()
// console.log(role);
//       return (
//       <>
//       <p>hello</p>
//         <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['admin']} />
//         <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['support']} /> 
//         <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['manager']} /> 
//         <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['superadmin']} /> 
//         <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['catalog']} /> 
//         <AuthorizedContent allowedRoles={['superadmin','admin']}>
//         <Grid item xs={12} sm={6} md={4} lg={2}>
//             <DistributedBarChartOrder />
//           </Grid>
//         </AuthorizedContent>
//         </>
//       );
//     }

"use client";
import React, { useContext } from 'react';
import AbilityContext from '@/testcontext/AbilityContext';
import { Can } from '@casl/react';

function Check() {
  const ability = useContext(AbilityContext);

  if (!ability) {
    return <div>Loading...</div>; // Or some fallback UI
  }

  return (
    <div>
      <h1>Example Component</h1>
      <Can I="read" a="all" ability={ability}>
        {(allowed) => allowed && <p>This content is readable by everyone.</p>}
      </Can>
      <Can I="manage" a="all" ability={ability}>
        {(allowed) => allowed && <button>Admin Action</button>}
      </Can>
    </div>
  );
}

export default Check;
