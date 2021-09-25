import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOGIN, LOGOUT } from "../types"
import { setLoading } from "./loading"

export const checkAuth = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    const token = await AsyncStorage.getItem('token')
    if (token) {
      dispatch(login())
    } else {
      dispatch(logout())
    }
    dispatch(setLoading(false))
  }
}

export const login = () => ({
  type: LOGIN
})

export const logout = () => ({
  type: LOGOUT
})

