var $bottom_detail = $("#mobile-components-root").find(".mobile_bottom_menu_productbuy");
var $button_immbuy = $bottom_detail.find('.mobile_bottom_btn--immbuy');
var $button_addtocart = $bottom_detail.find('.mobile_bottom_btn--addtocart');
var $button_cart = $bottom_detail.find('.mobile_bottom_btn--cart');
var $button_kefu = $bottom_detail.find('.mobile_bottom_btn--kefu');

var $bottom_cart = $("#mobile-components-root").find(".mobile_bottom_menu_cart");

function getVariantQuantity() {
    var variant_id = parseInt(HEYSHOP_DATA.product.variants[0].id);
    var quantity = 1;
    var $form = $('#mobile_variant_form');
    if ($form.length > 0) {
        variant_id = parseInt($form.find('input[name=variant]').val());
        quantity = parseInt($form.find('input[name=quantity]').val());
    }
    return [variant_id, quantity];
}

function immbuy() {
    var vq = getVariantQuantity();
    var variant_id = vq[0];
    var quantity = vq[1];
    HeyShop.cart.checkoutVariant(variant_id, quantity, function(err) {
        if (err) {
          HeyShop.toast.popupToast(err.detail || '出错了，商品信息有误或库存不足', 1500);
        } else {
          HeyShop.toast.popupToast('出错了，商品信息有误或库存不足', 1500);
        }
    });
}

function addtocart() {
    var vq = getVariantQuantity();
    var variant_id = vq[0];
    var quantity = vq[1];
    HeyShop.cart.add(variant_id, quantity, function(err) {
        if (err) {
            HeyShop.toast.popupToast(err.detail || '出错了，商品信息有误或库存不足', 1500);
        } else {
            HeyShop.mobile.skuDrawerClose();
            HeyShop.toast.popupToast('成功加入购物车！', 1500);
        }
    });
}

function immbuyDrawer() {
    // show the drawer, pass the parameter immbuy
    //
    if (HEYSHOP_DATA.product.options.length > 0) {
        HeyShop.mobile.skuDrawerOpen(true);
    } else {
        immbuy();
    }
}

function addtocartDrawer() {
    if (HEYSHOP_DATA.product.options.length > 0) {
        HeyShop.mobile.skuDrawerOpen(false);
    } else  {
        addtocart();
    }
}

function renewCartBottom() {
    if (HeyShop && HeyShop.cart && HeyShop.cart.data) {
        var price = HeyShop.cart.data.total_price;
        var allcount = HeyShop.cart.data.items.length;
        var checkcount = HeyShop.cart.data.items.filter(function(item) {return item.checked;}).length;
        $bottom_cart.find('.js-total').text(price);
        $bottom_cart.find('.js-mobile-check-count').text(checkcount);
        $bottom_cart.find('.mobile_bottom_checkrow').removeClass('checked-row').removeClass('unchecked-row');
        if (allcount == checkcount) {
            $bottom_cart.find('.mobile_bottom_checkrow').addClass('checked-row').attr('onclick', 'HeyShop.cart.uncheckAll();');
        } else {
            $bottom_cart.find('.mobile_bottom_checkrow').addClass('unchecked-row').attr('onclick', 'HeyShop.cart.checkAll();');
        }
    }
}

function getCartCount() {
    if(HeyShop.cart.count() && HeyShop.cart.count() > 10) {
        $('.mobile-js-cart-count').text('10+');
    }else {
        $('.mobile-js-cart-count').text(HeyShop.cart.count() || '0');
    }
};

function cartRedPoint() {
    var count = HeyShop.cart.count();
    if (count && count > 0) {
        $('.mobile-js-redpoint').show();
    } else {
        $('.mobile-js-redpoint').hide();
    }
}


function setEvents() {
    $button_addtocart.on('click', addtocartDrawer);
    $button_immbuy.on('click', immbuyDrawer);
    $button_cart.on('click', function() {
        window.location.href = '/cart';
    });

    HeyShop.cart.on('change', renewCartBottom);
    renewCartBottom();

    HeyShop.cart.on('change', function() {
      getCartCount();
      cartRedPoint();
    });
    getCartCount();
    cartRedPoint();
}



module.exports = {
    immbuy: immbuy,
    addtocart: addtocart,
    setEvents: setEvents
}
