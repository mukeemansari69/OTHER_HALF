// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.closeMenuBtn = document.getElementById('closeMenuBtn');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.mobileMenuBtn.addEventListener('click', () => this.openMenu());
        this.closeMenuBtn.addEventListener('click', () => this.closeMenu());
        this.mobileMenuOverlay.addEventListener('click', (e) => this.handleOverlayClick(e));
        
        // Add keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Add resize listener
        window.addEventListener('resize', () => this.handleResize());
        
        // Initialize menu navigation
        this.initMenuNavigation();
    }
    
    openMenu() {
        this.mobileMenuOverlay.classList.add('active');
        this.mobileMenuBtn.classList.add('active');
        this.body.classList.add('menu-open');
        
        // Focus on close button for accessibility
        setTimeout(() => {
            this.closeMenuBtn.focus();
        }, 300);
    }
    
    closeMenu() {
        this.mobileMenuOverlay.classList.remove('active');
        this.mobileMenuBtn.classList.remove('active');
        this.body.classList.remove('menu-open');
        
        // Return focus to menu button
        this.mobileMenuBtn.focus();
    }
    
    handleOverlayClick(e) {
        // Close menu if clicking on overlay (not the menu itself)
        if (e.target === this.mobileMenuOverlay) {
            this.closeMenu();
        }
    }
    
    handleKeyPress(e) {
        // Close menu on Escape key
        if (e.key === 'Escape' && this.mobileMenuOverlay.classList.contains('active')) {
            this.closeMenu();
        }
    }
    
    handleResize() {
        // Close menu if window is resized to desktop size
        if (window.innerWidth > 768 && this.mobileMenuOverlay.classList.contains('active')) {
            this.closeMenu();
        }
    }
    
    initMenuNavigation() {
        // Handle active states for navigation links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all nav items
                document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked item's parent
                const parentItem = link.closest('.nav-item, .mobile-nav-item');
                if (parentItem) {
                    parentItem.classList.add('active');
                }
                
                // Close mobile menu if navigation link is clicked
                if (link.classList.contains('mobile-nav-link')) {
                    setTimeout(() => {
                        this.closeMenu();
                    }, 150);
                }
                
                // Add a small animation to the clicked link
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
            });
        });
    }
}

// Hero Carousel functionality
class HeroCarousel {
    constructor() {
        this.carousel = document.getElementById('heroCarousel');
        if (!this.carousel) return;
        
        this.slides = this.carousel.querySelectorAll('.slide');
        this.dots = this.carousel.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        
        this.currentSlide = 0;
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.slideDuration = 5000;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.playPauseBtn.addEventListener('click', () => this.toggleAutoPlay());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        this.carousel.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.carousel.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        // Start autoplay
        this.startAutoPlay();
        
        console.log('Hero carousel initialized with', this.slides.length, 'slides');
    }
    
    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        // Remove active classes
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active classes
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        
        // Reset autoplay
        if (this.isPlaying) {
            this.resetAutoPlay();
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoPlay() {
        if (!this.isPlaying) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    }
    
    pauseAutoPlay() {
        this.stopAutoPlay();
    }
    
    resumeAutoPlay() {
        if (this.isPlaying) {
            this.startAutoPlay();
        }
    }
    
    toggleAutoPlay() {
        this.isPlaying = !this.isPlaying;
        
        // Update button icons
        const playIcon = this.playPauseBtn.querySelector('.play-icon');
        const pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            this.startAutoPlay();
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            this.stopAutoPlay();
        }
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }
    
    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    }
    
    handleKeyDown(e) {
        if (!this.carousel.matches(':hover')) return;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoPlay();
                break;
            case 'Escape':
                this.carousel.blur();
                break;
        }
    }
}

// Testimonials functionality
class TestimonialsSection {
    constructor() {
        this.section = document.getElementById('testimonialsSection');
        if (!this.section) return;
        
        this.testimonialItems = this.section.querySelectorAll('.testimonial-item');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        console.log('Testimonials section initialized with', this.testimonialItems.length, 'testimonials');
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateTestimonials();
                    this.hasAnimated = true;
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(this.section);
    }
    
    animateTestimonials() {
        this.testimonialItems.forEach((item, index) => {
            const delay = parseInt(item.getAttribute('data-animation-delay')) || 0;
            
            setTimeout(() => {
                item.classList.add('animate-in');
            }, delay);
        });
    }
}

// Starter Duo Section functionality
class StarterDuoSection {
    constructor() {
        this.section = document.getElementById('starterDuoSection');
        if (!this.section) return;
        
        this.productImagesArea = this.section.querySelector('.product-images-area');
        this.contentArea = this.section.querySelector('.starter-duo-content');
        this.shopButton = this.section.querySelector('.shop-duo-btn');
        this.featureItems = this.section.querySelectorAll('.feature-item');
        this.hasAnimated = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupButtonInteraction();
        this.setupFeatureAnimations();
        
        console.log('Starter Duo section initialized');
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateSection();
                    this.hasAnimated = true;
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(this.section);
    }
    
    animateSection() {
        setTimeout(() => {
            this.productImagesArea.classList.add('animate-in');
        }, 100);
        
        setTimeout(() => {
            this.contentArea.classList.add('animate-in');
        }, 300);
        
        this.featureItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                item.style.transition = 'all 0.5s ease-out';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 500 + (index * 100));
            }, 600);
        });
    }
    
    setupButtonInteraction() {
        if (!this.shopButton) return;
        
        this.shopButton.addEventListener('click', () => {
            this.shopButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.shopButton.style.transform = '';
            }, 150);
            
            console.log('Shop Daily Duo button clicked');
        });
    }
    
    setupFeatureAnimations() {
        this.featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.checkmark-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.checkmark-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
}

