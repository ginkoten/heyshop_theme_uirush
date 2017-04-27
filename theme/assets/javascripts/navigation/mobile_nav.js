
const navTemplate = require('./mobile_nav.njk');

if (HEYSHOP_DATA.page.page_type != 'product') {
    var $nav = $('<div></div>');
    $nav.appendTo('body');

    var navHtml = HeyShop.njkenv.renderString(navTemplate, {
        global: HEYSHOP_DATA.shop.theme.settings_data
    }, function(err, res) {
        $nav.html(res);
    });

    if (Modernizr.touchevents) {
        $nav.on('click', '.site-nav--has-dropdown > a', function(e) {
            e.preventDefault && e.preventDefault();
            $(this).parent().toggleClass('nav-hover').siblings().removeClass('nav-hover');
        });
    }
}

module.exports = {}
