export const SET_USER_AUTH = 'SET_USER_AUTH'

export interface SetUserAuth {
  type: typeof SET_USER_AUTH;
  payload: any;
}

export type UserDispatchTypes =
| SetUserAuth