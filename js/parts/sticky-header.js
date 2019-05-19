function stickyHeader() {
	 $(window).scroll(function (event) {
        if (window.pageYOffset > 110) {
            $('html').css('padding-top', $('.header_bottom').height());
            $('.header_bottom').addClass('sticky');
            $('.catalog_menu').addClass('col-md-1');
            $('.catalog_menu').removeClass('col-md-2');
            $('.product-navigation').addClass('sticky');
            if(window.innerWidth > 1200){
                if(window.location.toString().indexOf('product.html')>0) {
                    $('.floatingProduct').addClass('sticky');

                    var $window = $(window);
                    var $sidebar = $(".floatingProduct.sticky");
                    var $sidebarTop = $sidebar.position().top;
                    var $sidebarHeight = $sidebar.height();
                    var $footer = $('.specialProducts-simple ');
                    var $footerTop = $footer.position().top;
                   
                    var $scrollTop = $window.scrollTop();
                    var $topPosition = Math.max(0, $sidebarTop - $scrollTop);
                    var $topPositionDefault = '140';
                    if (+$scrollTop + +$sidebarHeight > +$footerTop - +$topPositionDefault) {
                      var $blockHeight = Math.min($topPosition, $footerTop - $scrollTop - $sidebarHeight);
                        $sidebar.css("top", $blockHeight);
                    } else {
                        $sidebar.css("top", $topPositionDefault + 'px');
                    }
                }
            }
            if(window.innerWidth < 1200){
                $('.floatingProduct').removeClass('sticky');
            }
        } else {
            $('.header_bottom').removeClass('sticky');
            $('html').css('padding-top', 0);
            $('.catalog_menu').removeClass('col-md-1');
            $('.catalog_menu').addClass('col-md-2');
            $('.product-navigation').removeClass('sticky');
            $('.floatingProduct').removeClass('sticky');
        }
    });
}

module.exports = stickyHeader;