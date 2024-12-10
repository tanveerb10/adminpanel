import React from 'react'
import CategoriesTableList from '@/views/products/Categories/CategoriesTableList'
export default function Categories({
  categoriesData,
  limit,
  totalPages,
  handlePageChange,
  currentPage,
  handleLimitChange,
  totalCategories
}) {
  console.log('api se aaya hua data', categoriesData)
  const tableData = categoriesData?.map(category => ({
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

  // const totalCategories = CategoriesData.categoryCount
  console.log('mein to table data hu na categories me', tableData)
  return (
    <div>
      <CategoriesTableList
        tableData={tableData}
        totalCategories={totalCategories}
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  )
}
