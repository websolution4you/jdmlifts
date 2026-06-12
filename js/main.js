(function($) {

	'use strict';

	// bootstrap dropdown hover

  // loader
  var loader = function() {
    setTimeout(function() { 
      if($('#loader').length > 0) {
        $('#loader').removeClass('show');
      }
    }, 1);
  };
  loader();

	
	$('nav .dropdown').hover(function(){
		var $this = $(this);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			$this.find('.dropdown-menu').removeClass('show');
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// Split home slider headings for letter-by-letter animation
	var splitSliderHeadings = function() {
		$('.home-slider .slider-text h1').each(function() {
			var $h1 = $(this);
			var text = $h1.text().trim();
			var words = text.split(' ');
			var newHtml = '';
			var delay = 0.1; // initial delay offset
			var delayStep = 0.045; // 45ms delay per letter
			
			words.forEach(function(word, wordIndex) {
				var wordHtml = '<span class="word" style="display: inline-block; white-space: nowrap;">';
				for (var i = 0; i < word.length; i++) {
					wordHtml += '<span class="char" style="animation-delay: ' + delay.toFixed(3) + 's; -webkit-animation-delay: ' + delay.toFixed(3) + 's;">' + word[i] + '</span>';
					delay += delayStep;
				}
				wordHtml += '</span>';
				newHtml += wordHtml;
				if (wordIndex < words.length - 1) {
					newHtml += ' ';
				}
			});
			$h1.html(newHtml);
		});
	};
	splitSliderHeadings();

	// home slider
	$('.home-slider').owlCarousel({
    loop:true,
    autoplay: true,
    autoplayTimeout: 7000,
    margin:10,
    animateOut: 'fogOut',
    animateIn: 'fogIn',
    nav:true,
    autoplayHoverPause: true,
    items: 1,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true
      }
    }
	});

	// owl carousel
	var majorCarousel = $('.js-carousel-1');
	majorCarousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 3,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:true,
        loop:false
      }
  	}
	});

	// owl carousel
	var major2Carousel = $('.js-carousel-2');
	major2Carousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 4,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
  	}
	});


	var contentWayPoint = function() {
		var i = 0;
		$('.element-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('element-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .element-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn element-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft element-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight element-animated');
							} else {
								el.addClass('fadeInUp element-animated');
							}
							el.removeClass('item-animate');
						},  k * 100);
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	var counter = function() {
		if ($('.counter-item').length > 0) {
			$('.counter-item').waypoint( function( direction ) {
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					var el = $(this.element);
					el.addClass('animated');
					
					var endVal = parseInt(el.data('target'));
					var startVal = 0;
					var duration = 2000; // 2 seconds
					var startTime = null;

					function animateCount(timestamp) {
						if (!startTime) startTime = timestamp;
						var progress = timestamp - startTime;
						var currentVal = Math.min(Math.floor((progress / duration) * endVal), endVal);
						
						var suffix = "";
						if (endVal === 8 || endVal === 1130) {
							suffix = "+";
						} else if (endVal === 100) {
							suffix = "%";
						}

						el.text(currentVal + suffix);

						if (progress < duration) {
							window.requestAnimationFrame(animateCount);
						} else {
							el.text(endVal + suffix);
						}
					}
					
					window.requestAnimationFrame(animateCount);
				}
			} , { offset: '90%' } );
		}
	};
	counter();

	// Lightbox Gallery
	var lightboxHTML = 
		'<div id="custom-lightbox" style="display:none; position:fixed; z-index:9999; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.9); align-items:center; justify-content:center; flex-direction:column; color:#fff; opacity:0; transition:opacity 0.3s ease;">' +
			'<span id="lightbox-close" style="position:absolute; top:20px; right:30px; font-size:40px; font-weight:bold; cursor:pointer; color:#fff; user-select:none; z-index:10001;">&times;</span>' +
			'<a id="lightbox-prev" style="position:absolute; left:20px; font-size:45px; cursor:pointer; color:#fff; user-select:none; text-decoration:none; z-index:10001; transition: color 0.2s;">&#10094;</a>' +
			'<div style="max-width:85%; max-height:80%; display:flex; align-items:center; justify-content:center; position:relative;">' +
				'<img id="lightbox-img" src="" style="max-width:100%; max-height:80vh; object-fit:contain; border-radius:4px; box-shadow:0 10px 30px rgba(0,0,0,0.5); transform:scale(0.95); transition:transform 0.3s ease;">' +
			'</div>' +
			'<div id="lightbox-caption" style="margin-top:20px; font-size:18px; text-align:center; font-family:\'Poppins\', sans-serif; font-weight:400; padding:0 20px;"></div>' +
			'<a id="lightbox-next" style="position:absolute; right:20px; font-size:45px; cursor:pointer; color:#fff; user-select:none; text-decoration:none; z-index:10001; transition: color 0.2s;">&#10095;</a>' +
		'</div>';

	$('body').append(lightboxHTML);

	var $lightbox = $('#custom-lightbox');
	var $lightboxImg = $('#lightbox-img');
	var $lightboxCaption = $('#lightbox-caption');
	var galleryItems = [];
	var currentIndex = 0;

	// Collect all gallery items
	function updateGalleryItems() {
		galleryItems = [];
		$('[data-lightbox="gallery"]').each(function() {
			var href = $(this).attr('href');
			var title = $(this).find('h3').text() || $(this).attr('data-title') || '';
			galleryItems.push({ href: href, title: title });
		});
	}

	function showImage(index) {
		if (index < 0 || index >= galleryItems.length) return;
		currentIndex = index;
		var item = galleryItems[currentIndex];
		
		// Smooth scale transition
		$lightboxImg.css('transform', 'scale(0.95)');
		setTimeout(function() {
			$lightboxImg.attr('src', item.href);
			$lightboxCaption.text(item.title);
			$lightboxImg.css('transform', 'scale(1)');
		}, 150);
	}

	$(document).on('click', '[data-lightbox="gallery"]', function(e) {
		e.preventDefault();
		updateGalleryItems();
		
		var href = $(this).attr('href');
		var index = galleryItems.findIndex(function(item) {
			return item.href === href;
		});
		
		if (index !== -1) {
			showImage(index);
			$lightbox.css('display', 'flex');
			// trigger fade in
			setTimeout(function() {
				$lightbox.css('opacity', '1');
			}, 50);
		}
	});

	function closeLightbox() {
		$lightbox.css('opacity', '0');
		setTimeout(function() {
			$lightbox.css('display', 'none');
			$lightboxImg.attr('src', '');
		}, 300);
	}

	$('#lightbox-close').on('click', function() {
		closeLightbox();
	});

	$lightbox.on('click', function(e) {
		if (e.target === this || e.target.id === 'custom-lightbox') {
			closeLightbox();
		}
	});

	$('#lightbox-prev').on('click', function(e) {
		e.stopPropagation();
		var prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
		showImage(prevIndex);
	});

	$('#lightbox-next').on('click', function(e) {
		e.stopPropagation();
		var nextIndex = (currentIndex + 1) % galleryItems.length;
		showImage(nextIndex);
	});

	// Hover effects
	$('#lightbox-prev, #lightbox-next, #lightbox-close').hover(
		function() { $(this).css('color', '#fecd0e'); },
		function() { $(this).css('color', '#fff'); }
	);

	// Keyboard support
	$(document).on('keydown', function(e) {
		if ($lightbox.css('display') === 'flex') {
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowLeft') $('#lightbox-prev').click();
			if (e.key === 'ArrowRight') $('#lightbox-next').click();
		}
	});

})(jQuery);