// Health Benefits Section functionality
class HealthBenefitsSection {
    constructor() {
        this.section = document.getElementById('healthBenefitsSection');
        if (!this.section) return;
        
        this.contentArea = this.section.querySelector('.content-area');
        this.imageArea = this.section.querySelector('.image-area');
        this.cyclingImages = this.section.querySelectorAll('.cycling-image');
        this.shopButton = this.section.querySelector('.shop-now-btn');
        
        this.currentImageIndex = 0;
        this.imageInterval = null;
        this.imageDuration = 5000;
        this.hasAnimated = false;
        
        this.imageUrls = [
            './images/healthypet1.png',
            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupImages();
        this.startImageCycling();
        this.setupButtonInteraction();
        
        console.log('Health benefits section initialized with', this.cyclingImages.length, 'cycling images');
    }
    
    setupImages() {
        this.cyclingImages.forEach((imageEl, index) => {
            const img = imageEl.querySelector('.feature-image');
            if (img && this.imageUrls[index]) {
                img.src = this.imageUrls[index];
                img.alt = `Healthy pet image ${index + 1}`;
            }
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animateSection();
                    this.hasAnimated = true;
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(this.section);
    }
    
    animateSection() {
        setTimeout(() => {
            this.contentArea.classList.add('animate-in');
        }, 100);
        
        setTimeout(() => {
            this.imageArea.classList.add('animate-in');
        }, 300);
    }
    
    startImageCycling() {
        if (this.imageInterval) {
            clearInterval(this.imageInterval);
        }
        
        this.imageInterval = setInterval(() => {
            this.cycleToNextImage();
        }, this.imageDuration);
    }
    
    cycleToNextImage() {
        const currentImage = this.cyclingImages[this.currentImageIndex];
        const nextIndex = (this.currentImageIndex + 1) % this.cyclingImages.length;
        const nextImage = this.cyclingImages[nextIndex];
        
        currentImage.classList.add('cycle-out');
        currentImage.classList.remove('active');
        
        setTimeout(() => {
            currentImage.classList.remove('cycle-out');
            nextImage.classList.add('cycle-in', 'active');
            this.currentImageIndex = nextIndex;
            
            setTimeout(() => {
                nextImage.classList.remove('cycle-in');
            }, 1000);
        }, 500);
    }
    
    setupButtonInteraction() {
        if (!this.shopButton) return;
        
        this.shopButton.addEventListener('click', () => {
            this.shopButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.shopButton.style.transform = '';
            }, 150);
            
            console.log('Shop Now button clicked');
        });
    }
}

// Page load animations
class PageAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        document.body.classList.add('loading');
        
        setTimeout(() => {
            document.body.classList.remove('loading');
            this.triggerEntryAnimations();
        }, 100);
    }
    
    triggerEntryAnimations() {
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.6s ease-out';
            setTimeout(() => {
                header.style.transform = 'translateY(0)';
            }, 200);
        }
        
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.style.opacity = '0';
            carousel.style.transform = 'scale(1.05)';
            carousel.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            setTimeout(() => {
                carousel.style.opacity = '1';
                carousel.style.transform = 'scale(1)';
            }, 400);
        }
    }
}

