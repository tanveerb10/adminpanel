'use client'
import StoriesContainer from '@/views/cms/stories/StoriesContainer'
import { Button, Grid } from '@mui/material'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddStoriesDialog from '@/views/cms/stories/AddStoriesDialog'

export default function Stories({ storiesResponse, fetchStories, categoryData }) {
  const ButtonProps = {
    className: 'cursor-pointer bs-full',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Stories'
  }

  return (
    <Grid container spacing={6}>
      <Grid className='flex justify-between items-center w-full' item xs={12}>
        <AddHeader title='Stories' />

        <OpenDialogOnElementClick
          element={Button}
          elementProps={ButtonProps}
          dialog={AddStoriesDialog}
          dialogProps={{ fetchStories: fetchStories, categoryData: categoryData }}
        />
      </Grid>
      <Grid item xs={12}>
        <StoriesContainer data={storiesResponse} fetchStories={fetchStories} categoryData={categoryData} />
      </Grid>
    </Grid>
  )
}
