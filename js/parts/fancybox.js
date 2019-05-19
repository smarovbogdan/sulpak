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