// 'use client'
// import { Button } from '@mui/material'
// import React, { useState, useCallback } from 'react'
// import Dropzone from '@/utils/dropzone'

// const Bulkimport = () => {
//   const [bulkFile, setBulkFile] = useState(null)

//   const handleFileInput = event => {
//     const file = event.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = e => setBulkFile(e.target.result)
//       reader.readAsText(file)
//       reader.onerror = e => console.log('something wrong with file')
//     }
//   }

//   const onDrop = useCallback(acceptedFiles => {
//     acceptedFiles.forEach(file => {
//       const reader = new FileReader()
//       reader.onload = e => setBulkFile(e.target.result)
//       reader.readAsText(file)
//     })
//   }, [])
//   return (
//     <>
//       <Button variant='contained' component='label'>
//         CSV File Upload
//         <input type='file' hidden onChange={handleFileInput} />
//       </Button>
//       <div>
//         <Dropzone onDrop={onDrop} />
//       </div>
//     </>
//   )
// }

// export default Bulkimport
// ====================================================================================================================
// 'use client'
// import React, { useState, useCallback } from 'react'
// import { Button } from '@mui/material'
// import Dropzone from '@/utils/dropzone'
// import Typography from '@mui/material/Typography'
// import Cookies from 'js-cookie'
// import CryptoJS from 'crypto-js'

// // Third-party Imports
// import { toast } from 'react-toastify'

// // Function to generate nonce
// const generateNonce = () => CryptoJS.lib.WordArray.random(16).toString()

// // Function to generate a timestamp
// const generateTimestamp = () => Date.now().toString()

// // Function to generate a signature
// const generateSignature = (payloaddata, secret, nonce, timestamp) => {
//   const payload = `${payloaddata}|${nonce}|${timestamp}`
//   return CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex)
// }

// const Bulkimport = () => {
//   const [bulkFile, setBulkFile] = useState('')
//   const [loading, setLoading] = useState(0)

//   const handleFileInput = event => {
//     const file = event.target.files[0] // Adjusted to handle single file
//     if (file && file.type === 'text/csv') {
//       const reader = new FileReader()
//       reader.onload = e => setBulkFile(e.target.result)
//       reader.readAsText(file)
//     } else {
//       alert('Please upload valid CSV file.')
//     }
//   }

//   const onDrop = useCallback(acceptedFiles => {
//     // Process files here, e.g., set state or directly upload
//     if (acceptedFiles && acceptedFiles.type === 'text/csv') {
//       acceptedFiles.forEach(file => {
//         const reader = new FileReader()
//         reader.onload = e => setBulkFile(e.target.result)
//         // reader.readAsText(file)
//         console.log(reader)
//         console.log(bulkFile);
//       })
//     } else {
//       alert('upload valid csv file')
//     }
//   }, [])

//   const handleUploadFile = async () => {
//     const secret = process.env.NEXT_PUBLIC_SECRET_KEY
//     const token = Cookies.get('accessToken')

//     if (!secret) {
//       // setError('Secret key is not defined')
//       console.log('Secret key is not defined')
//       // setLoading(false)
//       return
//     }

//     if (!token) {
//       console.log('Token is not defined')
//       // setLoading(false)
//       return
//     }

//     const nonce = generateNonce()
//     const timestamp = generateTimestamp()
//     const signature = generateSignature(bulkFile, secret, nonce, timestamp)

//     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/uploadProducts`

//     const formData = new FormData()
//     formData.append('file', bulkFile)
//     try {
//       const response = await fetch(apiUrl, {
//         method:'POST' ,
//         headers: {

//           'livein-key': 'livein-key',
//           Nonce: nonce,
//           Timestamp: timestamp,
//           Signature: signature,
//           Authorization: `Bearer ${token}`
//         },
//         body: formData
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to fetch data, status: ${response.status}`)
//       }

//       const responseData = await response.json()
//       console.log('Data submitted successfully:', responseData)
//       toast.success('File uploaded Successfully')
//       // Handle success scenario (e.g., show success message, redirect, etc.)
//     } catch (error) {
//       console.error('Error submitting data:', error.message)
//       // Handle error scenario (e.g., show error message to the user)
//       toast.error('something wrong', 'bottom')
//     }
//   }
//   return (
//     <>
//       <Button variant='contained' component='label'>
//         CSV File Upload
//         <input type='file' accept='.csv' hidden onChange={handleFileInput} />
//       </Button>
//       <div>
//         <Dropzone onDrop={onDrop} />
//       </div>
//       <Button variant='contained' onClick={handleUploadFile}>
//         Upload file
//       </Button>
//     </>
//   )
// }

// export default Bulkimport

'use client'
import React, { useState, useCallback } from 'react'
import { Button, Card, CardContent, Grid, Box, Chip } from '@mui/material'
import Dropzone from '@/utils/dropzone'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'

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
  const [isUploadSuccess, setIsUploadSuccess] = useState(false)

  // const handleFileInput = event => {
  //   const file = event.target.files[0]
  //   if (file && file.type === 'text/csv') {
  //     const reader = new FileReader()
  //     reader.onload = e => {
  //       setBulkFile(file)
  //       setFileName(file.name)
  //       console.log(e.target.result)
  //     }
  //     reader.readAsText(file)
  //   } else {
  //     setBulkFile(null)
  //     toast.error('Upload valid file')
  //     setFileName('')
  //   }
  // }

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

      if (!response.ok) {
        throw new Error(`Failed to fetch data, status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log('Data submitted successfully:', responseData)
      toast.success('File uploaded successfully')
      setIsUploadSuccess(true)
    } catch (error) {
      console.error('Error submitting data:', error.message)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Grid>
        <Card>
          <CardContent>
            <Dropzone onDrop={onDrop} />
            {fileName && !isUploadSuccess ? (
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
            ) : // <Box className='my-4 p-2' sx={{ border: '1px solid gray' }}>
            //   <Grid container className='flex justify-between items-center'>
            //     <Typography>{fileName}</Typography>

            /* <Button variant='contained' component='label'>
                CSV File Upload
                <input type='file' accept='.csv' hidden onChange={handleFileInput} />
              </Button> */

            //     <Grid className='flex gap-3'>
            //     <Button onClick={handleRemoveFile}>Remove</Button>
            //     <Button variant='contained' onClick={handleUploadFile}>
            //       Upload file
            //     </Button>
            //     </Grid>
            //   </Grid>
            // </Box>
            null}
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Bulkimport
