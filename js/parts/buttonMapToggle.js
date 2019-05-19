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