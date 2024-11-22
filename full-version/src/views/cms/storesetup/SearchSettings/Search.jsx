'use client'
import SearchContainer from '@/views/cms/storesetup/SearchSettings/SearchContainer'
import { Button, Grid } from '@mui/material'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddSearchDialog from '@/views/cms/storesetup/SearchSettings/AddSearchDialog'

export default function Search({ response, fetchSearch }) {
  const ButtonProps = {
    className: 'cursor-pointer bs-full',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Search'
  }

  return (
    <Grid container spacing={6}>
      <Grid className='flex justify-between items-center w-full' item xs={12}>
        <AddHeader title='Search' />

        <OpenDialogOnElementClick
          element={Button}
          elementProps={ButtonProps}
          dialog={AddSearchDialog}
          dialogProps={{ fetchSearch: fetchSearch }}
        />
      </Grid>
      <Grid item xs={12}>
        <SearchContainer data={response} fetchSearch={fetchSearch} />
      </Grid>
    </Grid>
  )
}
