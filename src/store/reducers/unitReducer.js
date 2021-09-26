import { LOAD_UNITS } from "../types";

const initialState = {
  units: []
}

export const unitReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_UNITS:
      return {
        ...state,
        units: action.payload
      }
    default:
      return state
  }
  
}