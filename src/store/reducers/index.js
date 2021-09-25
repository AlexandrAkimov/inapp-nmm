import {combineReducers} from 'redux'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'
import { loadingReducer } from './loadingReducer'

export const rootReducer = combineReducers({
  isAuth: authReducer,
  loading: loadingReducer,
  apps: appReducer
})