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