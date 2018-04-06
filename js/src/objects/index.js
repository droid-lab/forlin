Index = {
	Menu : {
        config: {
            senseSpeed    : 5,
            previusScroll : 0,
            imediate      : 10,
            openMenu      : false,
        },
		init: function(){
			Index.Menu.setDebounce();
			Index.Menu.setHamburguer();
			Index.Menu.setStart();
			Index.Menu.setLinks();
		},
		setDebounce: function(){
			$(document).scroll(Index.Menu.debounce(function(){ Index.Menu.go() }, Index.Menu.config.imediate));
		},
		setStart: function(){
			var scroller  = $(document).scrollTop();
			var offsetImg = $(".bg-img").height() - ($(window).height() - 200);
		},
		setHamburguer: function(){
			$(".hamburguer").on("click", function(e){
				e.preventDefault();
				$(this).toggleClass("active");
				$(".menu-mobile").toggleClass("active");
				setTimeout(function(){
					$(".menu-mobile").toggleClass("end");
				}, 500);
				if($(".menu-translate").hasClass('active')){
					$(".menu-translate").toggleClass("active");
				}
			});
		},
		debounce: function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},
		go: function(){
			var scroller  = $(document).scrollTop();
			var offset    = $(window).height() * 1/6;
			var offsetImg = $("#seja-um-franqueado").height() - ($(window).height() - 200);
            if (scroller - Index.Menu.config.senseSpeed >  Index.Menu.config.previousScroll && scroller > offset){
            	$('#header-menu').addClass('off');
            	$('#header-menu').removeClass('on');
				if($(".menu-mobile").hasClass('active')){
					$(".hamburguer").toggleClass("active");
					$(".menu-mobile").toggleClass("active");
					setTimeout(function(){
						$(".menu-mobile").toggleClass("end");
					}, 500);
				}
            }
            else if (scroller + Index.Menu.config.senseSpeed < Index.Menu.config.previousScroll && scroller > offset){
            	$('#header-menu').addClass('on');
            	$('#header-menu').removeClass('off');
            }
            Index.Menu.config.previousScroll = scroller;
		},
		setLinks: function() {
            $(".go-menu").on("click", function(e) {
                e.preventDefault();
				if($(".menu-mobile").hasClass('active')){
					$(".hamburguer").toggleClass("active");
					$(".menu-mobile").toggleClass("active");
					setTimeout(function(){
						$(".menu-mobile").toggleClass("end");
					}, 500);
				}
                var o = $(this);
                var plus = 30;
                if(o.attr("href") === '#trabalhe-conosco'|| Mobile.isMobile){
                	plus = 0;
                }
                $("html, body").stop().animate({
                    scrollTop: $(o.attr("href")).offset().top - plus
                }, 1e3, "easeOutQuart", function(){
					if (o.attr("href") !== '#seja-um-franqueado'){
						$('#header-menu').addClass('off');
						$('#header-menu').removeClass('on');
					}
                });
            })
        }
	},
	Stellar : {
		init: function(){
			if(!Mobile.isMobile){
				$(window).stellar({
					horizontalScrolling: false,
				});
			}
		}
	},
	Carousels: {
		configs: {
			'default': {
				loop               : true,
				nav                : false,
				pagination         : true,
				items              : 1,
				dots               : true,
				autoplay           : true,
				autoplayTimeout    : 3000,
				autoplayHoverPause : true,
				singleItem         : true,
				smartSpeed         : 700
			}
		},
		init: function () {
			$('.carousel-default').owlCarousel(Index.Carousels.configs['default']);
			$('.carousel-default').on('mouseout', function () {
				$('.carousel-default').trigger('stop.owl.autoplay');
				$('.carousel-default').trigger('play.owl.autoplay', [3000]);
			});
			$('#carousel-seguradoras-associadas').owlCarousel({
				loop: true,
				nav: true,
				pagination: true,
				items: 1,
				dots: true,
				autoplay: true,
				autoplayTimeout: 3000,
				autoplayHoverPause: true,
				singleItem: true,
				navText: ["<i class='arrow-prev'></i>","<i class='arrow-next'></i>"],
				smartSpeed: 700
			});
			$('#carousel-seguradoras-associadas').on('mouseout', function () {
				$('#carousel-seguradoras-associadas').trigger('stop.owl.autoplay');
				$('#carousel-seguradoras-associadas').trigger('play.owl.autoplay', [3000]);
			});

		}
	},
	ScrollReveal: {
		configs: {
			animationSet1: {
				duration : 1200,
				origin   : 'left',
				reset    : true,
				delay    : 100,
				scale    : 0.9,
			},
			animationSet2: {
				duration : 1200,
				origin   : 'top',
				reset    : true,
				delay    : 100,
				scale    : 0.9
			},
			animationSet3: {
				duration : 1200,
				origin   : 'bottom',
				reset    : true,
				delay    : 800,
				scale    : 0.9
			},
			animationSet4: {
				duration : 1200,
				origin   : 'right',
				reset    : true,
				delay    : 100,
				scale    : 0.9,
			},
		},
		init: function(){
			window.sr = ScrollReveal();
			sr.reveal('.animation-1', Index.ScrollReveal.configs.animationSet1);
			sr.reveal('.animation-2', Index.ScrollReveal.configs.animationSet2, 50);
			sr.reveal('.animation-3', Index.ScrollReveal.configs.animationSet3);
			sr.reveal('.animation-4', Index.ScrollReveal.configs.animationSet4);
		}
	},
	InputMask: {
		init: function(){
			$(".mask").inputmask();
		}
	},
	Select2: {
		init: function(){
			$("#franchisee-state").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			})
			$("#franchisee-city").select2({
				minimumResultsForSearch: -1,
				width: "100%"
			})
		}
	},
	Actions: {
		init: function(){
			Index.Actions.setButtons();
		},
		setButtons: function(){
			$('.btn-send-franchisee').on('click', function(e){
				e.preventDefault();
				Index.Actions.sendFranchisee();
			});
			$('.btn-send-contact').on('click', function (e) {
				e.preventDefault();
				Index.Actions.sendContact();
			});
			$('.btn-go-contact').on('click', function (e) {
				e.preventDefault();
				$('.go-contact').trigger('click');
			});
		},
		beforeSend: function (btn, form) {
			$("." + btn).html("Aguarde...");
			$("." + btn).prop('disabled', true);
			Index.Actions.lockForm(form);
		},
		complete: function (btn, form, select) {
			$("." + btn).html("Enviar");
			$("." + btn).prop('disabled', false);
			Index.Actions.unlockForm(form);
			Index.Actions.resetForm(form, select);
		},
		resetForm: function (id, arr) {
			$("#" + id)[0].reset();
			arr.forEach(function (currentValue) {
				if (!Shared.__is_empty(currentValue)) {
					$("#" + currentValue).val('0').trigger('change');
				}
			});
			$('form:not(.filter):input:visible:enabled:first').focus();
		},
		lockForm: function (form) {
			$(document).find("#" + form).each(function () {
				var obj = $(this);
				obj.find("input, textarea, select").each(function () {
					var el = $(this);
					el.prop('disabled', true);
				});
			});
		},
		unlockForm: function (form) {
			$(document).find("#" + form).each(function () {
				var obj = $(this);
				obj.find("input, textarea, select").each(function () {
					var el = $(this);
					el.prop('disabled', false);
				});
			});
		},
		show: function (div, msg) {
			$('.' + div).html(msg);
			$('.' + div).fadeIn();
			setTimeout(function(){
				$('.' + div).fadeOut();
			}, 5000);
		},
		sendFranchisee: function(){
			Validation.check("form-franchisee", function () {
				Shared.__ajax(
					{
						action: "./send-franchisee",
						data: {
							"franchisee-name": $("#franchisee-name").val(),
							"franchisee-phone": $("#franchisee-phone").val(),
							"franchisee-email": $("#franchisee-email").val(),
							"franchisee-state": $("#franchisee-state").val(),
							"franchisee-city": $("#franchisee-city").val()
						}
					},
					function (result) {
						//var result = JSON.parse(result);
						Index.Actions.show('fill-message-franchisee', "Enviado com sucesso!");
					},
					function () {
						Index.Actions.beforeSend("btn-send-franchisee-email", "form-franchisee");
					},
					function () {
						Index.Actions.show('fill-message-franchisee', "Houve um erro ao enviar o formulário.");
					},
					function () {
						Index.Actions.complete("btn-send-franchisee-email", "form-franchisee", ["franchisee-state", "franchisee-city"]);
					}
				);
			});
		},
		sendContact: function () {
			Validation.check("form-contact", function () {
				Shared.__ajax(
					{
						action: "./send-contact",
						data: {
							"contact-name": $("#contact-name").val(),
							"contact-phone": $("#contact-phone").val(),
							"contact-email": $("#contact-email").val(),
							"contact-message": $("#contact-message").val()
						}
					},
					function (result) {
						//var result = JSON.parse(result);
						Index.Actions.show('fill-message-contact', "Enviado com sucesso!");
					},
					function () {
						Index.Actions.beforeSend("btn-send-contact", "form-contact");
					},
					function () {
						Index.Actions.show('fill-message-contact', "Houve um erro ao enviar o formulário.");
					},
					function () {
						Index.Actions.complete("btn-send-contact", "form-contact");
					}
				);
			});
		}
	},
    init: function(){
    	Index.Menu.init();
		Index.Stellar.init();
		Index.Carousels.init();
		Index.ScrollReveal.init();
		Index.InputMask.init();
		Index.Select2.init();
		Index.Actions.init();
    }
}

$(document).ready(function() {
    Index.init();
});