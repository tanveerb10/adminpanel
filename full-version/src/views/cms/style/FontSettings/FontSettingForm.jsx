'use client'
import CustomTextField from '@/@core/components/mui/TextField'
import { Button, Card, CardContent, Grid, Typography, MenuItem } from '@mui/material'
import { useState, useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import fetchData from '@/utils/fetchData'
import { toast } from 'react-toastify'

const FontFamily = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Helvetica', value: 'Helvetica' },
  { name: 'Times New Roman', value: 'TimesNewRoman' },
  { name: 'Verdana', value: 'Verdana' },
  { name: 'Courier New', value: 'CourierNew' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Lucida Console', value: 'LucidaConsole' },
  { name: 'Tahoma', value: 'Tahoma' },
  { name: 'Trebuchet MS', value: 'TrebuchetMS' },
  { name: 'Arial Black', value: 'ArialBlack' },
  { name: 'Impact', value: 'Impact' },
  { name: 'Comic Sans MS', value: 'ComicSansMS' },
  { name: 'Courier New', value: 'CourierNew' }
]

const fontColor = [
  ['#FF6F61', '#FF9F43', '#FFB74D', '#FFCC80', '#FFEB3B', '#FFC107', '#F50057', '#D5006D', '#C51162'],
  ['#4A90E2', '#50E3C2', '#B1E4F7', '#A2DFF7', '#00B0FF', '#00E676', '#1DE9B6', '#4DB6AC', '#00796B'],
  ['#8D6E63', '#A1887F', '#D7CCC8', '#C5E1A5', '#8BC34A', '#4CAF50', '#388E3C', '#2E7D32', '#1B5E20'],
  ['#9E9E9E', '#BDBDBD', '#FFFFFF', '#000000', '#FFC107', '#FF5722', '#FF4081', '#F50057', '#D32F2F']
]

const schema = yup.object().shape({
  fontSizeHeading: yup.string().trim().required('Heading size is required'),
  fontSizeSubHeading: yup.string().trim().required('Sub Heading size is required'),
  fontSizeBody: yup.string().trim().required('Body size is required'),
  fontSizeProductTitle: yup.string().trim().required('Product title size is required'),
  fontSizeProductDescription: yup.string().trim().required('Product description size is required')
})

export default function FontSettingForm({ getFontData, fontApi }) {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null)
  const [colorValue, setColorValue] = useState([])
  const [loading, setLoading] = useState(false)
  console.log('color cvalue ', colorValue)

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fontFamilyHeading: getFontData?.fonts?.heading || '',
      fontFamilySubHeading: getFontData?.fonts?.subHeading || '',
      fontFamilyBody: getFontData?.fonts?.body || '',
      fontFamilyProductTitle: getFontData?.fonts?.product_title || '',
      fontFamilyProductDescription: getFontData?.fonts?.product_description || '',

      fontSizeHeading: getFontData?.fonts_size?.heading || '',
      fontSizeSubHeading: getFontData?.fonts_size?.subHeading || '',
      fontSizeBody: getFontData?.fonts_size?.body || '',
      fontSizeProductTitle: getFontData?.fonts_size?.product_title || '',
      fontSizeProductDescription: getFontData?.fonts_size?.product_description || ''
    }
  })

  useEffect(() => {
    if (getFontData && getFontData.colors) {
      const apiColors = Object.values(getFontData.colors)

      const matchingGroupIndex = fontColor.findIndex(colorGroup => {
        return colorGroup.length === apiColors.length && colorGroup.every(color => apiColors.includes(color))
      })

      if (matchingGroupIndex !== -1) {
        setSelectedGroupIndex(matchingGroupIndex)
        setColorValue(fontColor[matchingGroupIndex])
      } else {
        setColorValue(apiColors)
      }
    }
  }, [getFontData])

  const handleOnSubmit = async data => {
    if (colorValue.length <= 0) {
      return toast.error('Select color group')
    }
    const formatData = {
      colors: {
        primary: colorValue[0],
        secondary: colorValue[1],
        tertiary: colorValue[2],
        primary_button: colorValue[3],
        secondary_button: colorValue[4],
        heading: colorValue[5],
        sub_heading: colorValue[6],
        product_title: colorValue[7],
        product_description: colorValue[8]
      },
      fonts: {
        heading: data.fontFamilyHeading || '',
        subHeading: data.fontFamilySubHeading || '',
        body: data.fontFamilyBody || '',
        product_title: data.fontFamilyProductTitle || '',
        product_description: data.fontFamilyProductDescription || ''
      },
      fonts_size: {
        heading: data.fontSizeHeading || '',
        subHeading: data.fontSizeSubHeading || '',
        body: data.fontSizeBody || '',
        product_title: data.fontSizeProductTitle || '',
        product_description: data.fontSizeProductDescription || ''
      }
    }
    const fontUrl = `/admin/cms/updateColorSettings`
    try {
      setLoading(true)
      const responseData = await fetchData(fontUrl, 'PUT', formatData)
      if (responseData.success) {
        toast.success(responseData.message || 'Font Setting Update Successfully')
        fontApi()
      } else {
        toast.error(responseData.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error(error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Typography variant='h5'>Font Color</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {fontColor.map((colorGroup, groupIndex) => (
                  <Grid item xs={12} key={groupIndex}>
                    <div
                      className={`flex flex-row items-center gap-6 cursor-pointer `}
                      onClick={() => {
                        setSelectedGroupIndex(groupIndex)
                        setColorValue(colorGroup)
                      }}
                    >
                      {colorGroup.map((subColor, index) => (
                        <div className='h-8 w-8 rounded-full' style={{ background: subColor }} key={index} />
                      ))}

                      {selectedGroupIndex === groupIndex && (
                        <CheckCircleIcon className='text-green-500' style={{ fontSize: '24px' }} />
                      )}
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5'>Font Family</Typography>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='fontFamilyHeading'
                control={control}
                render={({ field }) => (
                  <CustomTextField fullWidth label='Heading' placeholder='Heading' select {...field}>
                    {FontFamily.map(font => (
                      <MenuItem key={font.value} value={font.value}>
                        {font.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='fontFamilySubHeading'
                control={control}
                render={({ field }) => (
                  <CustomTextField fullWidth label='Sub Heading' placeholder='Sub Heading' select {...field}>
                    {FontFamily.map(font => (
                      <MenuItem key={font.value} value={font.value}>
                        {font.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontFamilyBody'
                control={control}
                render={({ field }) => (
                  <CustomTextField fullWidth label='Body' placeholder='Body' select {...field}>
                    {FontFamily.map(font => (
                      <MenuItem key={font.value} value={font.value}>
                        {font.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontFamilyProductTitle'
                control={control}
                render={({ field }) => (
                  <CustomTextField fullWidth label='Product Title' placeholder='Product Title' select {...field}>
                    {FontFamily.map(font => (
                      <MenuItem key={font.value} value={font.value}>
                        {font.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontFamilyProductDescription'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label='Product Description'
                    placeholder='Product Description'
                    select
                    {...field}
                  >
                    {FontFamily.map(font => (
                      <MenuItem key={font.value} value={font.value}>
                        {font.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='h5'>Font Size</Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontSizeHeading'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Heading'
                    placeholder='Heading'
                    error={Boolean(errors.fontSizeHeading)}
                    helperText={errors.fontSizeHeading?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontSizeSubHeading'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Sub Heading'
                    placeholder='Sub Heading'
                    error={Boolean(errors.fontSizeSubHeading)}
                    helperText={errors.fontSizeSubHeading?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='fontSizeBody'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Body'
                    placeholder='Body'
                    error={Boolean(errors.fontSizeBody)}
                    helperText={errors.fontSizeBody?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontSizeProductTitle'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Product Title'
                    placeholder='Product Title'
                    error={Boolean(errors.fontSizeProductTitle)}
                    helperText={errors.fontSizeProductTitle?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='fontSizeProductDescription'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Product Description'
                    placeholder='Product Description'
                    error={Boolean(errors.fontSizeProductDescription)}
                    helperText={errors.fontSizeProductDescription?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}
