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
import { IconButton } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
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

const ProductOrganize = () => {
  // States
  const [vendor, setVendor] = useState('')
  const [category, setCategory] = useState('')
  const [collection, setCollection] = useState('')
  const [status, setStatus] = useState('')
  // const [data, setData] = useState(top100Films)
  // const [inputValue, setInputValue] = useState('')

  // const filterOption = data.filter(option =>
  //   option.label.includes(inputValue)
  // );

  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <CustomTextField select fullWidth label='Brand' value={vendor} onChange={e => setVendor(e.target.value)}>
            <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
            <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
            <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
          </CustomTextField>
          <div className='flex items-end gap-4'>
            {/* <CustomTextField
              select
              fullWidth
              label='Category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value='Household'>Household</MenuItem>
              <MenuItem value='Office'>Office</MenuItem>
              <MenuItem value='Electronics'>Electronics</MenuItem>
              <MenuItem value='Management'>Management</MenuItem>
              <MenuItem value='Automotive'>Automotive</MenuItem>
            </CustomTextField>
            <IconButton variant='tonal' color='primary' className='min-is-fit'>
              <i className='tabler-plus' />
            </IconButton> */}
            <CustomCheckboxAutocomplete label='Categories' placeholder='Categories select' fullWidth/>
          </div>
          {/* <CustomTextField
            select
            fullWidth
            label='Collection'
            value={collection}
            onChange={e => setCollection(e.target.value)}
          >
            <MenuItem value={`Men's Clothing`}>Men&apos;s Clothing</MenuItem>
            <MenuItem value={`Women's Clothing`}>Women&apos;s Clothing</MenuItem>
            <MenuItem value={`Kid's Clothing`}>Kid&apos;s Clothing</MenuItem>
          </CustomTextField> */}
          <CustomTextField select fullWidth label='Published' value={status} onChange={e => setStatus(e.target.value)}>
            <MenuItem value='true'>true</MenuItem>
            <MenuItem value='false'>False</MenuItem>
          </CustomTextField>
          <CustomCheckboxAutocomplete fullWidth label='Enter Tags' placeholder='Fashion, Trending, Summer' />
          <CustomTextField fullWidth label='Country of Origin' />
          {/* <CustomTextField select fullWidth label='Enter Tags' placeholder='Fashion, Trending, Summer' /> */}
          {/* <CustomAutocomplete>
            <MenuItem value='true'>true</MenuItem>
            <MenuItem value='false'>False</MenuItem>
            <MenuItem value='true'>true</MenuItem>
            <MenuItem value='false'>False</MenuItem>
            <MenuItem value='true'>true</MenuItem>
            <MenuItem value='false'>False</MenuItem>
          </CustomAutocomplete> */}

          {/* <CustomAutocomplete
            multiple
            disableCloseOnSelect
            options={data}
            id='autocomplete-checkboxes'
            getOptionLabel={option => option.title || ''}
            renderInput={params => (
              <CustomTextField {...params} key={params.id} label='Checkboxes' placeholder='Favorites' />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.label}>
                <Checkbox key={option.label} checked={selected} className='mie-2' />
                {option.label}
              </li>
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option.label} {...getTagProps({ index })} key={index} size='small' />
              ))
            }
          />
           */}
          {/* ======   going to trash=============
          <CustomAutocomplete
            multiple
            disableCloseOnSelect
            options={filterOption.length > 0 ? filterOption : data}
            id='autocomplete-checkboxes'
            getOptionLabel={option => option.label || ''}
            renderInput={params => (
              <CustomTextField
                {...params}
                key={params.id}
                label='Checkboxes'
                placeholder='Favorites'
                onChange={e => setInputValue(e.target.value)}
              />
            )}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.label}>
                <Checkbox key={option.label} checked={selected} className='mie-2' />
                {option.label}
              </li>
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option.label} {...getTagProps({ index })} key={index} size='small' />
              ))
            }
          >
            {filterOption.length === 0 && (
              <li key='add-button'>
                <button>Add Option</button>
              </li>
            )}
          </CustomAutocomplete> */}
          {/* <CustomCheckboxAutocomplete fullWidth multiple placeholder='test check' label='test option' optionKey='label' fetchOption={movie}  /> */}
        </form>
      </CardContent>
    </Card>
  )
}
export default ProductOrganize
