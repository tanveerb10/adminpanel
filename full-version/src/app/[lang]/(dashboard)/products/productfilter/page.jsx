// import React from 'react'
// import ProductFilter from '@/views/products/productfilter/ProductFilter'
// import { closestCenter, DndContext } from '@dnd-kit/core'
// import { arrayMove, SortableContext } from '@dnd-kit/sortable'

// export default function page() {
//   const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])

//   const handleDragEnd = e => {
//     const { active, over } = e
//     if (active.id !== over.id) {
//       setItems(items => {
//         const oldIndex = items.indexOf(active.id)
//         const newIndex = items.indexOf(active.id)
//         return arrayMove(items, oldIndex, newIndex)
//       })
//     }
//   }
//   return (
//     <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//       <SortableContext items={items}>
//         {items.map(id => (
//           <ProductFilter id={id} key={id} />
//         ))}
//       </SortableContext>
//     </DndContext>
//   )
// }

'use client'
import { useEffect, useState } from 'react'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import ProductFilter from '@/views/products/productfilter/ProductFilter'

export default function page() {
  const [items, setItems] = useState([])

  const handleDragEnd = event => {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleLiftArray = item => setItems(item)

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items}>
          {/* {items?.map(id => (
            <SortableItem key={id} id={id} />
          ))} */}
          <ProductFilter handleLiftArray={handleLiftArray} />
        </SortableContext>
      </DndContext>
    </>
  )
}