// Utility functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for header scroll effects and loading states
    const style = document.createElement('style');
    style.textContent = `
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            transition: all 0.3s ease;
        }
        
        body.loading * {
            animation-play-state: paused !important;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize all components
    new MobileMenu();
    new HeroCarousel();
    new TestimonialsSection();
    new StarterDuoSection();
    new HealthBenefitsSection();
    new PageAnimations();
    
    console.log('All components initialized successfully!');
});




$(document).ready(function() {
    // Initialize Owl Carousel for mobile
    $('.products-carousel').owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        // navText: ['‹', '›'],
        responsive: {
            0: {
                items: 1,
                stagePadding: 20,
                autoWidth: true
            },
            480: {
                items: 1,
                stagePadding: 30
            },
            768: {
                items: 2,
                stagePadding: 0
            },
            1024: {
                items: 3,
                stagePadding: 0
            }

        },
        onInitialized: function(event) {
            // Add fade-in animation to carousel items
            $('.products-carousel .product-card').each(function(index) {
                $(this).css({
                    'animation-delay': (index * 0.2) + 's',
                    'animation-fill-mode': 'both'
                }).addClass('fadeInUp');
            });
        }
    });

    // Add smooth scrolling and intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

    // Add click animation to add-to-cart buttons
    $('.add-to-cart-btn').on('click', function(e) {
        e.preventDefault();
        
        const $btn = $(this);
        const $card = $btn.closest('.product-card');
        const productName = $card.find('.product-title').text();
        
        // Add ripple effect
        $btn.addClass('clicked');
        setTimeout(() => {
            $btn.removeClass('clicked');
        }, 300);
        
        // Show feedback (you can replace this with actual cart functionality)
        showAddToCartFeedback(productName);
        
        // Analytics or tracking can be added here
        console.log('Product added to cart:', productName);
    });

    //Enhanced hover effects for product cards
    $('.product-card').hover(
        function() {
            // Mouse enter
            $(this).find('.product-tag').each(function(index) {
                setTimeout(() => {
                    $(this).addClass('hover-bounce');
                }, index * 100);
            });
        },
        function() {
            // Mouse leave
            $(this).find('.product-tag').removeClass('hover-bounce');
        }
    );

    // ======================================
    // SECTION 2: HEALTH BENEFITS INTERACTIONS
    // ======================================

    // Health benefit card hover effects
    $('.health-benefit-card').hover(
        function() {
            // Mouse enter - show description with animation
            const $card = $(this);
            const $description = $card.find('.benefit-description');
            
            // Add staggered animation to elements
            setTimeout(() => {
                $card.addClass('hovered');
            }, 50);
            
            // Optional: Add slight rotation effect
            $card.find('.benefit-image-container').css({
                'transform': 'scale(1.05) rotate(2deg)'
            });
        },
        function() {
            // Mouse leave - hide description
            const $card = $(this);
            
            $card.removeClass('hovered');
            
            // Reset transform
            $card.find('.benefit-image-container').css({
                'transform': 'scale(1) rotate(0deg)'
            });
        }
    );

    // Toggle button click functionality
    // $('.benefit-toggle-btn').on('click', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
        
    //     const $btn = $(this);
    //     const $card = $btn.closest('.health-benefit-card');
    //     const benefitType = $card.data('benefit');
        
    //     // Toggle active state
    //     $card.toggleClass('active');
        
    //     // Add click animation
    //     $btn.addClass('clicked');
    //     setTimeout(() => {
    //         $btn.removeClass('clicked');
    //     }, 200);
        
    //     // Optional: Log interaction for analytics
    //     console.log('Health benefit toggled:', benefitType, $card.hasClass('active') ? 'opened' : 'closed');
        
    //     // Add ripple effect
    //     createRippleEffect($btn[0], e);
    // });

    // Keyboard accessibility for health benefit cards
    // $('.health-benefit-card').on('keydown', function(e) {
    //     if (e.keyCode === 13 || e.keyCode === 32) { // Enter or Space
    //         e.preventDefault();
    //         $(this).find('.benefit-toggle-btn').trigger('click');
    //     }
    // });

    // Add focus states for accessibility
    // $('.benefit-toggle-btn').on('focus', function() {
    //     $(this).closest('.health-benefit-card').addClass('focused');
    // }).on('blur', function() {
    //     $(this).closest('.health-benefit-card').removeClass('focused');
    // });

    // Enhanced intersection observer for health benefits
    const healthBenefitsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $element = $(entry.target);
                
                // Add staggered animation delays
                if ($element.hasClass('health-benefit-card')) {
                    const index = $element.index();
                    setTimeout(() => {
                        $element.addClass('animate-in');
                    }, index * 100);
                } else {
                    $element.addClass('animate-in');
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
    });

    // Observe health benefit elements
    document.querySelectorAll('.health-benefit-card, .health-benefits-title, .health-benefits-subtitle').forEach(element => {
        healthBenefitsObserver.observe(element);
    });

    // Mobile touch gestures for health benefit cards
    let touchStartY = 0;
    let touchStartX = 0;

    $('.health-benefit-card').on('touchstart', function(e) {
        touchStartY = e.originalEvent.touches[0].clientY;
        touchStartX = e.originalEvent.touches[0].clientX;
    });

    $('.health-benefit-card').on('touchend', function(e) {
        const touchEndY = e.originalEvent.changedTouches[0].clientY;
        const touchEndX = e.originalEvent.changedTouches[0].clientX;
        const diffY = Math.abs(touchStartY - touchEndY);
        const diffX = Math.abs(touchStartX - touchEndX);
        
        // If it's a tap (minimal movement)
        if (diffY < 10 && diffX < 10) {
            // Toggle the card on mobile tap
            const $card = $(this);
            $card.toggleClass('mobile-active');
            
            // Hide other active cards
            $('.health-benefit-card').not($card).removeClass('mobile-active');
        }
    });

    // Lazy loading for benefit images
    function lazyLoadBenefitImages() {
        const images = document.querySelectorAll('.benefit-background-image[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    lazyLoadBenefitImages();

    // =======================================
    // SECTION 3: TRUST INDICATORS INTERACTIONS
    // =======================================

    // Trust indicator card hover effects
    $('.trust-indicator-card').hover(
        function() {
            // Mouse enter - add enhanced hover effects
            const $card = $(this);
            const indicator = $card.data('indicator');
            
            // Add staggered animation to elements
            setTimeout(() => {
                $card.addClass('hovered');
            }, 50);
            
            // Add slight rotation and glow effect to icon
            $card.find('.trust-indicator-icon').css({
                'transform': 'scale(1.05)',
                'filter': 'drop-shadow(0 8px 16px rgba(26, 26, 26, 0.15))'
            });
            
            // Optional: Log interaction for analytics
            console.log('Trust indicator hovered:', indicator);
        },
        function() {
            // Mouse leave - reset effects
            const $card = $(this);
            
            $card.removeClass('hovered');
            
            // Reset transform and filter
            $card.find('.trust-indicator-icon').css({
                'transform': 'scale(1)',
                'filter': 'none'
            });
        }
    );

    // Trust indicator click functionality (for mobile)
    $('.trust-indicator-card').on('click', function(e) {
        const $card = $(this);
        const indicator = $card.data('indicator');
        
        // Add click animation
        $card.addClass('clicked');
        setTimeout(() => {
            $card.removeClass('clicked');
        }, 200);
        
        // Log interaction for analytics
        console.log('Trust indicator clicked:', indicator);
        
        // Add ripple effect
        createRippleEffect(this, e);
    });

    // Keyboard accessibility for trust indicator cards
    $('.trust-indicator-card').on('keydown', function(e) {
        if (e.keyCode === 13 || e.keyCode === 32) { // Enter or Space
            e.preventDefault();
            $(this).trigger('click');
        }
    });

    // Add focus states for accessibility
    $('.trust-indicator-card').on('focus', function() {
        $(this).addClass('focused');
    }).on('blur', function() {
        $(this).removeClass('focused');
    });

    // Enhanced intersection observer for trust indicators
    const trustIndicatorsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $element = $(entry.target);
                
                // Add staggered animation delays
                if ($element.hasClass('trust-indicator-card')) {
                    const index = $element.index();
                    setTimeout(() => {
                        $element.addClass('animate-in');
                    }, index * 150);
                } else {
                    $element.addClass('animate-in');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px'
    });

    // Observe trust indicator elements
    document.querySelectorAll('.trust-indicator-card').forEach(element => {
        trustIndicatorsObserver.observe(element);
    });

    // Mobile touch gestures for trust indicator cards
    let touchStartYTrust = 0;
    let touchStartXTrust = 0;

    $('.trust-indicator-card').on('touchstart', function(e) {
        touchStartYTrust = e.originalEvent.touches[0].clientY;
        touchStartXTrust = e.originalEvent.touches[0].clientX;
    });

    $('.trust-indicator-card').on('touchend', function(e) {
        const touchEndY = e.originalEvent.changedTouches[0].clientY;
        const touchEndX = e.originalEvent.changedTouches[0].clientX;
        const diffY = Math.abs(touchStartYTrust - touchEndY);
        const diffX = Math.abs(touchStartXTrust - touchEndX);
        
        // If it's a tap (minimal movement)
        if (diffY < 10 && diffX < 10) {
            // Trigger click effect on mobile tap
            const $card = $(this);
            $card.addClass('mobile-active');
            
            setTimeout(() => {
                $card.removeClass('mobile-active');
            }, 300);
        }
    });

    // Parallax effect for trust indicators section (optional enhancement)
    function handleTrustIndicatorsParallax() {
        const $section = $('.trust-indicators-section');
        const $cards = $('.trust-indicator-card');
        
        if ($section.length && $(window).width() > 768) {
            const scrollTop = $(window).scrollTop();
            const sectionTop = $section.offset().top;
            const sectionHeight = $section.outerHeight();
            const windowHeight = $(window).height();
            
            // Check if section is in viewport
            if (scrollTop + windowHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                const progress = (scrollTop + windowHeight - sectionTop) / (windowHeight + sectionHeight);
                const offset = (progress - 0.5) * 20; // Adjust multiplier for effect strength
                
                $cards.each(function(index) {
                    const cardOffset = offset * (index % 2 === 0 ? 1 : -1); // Alternate direction
                    $(this).css('transform', `translateY(${cardOffset}px)`);
                });
            }
        }
    }

    // Attach parallax to scroll (throttled for performance)
    let parallaxTimer;
    $(window).on('scroll', function() {
        clearTimeout(parallaxTimer);
        parallaxTimer = setTimeout(handleTrustIndicatorsParallax, 10);
    });

    // Lazy loading for images
    function lazyLoadImages() {
        const images = document.querySelectorAll('.product-image[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Smooth scroll to section if coming from navigation
    function smoothScrollToSection() {
        if (window.location.hash) {
            const target = $(window.location.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        }
    }

    smoothScrollToSection();

    // Handle window resize for carousel
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Refresh carousel on resize
            $('.products-carousel').trigger('refresh.owl.carousel');
        }, 250);
    });

    // Add keyboard navigation
    $(document).on('keydown', function(e) {
        if ($('.products-carousel').is(':visible')) {
            if (e.keyCode === 37) { // Left arrow
                $('.products-carousel').trigger('prev.owl.carousel');
            } else if (e.keyCode === 39) { // Right arrow
                $('.products-carousel').trigger('next.owl.carousel');
            }
        }
    });

    // Performance: Preload hover images
    function preloadHoverImages() {
        $('.hover-image').each(function() {
            const img = new Image();
            img.src = this.src;
        });
    }

    // Initialize preloading after a small delay
    setTimeout(preloadHoverImages, 1000);

    // Add touch gestures for mobile
    let startX = 0;
    let currentX = 0;
    let threshold = 50;

    $('.product-card').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('.product-card').on('touchmove', function(e) {
        currentX = e.originalEvent.touches[0].clientX;
    });

    $('.product-card').on('touchend', function(e) {
        const diffX = startX - currentX;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left - next
                $('.products-carousel').trigger('next.owl.carousel');
            } else {
                // Swipe right - prev
                $('.products-carousel').trigger('prev.owl.carousel');
            }
        }
    });
});

// ===============================
// UTILITY FUNCTIONS
// ===============================

// Add to cart feedback function
function showAddToCartFeedback(productName) {
    // Create a temporary notification
    const notification = $(`
        <div class="cart-notification">
            <div class="notification-content">
                <span class="notification-icon">✓</span>
                <span class="notification-text">${productName} added to cart!</span>
            </div>
        </div>
    `);
    
    // Add styles for notification
    const notificationStyles = `
        <style id="notification-styles">
            .cart-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #0f4a12;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .cart-notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .notification-icon {
                background: #ebf466;
                color: #0f4a12;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }
        </style>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        $('head').append(notificationStyles);
    }
    
    // Add notification to body
    $('body').append(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.addClass('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.removeClass('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Create ripple effect function
function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Additional CSS for enhanced animations
const additionalCSS = `
    <style>
        .clicked {
            transform: scale(0.95) !important;
        }
        
        .hover-bounce {
            animation: bounceIn 0.5s ease !important;
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 0.8; }
            70% { transform: scale(0.9); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes ripple-animation {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .health-benefit-card.focused {
            outline: 2px solid #ebf466;
            outline-offset: 4px;
        }
        
        // .health-benefit-card.hovered .benefit-image-container {
        //     transition: transform 0.4s ease;
        // }
        
        .health-benefit-card.mobile-active .benefit-description {
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateX(-50%) translateY(-10px) !important;
        }
        
        @media (max-width: 768px) {
            .health-benefit-card.mobile-active {
                z-index: 10;
            }
        }
        
        .trust-indicator-card.focused {
            outline: 2px solid #1a1a1a;
            outline-offset: 4px;
            border-radius: 8px;
        }
        
        // .trust-indicator-card.hovered {
        //     transform: translateY(-8px) !important;
        // }
        
        .trust-indicator-card.clicked {
            transform: scale(0.98) !important;
        }
        
        .trust-indicator-card.mobile-active {
            transform: scale(1.02) !important;
            transition: transform 0.2s ease !important;
        }
        
        // @keyframes trustIndicatorFloat {
        //     0%, 100% {
        //         transform: translateY(0px);
        //     }
        //     50% {
        //         transform: translateY(-5px);
        //     }
        // }
        
        .trust-indicator-card:hover .trust-icon-symbol {
            animation: trustIndicatorFloat 2s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
            .trust-indicator-card.mobile-active {
                z-index: 5;
            }
        }
    </style>
`;

// Add additional CSS to head
$('head').append(additionalCSS);


// ========== video carousel section ==========

$(document).ready(function() {
    // Initialize Owl Carousel
    function initializeCarousel() {
        $('.video-carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 800,
            navText: ['‹', '›'],
            responsive: {
                0: {
                    items: 1.5,
                    stagePadding: 20,
                    // nav: false,
                    // dots: true,
                    // margin: 8
                },
                576: {
                    items: 2.5,
                    stagePadding: 30,
                    // nav: false,
                    // dots: true,
                    // margin: 12
                },
                768: {
                    items: 3.5,
                    // nav: true,
                    // dots: true,
                    // margin: 16
                },
                992: {
                    items: 3.5,
                    // nav: true,
                    // dots: true,
                    // margin: 16
                },
                1200: {
                    items: 3.5,
                    // nav: true,
                    // dots: true,
                    // margin: 16
                },
                1400: {
                    items: 4.5,
                    // nav: true,
                    // dots: false,
                    // margin: 16
                },

                1400: {
                    items: 5.5,
                    // nav: true,
                    // dots: false,
                    // margin: 16
                }
            },
            onInitialized: function() {
                // Add entrance animations to cards
                $('.video-card').each(function(index) {
                    $(this).css({
                        'animation-delay': (index * 0.1) + 's'
                    });
                });
            }
        });
    }

    // Video Player Controller Class
    class VideoController {
        constructor(videoCard) {
            this.card = $(videoCard);
            this.video = this.card.find('.hidden-video')[0];
            this.playButton = this.card.find('.play-button');
            this.volumeButton = this.card.find('.volume-button');
            this.playIcon = this.card.find('.play-icon');
            this.pauseIcon = this.card.find('.pause-icon');
            this.volumeOnIcon = this.card.find('.volume-on-icon');
            this.volumeOffIcon = this.card.find('.volume-off-icon');
            this.thumbnail = this.card.find('.video-thumbnail');
            this.background = this.card.find('.video-background');
            
            this.isPlaying = false;
            this.isMuted = true;
            
            this.initializeEvents();
            this.setupVideoEvents();
        }
        
        initializeEvents() {
            // Play/Pause button click
            this.playButton.on('click', (e) => {
                e.preventDefault();
                this.togglePlayPause();
                this.addButtonClickAnimation(this.playButton);
            });
            
            // Volume button click
            this.volumeButton.on('click', (e) => {
                e.preventDefault();
                this.toggleMute();
                this.addButtonClickAnimation(this.volumeButton);
            });
            
            // Keyboard support
            this.playButton.on('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.togglePlayPause();
                }
            });
            
            this.volumeButton.on('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMute();
                }
            });
        }
        
        setupVideoEvents() {
            if (this.video) {
                this.video.addEventListener('loadstart', () => {
                    this.thumbnail.addClass('loading');
                });
                
                this.video.addEventListener('canplay', () => {
                    this.thumbnail.removeClass('loading');
                });
                
                this.video.addEventListener('ended', () => {
                    this.resetToThumbnail();
                });
                
                this.video.addEventListener('error', () => {
                    this.thumbnail.removeClass('loading');
                    console.log('Video failed to load, using thumbnail');
                });
            }
        }
        
        togglePlayPause() {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        }
        
        play() {
            // Pause all other videos first
            this.pauseAllOtherVideos();
            
            if (this.video && this.video.readyState >= 2) {
                this.video.play().then(() => {
                    this.isPlaying = true;
                    this.updatePlayButton();
                    this.showVideo();
                    this.thumbnail.addClass('playing');
                }).catch((error) => {
                    console.log('Video play failed:', error);
                    this.simulateVideoPlay();
                });
            } else {
                // Simulate video play with background animation
                this.simulateVideoPlay();
            }
        }
        
        pause() {
            if (this.video) {
                this.video.pause();
            }
            this.isPlaying = false;
            this.updatePlayButton();
            this.hideVideo();
            this.thumbnail.removeClass('playing');
        }
        
        simulateVideoPlay() {
            this.isPlaying = true;
            this.updatePlayButton();
            this.thumbnail.addClass('playing');
            
            // Add visual feedback for "playing" state
            this.background.css('transform', 'scale(1.05)');
            
            // Auto-pause after 10 seconds for demo
            setTimeout(() => {
                if (this.isPlaying) {
                    this.pause();
                }
            }, 10000);
        }
        
        resetToThumbnail() {
            this.isPlaying = false;
            this.updatePlayButton();
            this.hideVideo();
            this.thumbnail.removeClass('playing');
            this.background.css('transform', 'scale(1)');
        }
        
        showVideo() {
            this.card.find('.hidden-video').addClass('playing');
        }
        
        hideVideo() {
            this.card.find('.hidden-video').removeClass('playing');
            this.background.css('transform', 'scale(1)');
        }
        
        updatePlayButton() {
            if (this.isPlaying) {
                this.playIcon.addClass('hidden');
                this.pauseIcon.removeClass('hidden');
                this.playButton.attr('aria-label', 'Pause video');
            } else {
                this.playIcon.removeClass('hidden');
                this.pauseIcon.addClass('hidden');
                this.playButton.attr('aria-label', 'Play video');
            }
        }
        
        toggleMute() {
            this.isMuted = !this.isMuted;
            
            if (this.video) {
                this.video.muted = this.isMuted;
            }
            
            this.updateVolumeButton();
        }
        
        updateVolumeButton() {
            if (this.isMuted) {
                this.volumeOnIcon.removeClass('hidden');
                this.volumeOffIcon.addClass('hidden');
                this.volumeButton.attr('aria-label', 'Unmute video');
            } else {
                this.volumeOnIcon.addClass('hidden');
                this.volumeOffIcon.removeClass('hidden');
                this.volumeButton.attr('aria-label', 'Mute video');
            }
        }
        
        pauseAllOtherVideos() {
            $('.video-card').each((index, card) => {
                if (card !== this.card[0]) {
                    const otherController = $(card).data('videoController');
                    if (otherController && otherController.isPlaying) {
                        otherController.pause();
                    }
                }
            });
        }
        
        addButtonClickAnimation(button) {
            button.addClass('clicked');
            setTimeout(() => {
                button.removeClass('clicked');
            }, 200);
        }
    }
    
    // Initialize video controllers
    function initializeVideoControllers() {
        $('.video-card').each(function() {
            const controller = new VideoController(this);
            $(this).data('videoController', controller);
        });
    }
    
    // Intersection Observer for lazy loading and animations
    function setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const card = $(entry.target);
                        card.addClass('in-view');
                        
                        // Trigger entrance animation
                        setTimeout(() => {
                            card.find('.video-thumbnail').addClass('animate-in');
                        }, 100);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            $('.video-card').each(function() {
                observer.observe(this);
            });
        }
    }
    
    // Smooth scroll behavior
    function initializeSmoothScroll() {
        $('html').css('scroll-behavior', 'smooth');
    }
    
    // Touch and swipe gestures for mobile
    function initializeTouchGestures() {
        let startX, startY, isScrolling;
        
        $('.video-carousel').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].pageX;
            startY = e.originalEvent.touches[0].pageY;
            isScrolling = undefined;
        });
        
        $('.video-carousel').on('touchmove', function(e) {
            if (!startX || !startY) return;
            
            let currentX = e.originalEvent.touches[0].pageX;
            let currentY = e.originalEvent.touches[0].pageY;
            let diffX = startX - currentX;
            let diffY = startY - currentY;
            
            if (isScrolling === undefined) {
                isScrolling = Math.abs(diffX) < Math.abs(diffY);
            }
            
            if (!isScrolling) {
                e.preventDefault();
            }
        });
    }
    
    // Performance optimization: debounce resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Handle window resize
    const handleResize = debounce(() => {
        $('.video-carousel').trigger('refresh.owl.carousel');
    }, 250);
    
    $(window).on('resize', handleResize);
    
    // Accessibility improvements
    function initializeAccessibility() {
        // Add proper ARIA labels
        $('.video-card').attr('role', 'region');
        $('.video-card').attr('aria-label', 'Video player');
        
        // Ensure buttons are focusable
        $('.play-button, .volume-button').attr('tabindex', '0');
        
        // Add keyboard navigation for carousel
        $(document).on('keydown', function(e) {
            if (e.target.closest('.video-carousel')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    $('.owl-prev').click();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    $('.owl-next').click();
                }
            }
        });
    }
    
    // Error handling for video loading
    function setupErrorHandling() {
        window.addEventListener('error', function(e) {
            if (e.target.tagName === 'VIDEO') {
                console.log('Video loading error handled gracefully');
                const videoCard = $(e.target).closest('.video-card');
                videoCard.find('.video-thumbnail').removeClass('loading');
            }
        }, true);
    }
    
    // Add custom CSS for clicked button animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .play-button.clicked,
            .volume-button.clicked {
                transform: scale(0.9);
                transition: transform 0.1s ease;
            }
            
            .video-card.in-view {
                opacity: 1;
            }
            
            .video-thumbnail.animate-in {
                animation: slide-in-fade 0.6s ease-out;
            }
            
            @keyframes slide-in-fade {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `)
        .appendTo('head');
    
    // Initialize everything
    function initialize() {
        initializeCarousel();
        initializeVideoControllers();
        setupIntersectionObserver();
        initializeSmoothScroll();
        initializeTouchGestures();
        initializeAccessibility();
        setupErrorHandling();
        
        // Add loaded class to body for CSS transitions
        $('body').addClass('loaded');
        
        console.log('Pet Video Showcase initialized successfully!');
    }
    
    // Start initialization
    initialize();
    
    // Add some interactive easter eggs
    let clickCount = 0;
    $('.main-title').on('click', function() {
        clickCount++;
        if (clickCount === 5) {
            $(this).css({
                'transform': 'rotate(360deg)',
                'transition': 'transform 1s ease'
            });
            setTimeout(() => {
                $(this).css({
                    'transform': 'rotate(0deg)'
                });
            }, 1000);
            clickCount = 0;
        }
    });
    
    // Add sparkle effect on hover for mobile-friendly interaction
    $('.video-thumbnail').on('touchstart mouseenter', function() {
        if (!$(this).find('.sparkle').length) {
            const sparkle = $('<div class="sparkle">✨</div>');
            sparkle.css({
                position: 'absolute',
                top: '10px',
                right: '10px',
                'font-size': '20px',
                'animation': 'sparkle-fade 2s ease-out',
                'pointer-events': 'none',
                'z-index': 10
            });
            $(this).append(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    });
    
    // Add sparkle animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes sparkle-fade {
                0% {
                    opacity: 0;
                    transform: translateY(10px) scale(0.5);
                }
                50% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-10px) scale(0.5);
                }
            }
        `)
        .appendTo('head');
});

