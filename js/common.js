
$(document).ready(function () {
   
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
    
    //Main Slider
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
    //EndMain Slider

    if(window.location.toString().indexOf('product.html')>0) {
        $('[data-fancybox="mixed"]').fancybox({
                    buttons : [
                        'slideShow',
                        'close'
                    ],
                    // slideShow : {
                    //     autoStart : true
                    // }
                });
        $('.gallery_zoom').click(function(event) {
         $('#sliderProductPhoto .owl-item.active .item').click();
        });;
    }

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

    // При нажатии на кнопку открывается ссылка
    $('.specifications__button ').click(function(event) {
        $('.specifications').addClass('active');
        $('.specifications').click()
    });

    $('.reviews__button').click(function(event) {
        $('.reviews').addClass('active');
        $('.reviews').click()
    });

    if(window.innerWidth > 1200){
        $('.catalog_menu').hover(function () {
            $('.mainMenu_right-products.active .mainMenu_right-wrapper')
                .masonry({
                    itemSelector: '.mainMenu_right-list',
                })
        });
    }
    
    $('.sorting .sorting__header').click(function (e) {
        e.preventDefault();
        $(this.closest('.sorting')).toggleClass('active');
    })
    $(document).on('click', function(e) {
      if (!$(e.target).closest(".sorting__header").length) {
        $('.sorting').removeClass('active');
      }
      e.stopPropagation();
    });
    $('.sorting .sorting__dropdown .sorting__link').click(function (e) {
        e.preventDefault();
        let text = $(this).text();
    });
    // Переключатель списко/ плитка
    $('.displayFormat__item').click(function (e) {
        if(window.innerWidth > 767){
            e.preventDefault();
            if(this.dataset.type === 'list'){
                $('.productList__body').addClass('productList__body-list productList__body-list-sm');
                $('.productList__header .displayFormat__item').removeClass('active');
                $(this).toggleClass('active');
            }else{
                $('.productList__body').removeClass('productList__body-list  productList__body-list-sm');
                $('.productList__header .displayFormat__item').removeClass('active');
                $(this).toggleClass('active');
            }
        }
    });
    $(window).resize(function () {
         if(window.innerWidth < 767){
            $('.productList .productList__body-list').removeClass('productList__body-list');
        } else {
            $('.productList .productList__body-list-sm').addClass('productList__body-list');
        }
    });

   

    // Добавление характеристик товара при наведении
    $('.productList__body .item').hover(function(){
        if(window.innerWidth > 767){
            $('.product-miniature_hidden', this).toggleClass('active');
        };
    });

    // Открытие Aside при клике на Подобрать параметры
    $('#openAsideCatalogSm').click(function(e){
        e.preventDefault();
        $('#catalog .aside').toggleClass('active');
        $('.bg_popup').toggleClass('active');
    });
     // Открытие Aside при клике на Подобрать параметры (SM)
    $('#openAsideCatalog').click(function(e){
        e.preventDefault();
        $('#catalog .aside').toggleClass('active');
        $('.bg_popup').toggleClass('active');
    });
    //Главное меню
    $('.mainMenu_left li').hover(function (e) {
        let category;
        category = this.dataset.categoryid;
        $('.mainMenu_left li').removeClass('active');
        $(this).addClass('active');
        $('.mainMenu_right .mainMenu_right-products').removeClass('active');
        $('.mainMenu_right div[data-category="' + category + '"]')
            .addClass('active')
            .find('.mainMenu_right-wrapper')
            .masonry({
                // options
                itemSelector: '.mainMenu_right-list',
            })
    }, function () {
    });

    $('.bg_popup').click(function (e) {
        $(this).removeClass('active');
        $('aside').removeClass('active');
    })

    $('.header_mobile-sublist').click(function (event) {
        $(this).toggleClass('active');
    });

    $('#openMobileCatalog').click(function (event) {
        $('.header_mobile-mainMenu').removeClass('active');
        $('.header_mobile__catalog').addClass('active');
    });
    $('#backMobileCatalog').click(function (event) {
        $('.header_mobile-mainMenu').addClass('active');
        $('.header_mobile__catalog').removeClass('active');
    });


    // Закрытие sidebar
    $('.header_mobile-close').click(function (e) {
        if (window.innerWidth < 1200) {
            $('#header_mobile').removeClass('active');
            $('#catalog .aside').removeClass('active');
            $('.bg_popup').removeClass('active');
        }
    });
    //Открытие sidebar
    $('.catalog_menu').click(function (e) {
        if (window.innerWidth < 1200) {
            $('#header_mobile').addClass('active');
            $('.bg_popup').addClass('active');
        }
        

    });

    

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

    // Tabs city (Almata, Moscow, Kiev)
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




    $('.clip-more').click(function (e) {
        e.preventDefault();
        $(this).parent('.clip').addClass('active');
        $(this).hide();
    })
    $(document).on('mouseover', '.rating-container-hovered i', function () {
        const caller = $(this);
        const ratingContainerId = caller.parent().prop('id');
        const dataMark = caller.attr('data-mark');
        const dataComment = caller.attr('data-comment');

        if (dataComment) {
            $('.grade').text(dataComment);
        }

        $(`#${ratingContainerId} i`).each(function (index, item) {
            const hoverCaller = $(this);
            const hoverDataMark = hoverCaller.attr('data-mark');

            retrieveActiveStars(hoverCaller, hoverDataMark, dataMark);
            caller.parent().data('tempval', dataMark);
            retrieveNewTotalScore();
        });
    });

    $(document).on('mouseleave', '.rating-container-hovered', function () {
        const caller = $(this);
        const tempMark = caller.data('tempval');
        const id = $(this).data('propertyid');
        var actualMark = $(`#${id}`).val();
        const ratingContainerId = caller.prop('id');

        const grade = $("#grade");
        if (grade.length) {
            const val = grade.attr("data-comment");
            $(".grade").text(val);
        }

        $(`#${ratingContainerId} i`).each(function (index, item) {
            let hoverCaller = $(this);
            let hoverDataMark = $(this).attr('data-mark');

            if (actualMark) {
                retrieveActiveStars(hoverCaller, hoverDataMark, actualMark);
            } else {
                retrieveActiveStars(hoverCaller, hoverDataMark, tempMark);
            }
        });

        retrieveNewTotalScore();
    });
    $(document).on('click touchstart', '.rating-container-hovered i', function () {
        const caller = $(this);
        const ratingContainerId = caller.parent().prop('id');;
        const dataMark = caller.attr('data-mark');
        const dataComment = caller.attr('data-comment');

        if (dataComment) {
            $('.grade').text(dataComment);
        }

        $(`#${ratingContainerId} i`).each(function (index, item) {
            const hoverCaller = $(this);
            const hoverDataMark = hoverCaller.attr('data-mark');

            retrieveActiveStars(hoverCaller, hoverDataMark, dataMark);
            caller.parent().data('tempval', dataMark);;
            retrieveNewTotalScore();
        });
    });

    $(document).on('click touchstart', '.rating-container-hovered', function () {
        const caller = $(this);
        const tempMark = caller.data('tempval');
        const id = $(this).data('propertyid');
        var actualMark = $(`#${id}`).val();
        const ratingContainerId = caller.prop('id');;

        const grade = $("#grade");
        if (grade.length) {
            const val = grade.attr("data-comment");
            $(".grade").text(val);
        }

        $(`#${ratingContainerId} i`).each(function (index, item) {
            let hoverCaller = $(this);
            let hoverDataMark = $(this).attr('data-mark');

            if (actualMark) {
                retrieveActiveStars(hoverCaller, hoverDataMark, actualMark);
            } else {
                retrieveActiveStars(hoverCaller, hoverDataMark, tempMark);
            }
        });

        retrieveNewTotalScore();
    });
    function retrieveActiveStars(caller, actualMark, fixedMark) {
        if (actualMark <= fixedMark) {

            caller.addClass('active');
        }
        else {
            caller.removeClass('active');
        }
    }
    function retrieveNewTotalScore() {
        const activeStars = $('#new-properties-scores i.active');
        const newTotalSocreContainer = $('#new-total-score');
        const currentSocre = activeStars.length / 3;
        $(newTotalSocreContainer).data('score', currentSocre.toFixed(1));
        showScore(newTotalSocreContainer);
    }
    
    $(document).on('click touchstart', '#add-comment .rating-container i', function(e) {
        const dataMark = $(this).attr('data-mark');
        const id = $(this).parent().data('propertyid');
        const input = $(`#${id}`);
        input.val(dataMark);

        const grade = $("#grade");
        if (grade.length) {
            const val = $(this).attr("data-comment");
            grade.attr("data-comment", val);
        }
    });
   

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
 
    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('#productReviewStocks .item .header').click(function (event) {
        $(this).toggleClass('active').next().slideToggle();
    });
    const totalMarkContainer = $('#total-score');
    if (totalMarkContainer.length) {
        showScore(totalMarkContainer);
        drawLines('line');
    }

    const newTotalSocreContainer = $('#new-total-score');
    if (newTotalSocreContainer.length) {
        showScore(newTotalSocreContainer);
        drawLines('new-line');
    }
    function drawLines(line) {
        for (let i = 0; i < 3; i++) {
            const lineContainer = $(`#${line}-${i}`);
            const canvas = $('<canvas/>').addClass('line-canvas');
            const canvasContext = canvas[0].getContext('2d');
            createLine(canvasContext, i);
            lineContainer.append(canvas);
        }
    }

    function createLine(canvasContext, index) {
        switch (index) {
            case 0:
                canvasContext.moveTo(15, 10);
                canvasContext.lineTo(100, 10);
                canvasContext.lineTo(120, 28);
                break;
            case 1:
                canvasContext.moveTo(15, 14);
                canvasContext.lineTo(100, 14);
                break;
            case 2:
                canvasContext.moveTo(15, 18);
                canvasContext.lineTo(100, 18);
                canvasContext.lineTo(120, 0);
        }

        canvasContext.strokeStyle = '#ccc';
        canvasContext.stroke();
    }

    $(document).on('click', '.customer-recomendation', function () {
        const div = $(this);
        const val = div.data('val');
        const checkbox = $('#good-recomendation');
        checkbox.val(val);

        var anotherId;

        if (this.id === 'recommended') {
            anotherId = '#not-recommended';
        } else {
            anotherId = '#recommended';
        }

        const anotherDiv = $(anotherId);

        if (!div.hasClass('active')) {
            div.addClass('active');
            anotherDiv.removeClass('active');
        }
    });
    function showScore(container) {
        container.empty();
        const score = container.data('score');
        const size = container.data('size') || 150;
        const lineWidth = container.data('line') || 10;
        const percent = 100 * (score / 5);

        const canvas = $('<canvas/>');
        canvas[0].width = canvas[0].height = size;

        const span = $('<span />').addClass('total-score-span');

        if (percent > 0) {
            span.text(score);
        }

        const context = canvas[0].getContext('2d');
        context.translate(size / 2, size / 2);
        context.rotate(-0.5 * Math.PI);

        container.append(span).append(canvas);
        drawCircle(context, '#ccc', size, lineWidth, 100 / 100);

        if (percent > 0) {
            drawCircle(context, '#d71a21', size, lineWidth, (100 - percent) / 100);
        }
    }

    function drawCircle(canvasContext, color, size, lineWidth, percent) {
        const radius = (size - lineWidth) / 2;
        percent = Math.min(Math.max(0, percent || 1), 1);

        canvasContext.beginPath();
        canvasContext.arc(0, 0, radius, 0, 2 * Math.PI * percent, true);
        canvasContext.strokeStyle = color;
        canvasContext.lineCap = 'round';
        canvasContext.lineWidth = lineWidth;
        canvasContext.stroke();
    };

    $('.product-accordion__header').click(function (e) {
        $(this).next().slideToggle();
        this.closest('.product-accordion').classList.toggle('active');
    })

    //Range slider
    var sliderBar = document.getElementById('sliderbar');
    let inputsSlider = document.querySelectorAll('.sidebar__input');
    if(sliderBar){
        noUiSlider.create(sliderBar, {
            start: 0,
            connect: [true, false],
            range: {
                'min': 0,
                'max': 20000
            },
            format: wNumb({
                decimals: 0,
            })
        });
        sliderBar.noUiSlider.on('update', function (values, handle) {
            inputsSlider[handle].value = values[handle];
        });
        inputsSlider.forEach((input,handle)=>{
            input.addEventListener('change', function () {
                sliderBar.noUiSlider.setHandle(handle, input.value);
            });
        });
    }

    //Range slider Month
    var slideBarMonth = document.getElementById('slideBarMonth');
    if(slideBarMonth){
        noUiSlider.create(slideBarMonth, {
            start: 0,
            connect: [true, false],
            range: {
                'min': 0,
                'max': 20000
            },
            format: wNumb({
                decimals: 0,
            })
        });
    }
     
    function isDesctopResolution() {
        let n = $("body").outerWidth();
        return n >= 1170;
    }

    $(document).on("click", ".show-map-link", function() {
        isDesctopResolution() ? $(".cities-map-block").show() : $(".cities-list").show();
    });
    $(document).on("mouseover", ".cities-map-block", function() {
        $(document).on("mouseleave", ".cities-map-block", function() {
            $(".cities-map-block").hide();
        })
    });

    // function citiesClosed(block, blockHide) {
    //    block.click(function(e) {
    //         $('.show-map-link').text(this.textContent);
    //         $(blockHide).hide()
    //    });
    // }
    // citiesClosed($('.cities-list-main').find('label'), )
   $('.cities-list-main').find('label').click(function(e) {
       $('.show-map-link').text(this.textContent);
       $(".cities-map-block").hide()
       
    });
    $('.cities-list.mobile').find('li').click(function(e) {
       $('.show-map-link').text(this.textContent);
       $(".cities-list.mobile").hide();
       
    });


    // Btn favorites
    $('.btn-favorites').click(function () {
        $(this).toggleClass('active');
        
    });
    // Btn compare
    $('.btn-compare').click(function () {
        $(this).toggleClass('active');
        
    });

    $('.photo-thumbnails-hidden__button').click(function(e) {
        e.preventDefault();
        $('.photo-thumbnails-hidden').show();
        $('.photo-thumbnails-hidden__button').css('display', 'none');

        $('.product .productReviews .photo-thumbnails').css('flex-wrap', 'wrap');
        $('.product .productReviews .photo-thumbnails .box').css('flex-wrap', 'wrap');
    });


    //Шаги оформление заказа

    $(document).on('click', '.customer-info .btn-buy', function (e) {
        e.preventDefault()
        var name = $('.customer-info__form').find('input[name="name"]').val();
        var phoneStart = $('.customer-info__form').find('input[name="phone-start"]').val();
        var phoneEnd = $('.customer-info__form').find('input[name="phone-end"]').val();
        var email = $('.customer-info__form').find('input[name="email"]').val();
         
        if(name.length != 0 && phoneStart.length != 0 && phoneEnd.length != 0 && email.length != 0) {
            $('.delivery').removeClass('disabled').addClass('active');
            $('.customer-info').removeClass('active').addClass('disabled');
            $('.tab-item.customer-info .link-dashed').show();
            $('#checkout .delivery__form').show();
            $('#checkout .customer-info__form').hide();
        } 
       
    });

    $(document).on('click', '.delivery .btn-buy', function (e) {
        e.preventDefault()
        // $('#customer-info').hide();
        $('.pay').removeClass('disabled').addClass('active');
        $('.delivery').removeClass('active').addClass('disabled');
        $('.tab-item.delivery .link-dashed-delivery').show();
        $('#checkout .pay-form').show();
        $('#checkout .delivery__form').hide();
        $('.right-side .total .btn-buy').addClass('active');
        $('.checkout__body .mobile-buy').addClass('active');
    });

    $(document).on('click', '.link-dashed', function (e) {
        e.preventDefault();
        $('.customer-info').removeClass('disabled').addClass('active');
        $('#checkout .customer-info__form').show();
        $('.delivery').removeClass('active').addClass('disabled');
        $('#checkout .delivery__form').hide();
        $('.pay').removeClass('active').addClass('disabled');
        $('#checkout .pay-form').hide();
    });

    $(document).on('click', '.link-dashed-delivery', function (e) {
        e.preventDefault();
        $('.delivery').removeClass('disabled').addClass('active');
        $('#checkout .delivery__form').show();
        $('.pay').removeClass('active').addClass('disabled');
        $('#checkout .pay-form').hide();
        $('.pay').removeClass('active').addClass('disabled');
        $('#checkout .customer-info__form').hide();
    });

     $('.checkout__choose__individual').click(function(e) {
        e.preventDefault();
        $('.checkout__choose__individual').removeClass('active');
        $(this).addClass('active');
    });

    $('.checkout__choose__individual-individaul').click(function(e) {
        e.preventDefault();
        $('.only_Organization').hide();
    }); 

    $('.checkout__choose__individual-organization').click(function(e) {
        e.preventDefault();
        $('.only_Organization').show();
    });  
    
    $('.comment-answer__button').click(function(e) {
        e.preventDefault();
        // $('.comment-answer').show();
        $(this).closest('.comment').find('.comment-answer').show();
    });

    $('.comment-nwuser__button').click(function(e) {
        e.preventDefault();  
        $(this).closest('.comment').find('#reply-137417').append($('#comment-nwuser'));
        $('.comment-nwuser').css('display', 'block');
    });
    $('.close-reply').click(function(e) {
        e.preventDefault();  
        // $(this).closest('.comment').find('#reply-137417').remove();
        $('.comment-nwuser').css('display', 'none');
    });

    $('.tags__products__btn').click(function(e) {
        $(this).hide();
        $(this).closest('.item').find('.tab-buytochap').show();

    });

    //count + 1
    $('.quality__amount-plus').click(function() {
        var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
    });
    //cont - 1
    $('.quality__amount-minus').click(function() {
        var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
    });
    // clear count
    $('.quality').find('.remove-product').click(function(e) {
        e.preventDefault();
        $(this).closest('.quality').find('.quality__input').val('1');
        console.log(this);
        console.log( $(this).closest('.quality').find('.quality__input'));
    });
    //Button next buy
    $('.btn-next-buy').click(function(e) {
        e.preventDefault();
        var magnificPopup = $.magnificPopup.instance;
        magnificPopup.close(); 
    });
    //Btn show install  more
    $('.install .btn-more').click(function(e) {
        e.preventDefault();
        $(this).closest('.item').find('.drop_down-more').toggle();
    });
    $('.cart-dialog__bottom .btn-add').click(function(e) {
        e.preventDefault()
         $(this).closest('.item').find('.checkbox-item').toggle();
         $(this).toggleClass('active');
    });
    //checkbox Акции
    $('.basket-popup-special-offer-checkbox input:checkbox').click(function() {
        $('.basket-popup-special-offer').find('.basket-popup-special-offer-overlay').removeClass('active')
        $('.basket-popup-special-offer').find('.basket-hidden').removeClass('active')
        $('.basket-popup-special-offer-checkbox input:checkbox').prop('checked', false);
        $(this).closest('.basket-popup-special-offer').find('.basket-popup-special-offer-overlay').toggleClass('active');
        $(this).closest('.basket-popup-special-offer').find('.basket-hidden').toggleClass('active');
        $(this).prop('checked', true);
    });

    $('.basket-popup-special-offer-package-lot').click(function() {
        $(this).find('.fa-check-circle ').toggleClass('active');
    });

     $('.basket-popup-special-offer-package-single').find('.basket-popup-special-offer-package-item').click(function() {
        $('.basket-popup-special-offer-package-single').find('.fa-check-circle').removeClass('active');
        $(this).find('.fa-check-circle').toggleClass('active');
    });

    // Toggle filter accessories
    $('.accessories').find('li.item').click(function() {
        $('.accessories').find('li.item').removeClass('active')
        $(this).toggleClass('active');
    });
    //btn more cart popup accessories
    $('.btn-show-more').click(function(e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).closest('.accessories').find('.item-hide').show();
    });
   

    function phoneMask(phone) {
        $(phone).on('keyup', function() {
            $(phone).bind("change keyup input click", function() {
                if (phone.value.match(/[^0-9]/g)) {
                    phone.value = phone.value.replace(/[^0-9]/g, '');
                };
            });
        });    
    };
   
    $('.operator-code').on('keyup', function() {
        phoneMask(this);
        if($(this).val().length > 2) {
            $(this).next().focus();
        }

    });

    $('.operator-code-end').on('keyup', function() {
        phoneMask(this);
        if($(this).val().length < 1) {
            $(this).prev().focus();
        }
    });

    //
    $('.radio-btn').click(function() {
        $('#three-info').find('.tab-item').removeClass('active');
        $(this).closest('.tab-item').addClass('active');
    });

    //
    $('.user-box').click(function(e) {
        e.preventDefault();
    });

    $("#phone").mask("+7 (999) 999-9999");

    $('#phone').on('focus click', function() {
        $(this)[0].setSelectionRange(4, 4);
    })

});