// import React, { createContext, useReducer, useContext } from 'react'

// const ProductContext = createContext()

// const productReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_OPTION':
//       return { ...state, options: [...state.options, { type: 'Size', values: [''] }] }
//     case 'DELETE_OPTION':
//       return { ...state, options: state.options.filter((_, index) => index !== action.index) }
//     case 'UPDATE_OPTION_TYPE':
//       return {
//         ...state,
//         options: state.options.map((option, index) =>
//           index === action.index ? { ...option, type: action.optionType } : option
//         )
//       }
//     case 'UPDATE_OPTION_VALUE':
//       return {
//         ...state,
//         options: state.options.map((option, optionIndex) =>
//           optionIndex === action.optionIndex
//             ? {
//                 ...option,
//                 values: option.values.map((value, valueIndex) =>
//                   valueIndex === action.valueIndex ? action.value : value
//                 )
//               }
//             : option
//         )
//       }
//     case 'ADD_OPTION_VALUE':
//       return {
//         ...state,
//         options: state.options.map((option, index) =>
//           index === action.optionIndex ? { ...option, values: [...option.values, ''] } : option
//         )
//       }
//     case 'DELETE_OPTION_VALUE':
//       return {
//         ...state,
//         options: state.options.map((option, optionIndex) =>
//           optionIndex === action.optionIndex
//             ? { ...option, values: option.values.filter((_, valueIndex) => valueIndex !== action.valueIndex) }
//             : option
//         )
//       }
//     case 'GENERATE_VARIANTS':
//       return { ...state, variants: generateVariants(state.options) }
//     default:
//       return state
//   }
// }

// export const ProductProvider = ({ children }) => {
//   const initialState = {
//     title: '',
//     description: '',
//     images: [],
//     categories: [],
//     tags: [],
//     brand: '',
//     published: '',
//     countryOfOrigin: '',
//     variants: []
//   }

//   const [state, dispatch] = useReducer(productReducer, initialState)

//   return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>
// }

// export const useProduct = () => useContext(ProductContext)

// ProductContext.js

// Create the context

// Initial state for the context
// const initialState = {
//   products: [],
//   images: [],
//   videos: []
// }

// const [products, setProducts] = useState([])
// const [images, setImages] = useState([])
// const [videos, setVideos] = useState([])

// Reducer function to manage state changes
// const productReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_PRODUCT':
//       return {
//         ...state,
//         products: [...state.products, action.payload]
//       }
//     case 'REMOVE_PRODUCT':
//       return {
//         ...state,
//         products: state.products.filter((product, index) => index !== action.payload)
//       }
//     case 'UPDATE_PRODUCT':
//       return {
//         ...state,
//         products: state.products.map((product, index) =>
//           index === action.payload.index ? action.payload.newProduct : product
//         )
//       }
//     case 'SET_IMAGES':
//       return {
//         ...state,
//         images: action.payload
//       }
//     case 'SET_VIDEOS':
//       return {
//         ...state,
//         videos: action.payload
//       }
//     case 'RESET_PRODUCTS':
//       return {
//         ...state,
//         products: []
//       }
//     case 'RESET_ALL':
//       return {
//         ...initialState
//       }
//     default:
//       return state
//   }
// }

// Provider component
// const addProduct = product => {
//   setProducts([...products, product])
// }

// const addImage = image => {
//   setImages([...images, image])
// }

// const addVideo = video => {
//   setVideos([...videos, video])
// }

//   const [state, dispatch] = useReducer(productReducer, initialState)

//   // Define any functions that update the state
//   const addProduct = product => {
//     dispatch({ type: 'ADD_PRODUCT', payload: product })
//   }

//   const removeProduct = index => {
//     dispatch({ type: 'REMOVE_PRODUCT', payload: index })
//   }

//   const updateProduct = (index, newProduct) => {
//     dispatch({ type: 'UPDATE_PRODUCT', payload: { index, newProduct } })
//   }

//   const setImages = images => {
//     dispatch({ type: 'SET_IMAGES', payload: images })
//   }

//   const setVideos = videos => {
//     dispatch({ type: 'SET_VIDEOS', payload: videos })
//   }

//   const resetProducts = () => {
//     dispatch({ type: 'RESET_PRODUCTS' })
//   }

//   const resetAll = () => {
//     dispatch({ type: 'RESET_ALL' })
//   }

// <ProductContext.Provider
//   value={{
//     state,
//     addProduct,
//     removeProduct,
//     updateProduct,
//     setImages,
//     setVideos,
//     resetProducts,
//     resetAll
//   }}
// >
//   {children}
// </ProductContext.Provider>

'use client'
import React, { createContext, useState, useContext } from 'react'
const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
  const productParent = { brand_name: '',
    default_category: '',
    category_name: '',
    category_description: '',
    category_slug: '',
    category_sort: '',
    product_title: '',
    product_description: '',
    product_slug: '',
    product_type: '',
    tag_name: '',
    slug: '',
    country_of_origin: '', // optional only edit
    published: true, // optional only edit
  }

  const productChild = [{variant_sku: '',
    variant_inventory_qty: 0,
    variant_compare_at_price: null,
    variant_price: 0,
    variant_weight: 0,
    variant_length: 0,
    variant_width: 0,
    variant_height: 0,
    variant_tax: 0,
  }]
  const metafield = {}
  const [productData, setProductData] = useState({
    parent: productParent,
    child: productChild,
    meta : metafield
  })

  const updateProductData = (updatedData) => {
    setProductData(prevData => ({
      parent: { ...prevData.parent, ...updatedData.parent },
      child: updatedData.child ? [...updatedData.child] : [...prevData.child],
      meta: { ...prevData.meta, ...updatedData.meta },
    }));
  };
  


  return <ProductContext.Provider value={{ productData, updateProductData }}>{children}</ProductContext.Provider>
}

export const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}
