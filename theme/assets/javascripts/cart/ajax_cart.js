
const cartTemplate = require('./ajax_cart.njk');
const cartLineTemplate = require('./ajax_cart_line.njk');

var $cart = $('<div class="ajax_cart hidden"></div>');
$cart.appendTo('body');

function renderCart() {

    var cartHtml = HeyShop.njkenv.renderString(cartTemplate, {
        cart: HeyShop.cart.data
    });
    $cart.html(cartHtml);
    if(HeyShop.CustomerToken.get()) {
        $('body').find('.js-login-hide').addClass('hidden');
        $('body').find('.js-login-show.hidden').removeClass('hidden');
    } else {
        $('body').find('.js-login-hide.hidden').removeClass('hidden');
        $('body').find('.js-login-show').addClass('hidden');
    }

    $('.js-logout').on('click', function() {
        HeyShop.CustomerToken.clear();
        location.reload();
    });
    if (HeyShop.cart.count() <= 0) {
        $cart.find('.btn-checkout').attr('disabled', 'disabled').attr("href","javascript:void(0);");
    }
}


HeyShop.cart.on('change', renderCart);
if (HeyShop.ComponentsReady) {
    renderCart();
} else {
    HeyShop.on('ComponentsReady', renderCart);
}

function close() {
    $cart.addClass('hidden');
    $('body').off('click', close);
}

function open($el) {
    if ($cart.hasClass('hidden')) {
        if ($el) {
            $cart.css({
                top: $el.outerHeight() + $el.offset().top - $(window).scrollTop(),
                right: $(window).width() - $el.offset().left - $el.outerWidth()
            });
        } else {
            $cart.css({ top: 15, right: 15 });
        }
        $cart.removeClass('hidden');
        setTimeout(function() {
            $('body').on('click', close);
        }, 300);
    }
}

$cart.on('click', function(e){
    e.stopPropagation && e.stopPropagation();
});

module.exports = {
    open: open,
    close: close
}
