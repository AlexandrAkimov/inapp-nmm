import axios from './axios';
import config from './config.js'
export const loadList = () => axios.post(config.app.loadList, {})
  .then(resp => resp.data.data.map(item => ({
    ...item,
    // created_at: item.created_at ? parseISO(item.created_at) : null,
    // deleted_at: item.created_at ? parseISO(item.deleted_at) : null,
    // updated_at: item.updated_at ? parseISO(item.updated_at) : null,
  })));

  export const save = app => axios.post(config.app.add, app);