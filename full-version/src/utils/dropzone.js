// import { Button } from '@mui/material'
// import { useDropzone } from 'react-dropzone'
// import AppReactDropzone from '@/libs/styles/AppReactDropzone'

// function Dropzone({ open, onDrop }) {
//   const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({ onDrop })
//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ))
//   return (
//     <AppReactDropzone>
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()} />
//         <div className='text-center'>
//           {isDragActive ? <p>Release to drop the files here</p> : <p>Drag 'n' drop some files here</p>}
//         </div>

//         <Button variant='container' onClick={open}>
//           {' '}
//           click to select file
//         </Button>
//       </div>
//       <aside>
//         <ul>{files}</ul>
//       </aside>
//     </AppReactDropzone>
//   )
// }
// export default Dropzone

//===================================================================================================

// import React from 'react'
// import { useDropzone } from 'react-dropzone'
// import AppReactDropzone from '@/libs/styles/AppReactDropzone'

// // const Dropzone = ({ open, onDrop }) => {
// const Dropzone = ({ onDrop }) => {
//   const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
//     onDrop, // Call the provided onDrop function when files are dropped
//   })

//   const files = acceptedFiles.map((file) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ))

//   return (
//     <AppReactDropzone>
//       <div {...getRootProps({ className: 'dropzone' })}>
//         <input {...getInputProps()}/>
//         <div className='text-center'>
//           {isDragActive ? (
//             <p>Release to drop the files here</p>
//           ) : (
//             <p>Drag and drop CSV files here</p>
//           )}
//         </div>
//         {/* <Button variant='contained' onClick={open}>
//           Click to select file
//         </Button> */}
//       </div>
//       <aside>
//         <ul>{files}</ul>
//       </aside>
//     </AppReactDropzone>
//   )
// }

// export default Dropzone

import React from 'react'
import { useDropzone } from 'react-dropzone'
import AppReactDropzone from '@/libs/styles/AppReactDropzone'
import { Button } from '@mui/material'

const Dropzone = ({ onDrop }) => {
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
    <AppReactDropzone>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <div className='text-center'>
          {isDragActive ? (
            <p>Release to drop the files here</p>
          ) : (<>
              <p>Drag and drop CSV files here</p>
              <p>OR</p>
              <Button onClick={open}>Click to select file</Button>
              </>
          )}
        </div>
      </div>
      {/* <aside>
        <ul>{files}</ul>
      </aside> */}
    </AppReactDropzone>
  )
}

export default Dropzone
