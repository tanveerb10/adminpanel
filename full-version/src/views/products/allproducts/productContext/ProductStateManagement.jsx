import React, { createContext, useReducer, useContext } from "react";

const ProductContext = createContext()

const productReducer = (state, action) => {
    
        switch (action.type) {
          case 'ADD_OPTION':
            return { ...state, options: [...state.options, { type: 'Size', values: [''] }] };
          case 'DELETE_OPTION':
            return { ...state, options: state.options.filter((_, index) => index !== action.index) };
          case 'UPDATE_OPTION_TYPE':
            return {
              ...state,
              options: state.options.map((option, index) =>
                index === action.index ? { ...option, type: action.optionType } : option
              )
            };
          case 'UPDATE_OPTION_VALUE':
            return {
              ...state,
              options: state.options.map((option, optionIndex) =>
                optionIndex === action.optionIndex
                  ? {
                      ...option,
                      values: option.values.map((value, valueIndex) =>
                        valueIndex === action.valueIndex ? action.value : value
                      )
                    }
                  : option
              )
            };
          case 'ADD_OPTION_VALUE':
            return {
              ...state,
              options: state.options.map((option, index) =>
                index === action.optionIndex ? { ...option, values: [...option.values, ''] } : option
              )
            };
          case 'DELETE_OPTION_VALUE':
            return {
              ...state,
              options: state.options.map((option, optionIndex) =>
                optionIndex === action.optionIndex
                  ? { ...option, values: option.values.filter((_, valueIndex) => valueIndex !== action.valueIndex) }
                  : option
              )
            };
          case 'GENERATE_VARIANTS':
            return { ...state, variants: generateVariants(state.options) };
          default:
            return state;
        }
      
}

const ProductProvider = ({ children }) => {
    const initialState = {
      title: '',
      description: '',
      images: [],
      categories: [],
      tags: [],
      brand: '',
      published: '',
      countryOfOrigin: '',
      variants: [],
    };

  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
export default ProductProvider;