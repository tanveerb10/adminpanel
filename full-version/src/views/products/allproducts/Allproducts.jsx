import React from 'react'
import ProductTableList from '@/views/products/allproducts/product-settings/productTable/ProductTableList'
const Allproducts = ({
  allProductData,
  fromMetas,
  limit,
  totalPages,
  handlePageChange,
  handleLimitChange,
  currentPage,
  totalProducts,
  handleSearch,
  value,
  setValue,
  resetFilter
}) => {
  const tableData = allProductData?.map(product => ({
    name: product?.product_title,
    description: product?.product_description,
    isDeleted: product?.is_deleted,
    id: product?._id,
    productBrand: product?.product_brand,
    productType: product?.product_type,
    productCategory: product?.default_category,
    productCount: product?.variation_count
  }))

  return (
    <div>
      <ProductTableList
        tableData={tableData}
        totalPages={totalPages}
        totalProducts={totalProducts}
        limit={limit}
        currentPage={currentPage}
        handleLimitChange={handleLimitChange}
        handlePageChange={handlePageChange}
        fromMetas={fromMetas}
        handleSearch={handleSearch}
        value={value}
        setValue={setValue}
        resetFilter={resetFilter}
      />
    </div>
  )
}

export default Allproducts
