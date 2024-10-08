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
import ProductTableFilter from '@/views/products/allproducts/product-settings/productTable/ProductTableFilter'
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

const userStatusObj = {
  Active: 'error',
  Inactive: 'error'
}

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  }
  return text
}

// Column Definitions
const columnHelper = createColumnHelper()

const ProductTableList = ({ tableData = [], totalProducts, fromMetas }) => {
  console.log('table list', tableData)
  // States
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')

  // Hooks
  const { lang: locale } = useParams()
  const router = useRouter()

  if (!tableData || tableData.length === 0) {
    return <Typography>No table data available</Typography>
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
      // columnHelper.accessor('brandId', {
      //   header: 'Sr.no',
      //   cell: ({ row }) => (
      //     <div className='flex items-center gap-2'>
      //       <Typography className='capitalize' color='text.primary'>
      //         {row.original.brandId}
      //       </Typography>
      //     </div>
      //   )
      // }),

      columnHelper.accessor('name', {
        header: 'Product',
        cell: ({ row }) => {
          const description = row.original.description
          const maxLength = 50
          const truncatedDescription = truncateText(description, maxLength)
          return (
            <div className='flex items-center gap-4'>
              {getAvatar({ avatar: row.original.imageSrc, fullName: row.original.name })}
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-bold'>
                  {row.original.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.primary'
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <p dangerouslySetInnerHTML={{ __html: truncatedDescription }} />

                  {/* {truncatedDescription} */}
                </Typography>
              </div>
            </div>
          )
        }
      }),

      // columnHelper.accessor('description', {
      //   header: 'Description',
      //   cell: ({ row }) => {
      //     const description = row.original.description
      //     const maxLength = 50
      //     const truncatedDescription = truncateText(description, maxLength)
      //     return (
      //       <Typography
      //         variant='body2'
      //         color='text.primary'
      //         style={{
      //           overflow: 'hidden',
      //           textOverflow: 'ellipsis',
      //           display: '-webkit-box',
      //           WebkitBoxOrient: 'vertical',
      //           WebkitLineClamp: 2,
      //           wordBreak: 'break-word',
      //           whiteSpace: 'pre-wrap'
      //         }}
      //       >
      //         <p dangerouslySetInnerHTML={{ __html: truncatedDescription }} />

      //         {/* {truncatedDescription} */}
      //       </Typography>
      //     )
      //   }
      // }),
      columnHelper.accessor('productBrand', {
        header: 'Brand',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.productBrand}
          </Typography>
        )
      }),
      columnHelper.accessor('productCategory', {
        header: 'Category',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.productCategory}
          </Typography>
        )
      }),
      columnHelper.accessor('productType', {
        header: 'Type',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.productType}
          </Typography>
        )
      }),
      columnHelper.accessor('isDeleted', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.isDeleted ? 'Inactive' : 'Active'}
              // color={userStatusObj[row.original.isDeleted]}
              //   color={statusO={
              //     "Inactive" : 'error'

              // }
              // }
              size='small'
            />
          </div>
        )
      }),
      columnHelper.accessor('productCount', {
        header: 'Count',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.productCount}
              color='success'
              size='small'
            />
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            {fromMetas ? (
              <IconButton>
                <Link href={getLocalizedUrl(`/products/metas/${row.original.id}`, locale)} className='flex'>
                  <i className='tabler-edit text-[22px] text-textSecondary' />
                </Link>
              </IconButton>
            ) : (
              <IconButton>
                <Link href={getLocalizedUrl(`/products/allproducts/${row.original.id}`, locale)} className='flex'>
                  <i className='tabler-edit text-[22px] text-textSecondary' />
                </Link>
              </IconButton>
            )}
          </div>
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
        <ProductTableFilter setData={setData} tableData={tableData} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
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

          <div>
            Total Products:
            {/* <Chip variant='outlined' label={totalAdmin} color='warning' size='small' className='ml-2' /> */}
            <Chip variant='outlined' label={totalProducts} color='warning' size='small' className='ml-2' />
          </div>

          <div className='flex flex-col sm:flex-row is-full sm:is-auto items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='is-full sm:is-auto'
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
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              // onClick={() => router.push(getLocalizedUrl(`/admin/adminusers/addadminuser`,locale))}

              onClick={() => router.push(getLocalizedUrl(`/products/allproducts/addnewproduct`, locale))}
              className='is-full sm:is-auto'
            >
              Add New Product
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
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
    </>
  )
}

export default ProductTableList
