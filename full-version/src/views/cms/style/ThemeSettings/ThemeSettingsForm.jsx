'use client'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Radio,
  FormControlLabel,
  Button
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'
import AddHeader from '@/libs/components/AddHeader'

import { styled } from '@mui/material/styles'
import classnames from 'classnames'

const StyledCard = styled(Card)(({ theme, isActive }) => ({
  border: isActive ? `2px solid ${theme.palette.primary.main}` : '1px solid #ccc',
  boxShadow: isActive ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s'
}))

export default function ThemeSettingsForm({ getThemeData }) {
  const [selectValue, setSelectValue] = useState(getThemeData || 1)
  const [themeData, setThemeData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Update themeData based on the selected value
    // switch (selectValue) {
    //   case 1:
    //     setThemeData({ web_theme: 'web-1', mobile_theme: '1' })
    //     break
    //   case 2:
    //     setThemeData({ web_theme: 'web-2', mobile_theme: '2' })
    //     break
    //   case 3:
    //     setThemeData({ web_theme: 'web-3', mobile_theme: '3' })
    //     break
    //   case 4:
    //     setThemeData({ web_theme: 'web-4', mobile_theme: '4' })
    //     break
    //   default:
    //     setThemeData({})
    // }

    const themeOption = {
      1: { web_theme: 'web-1', mobile_theme: 'mod-1' },
      2: { web_theme: 'web-2', mobile_theme: 'mod-2' },
      3: { web_theme: 'web-3', mobile_theme: 'mod-3' },
      4: { web_theme: 'web-4', mobile_theme: 'mod-4' }
    }
    setThemeData(themeOption[selectValue] || {})
  }, [selectValue])

  const handleOnSubmit = async () => {
    console.log('i am click')
    console.log('themeData', themeData)

    const themeUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/cms/updateThemeSettings`
    try {
      setLoading(true)
      const responseData = await fetchData(themeUrl, 'PUT', themeData)
      if (responseData.success) {
        toast.success(responseData.message || `it's updated theme successfully`)
      }
      if (!responseData.success) {
        toast.error(responseData.message || 'Something went wrong with the api.')
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AddHeader title='Select Theme' />
      <form
        onSubmit={e => {
          e.preventDefault()
          handleOnSubmit()
        }}
      >
        <Grid container spacing={6} className='flex flex-row'>
          {[1, 2, 3, 4].map(key => (
            <Grid item xs={6} key={key}>
              <StyledCard isActive={selectValue === key}>
                <CardActionArea className={classnames('border flex flex-col')} onClick={() => setSelectValue(key)}>
                  <CardMedia component='img' image={`/images/cards/${key}.png`} alt={`Web ${key}`} />
                  <CardContent>
                    <FormControlLabel
                      value='primary'
                      control={<Radio color='success' checked={selectValue === key} />}
                    />
                    <Chip label={`Web ${key}`} color='primary' size='medium' variant='outlined' />
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
          <Grid item xs={6}>
            <Button type='submit' disabled={loading} variant='contained'>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
