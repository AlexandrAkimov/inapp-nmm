import { loadList } from "../../api/apps"
import { LOAD_APPS } from "../types"
import { setLoading } from "./loading"

const load = apps => ({
  type: LOAD_APPS,
  payload: apps
})

export const loadApps = () => {
  return async dispatch => {
    try {
      const apps = await loadList({})
      dispatch(load(apps))
    } catch (error) {
      new Error(`Error: ${error}`)
    }
  }
}



