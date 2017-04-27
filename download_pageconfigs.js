// const Uploader = require('heyshop-theme-upload');
const Uploader = require('../heyshop-theme-upload/index');
const settings = require('./settings/settings')

const uploader = Uploader({
  api_origin: 'http://heidianapi.com',
  // api_origin: 'http://api.xiaoheidian.com',
  // api_origin: 'http://localhost:8000',
  auth: {
    shop_name: settings.SHOP.NAME,
    shop_access_token: settings.SHOP.ACCESS_TOKEN
  }
});

uploader.download_pageconfigs();
