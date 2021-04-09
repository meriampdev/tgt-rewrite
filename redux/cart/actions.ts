import { Dispatch } from "redux";
import {
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  CART_PROCESS_STATUS,
  CART_ERROR,
  CartDispatchTypes
} from "./types"

export const getCart = (store: any) => async (dispatch: Dispatch<CartDispatchTypes>) => {
  dispatch({ 
    type: CART_PROCESS_STATUS,
    payload: true
  })

  const storeState = store.getState()
  console.log('--- storeState', storeState)
}

export const addToCart = (data: any) => async (dispatch: Dispatch<CartDispatchTypes>) => {
  dispatch({ 
    type: ADD_TO_CART,
    payload: data
  })
}

export const removeFromCart = (data: any) => async (dispatch: Dispatch<CartDispatchTypes>) => {
  dispatch({ 
    type: REMOVE_FROM_CART,
    payload: data
  })
}