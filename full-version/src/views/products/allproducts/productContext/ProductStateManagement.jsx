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
    type_standard: '',
    published: '',
    is_deleted: false
  }

  const productChild = [
    {
      variant_sku: '',
      variant_inventory_qty: 0,
      variant_compare_at_price: null,
      variant_price: 0,
      variant_weight: 0,
      variant_length: 0,
      variation_weight_unit: 'g',
      variant_width: 0,
      variant_height: 0
    }
  ]

  const metafield = {}

  const productVideos = [
    {
      video_src: ''
    }
  ]
  const productImages = [
    {
      image_src: '',
      image_position: 1
    }
  ]

  const [productData, setProductData] = useState({
    parent: productParent,
    child: productChild,
    meta: metafield,
    images: productImages,
    videos: productVideos,
    isEdit: false
  })

  const updateProductParent = updateData => {
    // const containData = { ...productData.parent }
    // const updatedParent = { ...containData, ...updateData }
    setProductData(prevData => ({
      ...prevData,
      parent: { ...productData.parent, ...updateData }
    }))
  }
  const addProductMeta = updatedMetaData => {
    const addmeta = { ...productData.meta, ...updatedMetaData }
    setProductData(prevData => ({
      ...prevData,
      meta: { ...addmeta }
    }))
  }

  const deleteProductMeta = index => {
    const containMeta = { ...productData.meta }
    delete containMeta[index]
    setProductData(prevData => ({
      ...prevData,
      meta: { ...containMeta }
    }))
  }

  const deleteProductImages = index => {
    const updatedImages = [...productData.images]
    if (index >= 0 && index < updatedImages.length) {
      updatedImages.splice(index, 1)
      setProductData(prevData => ({
        ...prevData,
        images: updatedImages
      }))
    } else {
      console.error('Invalid index for deletion')
    }
  }

  function addProductImages() {
    setProductData(prevData => ({
      ...prevData,
      images: [...prevData.images, { image_src: '', image_position: 1 }]
    }))
  }

  const updateProductImages = (index, image_src) => {
    const updatedImages = [...productData.images]
    updatedImages[index].image_src = image_src
    setProductData(prevData => ({
      ...prevData,
      images: updatedImages
    }))
  }

  const updateProductVideos = (index, video_src) => {
    const updatedVideo = [...productData.videos]
    updatedVideo[index].video_src = video_src
    setProductData(prevData => ({
      ...prevData,
      videos: updatedVideo
    }))
  }
  const deleteProductVideos = index => {
    const updatedVideos = [...productData.videos]
    if (index >= 0 && index < updatedVideos.length) {
      updatedVideos.splice(index, 1)
      setProductData(prevData => ({
        ...prevData,
        videos: updatedVideos
      }))
    } else {
      console.error('Invalid index for deletion')
    }
  }

  const addProductVideos = () => {
    setProductData(prevData => ({
      ...prevData,
      videos: [...prevData.videos, { video_src: '' }]
    }))
  }

  const updateChildData = updateData => {
    setProductData(prevData => ({
      ...prevData,
      child: updateData
    }))
  }

  return (
    <ProductContext.Provider
      value={{
        productData,
        setProductData,
        updateChildData,
        addProductVideos,
        updateProductVideos,
        deleteProductVideos,
        addProductImages,
        updateProductImages,
        deleteProductImages,
        addProductMeta,
        deleteProductMeta,
        updateProductParent
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}
