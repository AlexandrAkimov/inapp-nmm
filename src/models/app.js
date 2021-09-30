// import {nanoid} from 'nanoid'
export class AdUnit {
  is_active = true;
  name = '';
  type = 1;
  sizes = [[1, 1]];
  params = []; // keep as object (not array)
  dfp_ad_unit_path = '';
  admob_ad_unit_path = '';
  admob_type = 1;
  admob_size = [1, 1];
  admob_native_size = 'small';
  admob_enable = false;
  ad_refresh = 1;
  position = 'sticky_top';
  inject_period = 1;
  inject_count = 1;
  is_between_articles = false;
  lazy_load = false;
  padding_top = 0;
  uniqId = Date.now().toString();
  geo = []
}

export class App {
  name = '';
  admob_app_id = '';
  is_active = true;
  url = '';
  api_key = '';
}

export class Activity {
  title = '';
  is_main = false;
}