import React from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'

const Adminusers = ({
  userData,
  roleData,
  handleLimitChange,
  handlePageChange,
  totalPages,
  totalAdmin,
  limit,
  currentPage
}) => {
  const tableData = userData.map(admin => ({
    fullName: `${admin.firstname} ${admin.lastname}`,
    email: admin.email,
    role: admin.role.role_name,
    contact: admin.phone,
    city: admin.city,
    status: admin.status ? 'active' : 'inactive',
    avatar: admin.profile_image,
    avatarColor: 'primary',
    id: admin._id
  }))

  const cardData = userData.reduce((acc, curr) => {
    const roleName = curr.role.role_name
    const avatar = curr.profile_image
    const fullName = `${curr.firstname} ${curr.lastname}`
    const role = acc.find(r => r.title === roleName)

    if (role) {
      role.totalUsers++
      role.avatars.push({ avatar, fullName })
    } else {
      acc.push({ title: roleName, totalUsers: 1, avatars: [{ avatar, fullName }] })
    }
    return acc
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards cardData={cardData} />
      </Grid>
      <Grid item xs={12}>
        <UserListTable
          tableData={tableData}
          totalAdmin={totalAdmin}
          roleData={roleData}
          limit={limit}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
      </Grid>
    </Grid>
  )
}

export default Adminusers
