import React from 'react'
import ProductTableList from '@/views/products/allproducts/product-settings/ProductTableList'
const Allproducts = ({ allProductData }) => {
  console.log(allProductData, 'alllllllllllll')
  const tableData = allProductData.allProduct?.map(product => ({
    // brandId: product.brand_id,
    name: product.product_title,
    description: product.product_description,
    // imageSrc: product.brand_image_src,
    // imageAlt: product.brand_image_alt,
    // productCount: product.products_count,
    // sortOrder: product.sort_order,
    isDeleted: product.is_deleted,
    id: product._id,
    productBrand: product.product_brand,
    productType: product.product_type,
    productCategory: product.default_category
  }))
  console.log(tableData, 'table tadata')

  const totalProducts = allProductData.productCount

  return (
    <div>
      <ProductTableList tableData={tableData} totalProducts={totalProducts} />
    </div>
  )
}

export default Allproducts
