export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CART_PROCESS_STATUS = 'CART_PROCESS_STATUS'
export const CART_ERROR = 'CART_ERROR'

export interface CartProcessStatus {
  type: typeof CART_PROCESS_STATUS;
  payload: boolean;
}

export interface GetCart {
  type: typeof GET_CART;
  payload: any;
}

export interface AddToCart {
  type: typeof ADD_TO_CART;
  payload: any;
}

export interface UpdateCart {
  type: typeof UPDATE_CART;
  payload: any;
}

export interface RemoveFromCart {
  type: typeof REMOVE_FROM_CART;
  payload: any;
}

export interface CartError {
  type: typeof CART_ERROR;
  payload?: string;
}

export type CartDispatchTypes =
| CartProcessStatus
| GetCart
| AddToCart
| UpdateCart
| RemoveFromCart
| CartError