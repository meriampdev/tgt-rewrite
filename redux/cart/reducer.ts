import {
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  CART_PROCESS_STATUS,
  CART_ERROR,
  CartDispatchTypes
} from "./types"

export interface CartState {
  processing: boolean;
  data: any[];
  error?: string;
}

const defaultState: CartState = {
  processing: false,
  data: [],
  error: undefined
}

export const CartReducer = (state: CartState = defaultState, action: CartDispatchTypes) => {
  switch (action.type) {
    case CART_PROCESS_STATUS:
      return {
        ...state, 
        pending: action.payload,
        error: undefined,
      }
    case GET_CART:
      return { 
        ...state, 
        data: action.payload ,
        pending: false,
        error: undefined,
      }
    case ADD_TO_CART:
    {
      let cart = [ ...state.data, action.payload ]
      return { 
        ...state, 
        data: cart,
        pending: false,
        error: undefined,
      }
    }
    case REMOVE_FROM_CART: 
    {
      let cart = state.data.filter((f: any) => f.productId !== action.payload.productId)
      console.log('cart',cart)
      return { 
        ...state, 
        data: cart,
        pending: false,
        error: undefined,
      }
    }
    case CART_ERROR:
      return { 
        ...state, 
        error: action.payload,
        pending: false
      }
    default:
      return state;
  }
}