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