// Additional utility functions
window.PetVideoShowcase = {
    // Public API for external control
    playVideo: function(index) {
        const videoCard = $('.video-card').eq(index);
        const controller = videoCard.data('videoController');
        if (controller) {
            controller.play();
        }
    },
    
    pauseAllVideos: function() {
        $('.video-card').each(function() {
            const controller = $(this).data('videoController');
            if (controller && controller.isPlaying) {
                controller.pause();
            }
        });
    },
    
    goToSlide: function(index) {
        $('.video-carousel').trigger('to.owl.carousel', [index]);
    },
    
    nextSlide: function() {
        $('.video-carousel').trigger('next.owl.carousel');
    },
    
    prevSlide: function() {
        $('.video-carousel').trigger('prev.owl.carousel');
    }
};

// Handle page visibility change (pause videos when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        window.PetVideoShowcase.pauseAllVideos();
    }
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// ========== accordion section ==========

document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion functionality
    initializeAccordion();
    
    // Add smooth scroll behavior
    addSmoothScrolling();
    
    // Handle responsive adjustments
    handleResponsiveAdjustments();
});

function initializeAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item, index) => {
        const questionHeader = item.querySelector('.question-header');
        const toggleButton = item.querySelector('.toggle-button');
        const questionText = item.querySelector('.question-text');
        const answerContent = item.querySelector('.answer-content');
        
        // Add click event listener to the entire header
        questionHeader.addEventListener('click', function(e) {
            e.preventDefault();
            toggleAccordionItem(item, toggleButton, questionText, answerContent);
        });
        
        // Add keyboard navigation
        questionHeader.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordionItem(item, toggleButton, questionText, answerContent);
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateToNextItem(index, accordionItems);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateToPreviousItem(index, accordionItems);
            }
        });
        
        // Make headers focusable
        questionHeader.setAttribute('tabindex', '0');
        questionHeader.setAttribute('role', 'button');
        questionHeader.setAttribute('aria-expanded', item.classList.contains('expanded'));
        
        // Set up ARIA attributes
        if (answerContent) {
            const contentId = `accordion-content-${index + 1}`;
            answerContent.setAttribute('id', contentId);
            questionHeader.setAttribute('aria-controls', contentId);
        }
    });
}

