import React from 'react'
import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { useProduct } from '../../productContext/ProductStateManagement'

const columns = [
  { id: 'id', label: 'Sr.No', minWidth: 20 },
  { id: 'key', label: 'Name', minWidth: 80 },
  {
    id: 'value',
    label: 'Value',
    minWidth: 80,
    align: 'right'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 80,
    align: 'right'
  }
]

const createData = (key, value, index) => ({
  id: index + 1,
  key: key,
  value: value,
  action: 'Delete'
})

export default function MetaTablePreview() {
  const { productData, updateProductData } = useProduct()

  const data = productData.meta
  // console.log(data, 'tablePrivew data')
  
  // console.log(dataLength, 'tablePrivew data length')

  // const handleDelete = (key) => {
  //   console.log("Deleting key:", key);
  //   const updatedMeta = { ...productData.meta }
  //   delete updatedMeta[key]
  //   updateProductData({meta:updatedMeta})
  // }
  // const handleDelete = (key) => {
  //   console.log("Deleting key:", key);
  //   const updatedMeta = { ...productData.meta };
  //   if (updatedMeta[key] !== undefined) {
  //     delete updatedMeta[key];
  //     updateProductData({ meta: {updatedMeta} });
  //   } else {
  //     console.log("Key not found:", key);
  //   }
  // }

  
  const handleDelete = (key) => {
    // console.log("Attempting to delete key:", key);
    const updatedMeta = productData.meta;
    // console.log("Current meta before deletion:", updatedMeta);

    if (updatedMeta[key] !== undefined) {
      delete updatedMeta[key];
      // console.log("Updated meta after deletion:", updatedMeta);
      updateProductData({ meta: updatedMeta });
      // console.log("Updated product data after deletion", productData.meta)
    } else {
      // console.log("Key not found:", key);
    }
  };

  if (data !== undefined || null) {
    
    const dataLength = Object.keys(data).length
    if (dataLength <= 0) {
      return (
        <div className='w-full'>
          <Typography className='font-semibold' variant='h5' align='center'>
            There is no metafield available
          </Typography>
        </div>
      )
    }
  }
  
  const rows = Object.keys(data).map((key, index) => createData(key, data[key], index))

  if (data === undefined || null) {
    return <Typography>Given Data is not valid</Typography>
  }
  



  return (
    <Card className='w-full h-full'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 250 }}>
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
              {rows.map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column, index) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <Button
                              variant='contained'
                              color='error'
                              size='small'
                              onClick={() => handleDelete(row.key)}
                            >
                              {value}
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
      </Paper>
    </Card>
  )
}
