
var CONFIG = {
    ENV : 'production',
    SHOP: {
        NAME: '',
        ACCESS_TOKEN: ''
    }
};

try {
    var CONFIG_LOCAL = require('./settings_local');
    for (var prop in CONFIG_LOCAL) {
        CONFIG[prop] = CONFIG_LOCAL[prop];
    }
} catch (e) {}

module.exports = CONFIG;
