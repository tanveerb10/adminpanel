'use client'
import { Grid } from '@mui/material'
import { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const fontColor = [
  ['#FF6F61', '#FF9F43', '#FFB74D', ' #FFCC80'],
  ['#4A90E2', '#50E3C2', ' #B1E4F7 ', '#A2DFF7'],
  ['#8D6E63 ', '#A1887F', '#D7CCC8', '#C5E1A5'],
  ['#9E9E9E', '#BDBDBD', '#FFFFFF', '#000000']
]

export default function ColorPalette() {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null)
  const [colorValue, setColorValue] = useState([])
  console.log(colorValue)
  return (
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
  )
}

{
  /* <Grid item xs={12} className='flex flex-row gap-6'>
  <div className='h-8 w-8 rounded-full bg-green-300'></div>
  <div className='h-8 w-8 rounded-full bg-green-600'></div>
  <div className='h-8 w-8 rounded-full bg-green-800'></div>
  <div className='h-8 w-8 rounded-full bg-green-950'></div>
</Grid>
<Grid item xs={12} className='flex flex-row gap-6'>
  <div className='h-8 w-8 rounded-full bg-purple-300'></div>
  <div className='h-8 w-8 rounded-full bg-purple-600'></div>
  <div className='h-8 w-8 rounded-full bg-purple-800'></div>
  <div className='h-8 w-8 rounded-full bg-purple-950'></div>
</Grid>
<Grid item xs={12} className='flex flex-row gap-6'>
  <div className='h-8 w-8 rounded-full bg-sky-300'></div>
  <div className='h-8 w-8 rounded-full bg-sky-600'></div>
  <div className='h-8 w-8 rounded-full bg-sky-800'></div>
  <div className='h-8 w-8 rounded-full bg-sky-950'></div>
</Grid>
<Grid item xs={12} className='flex flex-row gap-6'>
  <div className='h-8 w-8 rounded-full bg-yellow-300' />
  <div className='h-8 w-8 rounded-full bg-yellow-600' />
  <div className='h-8 w-8 rounded-full bg-yellow-800' />
  <div className='h-8 w-8 rounded-full' style={{ background: '#ffffff' }} />
</Grid> */
}
// ${selectedGroupIndex === groupIndex ? 'border-2 border-blue-500' : ''}
{
  /* <Grid item xs={12} className='flex flex-col gap-6'>
{fontColor.map((colorGroup, groupIndex) => (
  <div key={groupIndex} className='flex flex-row gap-6'>
    {colorGroup.map((subColor, index) => (
      <div className='h-8 w-8 rounded-full' style={{ background: subColor }} key={index} />
    ))}
  </div>
))}

</Grid> */
}
