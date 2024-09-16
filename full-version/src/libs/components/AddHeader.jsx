// MUI Imports
import Typography from '@mui/material/Typography'

const AddHeader = ({ title }) => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {title}
        </Typography>
      </div>
    </div>
  )
}

export default AddHeader
