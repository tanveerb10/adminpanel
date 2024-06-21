import React from 'react'
// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import RolesTable from './RolesTable'
import RoleCards from './RoleCards'

const Adminroles = ({ userData, roleData }) => {
  // Transform the data
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

  const cardData = userData.allAdmin.reduce((acc, curr) => {
    const roleName = curr.role.role_name
    const avatar = curr.profile_image

    const role = acc.find(r => r.title === roleName)

    if (role) {
      role.totalUsers++
      role.avatars.push(avatar)
    } else {
      acc.push({ title: roleName, totalUsers: 1, avatars: [avatar] })
    }
    return acc
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Roles List
        </Typography>
        <Typography>
          A role provided access to predefined menus and features so that depending on assigned role an administrator
          can have access to what he need
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RoleCards cardData={cardData}/>
      </Grid>
      <Grid item xs={12} className='!pbs-12'>
        <Typography variant='h4' className='mbe-1'>
          Total users with their roles
        </Typography>
        <Typography>Find all company&#39;s administrator accounts and their associate roles.</Typography>
      </Grid>
      <Grid item xs={12}>
        <RolesTable tableData={tableData} totalAdmin={totalAdmin} roleData={roleData}/>
      </Grid>
    </Grid>
  )
}

export default Adminroles
