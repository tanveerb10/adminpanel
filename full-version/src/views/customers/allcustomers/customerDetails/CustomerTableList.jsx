'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
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

// Component Imports
import CategoriesTableFilter from '@views/products/Categories/CategoriesTableFilter'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

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

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
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
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper()

const CustomerTableList = ({
  tableData,
  totalCustomer,
  handlePageChange,
  totalPages,
  handleLimitChange,
  limit,
  currentPage,
  value,
  handleSearch,
  setValue,
  resetFilter,
  handleSorting,
  sortMethod,
  selectStatus,
  handleSelectStatus,
  isSortingActive
}) => {
  console.log(tableData, 'table daata abhi walwa')
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()
  const params = useParams()
  const { id } = params // Destructure id from params

  const SortableHeader = ({ field, label }) => (
    <div onClick={() => handleSorting(field)} className='cursor-pointer flex items-center'>
      {label}
      {isSortingActive &&
        (sortMethod === ASCENDING ? (
          <i className='tabler-chevron-up text-xl' />
        ) : (
          <i className='tabler-chevron-down text-xl' />
        ))}
    </div>
  )

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
      columnHelper.accessor('customerId', {
        header: 'Sr.no',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.customerId}
            </Typography>
          </div>
        )
      }),

      columnHelper.accessor('fullName', {
        header: 'User',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            {getAvatar({ avatar: row.original.avatar, fullName: row.original.fullName })}
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium capitalize'>
                {row.original.fullName}
              </Typography>
              <Typography variant='body2'>{row.original.email}</Typography>
            </div>
          </div>
        )
      }),

      columnHelper.accessor('contact', {
        header: 'Contact',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.contact}
          </Typography>
        )
      }),
      columnHelper.accessor('city', {
        header: 'Address',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium capitalize'>
              {row.original.city}
            </Typography>
            <Typography variant='body2'>{row.original.state}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('isDeleted', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.isDeleted ? 'Active' : 'Inactive'}
              color={row.original.isDeleted ? 'success' : 'error'}
              size='small'
            />
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <IconButton>
            <Link href={getLocalizedUrl(`/customers/allcustomers/${row.original.id}`, locale)} className='flex'>
              <i className='tabler-edit text-[25px] text-textSecondary' />
            </Link>
          </IconButton>
        ),
        enableSorting: false
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

  const getAvatar = params => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(name)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <CategoriesTableFilter
          setData={setData}
          tableData={tableData}
          handleSelectStatus={handleSelectStatus}
          selectStatus={selectStatus}
        />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={limit}
            onChange={e => handleLimitChange(Number(e.target.value))}
            // value={table.getState().pagination.pageSize}
            // onChange={e => table.setPageSize(Number(e.target.value))}
            className='is-[70px]'
          >
            {[2, 3, 4].map(size => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </CustomTextField>

          <div>
            Total Customer:
            <Chip variant='outlined' label={totalCustomer} color='warning' size='small' className='ml-2' />
          </div>

          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <CustomTextField
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder='Search Customer'
              className='is-full sm:is-auto'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => handleSearch(value)} edge='end'>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
            >
              Export
            </Button>
            <Button
              color='error'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='is-full sm:is-auto'
              onClick={resetFilter}
            >
              Reset
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => router.push(getLocalizedUrl(`/customers/allcustomers/addnewcustomer`, locale))}
              className='is-full sm:is-auto'
            >
              Add New Customer
            </Button>
          </div>
        </div>
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
          component={() => (
            <TablePaginationComponent
              total={totalCustomer}
              currentPage={currentPage}
              limit={limit}
              handlePageChange={handlePageChange}
            />
          )}
          // count={table.getFilteredRowModel().rows.length}
          // rowsPerPage={table.getState().pagination.pageSize}
          // page={table.getState().pagination.pageIndex}
          count={totalCustomer}
          rowsPerPage={limit}
          page={currentPage - 1}
          onPageChange={(_, page) => {
            // table.setPageIndex(page)
            handlePageChange(page + 1)
          }}
        />
      </Card>
    </>
  )
}

export default CustomerTableList
