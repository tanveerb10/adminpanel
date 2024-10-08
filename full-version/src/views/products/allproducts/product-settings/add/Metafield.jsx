'use client'
import React, { useState } from 'react'
import { Button, Card, CardHeader, Grid } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import MetaTablePreview from '@views/products/allproducts/product-settings/add/MetaTablePreview'
import { toast } from 'react-toastify'

export default function Metafield() {
  const [addOption, setAddOption] = useState({ key: '', value: '' })
  const [validationMessage, setValidationMessage] = useState({ key: '', value: '' })

  const { addProductMeta } = useProduct()

  const handleChange = e => {
    const { name, value } = e.target
    setAddOption({ ...addOption, [name]: value })
    if (value.trim() !== '') {
      setValidationMessage({ ...validationMessage, [name]: '' })
    }
  }
  const handleSave = () => {
    let isValid = true

    if (addOption.key.trim() === '') {
      setValidationMessage(prev => ({ ...prev, key: 'Meta key is required.' }))
      isValid = false
    }

    if (addOption.value.trim() === '') {
      setValidationMessage(prev => ({ ...prev, value: 'Meta value is required.' }))
      isValid = false
    }

    if (!isValid) {
      toast.error('Cannot save empty fields')
      return
    }

    if (addOption.key.trim() === '' || addOption.value.trim() === '') {
      toast.error('Cannot save empty fields')

      return
    }

    const newMeta = { [addOption.key]: addOption.value }
    addProductMeta({ ...newMeta })
    setAddOption({ key: '', value: '' })
  }
  const isButtonDisabled = addOption.key.trim() === '' || addOption.value.trim() === ''

  return (
    <Card className='ml-5'>
      <Grid>
        <CardHeader title='Metafield' />
      </Grid>
      <Grid>
        <Grid container className='flex flex-row h-full items-end pl-5' gap={5}>
          <Grid>
            <CustomTextField
              placeholder='Metafield key'
              value={addOption.key}
              name='key'
              onChange={handleChange}
              fullWidth
              label='Metafield name'
              error={!!validationMessage.key}
              helperText={validationMessage.key}
            />
          </Grid>
          <Grid>
            <CustomTextField
              placeholder='Metafield value'
              value={addOption.value}
              name='value'
              onChange={handleChange}
              fullWidth
              label='Metafield value'
              error={!!validationMessage.value}
              helperText={validationMessage.value}
            />
          </Grid>
          <Grid>
            <Button variant='contained' color='success' onClick={handleSave} disabled={isButtonDisabled}>
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
