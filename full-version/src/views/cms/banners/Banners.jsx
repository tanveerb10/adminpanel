'use client'
import BannerContainer from '@/views/cms/banners/BannerContainer'
import { Button, Grid } from '@mui/material'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddBannerDialog from '@/views/cms/banners/AddBannerDialog'

export default function Banners({ bannerResponse, fetchBanner }) {
  const ButtonProps = {
    className: 'cursor-pointer bs-full',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Banners'
  }

  return (
    <Grid container spacing={6}>
      <Grid className='flex justify-between items-center w-full' item xs={12}>
        <AddHeader title='Banners' />

        <OpenDialogOnElementClick
          element={Button}
          elementProps={ButtonProps}
          dialog={AddBannerDialog}
          dialogProps={{ fetchBanner: fetchBanner }}
        />
      </Grid>
      <Grid item xs={12}>
        <BannerContainer data={bannerResponse} fetchBanner={fetchBanner} />
      </Grid>
    </Grid>
  )
}
