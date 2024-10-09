'use client'
import { useState, useEffect } from 'react'
import ThemeSettingsForm from '@/views/cms/style/ThemeSettings/ThemeSettingsForm'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

export default function ThemeSettings() {
  const [getThemeData, setGetThemeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const themeApi = async () => {
    try {
      setLoading(true)
      const themeSettingURL = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/cms/getThemeSettings`

      const responseData = await fetchData(themeSettingURL, 'GET')
      if (responseData.success) {
        setGetThemeData(responseData.data)
      }
      if (!responseData.success) {
        throw new Error(responseData.message || 'Error occurred during Getting data')
      }
    } catch (err) {
      setError(err.message || 'Error Get')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    themeApi()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }
  const web_theme = 'web-4'
  const extract = Number(web_theme.substring(web_theme.length - 1))

  return (
    <>
      {/* <ColorPickerSection /> */}
      <ThemeSettingsForm getThemeData={extract} />
    </>
  )
}
