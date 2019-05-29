import $ from 'jquery';
import 'bootstrap';
import 'owl.carousel';
import './scss/style.scss';

// Import logo assets
import logo from './img/logo.svg';
import phone_logo from './img/smartphone-call.svg';
import location_logo from './img/location-point.svg';
import phone_img from './img/phone_img.jpg';
import tablet_img from './img/tablet_img.jpg';
import laptop_img from './img/laptop_img.jpg';
import camera_img from './img/camera_img.jpg';
import all_devices_img from './img/all-devices.png';
import camera_img_price from './img/camera_img_for_price.png';
import phone_img_price from './img/phone_img_for_price.png';
import warr_img_price from './img/warr_img_for_price.png';
import face_1 from './img/face_1.png';
import face_2 from './img/face_2.png';
import face_3 from './img/face_3.png';
import face_4 from './img/face_4.png';
import dropdown_icon from './img/dropdown_bckg.png';
import refresh_icon from './img/reload_icon.png';

// Devices images
const deviceLogos = [
    phone_img,
    tablet_img,
    laptop_img,
    camera_img
]
// Cleints photo
const clientsPhoto = [
    face_1,
    face_2,
    face_3,
    face_4,
    face_1,
    face_2,
    face_3,
    face_4
]

let addImage = function (element, img, width, height) {
    $(element).html(`<img src="${img}" width="${width}" height="${height}">`);
}

