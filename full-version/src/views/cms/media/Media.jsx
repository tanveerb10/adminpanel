'use client'

import { Button } from '@mui/material'
import AddHeader from '@/libs/components/AddHeader'
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick'
import AddMediaDialog from '@/views/cms/media/AddMediaDialog'
import MediaTableList from '@/views/cms/media/MediaTableList'

export default function Media({
  mediaData,
  limit,
  totalPages,
  handlePageChange,
  handleLimitChange,
  currentPage,
  totalMedia,
  fetchMediaDelete,
  fetchMediaData
}) {
  const ButtonProps = {
    className: 'cursor-pointer bs-full',
    variant: 'tonal',
    size: 'medium',
    children: 'Add Media',
    size: 'small'
  }

  function formatDate(RawTime) {
    const dates = new Date(RawTime)
    const date = ` ${dates.getDate()}/${dates.getMonth() + 1}/${dates.getFullYear()}`
    return date
  }

  function convertBytes(bytes) {
    if (bytes < 1024) {
      return `${bytes} bytes` // For values less than 1024 bytes, return as bytes
    } else if (bytes < 1024 * 1024) {
      // Convert to kilobytes (KB)
      const kb = (bytes / 1024).toFixed(2)
      return `${kb} KB`
    } else {
      // Convert to megabytes (MB)
      const mb = (bytes / (1024 * 1024)).toFixed(2)
      return `${mb} MB`
    }
  }

  const tableData = mediaData.map(
    media =>
      ({
        name: media.displayName,
        downloadLink: media.imageUrl,
        position: media.position,
        status: media.enable,
        type: media.type,
        height: media.height,
        width: media.width,
        id: media._id,
        size: convertBytes(media.size),
        date: formatDate(media.createdAt)
      }) || {}
  )
  return (
    <>
      <div className='flex justify-between items-center w-full' item xs={12}>
        <AddHeader title='All Media' />

        <OpenDialogOnElementClick
          element={Button}
          elementProps={ButtonProps}
          dialog={AddMediaDialog}
          dialogProps={{ fetchMediaData }}
        />
      </div>

      <MediaTableList
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        totalMedia={totalMedia}
        tableData={tableData}
        fetchMediaDelete={fetchMediaDelete}
      />
    </>
  )
}
