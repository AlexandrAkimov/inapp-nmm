import { loadList, save } from "../../api/apps"
import { CREATE_APP, LOAD_APPS } from "../types"
import * as RootNavigation from '../../navigation/RootNavigation';
import { setLoading } from "./loading"

const load = apps => ({
  type: LOAD_APPS,
  payload: apps
})

const createApp = app => ({
  type: CREATE_APP,
  payload: app
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

export const saveApp = (app) => {
  return async dispatch => {
    try {
      await save(app)
      dispatch(loadApps())
      if (app.id) {
        
      }
      
    } catch (error) {
      new Error(`Error: ${error}`)
    }
  }
}



