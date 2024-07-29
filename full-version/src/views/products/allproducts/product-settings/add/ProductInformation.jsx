'use client'

// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import CustomTextField from '@core/components/mui/TextField'

import AppReactDraftWysiwyg from '@/libs/styles/AppReactDraftWysiwyg'
import { useEffect, useState } from 'react'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'

const ProductInformation = ({setProductData}) => {
//   const [infoData, setInfoData] = useState({
//     title: "",
//     description:""
// })
  const handleInputChange = e => {
    const {name, value} = e.target
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (description) => {
    console.log(description)
    setProductData((prev)=>({...prev,description}))
  }
  // useEffect(() => {
  //   setProductData((prev)=>({...prev}))
  //  },[infoData,setProductData])
  // const handleOnChange = e => {
  //   const newInfoData = {...infoData,e.target.value}
  // }
  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField fullWidth label='Product Title' name="title" placeholder='Product name' onChange={handleInputChange} />
          </Grid>
          <Grid item xs={ 12}>
            <CustomCheckboxAutocomplete/>
          </Grid>
        </Grid>
        <Typography className='mbe-1'>Description</Typography>
        <Card className='p-0 border shadow-none'>
          <CardContent className='p-0'>
            <AppReactDraftWysiwyg onChange={ handleDescriptionChange} name="description" />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
