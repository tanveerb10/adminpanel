import { Button, Grid } from '@mui/material'
import React from 'react'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddSearchDialog from '@/views/cms/storesetup/SearchSettings/AddSearchDialog'

export default function CreateSearch({ fetchSearch }) {
  return (
    <Grid className='backdrop-blur-[20px] rounded-lg shadow-lg bg-black/15 h-full w-full flex flex-col justify-center items-center'>
      <AddHeader title='No Search found. Start by adding a new Search!' />
      <OpenDialogOnElementClick
        element={Button}
        dialog={AddSearchDialog}
        elementProps={{
          variant: 'contained',
          style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333', marginTop: '20px' },
          children: 'Create Search'
        }}
        dialogProps={{ fetchSearch: fetchSearch }}
      />
    </Grid>
  )
}