function toggleAccordionItem(item, toggleButton, questionText, answerContent) {
    const isExpanded = item.classList.contains('expanded');
    
    // Close all other accordion items first (single accordion behavior)
    closeAllAccordionItems();
    
    if (!isExpanded) {
        // Open this item
        openAccordionItem(item, toggleButton, questionText, answerContent);
    }
    
    // Update ARIA attributes
    const questionHeader = item.querySelector('.question-header');
    questionHeader.setAttribute('aria-expanded', !isExpanded);
    
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

function openAccordionItem(item, toggleButton, questionText, answerContent) {
    // Add visual classes
    item.classList.add('expanded');
    toggleButton.classList.add('active');
    questionText.classList.add('active');
    
    // Animate the expansion
    if (answerContent) {
        const scrollHeight = answerContent.scrollHeight;
        answerContent.style.maxHeight = scrollHeight + 'px';
        
        // Add a slight delay to ensure smooth animation
        setTimeout(() => {
            answerContent.style.maxHeight = 'none';
        }, 400);
    }
    
    // Add opening animation class
    item.classList.add('opening');
    setTimeout(() => {
        item.classList.remove('opening');
    }, 400);
    
    // Scroll item into view on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 200);
    }
}

function closeAllAccordionItems() {
    const expandedItems = document.querySelectorAll('.accordion-item.expanded');
    
    expandedItems.forEach(item => {
        const toggleButton = item.querySelector('.toggle-button');
        const questionText = item.querySelector('.question-text');
        const answerContent = item.querySelector('.answer-content');
        const questionHeader = item.querySelector('.question-header');
        
        // Remove visual classes
        item.classList.remove('expanded');
        toggleButton.classList.remove('active');
        questionText.classList.remove('active');
        
        // Animate the collapse
        if (answerContent) {
            answerContent.style.maxHeight = '0px';
        }
        
        // Update ARIA attributes
        questionHeader.setAttribute('aria-expanded', 'false');
        
        // Add closing animation class
        item.classList.add('closing');
        setTimeout(() => {
            item.classList.remove('closing');
        }, 400);
    });
}

