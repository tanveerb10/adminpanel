import React from 'react'
import MetasDetailForm from '@/views/products/metas/MetasDetailForm'
export default function Metas({ isAddMetas, newmeta, id, metaData }) {
  // if(metaData.key_words.length)
  // isAddMetas
  return (
    <div>
      Metas
      <MetasDetailForm isAddMetas={isAddMetas} id={id} newmeta={newmeta} metaData={metaData} />
    </div>
  )
}
