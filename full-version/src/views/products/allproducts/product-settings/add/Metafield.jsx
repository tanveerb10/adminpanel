import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useProduct } from '../../productContext/ProductStateManagement'
import MetaTablePreview from './MetaTablePreview'

export default function Metafield() {
  const [addOption, setAddOption] = useState({ key: '', value: '' })

  const { productData, updateProductData } = useProduct()
  console.log(productData, 'metafield')

  const handleChange = e => {
    const { name, value } = e.target
    setAddOption({ ...addOption, [name]: value })
  }
  const handleSave = () => {
    if (addOption.key.trim() === '' || addOption.value.trim() === '') {
      console.warn('Cannot save empty strings')
      return
    }

    const newMeta = { [addOption.key]: addOption.value }
    updateProductData({ meta: newMeta })
    setAddOption({ key: '', value: '' })
  }

  return (
    <Card className='ml-5'>
      <Grid>
        <CardHeader title='Metafield' />
      </Grid>
      <Grid>
        <Grid container className='flex flex-row h-full items-end pl-5' gap={5}>
          <Grid>
            <CustomTextField
              placeholder=' metafield key'
              value={addOption.key || ''}
              name='key'
              onChange={handleChange}
              fullWidth
              label='Metafield name'
            />
          </Grid>
          <Grid>
            <CustomTextField
              placeholder='metafield value'
              value={addOption.value || ''}
              name='value'
              onChange={handleChange}
              fullWidth
              label='Metafield value'
            />
          </Grid>
          <Grid>
            <Button variant='contained' color='success' onClick={handleSave}>
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid className='px-5 my-5'>
          <MetaTablePreview />
        </Grid>
      </Grid>
    </Card>
  )
}
