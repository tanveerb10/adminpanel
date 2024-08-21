import React from 'react'
import ProductTableList from '@/views/products/allproducts/product-settings/productTable/ProductTableList'
const Allproducts = ({ allProductData }) => {
  const tableData = allProductData.allProduct?.map(product => ({
    name: product.product_title,
    description: product.product_description,
    isDeleted: product.is_deleted,
    id: product._id,
    productBrand: product.product_brand,
    productType: product.product_type,
    productCategory: product.default_category
  }))

  const totalProducts = allProductData.productCount

  return (
    <div>
      <ProductTableList tableData={tableData} totalProducts={totalProducts} />
    </div>
  )
}

export default Allproducts
