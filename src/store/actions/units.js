import { loadUnits } from "../../api/adunits"
import { LOAD_UNITS } from "../types"
import { setLoading } from "./loading"

const load = units => ({
  type: LOAD_UNITS,
  payload: units
})

export const getUnits = (appId) => {
  return async dispatch => {
    try {
      const units = await loadUnits(appId)
      console.log('API units', units);
      dispatch(load(units))
    } catch (error) {
      new Error(`Error: ${error}`)
    }
  }
}