$(function () {
    // Add company logo in navbar
    addImage($('.company-logo'), logo, 120, 40);
    // Add phone logo in navbar
    addImage($('.phone .phone-logo'), phone_logo, 15, 15);
    // Add location logo in navbar
    addImage($('.location .location-logo'), location_logo, 15, 15);
    // Add devices images in device-sections
    $('.device-img').each(function (key, value) {
        addImage($(this), deviceLogos[key], 100, 100);
    });
    // Add all devices image in price section
    addImage($('.diag-img'), all_devices_img, 300, 300);
    // Add camera image in price section
    addImage($('.cameras-img'), camera_img_price, 200, 200);
    // Add phone image in price section
    addImage($('.phones-img'), phone_img_price, 150, 150);
    // Add warranty image in price section
    addImage($('.warr-img'), warr_img_price, 150, 150);
    // Add clients photo
    $('.client-photo').each(function (key, value) {
        addImage($(this), clientsPhoto[key], 45, 45);
    });
    // Add dropdown icon in custom select form
    addImage($('.default-option .dropdown-img'), dropdown_icon, 10, 10);
    //Add refresh icon in form buttons
    addImage($('.refresh-form-btn'), refresh_icon, 15, 15);
    // Add company logo in footer
    addImage($('.footer-logo'), logo, 100, 50);

    // Show phone number
    $('.phone').click(function () {
        // Cancel click if phone number visible
        if ($(this).find('.phone-num').is(':visible')) {
            window.location = 'tel:+74997777777';
            $(this).blur();
            return false;
        }

        $('.phone-num').fadeIn(1500);
    });

    //Hide collapse navbar after select category
    $('.navbar-collapse').click(function () {
        $(this).collapse('hide');
    });

    // Scroll
    $('.scroll-button').click(function () {
        // Scroll to top page in desktop
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // Get all section with target offsets
    let sections = $('.navs-section .nav-link').map(function () {
        return {
            nav: $(this),
            offset: $(`#${$(this).attr('data-target')}`).offset().top
        }
    });

    // Bind navbar scroll
    $(window).scroll(function () {
        // Display or hide scroll to top button 
        if ($(document).scrollTop() > 900) {
            $('.scroll-button').fadeIn(500);
        } else {
            $('.scroll-button').fadeOut(500);
        }
        // Get current section on screen
        let currSection = sections.filter(function (index, value) {
            if (index == sections.length - 1) {
                // Check last element position and bottom page status ()
                if ($(document).scrollTop() >= value.offset || $(window).scrollTop() + $(window).height() == $(document).height()) return true;
            } else {
                let next = sections[++index];
                if ($(document).scrollTop() >= value.offset && $(document).scrollTop() < next.offset) {
                    return true;
                }
            }
        });
        // Add active class in current nav-link (use element with more position, if curr section not unique)
        $('.nav-link.active').removeClass('active').blur();
        currSection[--currSection.length].nav.addClass('active');
    });


    $('.navs-section .nav-link, .location').click(function () {
        // Scroll to specific section
        let id = $(this).attr('data-target');
        let target = $(`#${id}`).offset().top;

        $('html, body').animate({
            scrollTop: target
        }, 600);

        $(this).blur();
    });

    // Owl carousel init
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        nav: true,
        dots: false,
        mergeFit: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    })

    // Contact form

    const maxPhoneDigits = 11;
    const phonePrefix = '8';
    let toggleInvalidInput = function (element, action = 'add') {
        if (action == 'add') {
            $(`#${element.attr('data-error-id')}`).animate({
                opacity: 1
            }, 500);
            element.addClass('invalid-input');
        } else if (action == 'remove') {
            $(`#${element.attr('data-error-id')}`).animate({
                opacity: 0
            }, 500);
            element.removeClass('invalid-input');
        }
    }
    let validateInput = function (element) {
        let self = element;
        let value = self.val();
        let pattern = new RegExp(self.attr('pattern'));
        let valid = pattern.test(value);

        if (self.attr('type') == 'tel') {
            // Validate phone number using isDigit and length check
            let value = self.val();
            let digits = value.replace(/-/gi, '');

            if (digits.length != maxPhoneDigits && digits.length != 0) {
                toggleInvalidInput(self, 'add');
            } else if ((digits.length == maxPhoneDigits || digits.length == 0) && self.hasClass('invalid-input')) {
                toggleInvalidInput(self, 'remove');
            }

            return valid;
        }

        if (!valid && !self.val() == '') {
            // If invalid and input not empty add invalid class to clicked element
            toggleInvalidInput(self, 'add');
        } else if ((valid && self.hasClass('invalid-input')) || (self.val() == '' && self.hasClass('invalid-input'))) {
            // If clicked element has invalid class and his input valid or empty now, remove invalid class
            toggleInvalidInput(self, 'remove');
        }

        return valid;
    }

    // Custom select show/hide options
    $('.device-type-select').click(function () {
        let options = $('.select-options');
        let self = $(this);
        // Remove invalid state
        if (self.hasClass('invalid-input')) {
            self.removeClass('invalid-input');
            toggleInvalidInput(self, 'remove');
        }

        if (options.is(':visible')) {
            // Hide select options
            $('.select-options').slideUp(500);
            // Rotate dropdown
            $('.default-option .dropdown-img').css('transform', 'rotate(0deg)');
        } else {
            // Show select options
            $('.select-options').slideDown(500);
            // Rotate dropdown
            $('.default-option .dropdown-img').css('transform', 'rotate(-180deg)');
        }
    });

    // Add custom select option in hidden input (name="deviceType")
    $('.select-options-list .option').click(function () {
        let input = $('input[type="hidden"]');
        // Add clicked option data attribute as input value
        let currOptionValue = $(this).attr('data-value');
        input.attr('value', currOptionValue);
        // Change default select option text
        $('.curr-option').text(currOptionValue);
    });

    // Validate form inputs
    $('.contact-form-input').change(function () {
        validateInput($(this));
    });

    // Validate textarea
    $('#messageTextArea').change(function () {
        let self = $(this);
        if (self.hasClass('invalid-input') && self.val()) {
            toggleInvalidInput(self, 'remove');
        }
    });

    // Add phone prefix in phone nuber input

    $('#phoneInput').focus(function () {
        let self = $(this);
        if (self.val() == '') {
            self.val(`${phonePrefix}-`);
        }
    });

    $('#phoneInput').focusout(function () {
        let self = $(this);
        let val = self.val();
        if (val == `${phonePrefix}-` || !val) {
            // Clear value
            self.val('');
        }
    });

    // Filtering phone number input for only digits
    $("#phoneInput").on('keypress', function (e) {
        let key = e.keyCode || e.which;
        let self = $(this);
        let currVal = self.val();

        // Keypress filtering
        if (!(key == '46' || key == '8')) {
            if (isNaN(parseInt(String.fromCharCode(key)))) {
                return false;
            }
            // Add '-' segments number delimiter
            if (self.val().length == 1 || self.val().length == 5 || self.val().length == 9 || self.val().length == 12) {
                self.val(currVal + '-');
            }
        }
    });

    // Clear form fields
    $('#refreshFormBtn').click(function () {
        $('.form-control').each(function () {
            let self = $(this);
            toggleInvalidInput(self, 'remove');
            self.val('');
        });
        // Set custom select in default
        $('.curr-option').text('Choose device type');
        $('input[type="hidden"]').val('');
        $('#serviceFormDeviceSelect').removeClass('invalid-input');
        toggleInvalidInput($('#serviceFormDeviceSelect'), 'remove');
    });

    // Sending form
    $('#sendFormBtn').click(function () {
        let formValid = true;
        // Check data and valid state in inputs
        if (!$('input[type="hidden"]').val()) {
            formValid = false;
            $('#serviceFormDeviceSelect').addClass('invalid-input');
            toggleInvalidInput($('#serviceFormDeviceSelect'), 'add');
        }
        $('.form-control').each(function () {
            let el = $(this);
            // Validate requare input value
            if (el.hasClass('requare-input')) {
                let valid = validateInput(el);
                if (!el.val()) {
                    toggleInvalidInput(el, 'add');
                    formValid = false;
                } else if (!valid) {
                    formValid = false;
                }
            }
        });
        // Submit form
        if (formValid) {
            console.log(formValid);
            $('#serviceForm').submit();
        }
    });
});