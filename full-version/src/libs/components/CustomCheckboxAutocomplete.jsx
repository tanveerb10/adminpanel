'use client'
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
// import TextField from '@mui/material/TextField'
import CustomTextField from '@/@core/components/mui/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Button, Chip, Paper } from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: 'City of God', year: 2002 },
//   { title: 'Se7en', year: 1995 },
//   { title: 'The Silence of the Lambs', year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: 'Life Is Beautiful', year: 1997 },
//   { title: 'The Usual Suspects', year: 1995 },
//   { title: 'Léon: The Professional', year: 1994 },
//   { title: 'Spirited Away', year: 2001 },
//   { title: 'Saving Private Ryan', year: 1998 },
//   { title: 'Once Upon a Time in the West', year: 1968 },
//   { title: 'American History X', year: 1998 },
//   { title: 'Interstellar', year: 2014 }
// ]

// export default function CheckboxAutocomplete() {
//   const [dataList, setDataList] = React.useState(top100Films)
//   // const filterOptions = top100Films.filter(option => option.title.toLowerCase().includes(inputValue.toLowerCase()))
//   const filter = createFilterOptions({
//     matchFrom: 'start',
//     stringify: option => option.title
//   })
  
 
//   return (
//     <>
//       {/* <Autocomplete
//         multiple
//         id='checkboxes-tags-demo'
//         options={top100Films}
//         disableCloseOnSelect
//         getOptionLabel={option => option.title}
//         onInputChange={(event, newInputValue) => {
//           setInputValue(newInputValue)
//         }}
//         renderOption={(props, option, { selected }) => {
//           const { key, ...optionProps } = props
//           return (
//             <>
//               <li key={key} {...optionProps}>
//                 <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
//                 {option.title}
//               </li>
//             </>
//           )
//         }}
//         style={{ width: 500 }}
//         renderInput={params => <TextField {...params} label='Checkboxes' placeholder='Favorites' />}
//         renderTags={(tagValue, getTagProps) =>
//           tagValue.map((option, index) => (
//             <Chip label={option.title} {...getTagProps({ index })} key={index} size='small' />
//           ))
//         }
//       />
//       {filterOptions.length === 0 && (
//         <li>
//           <Button>Add Option</Button>
//         </li>
//       )} */}
//       <Autocomplete
//         multiple
//         id='checkboxes-tags-demo'
//         options={dataList}
//         disableCloseOnSelect
       
//         filterOptions={(option, params) => {
//           const filtered = filter(option, params)
//           if (params.inputValue !== '') {
            
//             filtered.push({
//               inputValue: params.inputValue,
//               title: `Add "${params.inputValue}"`,
              
//             })
//           }
//           return filtered
//         }}

//         getOptionLabel={(option)=>{
//           if (option.inputValue) {
//             return option.title
//           }
//           return option.title
//         }}
        
//         onChange={(event, newValue) => {
//           // console.log(typeof newValue)
//           // if (Array.isArray(newValue) && newValue.some(option => option.inputValue)) {
//           const newOption = newValue.find(option => option.inputValue)
//           if (newOption) {
            
//             setDataList([...dataList, { title: newOption.inputValue }])
//           }
//           // }
//         }}
     
//         renderOption={(props, option, { selected }) => {
//           // const { key, ...optionProps } = props
//           // return (
//             // <>
//               <li {...props}>
//               {/* <li key={key} {...optionProps}> */}
//                 <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
//                 {option.title}
//               </li>
//             // </>
//           // )
//         }}
//         style={{ width: 500 }}
//         renderInput={params => <TextField {...params} label='Checkboxes' placeholder='Favorites' />}
//         renderTags={(tagValue, getTagProps) =>
//           tagValue.map((option, index) => (
//             <Chip label={option.title} {...getTagProps({ index })} key={index} size='small' />
//           ))
//         }
//       />
//       {/* <Autocomplete
//         options={top100Films}
//         filterOptions={(option, params) => {
//           const filtered = filter(option, params)
//           if (params.inputValue !== '') {
//             filtered.push({
//               inputValue: params.inputValue,
//               title: `Add "${params.inputValue}"`
//             })
//           }
//           return filtered
//         }}

