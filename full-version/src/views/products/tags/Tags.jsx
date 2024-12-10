import React from 'react'
import TagsTableList from '@/views/products/Tags/TagsTableList'
export default function Tags({
  tagsData,
  limit,
  totalPages,
  handlePageChange,
  currentPage,
  handleLimitChange,
  totalTags,
  fetchTags
}) {
  console.log('api se aaya hua data', tagsData)
  const tableData = tagsData?.map(tag => ({
    tagId: tag.tag_id,
    name: tag.tag_name,
    id: tag._id
  }))

  // const totalTags = TagsData.tagCount
  console.log('mein to table data hu na tags me', tableData)
  return (
    <div>
      <TagsTableList
        tableData={tableData}
        totalTags={totalTags}
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        fetchTags={fetchTags}
      />
    </div>
  )
}
