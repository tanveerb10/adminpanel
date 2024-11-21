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
import { styled } from '@mui/material/styles'
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
import TableFilters from './TableFilters'
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

// Column Definitions
const columnHelper = createColumnHelper()

const ASCENDING = 'asc'

const UserListTable = ({
  tableData = [],
  totalAdmin,
  roleData,
  handleLimitChange,
  handlePageChange,
  totalPages,
  limit,
  currentPage,
  handleSearch,
  value,
  setValue,
  resetFilter,
  handleSorting,
  sortMethod,
  selectStatus,
  handleSelectStatus,
  isSortingActive,
  roleNameQuery,
  handleRoleQuery
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState([...tableData])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()

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
      columnHelper.accessor('fullName', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('firstname')
            }}
            className='cursor-pointer flex items-center'
          >
            Users
            {isSortingActive &&
              (sortMethod === ASCENDING ? (
                <i className='tabler-chevron-up text-xl' />
              ) : (
                <i className='tabler-chevron-down text-xl' />
              ))}
          </div>
        ),
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
        ),
        enableSorting: false
      }),
      columnHelper.accessor('role', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('role')
            }}
            className='cursor-pointer flex items-center'
          >
            Roles
            {isSortingActive &&
              (sortMethod === ASCENDING ? (
                <i className='tabler-chevron-up text-xl' />
              ) : (
                <i className='tabler-chevron-down text-xl' />
              ))}
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.role}
            </Typography>
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('contact', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('contact')
            }}
            className='cursor-pointer flex items-center'
          >
            Contact
            {isSortingActive &&
              (sortMethod === ASCENDING ? (
                <i className='tabler-chevron-up text-xl' />
              ) : (
                <i className='tabler-chevron-down text-xl' />
              ))}
          </div>
        ),
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.contact}
          </Typography>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('city', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('city')
            }}
            className='cursor-pointer flex items-center'
          >
            City
            {isSortingActive &&
              (sortMethod === ASCENDING ? (
                <i className='tabler-chevron-up text-xl' />
              ) : (
                <i className='tabler-chevron-down text-xl' />
              ))}
          </div>
        ),
        cell: ({ row }) => <Typography className='capitalize'>{row.original.city}</Typography>
      }),
      columnHelper.accessor('status', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('status')
            }}
            className='cursor-pointer flex items-center'
          >
            Status
            {isSortingActive &&
              (sortMethod === ASCENDING ? (
                <i className='tabler-chevron-up text-xl' />
              ) : (
                <i className='tabler-chevron-down text-xl' />
              ))}
          </div>
        ),
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.status}
              color={row.original.status ? 'success' : 'error'}
              size='small'
            />
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/admin/adminusers/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-edit text-[25px] text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSorting]
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
    const { avatar, fullName } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters
          setData={setData}
          tableData={tableData}
          roleData={roleData}
          selectStatus={selectStatus}
          handleSelectStatus={handleSelectStatus}
          roleNameQuery={roleNameQuery}
          handleRoleQuery={handleRoleQuery}
        />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={limit}
            onChange={e => handleLimitChange(Number(e.target.value))}
            className='is-[70px]'
          >
            {[2, 3, 4].map(size => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </CustomTextField>

          <div>
            Total Admins:
            <Chip variant='outlined' label={totalAdmin} color='warning' size='small' className='ml-2' />
          </div>

          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <CustomTextField
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder='Search Admin'
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
              // onClick={() => router.push(getLocalizedUrl(`/admin/adminusers/addadminuser`,locale))}

              onClick={() => router.push(getLocalizedUrl(`/admin/adminusers/addadminuser`, locale))}
              className='is-full sm:is-auto'
            >
              Add Admin
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
              total={totalAdmin}
              currentPage={currentPage}
              limit={limit}
              handlePageChange={handlePageChange}
            />
          )}
          count={totalAdmin}
          rowsPerPage={limit}
          page={currentPage - 1}
          onPageChange={(_, page) => {
            handlePageChange(page + 1)
          }}
        />
      </Card>
    </>
  )
}

export default UserListTable
