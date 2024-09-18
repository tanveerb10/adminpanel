import React from 'react'
import PagesTable from '@/views/cms/pages/PagesTable'
const Pages = ({ data }) => {
  console.log(data, 'data from pages component')

  const tableData = Array.isArray(data?.result)
    ? data.result.map((col, index) => ({
        srno: index + 1,
        id: col._id,
        title: col.title,
        content: col.content
      }))
    : []

  const totalStaticPage = data.result?.length

  return (
    <>
      <PagesTable tableData={tableData} totalStaticPage={totalStaticPage} />
    </>
  )
}

export default Pages
