import axios from "./axios";
import config from "./config";

export const loadUnits = (app_id) =>
  axios.post(config.unit.loadAll, { app_id }).then((resp) => resp.data.adUnits);

export const loadUnitActivities = (app_id) =>
  axios.post(config.unit.loadAll, { app_id }).then((resp) => resp.data.activities);

export const setActive = (id, is_active) =>
  axios.post(config.unit.setActive, { id, is_active });

export const updateUnit = (options) =>
  axios.post(config.unit.update, options);

export const deleteUnit = (id) => axios.post(config.unit.delete, { id });