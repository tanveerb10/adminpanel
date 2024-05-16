'use client'

import Grid from '@mui/material/Grid'

import { usePermissions } from "@/testcontext/PermissionContext.jsx"

import DistributedBarChartOrder from '@views/dashboards/crm/DistributedBarChartOrder'
import LineAreaYearlySalesChart from '@views/dashboards/crm/LineAreaYearlySalesChart'
import CardStatVertical from '@/components/card-statistics/Vertical'
import BarChartRevenueGrowth from '@views/dashboards/crm/BarChartRevenueGrowth'
import AuthorizedContent from "@/testcontext/AuthorizedContent"

export default function Check() {
  
  const {role} = usePermissions()
console.log(role);
      return (
      <>
      <p>hello</p>
        <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['admin']} />
        <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['support']} /> 
        <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['manager']} /> 
        <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['superadmin']} /> 
        <AuthorizedContent children={<p>Top Secret Content {role}!</p>} allowedRoles={['catalog']} /> 
        <AuthorizedContent allowedRoles={['superadmin','admin']}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <DistributedBarChartOrder />
          </Grid>
        </AuthorizedContent>
        </>
      );
    }
