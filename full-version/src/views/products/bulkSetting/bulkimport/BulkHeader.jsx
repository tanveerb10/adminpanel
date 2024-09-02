import React from 'react'
// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function BulkHeader({ TabValue, handleExport, HeaderValue }) {
  console.log(TabValue, 'form export')
  console.log(['metasTab', 'productUpdateTab'].includes(TabValue), 'check yab value for export')
  const includeExport = ['metasTab', 'productUpdateTab']
  return (
    <div className='flex items-center justify-between gap-6'>
      <div>
        <Typography variant='h4' className='mb-1'>
          {HeaderValue}
        </Typography>
      </div>
      {TabValue && (
        <div className=''>
          <Button variant='tonal' onClick={handleExport}>
            Export Product
          </Button>
        </div>
      )}
    </div>
  )
}
