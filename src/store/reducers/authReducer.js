import { CHECK_AUTH, LOGIN, LOGOUT } from "../types";

const initialState = {
  isAuth: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false
      }
    case CHECK_AUTH:
      return {
        ...state,
        isAuth: action.payload
      }
    default:
      return state
  }
  
}