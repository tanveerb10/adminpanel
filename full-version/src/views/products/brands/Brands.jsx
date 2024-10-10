import React, { useMemo } from 'react'
import BrandTableList from '@/views/products/brands/BrandTableList'

export default function Brands({
  brandsData,
  limit,
  totalPages,
  handlePageChange,
  currentPage,
  handleLimitChange,
  totalBrands
}) {
  // const { allBrand = [] } = brandsData || {}

  const tableData = brandsData.map(
    brand =>
      ({
        brandId: brand.brand_id,
        name: brand.brand_name,
        description: brand.brand_description,
        imageSrc: brand.brand_image_src,
        imageAlt: brand.brand_image_alt,
        productCount: brand.products_count,
        sortOrder: brand.sort_order,
        isDeleted: brand.is_deleted,
        id: brand._id
      }) || {}
  )
  // }, [allBrand])
  console.log(tableData)

  // const totalBrands = brandsData.brandCount || 0

  return (
    <div>
      <BrandTableList
        tableData={tableData}
        totalBrands={totalBrands}
        limit={limit}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  )
}