function navigateToNextItem(currentIndex, items) {
    const nextIndex = (currentIndex + 1) % items.length;
    const nextHeader = items[nextIndex].querySelector('.question-header');
    nextHeader.focus();
}

function navigateToPreviousItem(currentIndex, items) {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    const prevHeader = items[prevIndex].querySelector('.question-header');
    prevHeader.focus();
}

function addSmoothScrolling() {
    // Add smooth scrolling for any anchor links (if needed in future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function handleResponsiveAdjustments() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate accordion heights after resize
            const expandedItems = document.querySelectorAll('.accordion-item.expanded');
            expandedItems.forEach(item => {
                const answerContent = item.querySelector('.answer-content');
                if (answerContent) {
                    answerContent.style.maxHeight = 'none';
                    const height = answerContent.scrollHeight;
                    answerContent.style.maxHeight = height + 'px';
                }
            });
        }, 250);
    });
}

// Add intersection observer for scroll animations (optional enhancement)
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe accordion items for entrance animations
    document.querySelectorAll('.accordion-item').forEach(item => {
        observer.observe(item);
    });
}

// Initialize scroll animations if supported
if ('IntersectionObserver' in window) {
    addScrollAnimations();
}

// Add touch gesture support for mobile
function addTouchSupport() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchStartY - touchEndY;
        
        // You can add swipe gestures here if needed
        // For example, swiping up/down to navigate between accordion items
    }
}

