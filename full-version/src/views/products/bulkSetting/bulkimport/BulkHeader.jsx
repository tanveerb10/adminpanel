import React from 'react'
// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function BulkHeader({ TabValue, handleExport, HeaderValue }) {
  console.log(TabValue,'headeer tab cvale')
  return (
    <div container className='flex items-center justify-between gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {/* {isUpdate ? 'Update Bulk products' : 'Upload Whole Bulk products'} */}
          {HeaderValue}
        </Typography>
      </div>
      {
        !TabValue ===
          'metasTab' || 'productUpdateTab' ? (
            <div className=''>
              <Button variant='tonal' onClick={handleExport}>
                Export Product
              </Button>
            </div>
          ) : null
      }
    </div>
  )
}
