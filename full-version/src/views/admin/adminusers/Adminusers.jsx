import React from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'

const Adminusers = ({userData}) => {
  const tableData = userData.allAdmin.map(admin => ({
    fullName: `${admin.firstname} ${admin.lastname}`,
    email: admin.email,
    role: admin.role.role_name,
    contact: admin.phone,
    city: admin.city,
    status: admin.status ? 'active' : 'inactive',
    avatar: admin.profile_image,
    avatarColor: 'primary' // You can set avatar color based on any logic if required
  }))
  console.log(tableData)

  console.log({ userData })

  const totalAdmin = userData.adminsCount


  return (
    <Grid container spacing={6}>
    <Grid item xs={12}>
      <UserListTable tableData={tableData} totalAdmin={totalAdmin} />
    </Grid>
  </Grid>
  )
}

export default Adminusers