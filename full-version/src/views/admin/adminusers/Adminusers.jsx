import React from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'

const Adminusers = ({ userData, roleData }) => {
  const tableData = userData.allAdmin.map(admin => ({
    fullName: `${admin.firstname} ${admin.lastname}`,
    email: admin.email,
    role: admin.role.role_name,
    contact: admin.phone,
    city: admin.city,
    status: admin.status ? 'active' : 'inactive',
    avatar: admin.profile_image,
    avatarColor: 'primary', // You can set avatar color based on any logic if required
    id : admin._id
  }))
  const totalAdmin = userData.adminsCount
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={tableData} totalAdmin={totalAdmin} roleData={roleData} />
      </Grid>
    </Grid>
  )
}

export default Adminusers
