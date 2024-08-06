'use client'
import React, { createContext, useState, useContext } from 'react'
const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
  
  const productParent = {
    brand_name: '',
    default_category: '',
    categories: [],
    product_title: '',
    product_description: '',
    product_type: '',
    tags: [],
    type_standard:'',
    published: "TRUE",
  }

  const productChild = [
    {
      variant_sku: '',
      variant_inventory_qty: 0,
      variant_compare_at_price: null,
      variant_price: 0,
      variant_weight: 0,
      variant_length: 0,
      variation_weight_unit: "g",
      variant_width: 0,
      variant_height: 0,
    }
  ]

  const metafield = {}

  const [productData, setProductData] = useState({
    parent: productParent,
    child: productChild,
    meta: metafield
  })

  const updateProductData = updatedData => {
    setProductData(prevData => ({
      parent: { ...prevData.parent, ...updatedData.parent },
      child: updatedData.child ? [...updatedData.child] : [...prevData.child],
      meta: { ...prevData.meta, ...updatedData.meta }
    }))
  }

  return <ProductContext.Provider value={{ productData, updateProductData }}>{children}</ProductContext.Provider>
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}
