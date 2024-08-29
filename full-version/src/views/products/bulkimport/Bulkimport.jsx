'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Card, CardContent, Grid, Box, Chip, CardHeader } from '@mui/material'
import BulkDropZone from './BulkDropZone'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import BulkHistoryTable from './BulkHistoryTable'
import fetchFormData from '@/utils/fetchFormData'
import fetchData from '@/utils/fetchData'

const Bulkimport = ({isUpdate}) => {
  const [bulkFile, setBulkFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFailed, setIsFailed] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

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
    const formData = new FormData()
    formData.append('file', bulkFile)

    const uploadUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/uploadProducts`
    const updateUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/updateWholeProducts`

    setLoading(true)

    try {
      const response = await fetchFormData(isUpdate?updateUrl:uploadUrl, isUpdate? "PUT":'POST', formData)
      console.log('data of response', response)

      if (response.success) {
        console.log('Data submitted successfully:', response)
        toast.success('File uploaded successfully')

        setBulkFile(null)
        setFileName('')
      } else if (!response.ok || response.fileUrl) {
        setFileUrl(response.fileUrl)
        console.log('response fileUrl', response.fileUrl)
        setIsFailed(true)
        setBulkFile(null)
        setFileName('')
        throw new Error(response.message)
      } else {
        setFileUrl(null)
        setIsFailed(false)
        console.log(fileUrl)
      }
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
  console.log(fileUrl)
  const DownloadErrorFile = () => {
    if (fileUrl) {
      window.location.href = fileUrl
    } else {
      toast.error('No file URL available for download')
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {!isFailed ? (
              <>
                <BulkDropZone onDrop={onDrop} loading={loading} />
                {fileName && (
                  <Box my={4} p={2} sx={{ border: '1px solid gray' }}>
                    <Grid container alignItems='center' spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Typography>{fileName}</Typography>
                      </Grid>
                      <Grid item xs={12} md={4} container justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
                        <Grid item>
                          <Button onClick={handleRemoveFile}>Remove</Button>
                        </Grid>
                        <Grid item>
                          <Button variant='contained' onClick={handleUploadFile} disabled={!bulkFile || loading}>
                            {loading ? 'Uploading...' : 'Upload file'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Box display='flex' justifyContent='center' mb={2}>
                  <Button variant='contained' onClick={handleUploadAgain}>
                    Upload Again
                  </Button>
                </Box>
                <Box my={4} p={2} sx={{ border: '1px solid gray' }}>
                  <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Typography>{responseMessage}</Typography>
                    </Grid>
                    <Grid item xs={12} md={4} container justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
                      {isFailed && fileUrl && (
                        <Grid item>
                          <Button variant='contained' color='error' onClick={DownloadErrorFile}>
                            Download Error File
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='History log' />
          <CardContent>
            <BulkHistoryTable callAgain={loading} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Bulkimport
