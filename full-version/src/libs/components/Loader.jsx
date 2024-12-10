// MUI Imports
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

const CircularProgressDeterminate = styled(CircularProgress)({
  color: 'var(--mui-palette-customColors-trackBg)'
})

const CircularProgressIndeterminate = styled(CircularProgress)(({ theme }) => ({
  left: 0,
  position: 'absolute',
  animationDuration: '550ms',
  color: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
}))

const Loader = ({ size = 50, isVisible = true }) => {
  if (!isVisible) return null
  return (
    <div className='fixed inset-0 bg-black/30 z-50 h-full w-full flex items-center justify-center cursor-not-allowed'>
      <div className='relative'>
        <CircularProgressDeterminate variant='determinate' size={size} thickness={5} value={100} />
        <CircularProgressIndeterminate variant='indeterminate' disableShrink size={size} thickness={5} />
      </div>
    </div>
  )
}

export default Loader

// From Refresh Content

// <Backdrop open={reload} className='absolute text-white z-[cal(var(--mui-zIndex-mobileStepper)-1)]'>
// <CircularProgress color='inherit' />
// </Backdrop>