//         getOptionLabel={(option) => {
//           if (option.inputValue) {
//             return option.title
//           }
//           return option.title
//         }}

//         renderOption={(props, option) => <li {...props}>{option.title}</li>}
//         renderInput={(params) => <TextField {...params} label="Select a film" />}
//       /> */}
//     </>
//   )
// }

// const icon = <span>□</span>;
// const checkedIcon = <span>■</span>;

const CustomCheckboxAutocomplete = React.forwardRef(({initialOptions=[], label, placeholder,onChange,optionKey, ...props},ref) => {
  const [dataList, setDataList] = React.useState(initialOptions);
  const filter = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option,
  });

//   return (
//     <Autocomplete
//       multiple
//       id="checkboxes-tags-demo"
//       options={dataList}
//       disableCloseOnSelect
//       filterOptions={(options, params) => {
//         const filtered = filter(options, params);
//         if (params.inputValue !== '') {
//           filtered.push({
//             inputValue: params.inputValue,
//             title: `Add "${params.inputValue}"`,
//           });
//         }
//         return filtered;
//       }}
//       getOptionLabel={(option) => {
//         if (option.inputValue) {
//           return option.inputValue;
//         }
//         return option.title;
//       }}
//       onChange={(event, newValue) => {
//         const newOption = newValue.find((option) => option.inputValue);
//         if (newOption) {
//           setDataList([...dataList, { title: newOption.inputValue }]);
//         }
//       }}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           <Checkbox
//             icon={icon}
//             checkedIcon={checkedIcon}
//             style={{ marginRight: 8 }}
//             checked={selected}
//           />
//           {option.title}
//         </li>
//       )}
//       style={{ width: 500 }}
//       renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
//       renderTags={(tagValue, getTagProps) =>
//         tagValue.map((option, index) => (
//           <Chip label={option.title} {...getTagProps({ index })} key={index} size="small" />
//         ))
//       }
//     />
//   );
// }

// ============================================ok but need modification====================================
//   return (
//     <Autocomplete
//       multiple
//       id="checkboxes-tags-demo"
//       options={dataList}
//       disableCloseOnSelect
//       filterOptions={(options, params) => {
//         const filtered = filter(options, params);
//         if (params.inputValue !== '' && !options.some(option => option.title === params.inputValue)) {
//           filtered.push({
//             inputValue: params.inputValue,
//             title: `Add "${params.inputValue}"`,
//           });
//         }
//         return filtered;
//       }}
//       getOptionLabel={(option) => {
//         // Only show the title without the "Add" text in the input field
//         return option.inputValue ? option.inputValue : `add ${option.title}`;
//       }}
//       isOptionEqualToValue={(option, value) => {
//         return option.title === value.title;
//       }}
//       onChange={(event, newValue) => {
//         // Filter out the "Add" text from the input field
//         const filteredValue = newValue.filter(option => !option.inputValue);
//         setDataList(filteredValue);
        
//         // Handle adding new custom options to the data list
//         const newOption = newValue.find(option => option.inputValue);
//         if (newOption) {
//           setDataList([...dataList, { title: newOption.inputValue }]);
//         }
//       }}
//       renderOption={(props, option, { selected }) => (
//         <li {...props}>
//           {option.inputValue ? (
//             <Button
//               onClick={() => {
//                 setDataList([...dataList, { title: option.inputValue }]);
//               }}
//             >
//               Add "{option.inputValue}"
//             </Button>
//           ) : (
//             <>
//               <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
//               {option.title}
//             </>
//           )}
//         </li>
//       )}
//       style={{ width: 500 }}
//       renderInput={(params) => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
//       renderTags={(tagValue, getTagProps) =>
//         tagValue.map((option, index) => (
//           <Chip label={option.title} {...getTagProps({ index })} key={index} size="small" />
//         ))
//       }
//     />
//   );
// }

  
  // ===================================working with objectts and got data from it too============================
