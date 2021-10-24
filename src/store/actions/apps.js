import { loadList, save } from "../../api/apps"
import { CREATE_APP, LOAD_APPS } from "../types"
import * as RootNavigation from '../../navigation/RootNavigation';
import { setLoading, setLocalLoading } from "./loading"
import { getUnits } from "./units";

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

      dispatch(setLocalLoading(true))
      delete app.app.activities_count
      await save(app)
      await dispatch(loadApps())
      await dispatch(getUnits(app.app.id))
      if (!app.app.id) {
        RootNavigation.navigate('MainApp')
      } else if (!app.adUnits.every(u => u.id)) {
        RootNavigation.navigate('App', {app: app.app})
      } 

      dispatch(setLocalLoading(false))
    } catch (error) {
      new Error(`Error: ${error}`)
    }
  }
}



