import { combineReducers } from "redux";
import { CartReducer, CartState } from './cart/reducer'
import { ProductsReducer, ProductState } from './products/reducer'
import { UserReducer, UserState } from './user/reducer'

export interface ApplicationState {
  cart: CartState;
  products: ProductState
  user: UserState
}

export const RootReducer = combineReducers({
    cart: CartReducer,
    products: ProductsReducer,
    user: UserReducer
  });
