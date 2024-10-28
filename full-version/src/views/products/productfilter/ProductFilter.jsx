'use client'
import { useState, useEffect } from 'react'
import FilterConfigCard from '@/views/products/productfilter/FilterConfigCard'

export default function ProductFilter({ handleLiftArray }) {
  const initialItems = ['Item 1', 'Item 2', 'Item 3', 'item 4']

  useEffect(() => {
    handleLiftArray(initialItems)
  }, [initialItems])

  return (
    <>
      {initialItems.map(id => (
        <FilterConfigCard id={id} key={id} />
      ))}
    </>
  )
}
