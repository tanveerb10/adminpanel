import React from 'react'
// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import RolesTable from './RolesTable'

const Adminroles = ({ roleData }) => {
  const tableData = roleData.allRole.map(role => ({
    id: role.role_id,
    name: role.role_name,
    status: role.status ? 'active' : 'inactive',
    roleId: role._id,
    abilityCount: role.ability.length
  }))
  const totalRole = roleData.roleCount

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Roles List
        </Typography>
        <Typography>
          A role provided access to predefined menus and features so that depending on assigned role an administrator
          can have access to what he need.Find all company&#39;s administrator roles.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RolesTable tableData={tableData} totalRole={totalRole} roleData={roleData} />
      </Grid>
    </Grid>
  )
}

export default Adminroles
