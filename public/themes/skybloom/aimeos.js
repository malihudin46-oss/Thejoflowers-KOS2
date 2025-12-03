/**
 * Aimeos Sky Bloom Garden Theme JavaScript
 * Korean Florist Web App - Interactive Features
 *
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Thejoflowers (thejoflowers.com), 2025
 */

(function($) {
    "use strict";

    // Sky Bloom Garden Theme Namespace
    window.SkyBloomGarden = {

        // Configuration
        config: {
            animationDuration: 300,
            breakpoints: {
                mobile: 480,
                tablet: 768
            },
            colors: {
                sky: '#A7D8F0',
                cloud: '#D7ECFA',
                sunshine: '#F7D74C',
                meadow: '#B7D8A8',
                beige: '#F3E8D3',
                coral: '#F6B6A5',
                brown: '#A97C50'
            }
        },

        // Initialize the theme
        init: function() {
            this.setupEventListeners();
            this.setupAnimations();
            this.setupProductInteractions();
            this.setupBasketInteractions();
            this.setupFormEnhancements();
            this.setupResponsiveBehavior();

            // Add decorative elements
            this.addFloralAccents();

            console.log('Sky Bloom Garden Theme initialized');
        },

        // Setup global event listeners
        setupEventListeners: function() {
            var self = this;

            // Smooth scroll for anchor links
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                var target = $(this.getAttribute('href'));
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, self.config.animationDuration * 2);
                }
            });

            // Add hover effects to cards
            $('.card, .product-item, .aimeos .content-box').hover(
                function() {
                    $(this).addClass('hover-effect');
                },
                function() {
                    $(this).removeClass('hover-effect');
                }
            );

            // Lazy loading for images
            $('img[data-src]').each(function() {
                var $img = $(this);
                $img.on('load', function() {
                    $img.addClass('loaded');
                });
            });
        },

        // Setup entrance animations
        setupAnimations: function() {
            var self = this;

            // Animate elements when they come into view
            function animateOnScroll() {
                $('.fade-in, .slide-up').each(function() {
                    var $el = $(this);
                    var elementTop = $el.offset().top;
                    var elementBottom = elementTop + $el.outerHeight();
                    var viewportTop = $(window).scrollTop();
                    var viewportBottom = viewportTop + $(window).height();

                    if (elementBottom > viewportTop && elementTop < viewportBottom) {
                        $el.addClass('animate');
                    }
                });
            }

            $(window).on('scroll', animateOnScroll);
            animateOnScroll(); // Initial check
        },

        // Setup product interactions
        setupProductInteractions: function() {
            var self = this;

            // Product image gallery
            $('.product-image').on('click', function() {
                var $this = $(this);
                var $gallery = $this.closest('.product-gallery');

                if ($gallery.length) {
                    // Simple lightbox effect
                    self.showImageLightbox($this.find('img').attr('src'));
                }
            });

            // Quick add to basket
            $('.btn-quick-add').on('click', function(e) {
                e.preventDefault();
                var $btn = $(this);
                var productId = $btn.data('product-id');

                self.addToBasket(productId, 1, function() {
                    self.showNotification('Product added to basket!', 'success');
                    $btn.addClass('added').text('Added ✓');

                    setTimeout(function() {
                        $btn.removeClass('added').text('Add to Basket');
                    }, 2000);
                });
            });

            // Product quantity controls
            $('.quantity-control').each(function() {
                var $control = $(this);
                var $input = $control.find('input[type="number"]');
                var $decrease = $control.find('.btn-decrease');
                var $increase = $control.find('.btn-increase');

                $decrease.on('click', function() {
                    var current = parseInt($input.val()) || 1;
                    if (current > 1) {
                        $input.val(current - 1);
                        $input.trigger('change');
                    }
                });

                $increase.on('click', function() {
                    var current = parseInt($input.val()) || 1;
                    $input.val(current + 1);
                    $input.trigger('change');
                });
            });
        },

        // Setup basket interactions
        setupBasketInteractions: function() {
            var self = this;

            // Update basket total when quantity changes
            $('.basket-item input[type="number"]').on('change', function() {
                self.updateBasketTotal();
            });

            // Remove item from basket
            $('.btn-remove-item').on('click', function(e) {
                e.preventDefault();
                var $btn = $(this);
                var $item = $btn.closest('.basket-item');

                $item.fadeOut(self.config.animationDuration, function() {
                    $item.remove();
                    self.updateBasketTotal();
                    self.showNotification('Item removed from basket', 'info');
                });
            });
        },

        // Setup form enhancements
        setupFormEnhancements: function() {
            var self = this;

            // Add floating label effect
            $('.form-group').each(function() {
                var $group = $(this);
                var $input = $group.find('.form-control');
                var $label = $group.find('.form-label');

                if ($input.length && $label.length) {
                    $input.on('focus', function() {
                        $label.addClass('focused');
                    });

                    $input.on('blur', function() {
                        if (!$(this).val()) {
                            $label.removeClass('focused');
                        }
                    });

                    // Check initial state
                    if ($input.val()) {
                        $label.addClass('focused');
                    }
                }
            });

            // Form validation styling
            $('form').on('submit', function(e) {
                var $form = $(this);
                var isValid = true;

                $form.find('.form-control').each(function() {
                    var $input = $(this);
                    var $group = $input.closest('.form-group');

                    if (!$input.val()) {
                        $group.addClass('has-error');
                        isValid = false;
                    } else {
                        $group.removeClass('has-error').addClass('has-success');
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    self.showNotification('Please fill in all required fields', 'warning');
                }
            });
        },

        // Setup responsive behavior
        setupResponsiveBehavior: function() {
            var self = this;

            function handleResize() {
                var width = $(window).width();

                if (width < self.config.breakpoints.mobile) {
                    $('body').addClass('mobile-view').removeClass('tablet-view desktop-view');
                } else if (width < self.config.breakpoints.tablet) {
                    $('body').addClass('tablet-view').removeClass('mobile-view desktop-view');
                } else {
                    $('body').addClass('desktop-view').removeClass('mobile-view tablet-view');
                }
            }

            $(window).on('resize', handleResize);
            handleResize(); // Initial check
        },

        // Add floral decorative elements
        addFloralAccents: function() {
            // Add decorative flowers to page headers
            $('.aimeos h1').each(function() {
                var $h1 = $(this);
                if (!$h1.hasClass('decorated')) {
                    $h1.addClass('decorated');
                    $h1.append(' <span class="floral-decoration">✿</span>');
                }
            });

            // Add subtle background patterns
            $('body').append('<div class="sky-pattern"></div>');
        },

        // Basket functionality
        addToBasket: function(productId, quantity, callback) {
            // Simulate adding to basket (replace with actual AJAX call)
            setTimeout(function() {
                if (callback) callback();
            }, 500);
        },

        updateBasketTotal: function() {
            // Simulate updating basket total (replace with actual calculation)
            var total = 0;
            $('.basket-item').each(function() {
                var $item = $(this);
                var price = parseFloat($item.data('price')) || 0;
                var quantity = parseInt($item.find('input[type="number"]').val()) || 1;
                total += price * quantity;
            });

            $('.basket-total').text('₩' + total.toLocaleString());
        },

        // Image lightbox
        showImageLightbox: function(imageSrc) {
            var $lightbox = $('<div class="image-lightbox">' +
                '<div class="lightbox-overlay"></div>' +
                '<div class="lightbox-content">' +
                    '<img src="' + imageSrc + '" alt="Product Image">' +
                    '<button class="lightbox-close">&times;</button>' +
                '</div>' +
            '</div>');

            $('body').append($lightbox);

            $lightbox.hide().fadeIn(this.config.animationDuration);

            $lightbox.on('click', function(e) {
                if (e.target === this || $(e.target).hasClass('lightbox-close')) {
                    $lightbox.fadeOut(this.config.animationDuration, function() {
                        $lightbox.remove();
                    });
                }
            }.bind(this));
        },

        // Notification system
        showNotification: function(message, type) {
            type = type || 'info';

            var $notification = $('<div class="notification notification-' + type + '">' +
                '<span class="notification-message">' + message + '</span>' +
                '<button class="notification-close">&times;</button>' +
            '</div>');

            $('body').append($notification);

            $notification.hide().slideDown(this.config.animationDuration);

            // Auto-hide after 5 seconds
            setTimeout(function() {
                $notification.slideUp(this.config.animationDuration, function() {
                    $notification.remove();
                });
            }.bind(this), 5000);

            // Manual close
            $notification.find('.notification-close').on('click', function() {
                $notification.slideUp(this.config.animationDuration, function() {
                    $notification.remove();
                });
            });
        },

        // Loading states
        showLoading: function(element) {
            var $element = $(element);
            $element.addClass('loading');

            if (!$element.find('.spinner').length) {
                $element.append('<div class="spinner"></div>');
            }
        },

        hideLoading: function(element) {
            var $element = $(element);
            $element.removeClass('loading');
            $element.find('.spinner').remove();
        }
    };

    // Initialize when DOM is ready
    $(document).ready(function() {
        SkyBloomGarden.init();
    });

    // Optional: Initialize Aimeos specific functionality if available
    if (window.Aimeos) {
        // Extend Aimeos functionality with Sky Bloom Garden theme
        $.extend(true, window.Aimeos, {
            SkyBloomGarden: SkyBloomGarden
        });
    }

})(jQuery);