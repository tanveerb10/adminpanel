'use client'
import React, { useState, useCallback } from 'react'
import { Button, Card, CardContent, Grid, Box, Chip, CardHeader } from '@mui/material'
import BulkDropZone from './BulkDropZone'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'
import BulkHistoryTable from './BulkHistoryTable'

// Function to generate nonce
const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()

// Function to generate a timestamp
const generateTimestamp = () => Date.now().toString()

// Function to generate a signature
const generateSignature = (payloaddata, secret, nonce, timestamp) => {
  const payload = `${payloaddata}|${nonce}|${timestamp}`
  return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
}

const Bulkimport = () => {
  const [bulkFile, setBulkFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFailed, setIsFailed] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length && acceptedFiles[0].type === 'text/csv') {
      setBulkFile(acceptedFiles[0])
      setFileName(acceptedFiles[0].name)
    } else {
      setBulkFile(null)
      toast.error('Upload valid file', 'bottom')
      setFileName('')
    }
  }, [])

  const handleRemoveFile = () => {
    setBulkFile(null)
    setFileName('')
  }
  const handleUploadAgain = () => {
    setIsFailed(false)
  }
  const handleUploadFile = async () => {
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY
    const token = Cookies.get('accessToken')

    if (!secret) {
      console.log('Secret key is not defined')
      return
    }

    if (!token) {
      console.log('Token is not defined')
      return
    }

    const nonce = generateNonce()
    const timestamp = generateTimestamp()
    const formData = new FormData()
    formData.append('file', bulkFile)

    const signature = generateSignature(JSON.stringify(formData), secret, nonce, timestamp)

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/uploadProducts`
    setLoading(true)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'livein-key': 'livein-key',
          Nonce: nonce,
          Timestamp: timestamp,
          Signature: signature,
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message || `Failed to fetch data, status: ${response.status}`)
      }

      console.log('Data submitted successfully:', responseData)
      toast.success('File uploaded successfully')
      
      setBulkFile(null)
      setFileName('')
    } catch (error) {
      console.error('Error submitting data:', error.message)
      toast.error(`${error.message}`)
      setBulkFile(null)
      setFileName('')
      setIsFailed(true)
      setResponseMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Grid>
        <Card>
          <CardContent>
            {!isFailed ? (
              <>
                <BulkDropZone onDrop={onDrop} loading={loading} />
                {fileName ? (
                  <>
                    <Box className='my-4 p-2' sx={{ border: '1px solid gray' }}>
                      <Grid container alignItems='center' spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Typography>{fileName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
                            <Grid item>
                              <Button onClick={handleRemoveFile}>Remove</Button>
                            </Grid>
                            {loading ? (
                              <Grid item>
                                <Button variant='contained'>Uploading...</Button>
                              </Grid>
                            ) : (
                              <Grid item>
                                <Button variant='contained' onClick={handleUploadFile}>
                                  Upload file
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div className='flex justify-center'>
                  <Button variant='contained' className='text-center' onClick={handleUploadAgain}>
                    Upload Again
                  </Button>
                </div>
                <Box className='my-4 p-2' sx={{ border: '1px solid gray' }}>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography>{responseMessage}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
                        <Grid item>
                          <Button variant='contained' color='error' onClick={handleUploadFile}>
                            Download Error File
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
        <Grid className='mt-3'>
          <Card>
            <CardHeader title={ fileName} />
            <CardContent>
              <BulkHistoryTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Bulkimport
