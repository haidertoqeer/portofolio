(function ($) {
    "use strict";
    // preloader
    var loader = function () {
        setTimeout(function () {
            if ($('.preloader').length > 0) {
                $('.preloader').removeClass('show');
            }
        }, 1000);
    };
    loader();
    // sticky
    var wind = $(window);
    wind.on('scroll', function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $('.navbar'),
            logo = $('.navbar .logo> img');
        if (bodyScroll > 300) {
            navbar.addClass('nav-scroll');
            logo.attr('src', 'img/logo-dark.png');
        } else {
            navbar.removeClass('nav-scroll');
            logo.attr('src', 'img/logo-light.png');
        }
    });
    // smooth-scrolling
    var scrollLink = $('nav ul li a, .hero-btn .btn');
    scrollLink.click(function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top - 80
        }, 500);
    });
    // data-background
    $('[data-background]').each(function () {
        $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')')
    });
    // parallaxie
    $('.parallaxie').parallaxie({
        speed: 0.2,
        size: 'cover'
    });
    // magnificPopup
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });
    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    // skill-progress
    var wind = $(window);
    wind.on('scroll', function () {
        $('.skill-progress .progres').each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });
    // counterUp
    $('.single-counter h3 span').counterUp({
        delay: 10,
        time: 1000
    });
    // init Isotope
    $('.filter span:first-child').addClass('active');
    var $grid = $('.gallery').imagesLoaded(function () {
        // init Isotope after all images have loaded
        $grid.isotope({
            // options...
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '.grid-item'
            }
        });
        // filter items on button click
        $('.filter').on('click', 'span', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $(this).addClass('active').siblings().removeClass('active');
        });
    });
    // testimonials-carousel
    $('.testimonials-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    // ajax-form
    $(function () {
        // Get the form.
        var form = $('.contact-form form');

        // Get the messages div.
        var formMessages = $('.form-messages');

        // TODO: The rest of the code will go here...

        // Set up an event listener for the contact form.
        $(form).submit(function (event) {
            // Stop the browser from submitting the form.
            event.preventDefault();

            // TODO

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $('.ajax-form input, .ajax-form textarea').val('');
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    }
                });
        });
    });
    // scrollUp
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    });
}(jQuery));