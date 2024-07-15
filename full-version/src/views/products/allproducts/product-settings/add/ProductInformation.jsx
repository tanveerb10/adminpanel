'use client'

// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'

import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'

const ProductInformation = () => {

  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField fullWidth label='Product Title' placeholder='Product name' />
          </Grid>
        </Grid>
        <Typography className='mbe-1'>Description</Typography>
        <Card className='p-0 border shadow-none'>
          <CardContent className='p-0'>
            <AppReactDraftWysiwyg/>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
