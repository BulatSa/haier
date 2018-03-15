/***********************
 отправка формы в php BEGIN
 ***********************/
$(function () {
	$(".ajax-form").on("submit", function (event) {
		var form = $(this);
		var send = true;
		event.preventDefault();

		$(this).find("[data-req='true']").each(function () {
			if ($(this).val() === "") {
				$(this).addClass('error');
				send = false;
			}
			if ($(this).is('select')) {
				if ($(this).val() === null) {
					$(this).addClass('error');
					send = false;
				}
			}
			if ($(this).is('input[type="checkbox"]')) {
				if ($(this).prop('checked') !== true) {
					$(this).addClass('error');
					send = false;
				}
			}
		});

		$(this).find("[data-req='true']").on('focus', function () {
			$(this).removeClass('error');
		});

		var form_data = new FormData(this);

		$("[data-label]").each(function () {
			var input_name = $(this).attr('name');
			var input_label__name = input_name + '_label';
			var input_label__value = $(this).data('label').toString();
			form_data.append(input_label__name, input_label__value)
		});

		if (send === true) {
			$.ajax({
				type: "POST",
				async: true,
				url: "/send.php",
				cache: false,
				contentType: false,
				processData: false,
				data: form_data,
				success: (function (result) {
					var response = JSON.parse(result);
					console.log(response);
					$.fancybox.close();
					if (response["MAILER_ERROR"] !== undefined) {
						$.fancybox.open({src: '#modal-error'});
					} else {
						$.fancybox.open({src: '#modal-thanks'});
						setTimeout(function () {
							$.fancybox.close();
						}, 4500);
						form[0].reset();
					}
				})
			});
		}
	});
});
/***********************
 отправка формы в php END
 ***********************/


/***********************
 Input mask BEGIN
 ***********************/
$(function () {
	$("input[type='tel']").mask("+7 (999) 999-99-99");
});

/***********************
 Input mask END
 ***********************/


/***********************
 fancybox BEGIN
 ***********************/
function init_fancy() {
	$().fancybox({
		selector: '.fancy',
		buttons: ['close'],
		backFocus: false
	});
	$().fancybox({
		selector: '.fancy-modal',
		backFocus: false,
		touch: false
	});
	$('.fancy-map').fancybox({
		toolbar: false,
		smallBtn: true,
		backFocus: false
	});
}

function init_fancy__video() {
	$('.fancy-video').fancybox({
		toolbar: false,
		smallBtn: true,
		backFocus: false,
		animationEffect: "zoom-in-out",
		animationDuration: 300,
		transitionEffect: "slide",
		youtube: {
			controls: 1,
			showinfo: 0,
			autoplay: 1
		},
		onUpdate: function (instance, current) {
			var width,
				height,
				ratio = 16 / 9,
				video = current.$content;
			if (video) {
				video.hide();
				width = current.$slide.width() - 30;
				height = current.$slide.height() - 100;
				if (height * ratio > width) {
					height = width / ratio;
				} else {
					width = height * ratio;
				}
				video.css({
					width: width,
					height: height
				}).show();
			}
		}
	});
}

$(function () {
	init_fancy();
	init_fancy__video();
});
/***********************
 fancybox END
 ***********************/


/***********************
 Прокрутка к секциям BEGIN
 ***********************/
$(function () {

	$('.scrollto').on('click', function (e) {
		var elementClick = $(this).attr("href");

		var destination = $(elementClick).offset().top - 92;

		if (($(window).width() > 768) && ($(window).width() < 1480)) {
			destination = $(elementClick).offset().top - 70;
		}
		if ($(window).width() < 768) {
			destination = $(elementClick).offset().top;
		}

		$('html,body').stop().animate({scrollTop: destination}, 1000);
		return false;
	});
});
/***********************
 Прокрутка к секциям END
 ***********************/


/***********************
 Waypoints BEGIN
 ***********************/
$(function () {
	$('.anim').waypoint(function () {
		$(this.element).toggleClass('animated');
	}, {
		offset: '85%'
	});

	var aboutBigBg = new Vivus('about-big-bg', {
		duration: 300,
		start: 'manual'
	});

	$('#about-big-bg').waypoint(function () {
		aboutBigBg.play();
	}, {
		offset: '75%'
	});
});
/***********************
 Waypoints END
 ***********************/


/***********************
 Top panel BEGIN
 ***********************/
$(function($){
	var top_panel = $('.header-sec');
	window.onscroll = function() {
		if (window.pageYOffset > 30){
			top_panel.addClass('blue');
		} else {
			top_panel.removeClass('blue');
		}
	};
});
/***********************
 Top panel END
 ***********************/


/***********************
Slick BEGIN
***********************/
$(function () {
	var $progressBar = $('.benefits-progress');
	if ($(window).width() > 1024) {
		$('.benefits__slider').on('init', function () {
			$progressBar.addClass('play-animation');
		});

		$('.benefits__slider').on('beforeChange', function () {
			$progressBar.removeClass('play-animation');
		});

		$('.benefits__slider').on('afterChange', function () {
			$progressBar.addClass('play-animation');
		});

		$('.benefits__slider').hover(
			function () {
				$progressBar.addClass('stop-animation');
			},
			function () {
				$progressBar.removeClass('stop-animation');
			}
		);
	}

	$('.benefits__slider').slick({
		slidesToShow: 1,
		fade: true,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 3800,
		prevArrow: '<span class="arrow-prev"><i class="i-prev"></i></span>',
		nextArrow: '<span class="arrow-next"><i class="i-next"></i></span>',
		asNavFor: '.benefits__slider-nav',
		responsive: [{
			breakpoint: 1025,
			settings: {
				autoplay: false
			}
		}]
	});

	$('.benefits__slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		infinite: false,
		focusOnSelect: true,
		asNavFor: '.benefits__slider'
	});
});
/***********************
Slick END
***********************/