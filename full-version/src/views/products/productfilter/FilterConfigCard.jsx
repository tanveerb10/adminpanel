'use client'
import { Card, CardContent, CardHeader, Switch, Typography } from '@mui/material'

import { useSortable } from '@dnd-kit/sortable'

export default function FilterConfigCard({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  return (
    <div
      className='gap-3'
      ref={setNodeRef}
      style={{ transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`, transition }}
      {...attributes}
      {...listeners}
    >
      <Card className='gap-7'>
        <CardHeader title='Title' />
        <CardContent className='flex justify-between items-center'>
          <Typography variant='h6'>Type</Typography>
          <div>
            <Switch defaultChecked color='success' />
            {id}
            <span class='icon-[ion--md-reorder]'></span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
