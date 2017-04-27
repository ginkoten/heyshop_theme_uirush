
var products = require('./products/products');
var ajaxCart = require('./cart/ajax_cart');
var drawerLeft = require('./drawer/left_drawer');
// var mobileNav = require('./navigation/mobile_nav');
var collectProducts = require('./products/collect_products')
//var mobile = require('./mobile/mobile');


var Rush = window.Rush = {};

Rush.ajaxCart = ajaxCart;
Rush.drawerLeft = drawerLeft;
Rush.productQuickview = products.quickview;
Rush.renderCollectProducts = collectProducts.renderPage;
Rush.renderCollectProductsNext = collectProducts.renderNext;
Rush.collectProductQuickview = collectProducts.quickview;

$('body').on('click', '.js-input-qty__adjust', function() {
    var $parent = $(this).closest('.js-input-qty');
    var $input = $parent.find('input');
    var val = +$input.val() || 0;
    if ($(this).hasClass('js-input-qty__adjust--plus')) val += 1;
    if ($(this).hasClass('js-input-qty__adjust--minus')) val -= 1;
    val = Math.max(1, val);
    $input.val(val);
    $input.trigger('change');
});

$('body').on('click', '.mobile-nav__toggle', function() {
    $(this).parent().toggleClass('mobile-nav--expanded');
});

$('body').on('click', '.js-toggle-dropdown', function(e) {
    $(e.target).closest('.js-dropdown-content').toggleClass('opened');
});

(function() {
    HeyShop.social.renderChoices(
        [{
            "name": "wechat-mobile",
            "icon": "icon-wechat2"
        }, {
            "name": "weibo",
            "icon": "icon-weibo"
        }, {
            "name": "douban",
            "icon": "icon-douban"
        }]
    );
})();
