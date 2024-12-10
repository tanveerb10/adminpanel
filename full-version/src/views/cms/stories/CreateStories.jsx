import { Button, Grid } from '@mui/material'
import React from 'react'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddStoriesDialog from '@/views/cms/stories/AddStoriesDialog'

export default function CreateStories({ fetchStories, categoryData }) {
  return (
    <Grid className='backdrop-blur-[20px] rounded-lg shadow-lg bg-black/15 h-full w-full flex flex-col justify-center items-center'>
      <AddHeader title='No Stories found. Start by adding a new Stories!' />
      <OpenDialogOnElementClick
        element={Button}
        dialog={AddStoriesDialog}
        elementProps={{
          variant: 'contained',
          style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333', marginTop: '20px' },
          children: 'Create Stories'
        }}
        dialogProps={{ fetchStories: fetchStories, categoryData: categoryData }}
      />
    </Grid>
  )
}
