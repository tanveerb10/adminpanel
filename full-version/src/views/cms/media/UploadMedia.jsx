import { Button, Grid } from '@mui/material'
import React from 'react'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddMediaDialog from '@/views/cms/media/AddMediaDialog'

export default function UploadMedia({}) {
  return (
    <Grid className='backdrop-blur-[20px] rounded-lg shadow-lg bg-black/15 h-full w-full flex flex-col justify-center items-center'>
      <AddHeader title='No Banner found. Start by adding a new Banner!' />
      <OpenDialogOnElementClick
        element={Button}
        dialog={AddMediaDialog}
        elementProps={{
          variant: 'contained',
          style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333', marginTop: '20px' },
          children: 'Upload Media'
        }}
        dialogProps={{}}
      />
    </Grid>
  )
}
