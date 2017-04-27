const drawerTemplate = require('./left_drawer.njk');

var $drawer = $('<div class="drawer" tabindex="-1"></div>');
$drawer.appendTo('body');



function open() {
   //$('#components-root').addClass('is-moved-by-drawer');
    $('body').addClass('js-drawer-open');
    drawBackground();
    // $('#components-root').addClass('is-moved-by-drawer');
    setTimeout(function() {

        $drawer.find('.drawer__body').addClass('drawer__body--show');

    }, 350);

}
function close() {

    $drawer.find('.drawer__body').removeClass('drawer__body--show');
    setTimeout(function() {
        clearBackground();

    }, 350);
    setTimeout(function() {
        $('body').removeClass('js-drawer-open');
    }, 700);

}

// $drawer.on('click', '.js-open-drawer', open);
// $drawer.on('click', '.js-close-drawer', close);


let step = 0.08;
let n = 600;
let canvas = null;
let context = null


function initCanvas() {
    canvas = canvas || document.getElementById('drawer__canvas');
    context = canvas.getContext("2d");
}
function rendering(progress) {
    if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(0, 0, 0, 0.9)";
        context.beginPath();
        context.moveTo(canvas.width, canvas.height);
        context.lineTo(canvas.width, 0);
        context.lineTo((canvas.width + n) * (1 - progress) - n, 0);
        context.lineTo((canvas.width + n) * (1 - progress), canvas.height);
        context.fill();
    }
}

function drawBackground() {
    initCanvas();
    let interval = 0;
    let progress = 0;
    var drawing = function() {
        progress += step;
        rendering(progress);
        if (progress > 1) {
            clearInterval(interval);
        }
    }
    interval = setInterval(drawing, 25);
}

function clearBackground() {
    initCanvas();
    let interval = 0;
    let progress = 1;

    var clearing = function() {
        progress -= step;
        rendering(progress);
        if (progress < 0) {
            clearInterval(interval);
        }
    }
    interval = setInterval(clearing, 25);
}

var drawerHtml = HeyShop.njkenv.renderString(drawerTemplate, {
    global: HEYSHOP_DATA.shop.theme.settings_data,
    shop: HEYSHOP_DATA.shop
}, function(err, res) {
    $drawer.html(res);

    // js-close
    $drawer.on('click', '.js-close-drawer', close);

    //js-toggle
    $drawer.on('click', '.mobile-nav__has-sublist a', function() {
        $(this).toggleClass('expanded');
        $(this).parents('.mobile-nav__has-sublist').siblings('.mobile-nav__sublist').toggle();
    });

    $drawer.on('click', '.js-toggle-dropdown', function(e) {
        $(e.target).closest('.translate-btns.has-dropdown').toggleClass('expanded')
    });

    //intial canvas
    $('#drawer__canvas').attr('width', $(window).width()).attr('height', $(window).height());
    $(window).on('resize', function() {
        if ($(window).width() > 480) {
            $('#drawer__canvas').attr('width', $(window).width()).attr('height', $(window).height());
            rendering(1);
        }
    });

    $('.js-goto-chinese-site').on('click', function(e) {
        e.preventDefault() && e.stopPropagation();
        location.hostname = 'offline.com'
    });
    $('.js-goto-english-site').on('click', function(e) {
        e.preventDefault() && e.stopPropagation();
        location.hostname = 'en.offline.com'
    });

});






module.exports = {
    open: open,
    close: close,
    drawBackground: drawBackground,
    clearBackground: clearBackground
}
