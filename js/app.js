console.log('common');


$(document).ready(function() {

	$('a[href="#"]').click(function (e) {
		e.preventDefault();
	});


	//animate scroll
	$('.js-scroll-to').on("click", function(e){
		e.preventDefault();
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
	});

	// transparent input, etx
	$('input, textarea').each(function(){
		var placeholder = $(this).attr('placeholder');

		$(this).focus(function(){
			$(this).attr('placeholder', '');
		});
		$(this).blur(function(){
			$(this).attr('placeholder', placeholder);
		});
	});

	// open mobile-menu
	$('#burger-menu-js').click(function () {
		$('#header-menu-js').slideToggle();
	});



});

$(document).ready(function() {


	$(function() {

		$(window).scroll(function() {

			if($(this).scrollTop() != 0) {

				$('#toTop').fadeIn();

			} else {

				$('#toTop').fadeOut();

			}

		});

		$('#toTop').click(function() {

			$('body,html').animate({scrollTop:0},800);

		});
	});

	var slider = '#video-slider, #video-slider-second'
	// video-slider
	$(slider).slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		speed: 700,
		responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				centerMode: true,
				centerPadding: '75px'
			}
		},
		{
			breakpoint: 441,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				centerMode: true,
				centerPadding: '75px'
			}
		}
		]
	});

	// js-search
	$('#js-search').click(function () {
		$('#js-search-dropdown').fadeToggle();
	});

	// pinned
	// $(".pinned").stick_in_parent({
	// 	offset_top: 10
	// });

});

// close js-search-dropdown
// $(document).mouseup(function (e) {
// 	var container = $("#js-search-dropdown");
// 	if (container.has(e.target).length === 0){
// 		container.fadeOut();
// 	}
// });

// $(window).scroll(function () {
// 	var threshold = 220;
// 	if ($(window).scrollTop() >= threshold)
// 		$('.pinned').addClass('fixed');
// 	else
// 		$('.pinned').removeClass('fixed');
// 	var check = $(".js-scroll").height() - $(".pinned").height()+150;
// 	if ($(window).scrollTop() >= check)
// 		$('.pinned').addClass('bottom');
// 	else
// 		$('.pinned').removeClass('bottom');
// });

// $(window).scroll(function () {
// 	var threshold = 220;
// 	if ($(window).scrollTop() >= threshold)
// 		$('.pinned2').addClass('fixed');
// 	else
// 		$('.pinned2').removeClass('fixed');
// 	var check = $(".js-scroll").height() - $(".pinned2").height()+150;
// 	if ($(window).scrollTop() >= check)
// 		$('.pinned2').addClass('bottom');
// 	else
// 		$('.pinned2').removeClass('bottom');
// });


(function ($) {
	"use strict";
	$.fn.pin = function (options) {
		var scrollY = 0, elements = [], disabled = false, $window = $(window);

		options = options || {};

		var recalculateLimits = function () {
			for (var i=0, len=elements.length; i<len; i++) {
				var $this = elements[i];

				if (options.minWidth && $window.width() <= options.minWidth) {
					if ($this.parent().is(".pin-wrapper")) { $this.unwrap(); }
					$this.css({width: "", left: "", top: "", position: ""});
					if (options.activeClass) { $this.removeClass(options.activeClass); }
					disabled = true;
					continue;
				} else {
					disabled = false;
				}

				var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
				var offset = $this.offset();
				var containerOffset = $container.offset();
				var parentOffset = $this.offsetParent().offset();

				if (!$this.parent().is(".pin-wrapper")) {
					$this.wrap("<div class='pin-wrapper'>");
				}

				var pad = $.extend({
					top: 0,
					bottom: 0
				}, options.padding || {});

				$this.data("pin", {
					pad: pad,
					from: (options.containerSelector ? containerOffset.top : offset.top) - pad.top,
					to: containerOffset.top + $container.height() - $this.outerHeight() - pad.bottom,
					end: containerOffset.top + $container.height(),
					parentTop: parentOffset.top
				});

				$this.css({width: $this.outerWidth()});
				$this.parent().css("height", $this.outerHeight());
			}
		};

		var onScroll = function () {
			if (disabled) { return; }

			scrollY = $window.scrollTop();

			var elmts = [];
			for (var i=0, len=elements.length; i<len; i++) {
				var $this = $(elements[i]),
				data  = $this.data("pin");

				if (!data) {
					continue;
				}

				elmts.push($this);

				var from = data.from - data.pad.bottom,
				to = data.to - data.pad.top;

				if (from + $this.outerHeight() > data.end) {
					$this.css('position', '');
					continue;
				}

				if (from < scrollY && to > scrollY) {
					!($this.css("position") == "fixed") && $this.css({
						left: $this.offset().left,
						top: data.pad.top
					}).css("position", "fixed");
					if (options.activeClass) { $this.addClass(options.activeClass); }
				} else if (scrollY >= to) {
					$this.css({
						left: "",
						top: to - data.parentTop + data.pad.top
					}).css("position", "absolute");
					if (options.activeClass) { $this.addClass(options.activeClass); }
				} else {
					$this.css({position: "", top: "", left: ""});
					if (options.activeClass) { $this.removeClass(options.activeClass); }
				}
			}
			elements = elmts;
		};

		var update = function () { recalculateLimits(); onScroll(); };

		this.each(function () {
			var $this = $(this),
			data  = $(this).data('pin') || {};

			if (data && data.update) { return; }
			elements.push($this);
			$("img", this).one("load", recalculateLimits);
			data.update = update;
			$(this).data('pin', data);
		});

		$window.scroll(onScroll);
		$window.resize(function () { recalculateLimits(); });
		recalculateLimits();

		$window.load(update);

		return this;
	};
})(jQuery);

$(".pinned").pin({
	containerSelector: ".js-scroll",
	padding: {top: 70, bottom: 0}
})
