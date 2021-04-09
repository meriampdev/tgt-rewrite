export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES'
export const PRODUCTS_PROCESS_STATUS = 'PRODUCTS_PROCESS_STATUS'
export const PRODUCTS_ERROR = 'PRODUCTS_ERROR'

export interface ProductsProcessing {
  type: typeof PRODUCTS_PROCESS_STATUS;
  payload: boolean;
}

export interface GetProducts {
  type: typeof GET_PRODUCTS;
  payload: any;
}

export interface GetProductCategories {
  type: typeof GET_PRODUCT_CATEGORIES;
  payload: any
}

export interface ProductsError {
  type: typeof PRODUCTS_ERROR;
  payload: any;
}

export type ProductDispatchTypes =
| ProductsProcessing
| GetProducts
| GetProductCategories
| ProductsError