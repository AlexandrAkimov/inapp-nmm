import base from './base-url.js'
export default {
    app: {
        add: base.url + 'api-ui/v1/apps/save',
        delete: base.url + 'api-ui/v1/apps/delete',
        setActive: base.url + 'api-ui/v1/apps/pause',
        loadList: base.url + 'api-ui/v1/apps'
    },
    unit: {
        loadAll: base.url + 'api-ui/v1/ad-units',
        delete: base.url + 'api-ui/v1/ad-units/delete',
        update: base.url + 'api-ui/v1/ad-units/update',
        setActive: base.url + 'api-ui/v1/ad-units/pause'
    },
    activities: {
        loadAll: base.url + 'v1/activities',
        add: 'https://inapp.brainlyads.com/api/v1/register-screens',
    },
    statistics: {
        loadAll: 'https://inapp.brainlyads.com/report'
    },
    dictionary: {
        loadAll: 'https://inapp.brainlyads.com/api-ui/v1/geo'
    },
    appstore: {
        getAppInfo: base.url + 'api-ui/v1/appstore-info'
    },
    direct: {
        save: base.url + 'v1/direct-ads/save?ad_unit_id=',
        delete: base.url + 'v1/direct-ads/delete?ad_unit_id=',
        get: base.url + 'v1/direct-ads?ad_unit_id='
    }
}