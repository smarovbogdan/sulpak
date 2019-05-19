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