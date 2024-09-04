'use client'
import React, { useState, forwardRef, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import CustomTextField from '@/@core/components/mui/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Button, Chip, Paper } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

const CustomCheckboxAutocomplete = forwardRef(
  ({ initialOptions = [], label, placeholder, onChange, optionKey, error, helperText, target, ...props }, ref) => {
    const [dataList, setDataList] = useState([])
    useEffect(() => {
      const data = target ? initialOptions?.map(item => item[target]) : initialOptions
      setDataList(data)
    }, [initialOptions, target])

    console.log(dataList, 'datalist from custom')

    const filter = createFilterOptions({
      matchFrom: 'start',
      stringify: option => option
    })

    const handleChange = (event, newValue, reason) => {
      if (reason === 'selectOption' && newValue[newValue.length - 1].startsWith('Add "')) {
        const newOption = newValue[newValue.length - 1].slice(5, -1)
        setDataList(prevDataList => {
          if (!prevDataList.includes(newOption)) {
            return [...prevDataList, newOption]
          }
          return prevDataList
        })
        newValue.pop()
        newValue.push(newOption)
        onChange(event, newValue)
      } else {
        onChange(event, newValue)
      }
    }
    return (
      <Autocomplete
        multiple
        {...props}
        ref={ref}
        PaperComponent={props => <Paper {...props} />}
        options={dataList}
        disableCloseOnSelect
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          if (params.inputValue !== '' && !options.includes(params.inputValue)) {
            filtered.push(`Add "${params.inputValue}"`)
          }
          return filtered
        }}
        // getOptionLabel={option => {
        //   return typeof option === 'string' ? option : option.inputValue
        // }}
        getOptionLabel={option => {
          if (typeof option === 'string') return option
          return option?.inputValue || option?.[optionKey] || ''
        }}
        isOptionEqualToValue={(option, value) => {
          return option === value
        }}
        onChange={handleChange}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            {option.startsWith('Add "') ? (
              <Button
                onClick={() => {
                  const newOption = option.slice(5, -1)
                  setDataList([...dataList, newOption])
                }}
              >
                {option}
              </Button>
            ) : (
              <>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option}
              </>
            )}
          </li>
        )}
        renderInput={params => (
          <CustomTextField
            {...params}
            label={label}
            placeholder={placeholder}
            helperText={error ? helperText || 'invalid input' : ''}
            error={error}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => <Chip label={option} {...getTagProps({ index })} key={index} size='small' />)
        }
      />
    )
  }
)

export default CustomCheckboxAutocomplete
