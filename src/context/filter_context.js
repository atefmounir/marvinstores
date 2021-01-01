import React, { useEffect, useContext, useReducer } from 'react'

import reducer from '../reducers/filter_reducer'
import {LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS,} from '../actions'
import { useProductsContext } from './products_context'



const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view:true,
  sort:'price-lowest',        //default value name takes from Sort component

}

const FilterContext = React.createContext()



export const FilterProvider = ({ children }) => {
  const {products}=useProductsContext()
  const [state,dispatch]=useReducer(reducer,initialState)

  useEffect(()=>{                                              //to load products from products context as a payload to be used in action. that on page rendering
    dispatch({type:LOAD_PRODUCTS,payload:products})
  },[products])

  useEffect(()=>{                                              //to load products each time sort is selected and receive different products values
    dispatch({type:SORT_PRODUCTS})
  },[products,state.sort])

  const setGridView=()=>{
    dispatch({type:SET_GRIDVIEW})
  }

  const setListView=()=>{
    dispatch({type:SET_LISTVIEW})
  }

  const updateSort=(event)=>{
    const value=event.target.value
    dispatch({type:UPDATE_SORT,payload:value})
  }

  return (
    <FilterContext.Provider value={{...state,setListView,setGridView,updateSort}}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
