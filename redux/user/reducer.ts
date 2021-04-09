import { SET_USER_AUTH, UserDispatchTypes } from './types'

export interface UserState {
  data: any
}

const defaultState: UserState = {
  data: null,
}

export const UserReducer = (state: UserState = defaultState, action: UserDispatchTypes) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return { ...state, data: action.payload }
    default:
      return state;
  }
}