// Initialize touch support
addTouchSupport();

// Add click outside to close functionality (optional)
document.addEventListener('click', function(e) {
    if (!e.target.closest('.accordion-item')) {
        // Optionally close all items when clicking outside
        // Uncomment the line below if you want this behavior
        // closeAllAccordionItems();
    }
});

// Add custom events for accordion state changes
function dispatchAccordionEvent(eventType, item) {
    const customEvent = new CustomEvent(eventType, {
        detail: {
            item: item,
            faqNumber: item.getAttribute('data-faq')
        }
    });
    document.dispatchEvent(customEvent);
}

// Example of how to listen for accordion events:
/*
document.addEventListener('accordionOpened', function(e) {
    console.log('FAQ item opened:', e.detail.faqNumber);
});

document.addEventListener('accordionClosed', function(e) {
    console.log('FAQ item closed:', e.detail.faqNumber);
});
*/


// ========== testimonials carousel section ==========


$(document).ready(function() {
    // Initialize Owl Carousel
    $('.petdgtestimonials-carousel').owlCarousel({
        loop: true,
        // margin: 20,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 800,
        responsive: {
            0: {
                items: 1.4,
                // nav: false,
                // margin: 10
            },
            480: {
                items: 1,
                // nav: true,
                // margin: 15
            },
            768: {
                items: 1.5,
                // nav: true,
                // margin: 20
            },
            992: {
                items: 2.5,
                // nav: true,
                // margin: 25
            },
            1200: {
                items: 2.5,
                // nav: true,
                // margin: 30
            },
            1400: {
                items: 3.5,
                // nav: true,
                // margin: 39
            },

            1500: {
                items: 4.5,
                // nav: true,
                // margin: 39
            }

        },
        navText: [
            '<span>&#8249;</span>',
            '<span>&#8250;</span>'
        ],
        onInitialized: function() {
            // Add fade-in animation to carousel
            $('.petdgtestimonials-carousel-wrapper').addClass('loaded');
            
            // Add intersection observer for scroll animations
            if ('IntersectionObserver' in window) {
                observeCards();
            }
        }
    });

    // Intersection Observer for scroll animations
    function observeCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all testimonial cards
        document.querySelectorAll('.petdgtestimonial-card').forEach(card => {
            card.style.animationPlayState = 'paused';
            observer.observe(card);
        });
    }

    // Add hover effects for cards
    $('.petdgtestimonial-card').hover(
        function() {
            $(this).find('.petdgstar-icon').each(function(index) {
                setTimeout(() => {
                    $(this).addClass('star-hover');
                }, index * 50);
            });
        },
        function() {
            $(this).find('.petdgstar-icon').removeClass('star-hover');
        }
    );

    // Add click handler for testimonial cards (for accessibility)
    $('.petdgtestimonial-card').on('click', function() {
        $(this).toggleClass('card-focus');
    });

    // Keyboard navigation support
    $(document).on('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            $('.owl-prev').click();
        } else if (e.key === 'ArrowRight') {
            $('.owl-next').click();
        }
    });

    // Touch gesture support for mobile
    let startX = 0;
    let endX = 0;

    $('.petdgtestimonials-carousel').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('.petdgtestimonials-carousel').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                $('.owl-next').click();
            } else {
                // Swipe right - previous slide
                $('.owl-prev').click();
            }
        }
    }

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 600);
        }
    });

    // Add loading state management
    function showLoader() {
        $('.petdgtestimonials-carousel-wrapper').addClass('loading');
    }

    function hideLoader() {
        $('.petdgtestimonials-carousel-wrapper').removeClass('loading');
    }

    // Lazy loading for images
    function lazyLoadImages() {
        const images = document.querySelectorAll('.petdgavatar-image');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // Add resize handler for responsive adjustments
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Refresh carousel on resize
            $('.petdgtestimonials-carousel').trigger('refresh.owl.carousel');
        }, 250);
    });

    // Add focus management for accessibility
    $('.owl-nav button, .owl-dot').on('focus', function() {
        $(this).addClass('focused');
    }).on('blur', function() {
        $(this).removeClass('focused');
    });

    // Pause autoplay when user interacts
    $('.petdgtestimonials-carousel').on('mouseenter', function() {
        $(this).trigger('stop.owl.autoplay');
    }).on('mouseleave', function() {
        $(this).trigger('play.owl.autoplay');
    });

    // Custom event handlers
    $('.petdgtestimonials-carousel').on('changed.owl.carousel', function(event) {
        // Add custom logic when slide changes
        const currentIndex = event.item.index;
        
        // Update ARIA labels for accessibility
        $('.owl-item').attr('aria-hidden', 'true');
        $('.owl-item.active').attr('aria-hidden', 'false');
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add scroll-based animations
    const handleScroll = debounce(() => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        // Add subtle parallax effect to title
        // $('.petdgmain-heading').css('transform', `translateY(${parallax}px)`);
    }, 10);

    window.addEventListener('scroll', handleScroll);

    // Add error handling for images
    $('.petdgavatar-image').on('error', function() {
        $(this).attr('src', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNkZGQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+PC9zdmc+');
    });

    // Console log for debugging
    console.log('Pet Testimonials Carousel initialized successfully!');
});

// Utility functions
const Utils = {
    // Smooth scroll to element
    scrollToElement: function(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Generate random testimonial data (for future use)
    generateTestimonial: function() {
        const names = ['Laura', 'Mike', 'Sarah', 'James', 'Emma', 'David', 'Lisa', 'Mark'];
        const pets = ['Max', 'Buddy', 'Charlie', 'Rocky', 'Luna', 'Cooper', 'Bella', 'Tucker'];
        
        return {
            name: names[Math.floor(Math.random() * names.length)],
            pet: pets[Math.floor(Math.random() * pets.length)],
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
            text: "After just a few weeks of using Everyday One, my 8-year-old Labrador is running around like he's 2 again! His coat is shinier, and he seems happier overall. I couldn't be more thrilled with this product!"
        };
    }
};

// Make Utils globally available
window.TestimonialUtils = Utils;





