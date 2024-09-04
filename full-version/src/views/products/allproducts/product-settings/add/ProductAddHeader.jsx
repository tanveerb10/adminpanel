// MUI Imports
import Typography from '@mui/material/Typography'

const ProductAddHeader = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          Add a new product
        </Typography>
      </div>
    </div>
  )
}

export default ProductAddHeader
