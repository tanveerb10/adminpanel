'use client'
import React, { useState, useEffect } from 'react'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Chip
} from '@mui/material'
import fetchData from '@/utils/fetchData'

const columns = [
  { id: 'csvId', label: 'Sr no.', minWidth: 170 },
  { id: 'username', label: 'Name', minWidth: 170 },
  { id: 'fileName', label: 'FileName', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'exportFile',
    label: 'Export',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right'
  }
]

const API_URLS = {
  productUploadTab: '/admin/products/getUploadHistory',
  productUpdateTab: '/admin/products/UpdateProductHistory',
  priceTab: '/admin/products/priceUploadHistory',
  categoryTab: '/admin/products/CategoryUploadHistory',
  metasTab: '/admin/products/getProductMetHistory',
  inventoryTab: '/admin/products/stockUploadHistory'
}

const sr_id = {
  productUploadTab: 'bulk_product_meta_id',
  productUpdateTab: 'update_whole_product_id',
  priceTab: 'update_price_id',
  categoryTab: 'update_category_id',
  metasTab: 'update_product_meta_id',
  inventoryTab: 'update_stock_id'
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL_LIVE

export default function BulkHistoryTable({ callAgain, TabValue }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [historyLogData, setHistoryLogData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log(TabValue, 'Tab value from history table')
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    let isMounted = true
    const fetchHistoryData = async () => {
      const urls = API_URLS[TabValue]
      const url = `${baseUrl}${urls}`
      try {
        // const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/getUploadHistory`
        const responseData = await fetchData(url, 'GET')
        setHistoryLogData(responseData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoryData()

    return () => {
      isMounted = false
    }
  }, [callAgain, TabValue])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching data: {error.message}</div>
  console.log(historyLogData, 'history data log')

  function formatDate(dataData) {
    const dates = new Date(dataData)
    const date = ` ${dates.getDate()}/${dates.getMonth() + 1}/${dates.getFullYear()}`
    const time = `${dates.getHours() % 12 || 12}-${dates.getMinutes()}-${dates.getSeconds()} ${dates.getHours() >= 12 ? 'PM' : 'AM'}`
    return (
      <div className='flex gap-2 flex-col justify-center items-center'>
        <Chip label={time} />
        <Chip label={date} />
      </div>
    )
  }

  const tableLog = historyLogData.data.map(
    data => (
      console.log(TabValue),
      console.log(sr_id[TabValue]),
      console.log(data),
      console.log(data[sr_id[TabValue]]),
      {
        // csvId: data.bulk_product_meta_id,
        csvId: data[sr_id[TabValue]] || 'unknown',
        fileName: data.file_name,
        exportFile: data.fileUrl,
        status: data.upload_status,
        date: formatDate(data.createdAt),
        username: data.admin_id ? data.admin_id.firstname : 'Unknown'
      }
    )
  )
  if (tableLog.length === 0) {
    return <div>There is no history data log</div>
  }
  console.log(tableLog, 'table log')
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableLog.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.csvId}>
                  {columns.map(column => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'exportFile' ? (
                          <Button variant='contained' href={value}>
                            download
                          </Button>
                        ) : (
                          value
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={tableLog.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
