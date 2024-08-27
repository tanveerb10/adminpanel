'use client'
import React, { useState, useCallback } from 'react'
import { Button, Card, CardContent, Grid, Box, CardHeader } from '@mui/material'
import MetaDropZone from '@views/products/metas/MetaDropZone'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import fetchFormData from '@/utils/fetchFormData'
// import fetchData from '@/utils/fetchData'

const Metas = () => {
  const [metaFile, setMetaFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFailed, setIsFailed] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [fileUrl, setFileUrl] = useState(null)

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length && acceptedFiles[0].type === 'text/csv') {
      setMetaFile(acceptedFiles[0])
      setFileName(acceptedFiles[0].name)
    } else {
      setMetaFile(null)
      toast.error('Upload valid file', 'bottom')
      setFileName('')
    }
  }, [])

  const handleRemoveFile = () => {
    setMetaFile(null)
    setFileName('')
  }
  const handleUploadAgain = () => {
    setIsFailed(false)
  }
  const handleUploadFile = async () => {
    const formData = new FormData()
    formData.append('file', metaFile)

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/bulkProductMeta`

    setLoading(true)

    try {
      const response = await fetchFormData(apiUrl, 'POST', formData)
      console.log('data of response', response)

      if (response.success) {
        console.log('Data submitted successfully:', response)
        toast.success('File uploaded successfully')

        setMetaFile(null)
        setFileName('')
      } else if (!response.ok || response.fileUrl) {
        setFileUrl(response.fileUrl)
        console.log('response fileUrl', response.fileUrl)
        setIsFailed(true)
        setMetaFile(null)
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
      setMetaFile(null)
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
    // <>
    //   <Grid>
    //     <Card>
    //       <CardContent>
    //         {!isFailed ? (
    //           <>
    //             <MetaDropZone onDrop={onDrop} loading={loading} />
    //             {fileName ? (
    //               <>
    //                 <Box className='my-4 p-2' sx={{ border: '1px solid gray' }}>
    //                   <Grid container alignItems='center' spacing={2}>
    //                     <Grid item xs={12} md={8} justifyContent={{ xs: 'center', md: 'flex-center' }}>
    //                       <Grid container pl={3} alignItems='center' spacing={2}>
    //                         <Typography>{fileName}</Typography>
    //                       </Grid>
    //                     </Grid>

    //                     <Grid item xs={12} md={4}>
    //                       <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
    //                         <Grid item>
    //                           <Button onClick={handleRemoveFile}>Remove</Button>
    //                         </Grid>
    //                         {loading ? (
    //                           <Grid item>
    //                             <Button variant='contained'>Uploading...</Button>
    //                           </Grid>
    //                         ) : (
    //                           <Grid item>
    //                             <Button variant='contained' onClick={handleUploadFile} disabled={!MetaFile || loading}>
    //                               Upload file
    //                             </Button>
    //                           </Grid>
    //                         )}
    //                       </Grid>
    //                     </Grid>
    //                   </Grid>
    //                 </Box>
    //               </>
    //             ) : null}
    //           </>
    //         ) : (
    //           <>
    //             <div className='flex justify-center'>
    //               <Button variant='contained' className='text-center' onClick={handleUploadAgain}>
    //                 Upload Again
    //               </Button>
    //             </div>
    //             <Box className='my-4 p-2' sx={{ border: '1px solid gray' }}>
    //               <Grid container alignItems='center' spacing={2}>
    //                 <Grid item xs={12} md={8}>
    //                   <Grid
    //                     container
    //                     justifyContent={{ xs: 'center', md: 'flex-start' }}
    //                     alignItems='center'
    //                     spacing={2}
    //                   >
    //                     <Typography>{responseMessage} check</Typography>
    //                   </Grid>
    //                 </Grid>
    //                 <Grid item xs={12} md={4}>
    //                   <Grid container justifyContent={{ xs: 'center', md: 'flex-end' }} spacing={2}>
    //                     <Grid item>
    //                       {isFailed && fileUrl && (
    //                         <Button variant='contained' color='error' onClick={DownloadErrorFile}>
    //                           Download Error File
    //                         </Button>
    //                       )}
    //                     </Grid>
    //                   </Grid>
    //                 </Grid>
    //               </Grid>
    //             </Box>
    //           </>
    //         )}
    //       </CardContent>
    //     </Card>
    //     <Grid className='mt-3'>
    //       <Card>
    //         <CardHeader title={fileName} />
    //         <CardContent>
    //           <MetaHistoryTable />
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {!isFailed ? (
              <>
                <MetaDropZone onDrop={onDrop} loading={loading} />
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
                          <Button variant='contained' onClick={handleUploadFile} disabled={!metaFile || loading}>
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
    </Grid>
  )
}

export default Metas
