'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import SingleMediaViewDialog from '@/views/cms/media/SingleMediaViewDialog'

// Column Definitions
const columnHelper = createColumnHelper()

const MediaTableList = ({
  totalMedia,
  tableData,
  handlePageChange,
  handleLimitChange,
  limit,
  currentPage,
  fetchMediaDelete
}) => {
  // States
  const [rowSelection, setRowSelection] = useState({})

  console.log('rowSelection', rowSelection)

  function copyToClipboard(value) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('Link Copied', { position: 'bottom-left' })
      })
      .catch(err => {
        toast.error('Failed to copy', { position: 'bottom-left' })
      })
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
      columnHelper.accessor('downloadLink', {
        header: 'Image',
        cell: ({ row }) => (
          <div className='flex items-center text-center gap-2'>
            <Image
              height={50}
              width={50}
              className='rounded'
              src={row.original.downloadLink || '/images/avatars/1.png'}
              // src={'/images/avatars/1.png'}
              alt={row.original.name}
            />
          </div>
        )
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
          <div className='flex items-left flex-col '>
            <div className='flex '>
              <Typography color='text.primary' variant='h5' className='font-bold text-center'>
                {row.original.name}
              </Typography>
              <span className='ml-2 pt-0'>
                <IconButton className='text-start p-0' onClick={() => copyToClipboard(row.original.downloadLink)}>
                  <i className='tabler-link text-[15px] text-textSecondary' />
                </IconButton>
              </span>
            </div>
            <Typography color='text.primary' className='font-medium'>
              {row.original.type}
            </Typography>
          </div>
        )
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => <Chip label={row.original.date} />
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip
              variant='tonal'
              className='capitalize'
              label={row.original.status ? 'Inactive' : 'Active'}
              color={row.original.status ? 'error' : 'success'}
              size='small'
            />
          </div>
        )
      }),
      columnHelper.accessor('size', {
        header: 'Size',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <Chip variant='tonal' className='capitalize' label={row.original.size} color='success' size='small' />
          </div>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <OpenDialogOnElementClick
              element={IconButton}
              elementProps={{}}
              dialog={SingleMediaViewDialog}
              dialogProps={{
                name: row.original.name,
                downloadLink: row.original.downloadLink,
                position: row.original.position,
                status: row.original.status,
                type: row.original.type,
                height: row.original.height,
                width: row.original.width,
                size: row.original.size,
                date: row.original.date,
                copyToClipboard
              }}
            />
          </div>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data: tableData,
    columns,

    state: {
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize: limit
      }
    },
    enableRowSelection: true, //enable row selection for all rows

    getRowId: row => row.id, // Ensure each row has a unique 'id' key
    onRowSelectionChange: newRowSelection => {
      setRowSelection(newRowSelection)
    },
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <Card>
        <div className='flex justify-between items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <div>
            <CustomTextField
              select
              value={limit}
              onChange={e => handleLimitChange(Number(e.target.value))}
              className='is-[70px]'
            >
              {[1, 2, 3, 4].map(size => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </CustomTextField>
          </div>
          <div>
            <Chip
              variant='outlined'
              label={`Total Media: ${totalMedia}`}
              color='warning'
              size='small'
              className='ml-2'
            />
          </div>
          <div>
            {!!Object.keys(rowSelection).length && (
              <Button
                variant='tonal'
                color='error'
                startIcon={<i className='tabler-trash' onClick={() => fetchMediaDelete()} />}
              >
                Delete
              </Button>
            )}
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
                        <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getRowModel().rows.length === 0 ? (
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
        <TablePaginationComponent
          total={totalMedia}
          currentPage={currentPage}
          limit={limit}
          handlePageChange={handlePageChange}
        />
      </Card>
    </>
  )
}

export default MediaTableList
