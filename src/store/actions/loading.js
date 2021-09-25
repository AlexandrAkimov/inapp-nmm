import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOADING } from "../types"

export const setLoading = (isLoading) => ({
  type: LOADING,
  payload: isLoading
})


