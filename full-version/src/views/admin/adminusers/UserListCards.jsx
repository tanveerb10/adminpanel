'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Chip } from '@mui/material'
import { useCallback } from 'react'

const UserListCards = ({ cardData }) => {
  console.log({ cardData })
  // Vars
  if (!cardData || cardData.length === 0) {
    return <Typography>No users available</Typography>
  }
  const getAvatar = useCallback(params => {
    const { avatar, fullName } = params
    console.log('avatar', avatar, 'full name', fullName)
    console.log(params)
    if (avatar) {
      return <CustomAvatar src={avatar} skin='light' size={34} />
    } else {
      return (
        <CustomAvatar skin='light' size={34}>
          {getInitials(fullName)}
        </CustomAvatar>
      )
    }
  }, [])

  return (
    <Grid container spacing={6}>
      {cardData.map(({ totalUsers, avatars, title, fullName }, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Card>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography className='flex-grow'>{`Total users : ${totalUsers}`}</Typography>
                <AvatarGroup total={totalUsers}>
                  {avatars.map((img, index) => (
                    <Avatar key={index} alt={img.fullName} src={`/images/avatars/${img}`} />
                  ))}
                </AvatarGroup>
              </div>
              <div className='flex justify-between items-center'>
                <Chip variant='tonal' label={title} color='primary' size='medium' className=' capitalize' />
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
