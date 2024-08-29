'use client'
import React, { useState } from 'react'
import { Grid, Card, Typography, CardContent, IconButton, Button, MenuItem, CardActions, Menu } from '@mui/material'

export default function CardComponent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={5} className='flex items-center justify-center'>
          <CardContent className='flex items-center justify-center'>
            <img alt='iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' height={175} />
          </CardContent>
        </Grid>
        <Grid item xs={12} md={7} className='md:border-is border-bs md:border-bs-0'>
          <CardContent>
            <Typography variant='h4' className='mbe-2'>
              Title
            </Typography>
            <Typography className='mbe-2' color='text.secondary'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quidem corrupti error repellat deserunt
              repudiandae omnis, tempora enim cupiditate nostrum autem dolore magnam amet dolorem
            </Typography>
          </CardContent>
          <CardActions className='justify-between card-actions-dense'>
            <Button startIcon={<i className='tabler-edit text-[22px]' />}>Edit</Button>
            <Button color='error' startIcon={<i className='tabler-trash text-[18px]' />}>
              Delete
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}
