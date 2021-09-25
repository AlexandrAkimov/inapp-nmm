import { LOAD_APPS } from "../types";

const initialState = {
  apps: []
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_APPS:
      return {
        ...state,
        apps: action.payload
      }
    default:
      return state
  }
  
}