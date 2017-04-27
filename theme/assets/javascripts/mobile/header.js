var $menuHeader = $("#mobile-components-root").find(".mobile_header");
var $categoryHeader = $("#mobile-components-root").find(".mobile_header_category");

function setEvents() {
    $menuHeader.on('click', '.navbar__menu > a', function() {
        // todo: call drawer open
        var $icon = $(this).find('i');
        if ($icon.hasClass('mobile-icon-menu')) {
            HeyShop.mobile.menuDrawerOpen();
        } else {
            HeyShop.mobile.menuDrawerClose();
        }
        console.log($icon);
        if (HeyShop.mobile.menuDrawerbelowheader()) {
            $icon.toggleClass('mobile-icon-menu').toggleClass('mobile-icon-close');
        }
    });

    $categoryHeader.on('click', '.navbar__category > a', function() {
        HeyShop.mobile.categoryDrawerOpen();
    });
}


module.exports = {
    setEvents: setEvents
};
