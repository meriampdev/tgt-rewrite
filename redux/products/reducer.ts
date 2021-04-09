import { 
  GET_PRODUCTS, 
  GET_PRODUCT_CATEGORIES,
  PRODUCTS_ERROR,
  PRODUCTS_PROCESS_STATUS,
  ProductDispatchTypes 
} from './types'

export interface ProductState {
  processing: boolean;
  data: any[];
  categories: any[];
  error?: string;
}

const defaultState: ProductState = {
  processing: false,
  data: [],
  categories: [],
  error: undefined
}
  
export const ProductsReducer = (state: ProductState = defaultState, action: ProductDispatchTypes) => {
  switch (action.type) {
    case PRODUCTS_PROCESS_STATUS:
      return {
        ...state, 
        processing: action.payload,
        error: undefined,
      }
    case GET_PRODUCTS:
      return { 
        ...state, 
        data: action.payload ,
        processing: false,
        error: undefined,
      }
    case GET_PRODUCT_CATEGORIES:
      return { 
        ...state, 
        categories: action.payload ,
        processing: false,
        error: undefined,
      }
    case PRODUCTS_ERROR:
      return { 
        ...state, 
        error: action.payload,
        processing: false
      }
    default:
      return state;
  }
}