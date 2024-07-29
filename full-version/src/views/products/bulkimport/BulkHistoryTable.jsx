'use client'
import React, { useState, useEffect } from 'react'
// import Paper from '@mui/material/Paper'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TablePagination from '@mui/material/TablePagination'
// import TableRow from '@mui/material/TableRow'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper
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

export default function BulkHistoryTable({ callAgain }) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [historyLogData, setHistoryLogData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/getUploadHistory`
        const responseData = await fetchData(apiUrl)
        setHistoryLogData(responseData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistoryData()
  }, [callAgain])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching data: {error.message}</div>
  console.log(historyLogData, 'history data log')

  function formatDate(dataData) {
    const date = new Date(dataData)
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }

  const tableLog = historyLogData.data.map(data => ({
    csvId: data.csv_upload_id,
    fileName: data.file_name,
    exportFile: data.fileUrl,
    status: data.upload_status,
    date: formatDate(data.createdAt),
    username: data.admin_id ? data.admin_id.firstname : 'Unknown'
  }))
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
