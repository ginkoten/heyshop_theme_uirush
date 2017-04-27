function setEvents() {

    // 监听手机底部菜单的弹出与隐藏
    $('.js-bottom-menu-toggle-dropdown').on('click', function() {
        $(this).closest('.site-nav--has-dropdown').toggleClass('nav-hover').siblings('.nav-hover').removeClass('nav-hover');
    });

    // window 向下滚动隐藏手机底部菜单
    var initScrollTop = 0;

    function scrollDown() {
        var currentScrollTop = $('body').scrollTop();
        if(currentScrollTop < initScrollTop) {
            $('.js-scroll-listener.mobile_bottom--fixed').addClass('slide-show');
        }else {
            $('.js-scroll-listener.mobile_bottom--fixed.slide-show').removeClass('slide-show');
        }
        initScrollTop = currentScrollTop
    }

    $(window).on('scroll', _.throttle(scrollDown, 200))

    // function autoHideToolBar() {
    //     $(window).on('scrollstart', function() {
    //         $('.js-scroll-listener.mobile_bottom--fixed.slide-show').removeClass('slide-show');
    //     });
    //     $(window).on('scrollstop', function() {
    //         $('.js-scroll-listener.mobile_bottom--fixed').addClass('slide-show');
    //     });
    // }
    // autoHideToolBar();
}

module.exports = {
    setEvents: setEvents
};
