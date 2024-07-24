import React from 'react'
import BrandTableList from '@/views/products/brands/BrandTableList'
export default function Brands({ brandsData }) {
    const tableData = brandsData.allBrand.map(brand => ({
        brandId: brand.brand_id,
        name: brand.brand_name,
        description: brand.brand_description,
        imageSrc: brand.brand_image_src,
        imageAlt: brand.brand_image_alt,
        productCount: brand.products_count,
        sortOrder: brand.sort_order,
      isDeleted: brand.is_deleted,
        id: brand._id,
      }))
      console.log(tableData)
  return (
    <div>
      <BrandTableList tableData={tableData} />
    </div>
  )
}
