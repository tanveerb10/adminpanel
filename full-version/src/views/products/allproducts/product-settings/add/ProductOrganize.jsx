'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'
// import { IconButton } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
// import Checkbox from '@mui/material/Checkbox'
// import Chip from '@mui/material/Chip'
// import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
// const movie = [
//   { label: 'The Shawshank Redemption', year: 1994 },
//   { label: 'The Godfather', year: 1972 },
//   { label: 'The Godfather: Part II', year: 1974 },
//   { label: 'The Dark Knight', year: 2008 },
//   { label: '12 Angry Men', year: 1957 },
//   { label: "Schindler's List", year: 1993 },
//   { label: 'Pulp Fiction', year: 1994 },
//   { label: 'Amadeus', year: 1984 },
//   { label: 'To Kill a Mockingbird', year: 1962 },
//   { label: 'Toy Story 3', year: 2010 },
//   { label: 'Logan', year: 2017 },
//   { label: 'Full Metal Jacket', year: 1987 },
//   { label: 'Dangal', year: 2016 },
//   { label: 'The Sting', year: 1973 },
//   { label: '2001: A Space Odyssey', year: 1968 },
//   { label: "Singin' in the Rain", year: 1952 },
//   { label: 'Toy Story', year: 1995 },
//   { label: 'Bicycle Thieves', year: 1948 },
//   { label: 'The Kid', year: 1921 },
//   { label: 'Inglourious Basterds', year: 2009 },
//   { label: 'Snatch', year: 2000 },
//   { label: '3 Idiots', year: 2009 },
//   { label: 'Monty Python and the Holy Grail', year: 1975 }
// ]

const movie = ["hello", "zebra",'zoo','animal']
const ProductOrganize = ({ setProductData }) => {
  const [selectedOption, setSelectedOption] = useState({tags:[],categories:[]})
  
  // States
  

  const handleInputChange = e => {
    const {name, value} = e.target
    setProductData(prev => ({ ...prev, [name]: value}))
  }

  const handleArrayChange = (name, newValue) => {
    // const { name, value } = e.target
    setSelectedOption(prev=>({...prev,[name]:newValue}))
}
// console.log(selectedOption)
  // const handleArrayChange = (list) => {
  //   console.log({list})
  //   setProductData(prev=>({...prev,"categories":[...list]}))
  // }
  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField select fullWidth label='Brand' name="brand" onChange={handleInputChange}>
            <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
            <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
            <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
          </CustomTextField>
          <div className='flex items-end gap-4'>

            {/* <CustomCheckboxAutocomplete
              label='Categories'
              placeholder='Categories select'
              fullWidth
              name="categories"
              // onChange={(event,newValue)=> setSelectedOption(newValue)}
              // handleArrayChange={handleArrayChange}
              onChange={handleArrayChange}
            /> */}
            <CustomCheckboxAutocomplete
            label='Categories'
              placeholder='Categories select'
              fullWidth
              // onChange={(event, newValue) => handleArrayChange('categories', newValue)}
              onChange={handleInputChange}
              name='categories'
              initialOptions={selectedOption.categories}
            />
          </div>
          <CustomTextField select fullWidth label='Published' name="published" onChange={handleInputChange}>
            <MenuItem value='true'>true</MenuItem>
            <MenuItem value='false'>False</MenuItem>
          </CustomTextField>
          {/* <CustomCheckboxAutocomplete
            fullWidth
            label='Enter Tags'
            placeholder='Fashion, Trending, Summer'
            // onChange={(value)=>handleArrayChange("tags", value)}
            // onChange={handleArrayChange}
            onChange={(event,newValue)=>selectedOption(newValue)}
            name="tags"
          /> */}
          <CustomCheckboxAutocomplete
              fullWidth
              label='Enter Tags'
              placeholder='Fashion, Trending, Summer'
              onChange={(event, value) => handleArrayChange('tags', value)}
              name='tags'
            // initialOptions={selectedOption.tags}
            initialOptions={movie}
            />
          <CustomTextField fullWidth label='Country of Origin' onChange={handleInputChange} name="countryOfOrigin"/>
        </form>
      </CardContent>
    </Card>
  )
}
export default ProductOrganize
