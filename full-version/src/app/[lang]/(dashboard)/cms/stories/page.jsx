'use client'
import { useState, useEffect } from 'react'
import Stories from '@views/cms/stories/Stories'

import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'
import CreateStories from '@/views/cms/stories/CreateStories'

export default function Page() {
  // State for Customer Tab
  const [storiesResponse, setStoriesResponse] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoryData, setCategoryData] = useState([])

  const fetchStories = async () => {
    setLoading(true)
    setError(null)
    try {
      const getStoriesUrl = `/admin/cms/getAllStorySettings`
      const categoryUrl = `/admin/categories`

      const [responseData, categoryResponse] = await Promise.all([
        fetchData(getStoriesUrl, 'GET'),
        fetchData(categoryUrl, 'GET')
      ])

      if (responseData.success) {
        setStoriesResponse(responseData.data)
        const categories = categoryResponse.allCategory.map(option => option.category_name)
        setCategoryData(categories)
      }
    } catch (error) {
      console.log('error got', error.message)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error?.message || 'An unknown error occurred.'}</div>
  }

  return (
    <>
      {storiesResponse.length > 0 ? (
        <Stories storiesResponse={storiesResponse} fetchStories={fetchStories} categoryData={categoryData} />
      ) : (
        <CreateStories fetchStories={fetchStories} categoryData={categoryData} />
      )}
    </>
  )
}
