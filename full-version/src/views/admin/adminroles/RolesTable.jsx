'use client'

// React Imports
import { useState, useMemo, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { Button } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
// Component Imports
import RoleDialog from '@components/dialogs/role-dialog/RoleDialog'
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

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Util Imports
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

const RolesTable = ({
  tableData,
  roleData,
  limit,
  totalPages,
  handlePageChange,
  handleLimitChange,
  currentPage,
  totalRoles,
  handleSearch,
  value,
  setValue,
  resetFilter,
  handleSorting,
  sortMethod,
  selectStatus,
  handleSelectStatus,
  isSortingActive,
  handleRoleQuery,
  roleNameQuery
}) => {
  // States
  const [role, setRole] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')
  // Hooks
  const { lang: locale } = useParams()
  const passId = data.map(id => ({ id: id.id, name: id.name }))
  console.log(passId)
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
      columnHelper.accessor('id', {
        header: 'Role Id',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Typography className='font-medium' color='text.primary'>
              {row.original.id}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('name', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('role_name')
            }}
            className='cursor-pointer flex items-center'
          >
            Role
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
              {row.original.name}
            </Typography>
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('ability', {
        header: 'Ability',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.abilityCount}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: () => (
          <div
            onClick={() => {
              handleSorting('status')
              console.log('onclick status')
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
        header: 'Actions',
        cell: ({ row }) => (
          <IconButton>
            <Link href={getLocalizedUrl(`admin/adminroles/${row.original.roleId}`, locale)} className='flex'>
              <i className='tabler-edit text-[25px] text-textSecondary' />
            </Link>
          </IconButton>
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

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (role && user.role !== role) return false

      return true
    })

    setData(filteredData)
  }, [role, tableData, setData])

  const CardProps = {
    className: 'cursor-pointer bs-full',
    children: (
      <Button variant='contained' size='small'>
        Add Role
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
        </div>
        <div className='flex flex-row items-center'>
          <Typography variant='h6'>Total Roles:</Typography>
          <Chip variant='outlined' label={totalRoles} color='primary' size='medium' className='ml-2' />
        </div>
        <div className='flex gap-4 flex-col !items-start is-full sm:flex-row sm:is-auto sm:items-center'>
          <CustomTextField
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='Search Role'
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
          <CustomTextField
            select
            value={roleNameQuery}
            onChange={e => handleRoleQuery(e.target.value)}
            className='is-[160px]'
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            {roleData?.map(role => (
              <MenuItem value={role.role_name} key={role.role_id}>
                {role.role_name}
              </MenuItem>
            ))}
          </CustomTextField>
          <CustomTextField
            select
            value={selectStatus}
            onChange={e => handleSelectStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </CustomTextField>
          <Button
            color='error'
            variant='tonal'
            startIcon={<i className='tabler-restore' />}
            className='is-full sm:is-auto'
            onClick={resetFilter}
          >
            Reset
          </Button>
        </div>
        <div>
          <OpenDialogOnElementClick element={Card} elementProps={CardProps} dialog={RoleDialog} />
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
        component={() => (
          <TablePaginationComponent
            total={totalRoles}
            currentPage={currentPage}
            limit={limit}
            handlePageChange={handlePageChange}
          />
        )}
        count={totalRoles}
        rowsPerPage={limit}
        page={currentPage - 1}
        onPageChange={(_, page) => {
          handlePageChange(page + 1)
        }}
      />
    </Card>
  )
}

export default RolesTable
