import { Dispatch } from "redux";
import { SET_USER_AUTH, UserDispatchTypes } from './types'

export const setUserAuth = (data: any) => async (dispatch: Dispatch<UserDispatchTypes>) => {
  dispatch({ 
    type: SET_USER_AUTH,
    payload: data
  })
}