import { LOADING, LOCAL_LOADING } from "../types";

const initialState = {
  loading: true,
  localLoading: false
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOCAL_LOADING:
      return {
        ...state,
        localLoading: action.payload,
      };
    default:
      return state;
  }
};
