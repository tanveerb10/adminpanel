// import { Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'

export default function ProductInfo() {
  return (
    <>
      <Card>
        <CardHeader title='Product info' />
        <CardContent>
                  <CustomTextField name='productTitle' label='Title' fullWidth placeholder='Product Title' />
                <AppReactDraftWysiwyg/>
        </CardContent>
      </Card>
    </>
  )
}
