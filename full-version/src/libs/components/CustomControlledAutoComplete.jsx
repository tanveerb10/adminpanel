// 'use client'
// import * as React from 'react'
// import Checkbox from '@mui/material/Checkbox'
// // import TextField from '@mui/material/TextField'
// import CustomTextField from '@/@core/components/mui/TextField'
// import Autocomplete from '@mui/material/Autocomplete'
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
// import CheckBoxIcon from '@mui/icons-material/CheckBox'
// import { Button, Chip, Paper } from '@mui/material'
// import { createFilterOptions } from '@mui/material/Autocomplete'

// const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
// const checkedIcon = <CheckBoxIcon fontSize='small' />

// const CustomControlledAutoComplete = React.forwardRef(
//   ({ initialOptions = [], label, placeholder, onChange, optionKey, ...props }, ref) => {
//     const [dataList, setDataList] = React.useState(initialOptions)
//     const filter = createFilterOptions({
//       matchFrom: 'start',
//       stringify: option => option
//     })

//     return (
//       <Autocomplete
//         {...props}
//         ref={ref}
//         PaperComponent={props => <Paper {...props} />}
//         options={dataList}
//         disableCloseOnSelect
//         filterOptions={(options, params) => {
//           const filtered = filter(options, params)
//           if (params.inputValue !== '' && !options.includes(params.inputValue)) {
//             filtered.push(`Add "${params.inputValue}"`)
//           }
//           return filtered
//         }}
//         getOptionLabel={option => {
//           return typeof option === 'string' ? option : option.inputValue
//         }}
//         isOptionEqualToValue={(option, value) => {
//           return option === value
//         }}
//         // onChange={(event, newValue, reason) => {
//         //   if (reason === 'selectOption' && newValue[newValue.length - 1].startsWith('Add "')) {
//         // const newOption = newValue[newValue.length - 1].slice(5, -1)
//         // setDataList([...dataList, newOption])
//         // newValue.pop()
//         // newValue.push(newOption)
//         // onChange(event, newValue)
//         //   } else {
//         // onChange(event, newValue)
//         //   }
//         // }}

//         onChange={(event, newValue, reason) => {
//           if (reason === 'selectOption' && newValue && newValue.startsWith('Add "')) {
//             const newOption = newValue.slice(5, -1)
//             setDataList([...dataList, newOption])
//             onChange(event, newOption)
//           } else {
//             onChange(event, newValue)
//           }
//         }}
//         renderOption={(props, option, { selected }) => (
//           <li {...props}>
//             {option.startsWith('Add "') ? (
//               <Button
//                 onClick={() => {
//                   const newOption = option.slice(5, -1)
//                   setDataList([...dataList, newOption])
//                 }}
//               >
//                 {option}
//               </Button>
//             ) : (
//               <>
//                 <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
//                 {option}
//               </>
//             )}
//           </li>
//         )}
//         style={{ width: 500 }}
//         renderInput={params => <CustomTextField {...params} label={label} placeholder={placeholder} />}
//         renderTags={(tagValue, getTagProps) =>
//           tagValue.map((option, index) => <Chip label={option} {...getTagProps({ index })} key={index} size='small' />)
//         }
//       />
//     )
//   }
// )

// export default CustomControlledAutoComplete

'use client'
import * as React from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Button, Paper } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'

const CustomControlledAutoComplete = React.forwardRef(
  ({ initialOptions = [], label, placeholder, onChange, limit = 3, ...props }, ref) => {
    const [dataList, setDataList] = React.useState(initialOptions)
    const filter = createFilterOptions({
      matchFrom: 'start',
      stringify: option => option
    })

    return (
      <Autocomplete
        {...props}
        ref={ref}
        PaperComponent={props => <Paper {...props} />}
        options={dataList}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          if (params.inputValue !== '' && !options.includes(params.inputValue) && dataList.length < limit) {
            filtered.push(`Add "${params.inputValue}"`)
          }
          return filtered
        }}
        getOptionLabel={option => {
          return typeof option === 'string' ? option : option.inputValue
        }}
        isOptionEqualToValue={(option, value) => {
          return option === value
        }}
        onChange={(event, newValue, reason) => {
          if (reason === 'selectOption' && newValue && newValue.startsWith('Add "')) {
            const newOption = newValue.slice(5, -1)
            if (dataList.length < limit) {
              setDataList([...dataList, newOption])
              onChange(event, newOption)
            }
          } else {
            onChange(event, newValue)
          }
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option.startsWith('Add "') ? (
              <Button
                onClick={() => {
                  const newOption = option.slice(5, -1)
                  if (dataList.length < limit) {
                    setDataList([...dataList, newOption])
                    onChange(null, newOption)
                  }
                }}
              >
                {option}
              </Button>
            ) : (
              option
            )}
          </li>
        )}
        renderInput={params => <CustomTextField {...params} label={label} placeholder={placeholder} />}
      />
    )
  }
)

export default CustomControlledAutoComplete
