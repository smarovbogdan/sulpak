(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(document).ready(function() {
	let searchButton = require('../parts/search-button.js');
	let homeSlider = require('../parts/main-slider.js');
	let carousel = require('../parts/carousel.js');
	let fancybox = require('../parts/fancybox.js');
	let tabs = require('../parts/tabs.js');
	let select = require('../parts/nice-select.js');
	let buttonMapToggle = require('../parts/buttonMapToggle.js');
	let stickyHeader  = require('../parts/sticky-header.js');

	searchButton();
	homeSlider();
	carousel();
	fancybox();
	tabs();
	select();
	buttonMapToggle();
	stickyHeader();
});
},{"../parts/buttonMapToggle.js":2,"../parts/carousel.js":3,"../parts/fancybox.js":4,"../parts/main-slider.js":5,"../parts/nice-select.js":6,"../parts/search-button.js":7,"../parts/sticky-header.js":8,"../parts/tabs.js":9}],2:[function(require,module,exports){
function buttonMapToggle() {
	// Tabs city (Almata, Moscow, Kiev) / Checkout.html
    $('.header').find('.list li[data-value="Алматы"]').click(function (event) {
        $('.delivery_sub').find('iframe').removeClass('active')
        $('.delivery_sub').find('.city-almata').addClass('active')
    });
     $('.header').find('.list li[data-value="Москва"]').click(function (event) {
        $('.delivery_sub').find('iframe').removeClass('active')
        $('.delivery_sub').find('.city-moscow').addClass('active')
    });
      $('.header').find('.list li[data-value="Киев"]').click(function (event) {
        $('.delivery_sub').find('iframe').removeClass('active')
        $('.delivery_sub').find('.city-kiev').addClass('active')
    });

    $('.delivery_sub-list').find('.btn-pickup').click(function(e) {
        e.preventDefault();
        $('.delivery_sub-list .item').removeClass('active');
        $(this).closest('.item').addClass('active');
        var city = $(this).data('id');
        $(this).closest('.item').find('iframe.active').attr("src", city);
        console.log(city)
        console.log($(this).closest('.delivery_sub').find('iframe.active').attr("src", city))
    });
}

module.exports = buttonMapToggle;
},{}],3:[function(require,module,exports){
function carousel() {
	  // Карусель на главной странице
    $(".home").owlCarousel({
        items: 1,
        nav: true,
        navText: ['<img src="./img/left.png">', '<img src="./img/right.png">']
    });
    // Карусель товаров
    $(".product-slider").owlCarousel({
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1200: {
                items: 4,
                stagePadding: 15,
            }
        }
    });
    // Карусель брендов
    $(".brands-carousel").owlCarousel({
        margin: 10,
        responsive: {
            0: {
                items: 1,
                margin: 110,
                padding: 20
            },
            480: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1200: {
                items: 5,
                margin: 15,
            }
        }
    });
}

module.exports = carousel;
},{}],4:[function(require,module,exports){
function fancybox() {

	if(window.location.toString().indexOf('product.html')>0) {
        $('[data-fancybox="mixed"]').fancybox({
                buttons : [
                    'slideShow',
                    'close'
                ],
            });
        	$('.gallery_zoom').click(function(event) {
        	$('#sliderProductPhoto .owl-item.active .item').click();
        });;
    }
}

module.exports = fancybox;
},{}],5:[function(require,module,exports){
function homeSlider() {
	
    function mainSLider() {
        var sliderProductPhoto = $("#sliderProductPhoto");
        var sliderMiniaturePhoto = $("#sliderMiniaturePhoto");
        var slidesPerPage = 4; //globaly define number of elements per page
        var syncedSecondary = true;

        sliderProductPhoto.owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: false, 
            dots: true,
            loop: true,
            responsiveRefreshRate: 200,
            navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        }).on('changed.owl.carousel', syncPosition);

        sliderMiniaturePhoto
            .on('initialized.owl.carousel', function() {
            sliderMiniaturePhoto.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
            items: slidesPerPage,
            dots: true,
            // nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            //if you set loop to false, you have to restore this next line
            //var current = el.item.index;

            //if you disable loop you have to comment this block
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }

            //end block

            sliderMiniaturePhoto
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sliderMiniaturePhoto.find('.owl-item.active').length - 1;
            var start = sliderMiniaturePhoto.find('.owl-item.active').first().index();
            var end = sliderMiniaturePhoto.find('.owl-item.active').last().index();

            if (current > end) {
                sliderMiniaturePhoto.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                sliderMiniaturePhoto.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                sliderProductPhoto.data('owl.carousel').to(number, 100, true);
            }
        }

        sliderMiniaturePhoto.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).index();
            sliderProductPhoto.data('owl.carousel').to(number, 300, true);
        });
    };
    mainSLider();

    

}

module.exports = homeSlider;
},{}],6:[function(require,module,exports){
function select() {

    $('select').niceSelect();

    $("select").change(function (e) {
        let group, id;
        group = $(this).find(':selected').data('group');
        id = $(this).find(':selected').data('id');
        url = $(this).find(':selected').data('url');
        if (url) window.open(url);
        if (group && id) {
            $('div[data-group="' + group + '"]')
                .first().children('div')
                .removeClass('active')
                .parent()
                .children('div[data-id="' + id + '"]')
                .addClass('active');
        }

    });
}

module.exports = select;
},{}],7:[function(require,module,exports){
function searchButton() {

	function searchButton() {
        if(window.innerWidth < 769){
            let mainSearch = document.querySelector('.main_search');
            let searchFixed = document.querySelector('.header_search-fixed');

            const toggleMenu = () => {
                mainSearch.classList.toggle('active');
            }

            mainSearch.addEventListener('click', e => {
               e.stopPropagation();
                if(e.target.getAttribute('id') && e.target.getAttribute('id') === 'search'){
                } else {
                    toggleMenu();
                }

            });

            document.addEventListener('click', e => {
                let target = e.target;
                let itsMenu = target == searchFixed ;
                let itsMainSearch = target == mainSearch || mainSearch.contains(target);
                let menuIsActive = mainSearch.classList.contains('active');

                if (!itsMenu && !itsMainSearch && menuIsActive ) {
                toggleMenu();
                } 
            })
        }
       
    }
    searchButton()

    $('#search').click(function(e) {
        e.preventDefault();
        $('.digi-autocomplete-container').show();
    });
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.main_search').length) {
        $('.digi-autocomplete-container').hide();
      }
      e.stopPropagation();
    });
    if(window.innerWidth < 769){
        $('.header_search-fixed').click(function(e) {
         e.preventDefault();

        $('.digi-autocomplete-container-md').show();
         });

        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header_search-fixed').length) {
                $('.digi-autocomplete-container-md').hide();
            }
            e.stopPropagation();
        });
    }
}

module.exports = searchButton;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
function tabs() {
     // Табы
    $('.tab_header-item').click(function (event) {
        let group, id;
        group = this.dataset.group;
        id = this.dataset.id;
        $(this).parent().children('.tab_header-item').removeClass('active');
        $(this).addClass('active');
        $('div[data-group="' + group + '"]').each(function (e) {
            $(this).children('div')
                .removeClass('active')
                .parent()
                .children('div[data-id="' + id + '"]')
                .addClass('active');
        })
    });
}

module.exports = tabs;
},{}]},{},[1]);
