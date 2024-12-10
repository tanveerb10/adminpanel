'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'
// MUI Imports
import {
  Button,
  Card,
  CardContent,
  MenuItem,
  InputAdornment,
  Typography,
  Checkbox,
  IconButton,
  TablePagination,
  styled,
  Chip
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
// Component Imports
import TaxOverrideDialog from '@/views/taxes/taxrate/TaxOverrideDialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Component Imports\
import CustomTextField from '@core/components/mui/TextField'
import DefaultTablePaginationComponent from '@components/DefaultTablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { toast } from 'react-toastify'
import fetchData from '@/utils/fetchData'

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, onSearch, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounce, onSearch])
  const handleSearch = () => {
    onSearch(value) // Calls the search function when the button is clicked
  }

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleSearch} edge='end'>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

// Column Definitions
const columnHelper = createColumnHelper()

const TaxTable = ({ tableData, setTaxOverrideFlag, taxApi, taxOverrideApi }) => {
  const [loading, setLoading] = useState(false)
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')
  // Hooks
  const passId = data.map(id => ({ id: id.id, name: id.name }))

  const handleDelete = async () => {
    setLoading(true)
    try {
      const apiUrl = setTaxOverrideFlag ? `/admin/products/delete_tax_override` : `/admin/products/delete_tax_rate`

      const response = await fetchData(apiUrl, 'DELETE')
      if (response.success) {
        toast.success(setTaxOverrideFlag ? 'Tax override deleted successfully' : 'Tax deleted successfully.')
      } else {
        throw new Error(
          response.message || setTaxOverrideFlag ? 'Failed to delete tax override' : 'Failed to delete tax.'
        )
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('srno', {
        header: 'Sr.no',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.srno}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('taxId', {
        header: 'Tax Id',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography className='font-medium text-center' color='text.primary'>
              {row.original.taxId}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('taxName', {
        header: 'Tax Name',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize text-center' color='text.primary'>
              {row.original.taxName}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('rate', {
        header: 'Tax Rate',
        cell: ({ row }) => (
          <Typography className='capitalize text-center' color='text.primary'>
            {row.original.rate}
          </Typography>
        )
      }),
      columnHelper.accessor('taxType', {
        header: 'Tax Type',
        cell: ({ row }) => (
          <Typography className='capitalize text-center' color='text.primary'>
            {row.original.taxType}
          </Typography>
        )
      }),

      columnHelper.accessor('state', {
        header: 'State',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize text-center' color='text.primary'>
              {row.original.state}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize text-center' color='text.primary'>
              {row.original.country}
            </Typography>
          </div>
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const SetTaxRate = {
    className: 'cursor-pointer bs-full',
    children: (
      <Button variant='contained' size='small'>
        Add Tax
      </Button>
    )
  }
  const SetTaxOveride = {
    className: 'cursor-pointer bs-full',
    children: (
      <Button variant='contained' size='small'>
        Add Tax Override
      </Button>
    )
  }

  return (
    <Card>
      <CardContent className='flex justify-between flex-col gap-4 items-start md:flex-row md:items-center'>
        <div className='flex items-center gap-2'>
          <Typography>Show</Typography>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
        </div>
        <div className='flex flex-row items-center'>
          <Typography variant='h6'>Total Tax:</Typography>
          <Chip variant='outlined' label={tableData.length} color='primary' size='medium' className='ml-2' />
        </div>
        <div className='flex gap-4 flex-col !items-start is-full sm:flex-row sm:is-auto sm:items-center'>
          <DebouncedInput
            value={globalFilter ?? ''}
            className='is-[250px]'
            onSearch={searchValue => {
              // Trigger the API call here using searchValue
              // fetchUsers(searchValue) // Call the API function
              console.log('search State')
            }}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search State'
          />
        </div>
        <div>
          <Button variant='tonal' color='error' onClick={handleDelete}>
            {setTaxOverrideFlag ? 'Delete Tax Override' : 'Delete Tax'}
          </Button>
        </div>
        <div>
          {setTaxOverrideFlag ? (
            <OpenDialogOnElementClick
              element={Card}
              elementProps={SetTaxOveride}
              dialog={TaxOverrideDialog}
              dialogProps={{ taxOverrideApi: taxOverrideApi, setTaxOverrideFlag: setTaxOverrideFlag }}
            />
          ) : (
            <OpenDialogOnElementClick
              element={Card}
              elementProps={SetTaxRate}
              dialog={TaxOverrideDialog}
              dialogProps={{ taxApi: taxApi }}
            />
          )}
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <DefaultTablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default TaxTable