// return (
//   <Autocomplete
//   multiple
//   {...props}
//     ref={ref}
//     PaperComponent={props => <Paper {...props} />}
//     options={dataList}
//     disableCloseOnSelect
//     filterOptions={(options, params) => {
//       const filtered = filter(options, params);
//       if (params.inputValue !== '' && !options.some(option => option[optionKey] === params.inputValue)) {
//         filtered.push({
//           inputValue: params.inputValue,
//           [optionKey]: `Add "${params.inputValue}"`,
//         });
//       }
//       return filtered;
//     }}
//     getOptionLabel={(option) => {
//       return option.inputValue ? option.inputValue : option[optionKey];
//     }}
//     isOptionEqualToValue={(option, value) => {
//       return option[optionKey] === value[optionKey];
//     }}
//     onChange={(event, newValue, reason) => {
//       if (reason === 'selectOption' && newValue[newValue.length - 1].inputValue) {
//         // Add the new value to the data list
//         const newOption = { [optionKey]: newValue[newValue.length - 1].inputValue };
//         setDataList([...dataList, newOption]);
//         // Remove the "Add" option and add the actual value
//         newValue.pop();
//         newValue.push(newOption);
//             onChange(event, newValue)
//       }
//     }}
//     renderOption={(props, option, { selected }) => (
//       <li {...props}>
//         {option.inputValue ? (
//           <Button
//             onClick={() => {
//               const newOption = {[optionKey]:option.inputValue}
//               setDataList([...dataList, newOption]);
//             }}
//           >
//             Add "{option.inputValue}"
//           </Button>
//         ) : (
//           <>
//             <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
//             {option[optionKey]}
//           </>
//         )}
//       </li>
//     )}
//     style={{ width: 500 }}
//     renderInput={(params) => <CustomTextField {...params} label={label} placeholder={placeholder} />}
//     renderTags={(tagValue, getTagProps) =>
//       tagValue.map((option, index) => (
//         <Chip label={option[optionKey]} {...getTagProps({ index })} key={index} size="small" />
//       ))
//     }
//   />
// );
// })
// export default CustomCheckboxAutocomplete

return (
  <Autocomplete
    multiple
    {...props}
    ref={ref}
    PaperComponent={(props) => <Paper {...props} />}
    options={dataList}
    disableCloseOnSelect
    filterOptions={(options, params) => {
      const filtered = filter(options, params);
      if (params.inputValue !== '' && !options.includes(params.inputValue)) {
        filtered.push(`Add "${params.inputValue}"`);
      }
      return filtered;
    }}
    getOptionLabel={(option) => {
      return typeof option === 'string' ? option : option.inputValue;
    }}
    isOptionEqualToValue={(option, value) => {
      return option === value;
    }}
    onChange={(event, newValue, reason) => {
      if (reason === 'selectOption' && newValue[newValue.length - 1].startsWith('Add "')) {
        const newOption = newValue[newValue.length - 1].slice(5, -1);
        setDataList([...dataList, newOption]);
        newValue.pop();
        newValue.push(newOption);
        onChange(event, newValue);
      } else {
        onChange(event, newValue);
      }
    }}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        {option.startsWith('Add "') ? (
          <Button
            onClick={() => {
              const newOption = option.slice(5, -1);
              setDataList([...dataList, newOption]);
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
    style={{ width: 500 }}
    renderInput={(params) => <CustomTextField {...params} label={label} placeholder={placeholder} />}
    renderTags={(tagValue, getTagProps) =>
      tagValue.map((option, index) => (
        <Chip label={option} {...getTagProps({ index })} key={index} size="small" />
      ))
    }
  />
);
}
);

export default CustomCheckboxAutocomplete;