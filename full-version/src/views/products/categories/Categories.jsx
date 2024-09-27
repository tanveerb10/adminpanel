import React from 'react'
import CategoriesTableList from '@/views/products/Categories/CategoriesTableList'
export default function Categories({ CategoriesData }) {
  console.log('api se aaya hua data', CategoriesData)
  const tableData = CategoriesData.allCategory?.map(category => ({
    categoryId: category.category_id,
    name: category.category_name,
    description: category.category_description,
    imageSrc: category.imageUrl,
    imageAlt: category.category_image_alt,
    productCount: category.product_count,
    // sortOrder: category.sort_order,
    isDeleted: category.is_deleted,
    id: category._id
  }))

  const totalCategories = CategoriesData.categoryCount
  console.log('mein to table data hu na categories me', tableData)
  return (
    <div>
      <CategoriesTableList tableData={tableData} totalCategories={totalCategories} />
    </div>
  )
}
