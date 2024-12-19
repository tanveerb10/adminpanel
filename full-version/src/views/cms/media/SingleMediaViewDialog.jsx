import { useEffect, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Card, CardContent, CardHeader, Chip, Grid, IconButton, Typography } from '@mui/material'
import Image from 'next/image'

const SingleMediaViewDialog = ({
  name,
  downloadLink,
  position,
  status,
  type,
  height,
  width,
  size,
  date,
  copyToClipboard
}) => {
  const InformationObject = {
    name: name,
    position: position,
    status: status ? 'enable' : 'disable',
    type: type,
    height: height,
    width: width,
    size: size,
    date: date
  }
  // States
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)
  const [switchComponent, setSwitchComponent] = useState(false)
  const [screenSize, setScreenSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const toggleComponent = () => {
    setSwitchComponent(!switchComponent)
  }
  console.log(screenSize)
  return (
    <>
      <IconButton variant='outlined' onClick={handleClickOpen}>
        <i className='tabler-eye text-[22px] text-textSecondary' />
      </IconButton>
      <Dialog
        fullScreen
        onClose={handleClose}
        aria-labelledby='full-screen-dialog-title'
        className='bg-black'
        open={open}
      >
        <DialogTitle id='alert-dialog-title' className='flex justify-between p-3 bg-black'>
          {screenSize <= 768 ? (
            <div
              className='sm:block md:hidden lg:hidden cursor-pointer hover:text-twitter gap-1'
              onClick={toggleComponent}
            >
              {switchComponent ? 'Information' : 'Media'}
              <i className='tabler-arrows-exchange text-[20px]' />
              {switchComponent ? 'Media' : 'Information'}
            </div>
          ) : (
            <div className='hidden md:block lg:block' />
          )}

          <div className='bg-backdrop rounded-md p-2'>
            <Typography className='font-bold' variant='h6'>
              {name}
            </Typography>
          </div>

          <IconButton className=' flex items-center gap-1' onClick={handleClose}>
            <Typography variant='body1'>Exit</Typography>
            <i className='tabler-logout text-[18px] text-textSecondary' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='p-0 m-0 bg-black'>
          <Grid container spacing={6} className='h-full w-full'>
            {screenSize <= 768 ? (
              <Grid item xs={12}>
                {switchComponent ? (
                  <Card className='bg-backdrop h-full w-full'>
                    <CardHeader title='Media Information' className='underline' />
                    <CardContent>
                      <Grid container spacing={6}>
                        {Object.entries(InformationObject).map(([key, value]) => (
                          <Grid item xs={12} className='flex gap-2 justify-between items-center'>
                            <Typography variant='body2' className='font-semibold uppercase'>
                              {key} :
                            </Typography>
                            <Chip label={value} size='large' color='secondary' variant='tonal' />
                          </Grid>
                        ))}
                        <Grid item xs={12} className='flex flex-col gap-2 justify-between items-center'>
                          <Typography variant='h6' className='font-semibold underline'>
                            Download Link
                          </Typography>
                          <div
                            className='font-semibold text-pretty bg-gray-900 rounded p-2 cursor-pointer text-xs hover:text-linkedin'
                            style={{
                              display: 'block',
                              maxWidth: '100%',
                              overflow: 'hidden',
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              wordWrap: 'break-word'
                            }}
                            onClick={() => copyToClipboard(downloadLink)}
                          >
                            {downloadLink}
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ) : (
                  <div className='bg-backdrop h-full w-full flex items-center justify-center'>
                    <Image
                      height={500}
                      width={500}
                      className='rounded object-contain max-w-full max-h-full'
                      layout='intrinsic'
                      src={downloadLink || '/images/avatars/1.png'}
                      alt={name}
                    />
                  </div>
                )}
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={6} className='h-full w-full'>
                  <div className='bg-backdrop h-full w-full flex items-center justify-center'>
                    <Image
                      height={500}
                      width={500}
                      className='rounded object-contain max-w-full max-h-full'
                      layout='intrinsic'
                      src={downloadLink || '/images/avatars/1.png'}
                      alt={name}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} className='h-full w-full'>
                  <Card className='bg-backdrop h-full w-full'>
                    <CardHeader title='Media Information' className='underline' />
                    <CardContent>
                      <Grid container spacing={6}>
                        {Object.entries(InformationObject).map(([key, value]) => (
                          <Grid item xs={12} className='flex gap-2 justify-between items-center'>
                            <Typography variant='body2' className='font-semibold uppercase'>
                              {key} :
                            </Typography>
                            <Chip label={value} size='large' color='secondary' variant='tonal' />
                          </Grid>
                        ))}
                        <Grid item xs={12} className='flex flex-col gap-2 justify-between items-center'>
                          <Typography variant='h6' className='font-semibold underline'>
                            Download Link
                          </Typography>
                          <div
                            className='font-semibold text-pretty bg-gray-900 rounded p-2 cursor-pointer text-xs hover:text-linkedin'
                            style={{
                              display: 'block',
                              maxWidth: '100%',
                              overflow: 'hidden',
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              wordWrap: 'break-word'
                            }}
                            onClick={() => copyToClipboard(downloadLink)}
                          >
                            {downloadLink}
                          </div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SingleMediaViewDialog
