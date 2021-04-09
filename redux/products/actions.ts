import { Dispatch } from "redux";
import axios from 'axios'
import { 
  GET_PRODUCTS, 
  GET_PRODUCT_CATEGORIES,
  PRODUCTS_ERROR,
  PRODUCTS_PROCESS_STATUS,
  ProductDispatchTypes } from './types'

export const getProducts = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({ 
    type: PRODUCTS_PROCESS_STATUS,
    payload: true
  })

  try {
    let response = await axios.get('/api/v1/b2c/products')
    dispatch({ 
      type: GET_PRODUCTS,
      payload: response.data?.products ?? []
    })
  } catch (e) {
    dispatch({ 
      type: PRODUCTS_ERROR,
      payload: e.response ?? e
    })
  }
}

export const getProductCategories = () => async (dispatch: Dispatch<ProductDispatchTypes>) => {
  dispatch({ 
    type: PRODUCTS_PROCESS_STATUS,
    payload: true
  })

  try {
    let response = await axios.get('/api/v1/b2c/categories')
    dispatch({ 
      type: GET_PRODUCT_CATEGORIES,
      payload: response.data?.categories ?? []
    })
  } catch (e) {
    dispatch({ 
      type: PRODUCTS_ERROR,
      payload: e.response ?? e
    })
  }
}