'use client'
import { Grid, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import FontSettingForm from '@/views/cms/style/FontSettings/FontSettingForm'
import FontSettingView from '@/views/cms/style/FontSettings/FontSettingView'
import fetchData from '@/utils/fetchData'
import Loader from '@/libs/components/Loader'

export default function FontSettings() {
  const [toggle, setToggle] = useState(false)
  const [getFontData, setGetFontData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fontApi = async () => {
    try {
      setLoading(true)
      const fontSettingURL = `/admin/cms/getColorSettings`

      const responseData = await fetchData(fontSettingURL, 'GET')
      if (responseData.success) {
        setGetFontData(responseData.data)
      }
      if (!responseData.success) {
        throw new Error(responseData.message || 'Error occurred during Getting data')
      }
    } catch (err) {
      setError(err || 'Error Get')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fontApi()
  }, [])

  console.log(getFontData, 'get font data')
  const handleToggle = () => {
    setToggle(!toggle)
    console.log(toggle)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='flex justify-end'>
        <IconButton onClick={handleToggle}>
          <i className={`${toggle ? 'tabler-eye' : 'tabler-edit'} text-[30px] text-textSecondary`} />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        {toggle ? (
          <FontSettingForm getFontData={getFontData} fontApi={fontApi} />
        ) : (
          <FontSettingView getFontData={getFontData} />
        )}
      </Grid>
    </Grid>
  )
}
