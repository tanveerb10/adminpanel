'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Card, CardContent, Grid, Box, Chip, CardHeader } from '@mui/material'
import ProjectDropZone from '@/libs/components/ProjectDropZone'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import BulkHistoryTable from '@views/products/bulkSetting/bulkimport/BulkHistoryTable'
import fetchData from '@/utils/fetchData'
import BulkHeader from '@views/products/bulkSetting/bulkimport/BulkHeader'

const API_URLS = {
  productUploadTab: '/admin/products/uploadProducts',
  productUpdateTab: '/admin/products/updateWholeProducts',
  priceTab: '/admin/products/updatePrice',
  categoryTab: '/admin/products/updateCategories',
  metasTab: '/admin/products/bulkProductMeta',
  inventoryTab: '/admin/products/updateStock'
}

const exportUrls = {
  productUploadTab: `/admin/products/exportProductToCSV`,
  priceTab: `/admin/products/exportPrice`,
  categoryTab: `/admin/products/exportCategories`,
  inventoryTab: `/admin/products/exportStock`,
  metasTab: `/admin/products/exportProductMeta`
}

const Bulkimport = ({ TabValue, HeaderValue }) => {
  const [bulkFile, setBulkFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFailed, setIsFailed] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

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

  const baseUrl = process.env.NEXT_PUBLIC_API_URL_LIVE

  const handleUploadFile = async () => {
    const formData = new FormData()
    formData.append('file', bulkFile)

    setLoading(true)
    setUploadProgress(0)
    try {
      const url = `${baseUrl}${API_URLS[TabValue]}`
      if (!url) {
        toast.error('API endpoint not found')
        return
      }
      const methods = ['productUploadTab', 'metasTab'].includes(TabValue) ? 'POST' : 'PUT'

      const response = await fetchData(url, methods, formData, 'file', progress => {
        console.log(`upload Progress ${progress}%`)
        setUploadProgress(progress)
      })
      console.log(response, 'responseseses')
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

  const getExportFile = async () => {
    const urls = exportUrls[TabValue]
    const url = `${baseUrl}${urls}`

    try {
      if (!url) {
        toast.error('Api do not have endPoint')
        return
      }

      const response = await fetchData(url, 'GET')
      if (!response.success) {
        throw new Error('Got an error while exporting: ', response.message)
      }
      toast.success(response.message || 'Exported successfully')
      console.log(response.fileUrl)

      if (response.fileUrl) {
        const fileLink = response.fileUrl

        const link = document.createElement('a')
        link.href = fileLink
        link.download = fileLink.split('/').pop()
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (err) {
      toast.error(err.message || 'Failed to export products')
    }
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <BulkHeader HeaderValue={HeaderValue} handleExport={getExportFile} TabValue={TabValue} />
        {/* Progress Bar */}
        {/* {loading && ( */}
        <div>
          <progress value={uploadProgress} max='100'>
            {uploadProgress}%
          </progress>
          <p>{uploadProgress}%</p>
        </div>
        {/* )} */}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {!isFailed ? (
              <>
                <ProjectDropZone onDrop={onDrop} loading={loading} />
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
            <BulkHistoryTable callAgain={loading} TabValue={TabValue} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Bulkimport
