import React from 'react'
import CategoriesTableList from '@/views/products/Categories/CategoriesTableList'
export default function Categories({ CategoriesData }) {
    const tableData = CategoriesData.allCategories.map(Categories => ({
        CategoriesId: Categories.Categories_id,
        name: Categories.Categories_name,
        description: Categories.Categories_description,
        imageSrc: Categories.Categories_image_src,
        imageAlt: Categories.Categories_image_alt,
        productCount: Categories.products_count,
        sortOrder: Categories.sort_order,
      isDeleted: Categories.is_deleted,
        id: Categories._id,
      }))
      console.log(tableData)
  return (
    <div>
      <CategoriesTableList tableData={tableData} />
    </div>
  )
}
