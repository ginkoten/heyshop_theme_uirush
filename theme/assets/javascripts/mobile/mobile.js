var mobileTemplate = require('./snippets/mobile.njk');

function renderAll() {
    // HeyShop.njkenv.renderString(mobileTemplate, {
    //     global: HEYSHOP_DATA.shop.theme.settings_data,
    //     shop: HEYSHOP_DATA.shop,
    //     page: HEYSHOP_DATA.page,
    //     product: HEYSHOP_DATA.product,
    //     categories: HEYSHOP_DATA.categories
    // }, function(err, res) {
    //     $("#mobile-components-root").html(res).addClass("page_" + HEYSHOP_DATA.page.page_type);

    //     var loading = require('./loading');
    //     var header = require('./header');
    //     var drawer = require('./drawer');
    //     var bottom_menu = require('./bottom_menu');
    //     var category = require('./category');
    //     var product_detail = require('./product_detail');


    //     HeyShop.mobile = {};
    //     HeyShop.mobile.menuDrawerOpen = drawer.menuDrawerOpen;
    //     HeyShop.mobile.menuDrawerClose = drawer.menuDrawerClose;
    //     HeyShop.mobile.menuDrawerbelowheader = drawer.menuDrawerbelowheader;
    //     HeyShop.mobile.categoryDrawerOpen = drawer.categoryDrawerOpen;
    //     HeyShop.mobile.categoryDrawerClose = drawer.categoryDrawerClose;
    //     HeyShop.mobile.skuDrawerOpen = drawer.skuDrawerOpen;
    //     HeyShop.mobile.skuDrawerClose = drawer.skuDrawerClose;
    //     HeyShop.mobile.addtocart = product_detail.addtocart;
    //     HeyShop.mobile.immbuy = product_detail.immbuy;

    //     header.setEvents();
    //     drawer.setEvents();
    //     product_detail.setEvents();
    //     bottom_menu.setEvents();
    //     // loading.setEvents();
    // });
}

module.exports = {
    renderAll: renderAll
}


