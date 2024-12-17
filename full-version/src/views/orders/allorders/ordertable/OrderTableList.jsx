'use client'

// React Imports
import { useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports

import {
  styled,
  TablePagination,
  CardHeader,
  Card,
  MenuItem,
  InputAdornment,
  Button,
  IconButton,
  Checkbox,
  Chip,
  Typography
} from '@mui/material'

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
import OrderTableFilter from '@views/orders/allorders/ordertable/OrderTableFilter'
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

const columnHelper = createColumnHelper()

const ASCENDING = 'asc'

const OrderTableList = ({
  tableData,
  totalOrders,
  limit,
  handlePageChange,
  handleLimitChange,
  currentPage,
  handleSearch,
  value,
  setValue,
  resetFilter,
  handleSorting,
  sortMethod,
  selectStatus,
  handleSelectStatus,
  isSortingActive
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState([...tableData])
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()

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
      columnHelper.accessor('orderId', {
        header: 'order Id',
        cell: ({ row }) => (
          <div className='flex items-center justify-center gap-2'>
            <Typography className='capitalize' color='text.primary'>
              {row.original.orderId}
            </Typography>
          </div>
        )
      }),

      columnHelper.accessor('fullName', {
        header: 'Customer',
        cell: ({ row }) => {
          return (
            <div className='flex items-center gap-4'>
              {getAvatar({ avatar: row.original.imageSrc, fullName: row.original.fullName })}
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-bold capitalize'>
                  {row.original.fullName}
                </Typography>
                <Typography variant='body2'>{row.original.email}</Typography>
              </div>
            </div>
          )
        },
        enableSorting: false
      }),
      columnHelper.accessor('channel', {
        // header: <SortableHeader field='coupon_code' label='channel' />,
        header: 'channel',
        cell: ({ row }) => <Chip label={row.original.channel} variant='tonal' className='font-bold' color='primary' />,
        enableSorting: false
      }),
      columnHelper.accessor('orderStatus', {
        header: 'Delivery Status',
        cell: ({ row }) => <Typography className='capitalize text-center'>{row.original.orderStatus}</Typography>,
        enableSorting: false
      }),

      columnHelper.accessor('orderDate', {
        header: 'Order Date',
        cell: ({ row }) => <Typography className='text-center'>{row.original.orderDate}</Typography>,
        enableSorting: false
      }),
      columnHelper.accessor('fulfillmentStatus', {
        header: 'Fulfillment status',
        cell: ({ row }) => (
          <div className='flex items-center justify-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.fulfillmentStatus ? 'Fulfilled' : 'Unfulfilled'}
              color={row.original.fulfillmentStatus ? 'success' : 'secondary'}
              size='small'
            />
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('financialStatus', {
        header: 'Payment status',
        cell: ({ row }) => (
          <div className='flex items-center justify-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.financialStatus ? 'Paid' : 'Unpaid'}
              color={row.original.financialStatus ? 'success' : 'error'}
              size='small'
            />
          </div>
        ),
        enableSorting: false
      }),
      columnHelper.accessor('orderItem', {
        // header: <SortableHeader field='coupon_code' label='channel' />,
        header: 'Item',
        cell: ({ row }) => (
          <Chip label={row.original.orderItem} variant='tonal' className='font-bold' color='primary' />
        ),
        enableSorting: false
      }),
      columnHelper.accessor('orderTotal', {
        header: 'Total',
        cell: ({ row }) => <Typography className='text-center'>₹ {row.original.orderTotal}</Typography>,
        enableSorting: false
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center justify-center'>
            <IconButton>
              <Link href={getLocalizedUrl(`/orders/allorders/${row.original.id}`, locale)} className='flex'>
                <i className='tabler-edit text-[22px] text-textSecondary' />
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
        <OrderTableFilter
          setData={setData}
          tableData={tableData}
          selectStatus={selectStatus}
          handleSelectStatus={handleSelectStatus}
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
            Total Order:
            <Chip variant='outlined' label={totalOrders} color='warning' size='small' className='ml-2' />
          </div>

          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <CustomTextField
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder='Search Order'
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
              onClick={() => router.push(getLocalizedUrl(`/orders/allorders/addneworder`, locale))}
              className='is-full sm:is-auto'
            >
              Add Order
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
              total={totalOrders}
              currentPage={currentPage}
              limit={limit}
              handlePageChange={handlePageChange}
            />
          )}
          // count={table.getFilteredRowModel().rows.length}
          // rowsPerPage={table.getState().pagination.pageSize}
          // page={table.getState().pagination.pageIndex}

          count={totalOrders}
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

export default OrderTableList
