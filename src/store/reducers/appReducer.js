import { CREATE_APP, LOAD_APPS } from "../types";

const initialState = {
  apps: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_APPS:
      return {
        ...state,
        apps: action.payload,
      };
    case CREATE_APP:
      return {
        ...state,
        apps: [...state.apps, action.payload],
      };
    default:
      return state;
  }
};
