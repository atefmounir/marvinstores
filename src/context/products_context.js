import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'

import {SIDEBAR_OPEN, SIDEBAR_CLOSE, GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_SINGLE_PRODUCT_BEGIN, GET_SINGLE_PRODUCT_SUCCESS, GET_SINGLE_PRODUCT_ERROR,} from '../actions'


const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products:[],
  featured_products:[],
  single_product_loading: false,
  single_product_error: false,
  single_product:{},
}
const ProductsContext = React.createContext()


export const ProductsProvider = ({ children }) => {
  const [state,dispatch] =useReducer(reducer,initialState)

  const openSidebar = ()=>{
    dispatch({type:SIDEBAR_OPEN})
  }
  const closeSidebar = ()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }

  const fetchProducts=async ()=>{
    dispatch({type:GET_PRODUCTS_BEGIN})
    try {
      const response = await fetch('/.netlify/functions/getAllProducts')
      const products=await response.json()
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:products})
    }catch(err){
      dispatch({type:GET_PRODUCTS_ERROR})
    }
  }

  const fetchSingleProduct =async (id)=>{
    dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
    try {
      const response = await fetch(`/.netlify/functions/getSingleProduct/?id=${id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          id:id
        })
      })
      const singleProduct=await response.json()
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:singleProduct})
    }catch(err){
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
    }
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <ProductsContext.Provider value={{...state,openSidebar,closeSidebar,fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}


export const useProductsContext = () => {
  return useContext(ProductsContext)
}
