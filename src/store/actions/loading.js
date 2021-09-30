import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOADING, LOCAL_LOADING } from "../types"

export const setLoading = (isLoading) => ({
  type: LOADING,
  payload: isLoading
})

export const setLocalLoading = (isLoading) => ({
  type: LOCAL_LOADING,
  payload: isLoading
})


