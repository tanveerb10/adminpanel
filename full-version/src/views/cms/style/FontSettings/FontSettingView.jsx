import { Card, CardContent, CardHeader, Chip, Grid, Typography } from '@mui/material'
import React from 'react'

export default function FontSettingView({ getFontData }) {
  console.log(getFontData, 'view')
  return (
    <Grid container spacing={6} className='flex flex-col'>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Font Color' />
          <CardContent>
            {getFontData.colors && Object.keys(getFontData.colors).length > 0 ? (
              <Grid container spacing={6}>
                {Object.entries(getFontData.colors).map(([key, value]) => (
                  <Grid item xs={12} className='flex gap-2' key={key}>
                    <div className='h-8 w-8 rounded-full' style={{ background: value }} />
                    <Typography variant='h5' className='font-semibold'>
                      {key} :
                    </Typography>
                    <Chip label={value} color='primary' variant='outlined' />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Not Available</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Font Family' />
          <CardContent>
            {getFontData.fonts && Object.keys(getFontData.fonts).length > 0 ? (
              <Grid container spacing={6}>
                {Object.entries(getFontData.fonts).map(([key, value]) => (
                  <Grid item xs={12} className='flex gap-2' key={key}>
                    <Typography variant='h5' className='font-semibold'>
                      {key} :
                    </Typography>
                    <Chip label={value} color='primary' variant='outlined' />
                  </Grid>
                ))}{' '}
              </Grid>
            ) : (
              <Typography>Not Available</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Font Size' />
          <CardContent>
            {getFontData.fonts_size && Object.keys(getFontData.fonts_size).length > 0 ? (
              <Grid container spacing={6}>
                {Object.entries(getFontData.fonts_size).map(([key, value]) => (
                  <Grid item xs={12} className='flex gap-2' key={key}>
                    <Typography variant='h5' className='font-semibold'>
                      {key} :
                    </Typography>
                    <Chip label={value} color='primary' variant='outlined' />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>Not Available</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
