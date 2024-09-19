'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import fetchData from '@/utils/fetchData'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { toast } from 'react-toastify'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import ProductFormWrapper from '@views/products/allproducts/product-settings/add/ProductFormWrapper'

export default function Page() {
  const { productData, setProductData, updateDataOption } = useProduct()
  const [brandData, setBrandData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { role } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    if (role !== 'superadmin') {
      const timer = setTimeout(() => {
        router.push('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [role, router])

  useEffect(() => {
    const brandUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/brands`
    fetchData(brandUrl, 'GET')
      .then(response => {
        setBrandData(response)
      })
      .catch(error => {
        toast.error('error got in brand', error)
        console.log('error got in brand', error)
      })
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const categoryUrl = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/categories`
      const response = await fetchData(categoryUrl, 'GET')

      // setCategoryData(response.allCategory.map(option => option.category_name) || [])
      const categories = response.allCategory.map(option => option.category_name)
      setCategoryData(categories)
      updateDataOption(categories)
    } catch (error) {
      toast.error('Error fetching categories')
      setLoading(false)
    }
  }, [])
  // }, [updateDataOption])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  console.log('categoy', categoryData)

  useEffect(() => {
    if (id !== 'addnewproduct') {
      const getSingleProduct = `${process.env.NEXT_PUBLIC_API_URL_LIVE}/admin/products/getproduct/${id}`
      setLoading(true)
      try {
        fetchData(getSingleProduct, 'GET').then(response => {
          handleEdit(response)
          console.log('Get single product data', response)
          setLoading(false)
        })
      } catch (error) {
        console.log('error got', error)
        setError('error got in brand', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  }, [id])

  const handleEdit = singleProductData => {
    const singleParent = singleProductData?.finalProduct?.products[0]
    console.log('singleeeeeee', singleParent)
    const singleVideo = singleProductData?.finalProduct?.videos
    const singleImage = singleProductData?.finalProduct.images
    if (singleParent) {
      const {
        brand_name,
        default_category,
        categories,
        product_description,
        product_title,
        product_type,
        is_deleted,
        tags,
        published,
        type_standard,
        metafields,
        ...rest
      } = singleParent

      const parData = {
        brand_name,
        default_category,
        categories,
        product_description,
        product_title,
        product_type,
        tags,
        published,
        type_standard
      }
      const parmeta = metafields

      const childData = singleProductData?.finalProduct?.products?.map(childVariant => {
        const {
          brand_name,
          default_category,
          categories,
          product_description,
          product_title,
          product_type,
          is_deleted,
          tags,
          published,
          type_standard,
          metafields,
          ...rest
        } = childVariant
        return rest
      })

      setProductData({
        parent: parData,
        meta: parmeta,
        videos: singleVideo,
        images: singleImage,
        child: childData,
        isEdit: true,
        dataOption: categoryData
      })
    }
  }

  if (loading || !productData) {
    // need to check loading
    return <div>Loading...</div>
  }

  if (error) {
    return <div>No data available or {error}</div>
  }

  if (id == 'addnewproduct') {
    return (
      <>
        <ProductFormWrapper brandData={brandData} isAddProduct={true} />
      </>
    )
  }
  return (
    <>
      <ProductFormWrapper
        brandData={brandData}
        initialData={productData.parent}
        id={id}
        categoryoption={categoryData}
      />
    </>
  )
}
