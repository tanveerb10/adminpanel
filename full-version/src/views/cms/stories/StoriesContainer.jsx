'use client'
import { useState, useEffect } from 'react'
import { DndContext, rectIntersection } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import StoriesCard from '@/views/cms/stories/StoriesCard'
import { Typography } from '@mui/material'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

export default function StoriesContainer({ data = [], fetchStories, categoryData }) {
  const [cards, setCards] = useState([])
  const [positions, setPositions] = useState({ from: null, to: null })

  useEffect(() => {
    if (data.length) {
      const sortedData = [...data].sort((a, b) => a.position - b.position)
      setCards(sortedData)
    }
  }, [data])

  const handleDragEnd = event => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setCards(prevCards => {
      const oldIndex = prevCards.findIndex(card => card._id === active.id)
      const newIndex = prevCards.findIndex(card => card._id === over.id)
      setPositions({ from: oldIndex + 1, to: newIndex + 1 })
      return arrayMove(prevCards, oldIndex, newIndex)
    })
  }

  const handlePositionUpdate = async () => {
    if (positions.from === null || positions.to === null) return

    const data = {
      from: positions.from,
      to: positions.to,
      settingName: 'story_settings'
    }
    try {
      const apiUrl = '/admin/cms/updatePositionSettings'

      const response = await fetchData(apiUrl, 'POST', data)
      console.log('API Response:', response)

      if (!response.success) {
        console.log('error response', response.message)
        toast.error(response.message)
      }
      if (response.success) {
        return toast.success(response.message || 'SuccessFully Updated')
      }
    } catch (error) {
      console.error('API Error:', error)
      toast.error(error.message || 'An Error occurred')
    } finally {
      setPositions({ from: null, to: null })
    }
  }

  useEffect(() => {
    if (positions.from !== null && positions.to !== null) {
      handlePositionUpdate()
    }
  }, [positions])

  if (cards.length === 0) {
    return <Typography>Data Not Available</Typography>
  }

  return (
    <div style={{ width: '100%', margin: '0 auto', overflow: 'hidden' }}>
      <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map(card => card._id)} strategy={verticalListSortingStrategy}>
          <div>
            {cards.map(card => (
              <StoriesCard key={card._id} {...card} fetchStories={fetchStories} categoryData={categoryData} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
