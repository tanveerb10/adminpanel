'use client'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import { Card, CardContent, CardHeader, Grid, IconButton } from '@mui/material'
import { useOrder } from '@/views/orders/allorders/orderContext/OrderStateManagement'
import NoteDialog from '@views/orders/allorders/createorder/noteReview/NoteDialog'
import React from 'react'

export default function NoteCard() {
  const { note } = useOrder()

  return (
    <Card>
      <Grid className='flex justify-between items-center'>
        <CardHeader title='Note Card' />

        <OpenDialogOnElementClick
          element={IconButton}
          elementProps={{
            children: <i className='tabler-edit text-[20px]' />,
            className: 'cursor-pointer mr-2'
          }}
          dialog={NoteDialog}
        />
      </Grid>

      <CardContent>{note.trim() ? note : 'No notes yet. Click to add.'}</CardContent>
    </Card>
  )
}
