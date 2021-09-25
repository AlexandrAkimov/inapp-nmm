import axios from "./axios";
import config from "./config";

export const loadAppInfo = (id, platform) => axios.post(config.appstore.getAppInfo, {id, platform}).then((resp) => resp.data.appInfo);