var $mobileFramework = $("#mobile-components-root");
var $drawers = $mobileFramework.find(".mobile_drawer");
var $menuDrawer = $mobileFramework.find(".mobile_drawer--menu");
var $menuDrawerMask = $mobileFramework.find(".mobile_drawer_mask--menu");
var $wechatBtn = $menuDrawer.find(".mobile_social--wechat");
var $wechatImg = $mobileFramework.find(".mobile_fullscreen_image");
var $categoryDrawer = $mobileFramework.find(".mobile_drawer--category");
var $skuDrawer = $mobileFramework.find(".mobile_drawer--variant");
var $btnsure = $skuDrawer.find(".mobile_drawer_btn--sure");

var timer = null;

function _drawerOpen(drawer) {
    clearTimeout(timer);
    drawer.show();
    timer = setTimeout(function() {
        drawer.addClass("drawer_show");
    }, 100);
}

function _drawerClose(drawer) {
    clearTimeout(timer);
    drawer.removeClass("drawer_show");
    timer = setTimeout(function() {
        drawer.hide();
    }, 500);
}

function menuDrawerOpen() {
    _drawerOpen($menuDrawer);
}

function menuDrawerClose() {
    _drawerClose($menuDrawer);
}

function menuDrawerbelowheader() {
    return $menuDrawer.hasClass('belowheader');
}

function categoryDrawerOpen() {
    _drawerOpen($categoryDrawer);
}

function categroyDrawerClose() {
    _drawerClose($categoryDrawer);
}

function skuDrawerOpen(immbuy) {
    if (immbuy) {
        $btnsure.addClass('js-mobile-immbuy').text('立即购买');
    } else {
        $btnsure.addClass('js-mobile-addtocart').text('加入购物车');
    }
    _drawerOpen($skuDrawer);
}

function skuDrawerClose() {
    $btnsure.removeClass('js-mobile-immbuy js-mobile-addtocart');
    _drawerClose($skuDrawer);
}

function variantEvents() {
    var $variants = $skuDrawer.find('.js-mobile-variants');
        $variants.on('click', '.product-option__value', function() {
          var $thisInput = $(this).find('input');
          if ($thisInput.prop('disabled')) {
            return;
          }
          var title = $thisInput.attr('name');
          var value = $thisInput.val() || '';
          if (value == $variants.find('[name="' + title + '"]:checked').val()) {
            $variants.find('[name="' + title + '"]').val(['']);
            $variants.find('[name="variant"]').val(['']);
            $variants.find('[name="' + title + '"][value=""]').trigger('change');
            //$skuDrawer.find('.js-mobile-price').text('-');
            //$skuDrawer.find('.js-mobile-inventory').text('0');
            $skuDrawer.find('.mobile_drawer_btn--sure').addClass('disabled');
          } else {
            $variants.find('[name="' + title + '"]').val([value]);
            $thisInput.trigger('change');
          }
        });
        $variants.on('hs.change.variant', function(e, variant) {
          if (variant) {
            $skuDrawer.find('.js-mobile-price').text(variant.price);
            $skuDrawer.find('.js-mobile-variantsku').text(variant.options.map(function(s) {return s.value;}).join('-'));
            $skuDrawer.find('.js-mobile-inventory').text(variant.inventory_quantity||0);

            if (variant.inventory_quantity > 0) {
              $skuDrawer.find('.mobile_drawer_btn--sure').removeClass('disabled');
            } else {
              $skuDrawer.find('.mobile_drawer_btn--sure').addClass('disabled');
            }
            $skuDrawer.find('.mobile_drawer_btn--sure').removeClass('disabled');
            if (variant.image) {
                $skuDrawer.find('.mobile_drawer_skuimage .img').css("background-image", "url('" + variant.image + "')");
            }

          } else {
            // $skuDrawer.find('.js-mobile-price').text('-');
            // $skuDrawer.find('.js-mobile-inventory').text('0');
            $skuDrawer.find('.mobile_drawer_btn--sure').addClass('disabled');
          }
        });

        $variants.variants();

    $skuDrawer.on('click', '.js-input-qty__adjust--minus', function() {
        var value = $skuDrawer.find('input[name="quantity"]').val();
        if (value >= 2) value = parseInt(value) - 1;
        $skuDrawer.find('input[name="quantity"]').val(value);
    });
    $skuDrawer.on('click', '.js-input-qty__adjust--plus', function() {
        var value = $skuDrawer.find('input[name="quantity"]').val();
        value = parseInt(value) + 1;
        $skuDrawer.find('input[name="quantity"]').val(value);
    });
}

function setEvents() {
    $wechatBtn.on('click', function() {
        $wechatImg.addClass("image_show");
    });

    $wechatImg.on('click', function() {
        $wechatImg.removeClass("image_show");
    });

    $drawers.on('click', '.mobile_drawer__toggle', function() {
        $(this).find("i").toggleClass("mobile-icon-add").toggleClass("mobile-icon-minus");
        $(this).parent().next().slideToggle(300);
    });

    $skuDrawer.on('click touchstart', _.throttle(function(e) {
         if ($(e.target).parents('.mobile_drawer_body').length == 0) {
            skuDrawerClose();
         }
    },100));

    $menuDrawer.find('.js-close-menu_drawer').on('click', function() {
        menuDrawerClose();
    });

    $categoryDrawer.find('.js-close-category_drawer').on('click', function() {
        categroyDrawerClose();
    });

    $skuDrawer.find('.js-close-sku_drawer').on('click', function() {
        skuDrawerClose();
    });

    $categoryDrawer.find('.mobile_searchbtn').on('click', function() {
        window.location.href = '/search?q=' + $categoryDrawer.find('.mobile_searchinput').val();
    });

    variantEvents();

    $skuDrawer.on('click', '.js-mobile-immbuy', function() {
        if ($(this).hasClass('disabled')) {
            return;
        }
        HeyShop.mobile.immbuy();
    });
    $skuDrawer.on('click', '.js-mobile-addtocart', function() {
        if ($(this).hasClass('disabled')) {
            return;
        }
        HeyShop.mobile.addtocart();
    });

    if(HeyShop.CustomerToken.get()) {
        $menuDrawer.find('.js-mobile-login-hide').addClass('hidden');
        $menuDrawer.find('.js-mobile-login-show.hidden').removeClass('hidden');
    } else {
        $menuDrawer.find('.js-mobile-login-hide.hidden').removeClass('hidden');
        $menuDrawer.find('.js-mobile-login-show').addClass('hidden');
    }

    $menuDrawer.on('click', '.js-mobile-logout', function() {
        HeyShop.CustomerToken.clear();
        location.reload();
    });

}

module.exports = {
    menuDrawerOpen: menuDrawerOpen,
    menuDrawerClose: menuDrawerClose,
    menuDrawerbelowheader: menuDrawerbelowheader,
    categoryDrawerOpen: categoryDrawerOpen,
    categoryDrawerClose: categoryDrawerClose,
    skuDrawerOpen: skuDrawerOpen,
    skuDrawerClose: skuDrawerClose,
    setEvents: setEvents
};
