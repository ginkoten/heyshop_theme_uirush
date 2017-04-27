var quickviewTemplate = require('./quickview.njk');

var $modal = $('<div class="modal"></div>');

$modal.appendTo('body');
var quickview = {};

function initVariant(product) {
    var $variants = $modal.find('.js-variants');
    $variants.on('click', '.js-toggle', function() {
        $(this).toggleClass('open');
        $variants.find('.js-toggle').not(this).removeClass('open');
    });
    $variants.on('click', '.js-value', function() {
        var $thisInput = $(this).find('input');
        if ($thisInput.prop('disabled')) {
            return;
        }
        var title = $(this).attr('data-title');
        var value = $(this).attr('data-value');
        $(this).parent().siblings('span').text($(this).text());
        var processed_title = title.replace(/\"/g, "\\\"");
        $variants.find(`input[name="${processed_title}"]`).val([value]);
        $thisInput.trigger('change');
    });
    $variants.on('hs.change.variant', function(e, variant) {
        if (variant) {
            for (let option of variant.options) {
                var processed_optiontitle = option.title.replace(/\"/g, "\\\"");
                $variants.find(`.js-toggle[data-title="${processed_optiontitle}"]>span`).text(option.value);
            }
            $variants.find('.js-price').text(variant.price);
            $variants.find('.js-compare_at_price').text(variant.compare_at_price)
               .parent().toggleClass('hidden', !variant.compare_at_price);
            $variants.find('.js-inventory').text(variant.inventory_quantity || 0);
            $variants.find('.js-add-to-cart').prop('disabled', !(variant.inventory_quantity > 0));
        } else {
            // $variants.find('.js-price').text('-');
            // $variants.find('.js-compare_at_price').parent().addClass('hidden');
            // $variants.find('.js-inventory').text('0');
            $variants.find('.js-add-to-cart').prop('disabled', true);
        }
    });
    $variants.on('click', '.js-add-to-cart', function() {
        var variant_id = +$variants.find('[name=variant]').val() || null;
        var quantity = +$variants.find('[name=quantity]').val() || 1;
        if (variant_id) {
            HeyShop.cart.add(variant_id, quantity, function(err) {
                if (err) {
                    HeyShop.toast.popupToast(err.detail || '出错了，商品信息有误或库存不足', 1500);
                } else {
                    quickview.close(function() {
                        HeyShop.toast.popupToast('加入成功', 1500);
                    });
                    // location.href = '/cart';
                }
            });
        }
    });
    $variants.variants(product);
}

function resetProduct(product, shouldSlide) {
    quickview.swiper && quickview.swiper.destroy(true, true);
    $modal.find('.js-variants').off();

    var html = HeyShop.njkenv.renderString(quickviewTemplate, {
        product: product,
        shouldSlide: shouldSlide
    });
    $modal.html(html);

    initVariant(product);
    quickview.swiper = new Swiper($modal.find('.js-carousel'), {
        direction: 'horizontal',
        pagination: $modal.find('.swiper-pagination'),
        paginationClickable: true,
        slidesPerView: 1
    });
}

quickview.open = function(product, products_list) {
    quickview.$backdrop = $('<div class="modal-backdrop"></div>');
    $('body').addClass('modal-open').append(quickview.$backdrop);
    $modal.show();

    var shouldSlide = false;
    if (products_list) {
        shouldSlide = !!products_list;
        var cur = 0;
        for (var i=0; i<products_list.length; i++) {
            if (products_list[i].id == product.id) {
                cur = i;
                break;
            }
        }
        $modal.on('click', '.js-slide-next', function(e) {
            cur = (cur + 1) % products_list.length;
            resetProduct(products_list[cur], shouldSlide);
        });
        $modal.on('click', '.js-slide-prev', function(e) {
            cur = (cur + products_list.length - 1) % products_list.length;
            resetProduct(products_list[cur], shouldSlide);
        });
    }

    resetProduct(product, shouldSlide);

    $modal.on('click', '.js-close', function(e) {
        quickview.close();
    })
};

quickview.close = function(callback) {
    quickview.$backdrop.remove();
    quickview.swiper.destroy(true, true);
    quickview.swiper = null;
    $modal.off().hide().empty();
    $('body').removeClass('modal-open');
    if (callback) {
        callback();
    }
};

module.exports = {
    quickview: quickview
}
