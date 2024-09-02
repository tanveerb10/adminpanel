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

const Bulkimport = ({ TabValue, HeaderValue }) => {
  const [bulkFile, setBulkFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFailed, setIsFailed] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

  console.log(TabValue, 'namee tab info')
  console.log(HeaderValue, 'namee tab info')

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

    console.log(API_URLS[TabValue], 'Api urld and tab value ')
    // const urls = {
    //   uploadProductUrl: `${baseUrl}/admin/products/uploadProducts`,
    //   updateProductUrl: `${baseUrl}/admin/products/updateWholeProducts`,
    //   priceUpdateUrl: `${baseUrl}/admin/products/updatePrice`,
    //   categoryUpdateUrl: `${baseUrl}/admin/products/updateCategories`,
    //   metasUpdateUrl: `${baseUrl}/admin/products/bulkProductMeta`,
    //   inventoryUpdateUrl: `${baseUrl}/admin/products/updateStock`
    // }
    // useEffect(() => {
    // console.log(urls[TabValue], '==================================================check tabv value')
    // }, [urls])

    setLoading(true)

    try {
      // const url = urls[TabValue]
      const url = `${baseUrl}${API_URLS[TabValue]}`
      if (!url) {
        toast.error('API endpoint not found')
        return
      }
      const methods = ['productUploadTab', 'metasTab'].includes(TabValue) ? 'POST' : 'PUT'

      const response = await fetchData(
        // urls[TabValue],
        // urls[TabValue] == 'uploadProductUrl' || 'metasUpdateUrl' ? 'POST' : 'PUT',
        url,
        methods,
        formData,
        'file'
      )

      // switch (TabValue) {
      //   case 'productUploadTab': {
      //     const response = await fetchData(uploadProductUrl, 'POST', formData, 'file')
      //     break
      //   }
      //   case 'metasTab': {
      //     const response = await fetchData(metasUpdateUrl, 'POST', formData, 'file')
      //     break
      //   }
      //   case 'productUpdateTab': {
      //     const response = await fetchData(updateProductUrl, 'PUT', formData, 'file')
      //     break
      //   }
      //   case 'priceTab': {
      //     const response = await fetchData(priceUpdateUrl, 'PUT', formData, 'file')
      //     break
      //   }
      //   case 'categoryTab': {
      //     const response = await fetchData(categoryUpdateUrl, 'PUT', formData, 'file')
      //     break
      //   }
      //   case 'inventoryTab': {
      //     const response = await fetchData(inventoryUpdateUrl, 'PUT', formData, 'file')
      //     break
      //   }
      //   default: {
      //     toast.error("Api haven't called")
      //   }
      // }

      // const response = await fetchData(isUpdate ? updateUrl : uploadUrl, isUpdate ? 'PUT' : 'POST', formData, 'file')

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

  const getExportFile = async () => {
    const exportProductUrl = `${baseUrl}/admin/products/exportProductToCSV`
    // const updateProductUrl = `${baseUrl}/admin/products/updateWholeProducts`
    const priceExportUrl = `${baseUrl}/admin/products/exportPrice`
    const categoryExportUrl = `${baseUrl}/admin/products/exportCategories`
    // const metasExportUrl = `${baseUrl}/admin/products/bulkProductMeta`
    const inventoryExportUrl = `${baseUrl}/admin/products/exportStock`
    try {
      switch (TabValue) {
        case 'productUploadTab': {
          const response = await fetchData(exportProductUrl, 'GET')
          break
        }
        // case 'productUpdateTab': {
        //   const response = await fetchData(updateProductUrl, 'GET')
        //   break
        // }
        case 'priceTab': {
          const response = await fetchData(priceExportUrl, 'GET')
          break
        }
        case 'categoryTab': {
          const response = await fetchData(categoryExportUrl, 'GET')
          break
        }
        // case 'metasTab': {
        //   const response = await fetchData(metasUpdateUrl, 'GET')
        //   break
        // }
        case 'inventoryTab': {
          const response = await fetchData(inventoryExportUrl, 'GET')
          break
        }
        default: {
          toast.error("Api haven't called")
        }
      }
      // const response = await fetchData(`${baseUrl}/admin/products/exportBulkProducts`, 'GET')
      if (!response.success) {
        throw new Error('Got an error while exporting: ', response.message)
      }
      toast.success(response.message || 'Exported successfully')
      console.log(response.filePath)

      if (response.filePath) {
        const fileLink = `${baseUrl}${response.filePath}`

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
            <BulkHistoryTable callAgain={loading} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Bulkimport
