import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const ProjectDropZone = ({ onDrop, loading }) => {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive, open } = useDropzone({
    multiple: false,

    onDrop
  })

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <>
    
      <AppReactDropzone className='relative'>
        {loading ? (
          <div className='absolute bg-black/30 z-50 h-full w-full flex items-center justify-center cursor-not-allowed'>
            <CircularProgress size={40} color='inherit' />
          </div>) : (null)}
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className='text-center'>
              {isDragActive ? (
                <p>Release to drop the files here</p>
              ) : (
                <>
                  <p>Drag and drop CSV files here</p>
                  <p>OR</p>
                  <Button onClick={open}>Click to select file</Button>
                </>
              )}
            </div>
          </div>
        </AppReactDropzone>
      
    </>
  )
}

export default ProjectDropZone
