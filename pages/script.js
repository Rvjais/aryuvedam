// ==========================================
// ROYAL AYURVEDA - INTERACTIVE FEATURES
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // MODERN NAVBAR INTERACTIONS
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    const searchIcon = document.querySelector('.search-icon');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');

    // Mobile Sidebar Elements
    const mobileMenuContainer = document.getElementById('mobileMenuContainer');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    console.log('Mobile Sidebar Debug:', {
        mobileToggle: !!mobileToggle,
        mobileMenuContainer: !!mobileMenuContainer,
        mobileMenuClose: !!mobileMenuClose,
        mobileMenuOverlay: !!mobileMenuOverlay
    });

    // Initialize Mobile Sidebar
    if (mobileToggle && mobileMenuContainer) {
        // Function to open mobile sidebar
        function openMobileSidebar() {
            mobileMenuContainer.classList.add('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('active');
            }
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Mobile sidebar opened');
        }

        // Function to close mobile sidebar
        function closeMobileSidebar() {
            mobileMenuContainer.classList.remove('active');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
            }
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';

            // Close all open submenus
            const activeItems = mobileMenuContainer.querySelectorAll('.mobile-nav-item.has-submenu.active');
            activeItems.forEach(item => item.classList.remove('active'));

            console.log('Mobile sidebar closed');
        }

        // Handle Toggle Click
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            console.log('Mobile toggle clicked');

            if (mobileMenuContainer.classList.contains('active')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        });

        // Handle Close Button Click
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function (e) {
                e.stopPropagation();
                console.log('Close button clicked');
                closeMobileSidebar();
            });
        }

        // Handle Overlay Click
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function () {
                console.log('Overlay clicked');
                closeMobileSidebar();
            });
        }

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (mobileMenuContainer.classList.contains('active') &&
                !mobileMenuContainer.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                closeMobileSidebar();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenuContainer.classList.contains('active')) {
                closeMobileSidebar();
            }
        });

        // Handle Submenu Accordion
        const submenuItems = mobileMenuContainer.querySelectorAll('.mobile-nav-item.has-submenu');
        console.log('Found submenu items:', submenuItems.length);

        submenuItems.forEach(item => {
            const link = item.querySelector('.mobile-nav-link');
            if (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Submenu item clicked');

                    const isActive = item.classList.contains('active');

                    // Close all other open submenus
                    submenuItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });

                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                });
            }
        });

        // Handle regular nav links (non-submenu) closing the sidebar
        const regularNavLinks = mobileMenuContainer.querySelectorAll('.mobile-nav-item:not(.has-submenu) .mobile-nav-link');
        regularNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Regular nav link clicked');
                setTimeout(() => {
                    closeMobileSidebar();
                }, 200);
            });
        });

        // Handle submenu links closing the sidebar
        const submenuLinks = mobileMenuContainer.querySelectorAll('.mobile-submenu a');
        submenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                console.log('Submenu link clicked');
                setTimeout(() => {
                    closeMobileSidebar();
                }, 200);
            });
        });

        // Handle footer CTA button
        const ctaBtn = mobileMenuContainer.querySelector('.mobile-cta-btn');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', function (e) {
                setTimeout(() => {
                    closeMobileSidebar();
                }, 200);
            });
        }
    } else {
        console.error('Mobile sidebar elements not found:', {
            mobileToggle: !!mobileToggle,
            mobileMenuContainer: !!mobileMenuContainer
        });
    }

    // Search Overlay
    if (searchIcon && searchOverlay && searchClose) {
        searchIcon.addEventListener('click', function () {
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });

        searchClose.addEventListener('click', function () {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });

        // Close on background click
        searchOverlay.addEventListener('click', function (e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
            }
        });
    }

    // ==========================================
    // STICKY NAVBAR ON SCROLL WITH MEGA MENU ADJUSTMENT
    // ==========================================
    const navbar = document.querySelector('.modern-navbar');
    const topBanner = document.querySelector('.top-banner');
    const megaMenus = document.querySelectorAll('.mega-menu');
    let lastScroll = 0;

    // Calculate banner height
    const bannerHeight = topBanner ? topBanner.offsetHeight : 0;
    const navbarHeight = 70;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Adjust navbar shadow on scroll
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
        } else {
            navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.15)';
        }

        // Adjust mega menu position based on banner visibility
        if (currentScroll > bannerHeight) {
            // Banner is hidden, mega menu should be at navbar height only
            megaMenus.forEach(menu => {
                menu.style.top = navbarHeight + 'px';
            });
        } else {
            // Banner is visible, mega menu should be at banner + navbar height
            megaMenus.forEach(menu => {
                menu.style.top = (bannerHeight + navbarHeight) + 'px';
            });
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // GSAP SCROLL ANIMATIONS
    // ==========================================

    // Only run GSAP animations if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Clear any potential transforms on body/html
        gsap.set('html, body', {
            clearProps: 'all',
            transform: 'none',
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            skewY: 0
        });

        // Service Cards Animation - Staggered entrance with fromTo for better control
        gsap.fromTo('.service-card',
            {
                // Starting state
                y: 60,
                autoAlpha: 0,
                scale: 0.95
            },
            {
                // Ending state
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true // Only play once
                },
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.8,
                stagger: {
                    amount: 0.6,
                    from: 'start'
                },
                ease: 'power3.out'
            }
        );

        // Service Card Hover Enhancement with GSAP
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -12,
                    scale: 1.02,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.inOut'
                });
            });
        });

        // Section Headers Animation
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.fromTo(header,
                {
                    y: 40,
                    autoAlpha: 0
                },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }
            );
        });

        // Stats Section Animation
        gsap.fromTo('.stat-card',
            {
                y: 50,
                autoAlpha: 0,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'back.out(1.4)'
            }
        );

        // About Features with slide from left
        gsap.fromTo('.about-feature',
            {
                x: -50,
                autoAlpha: 0
            },
            {
                scrollTrigger: {
                    trigger: '.about-features',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            }
        );

        // Treatment Cards
        gsap.fromTo('.treatment-card',
            {
                y: 50,
                autoAlpha: 0,
                rotation: 2
            },
            {
                scrollTrigger: {
                    trigger: '.treatments-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true
                },
                y: 0,
                autoAlpha: 1,
                rotation: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out'
            }
        );

        // Refresh ScrollTrigger after initialization
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    } // End of GSAP check


    // ==========================================
    // HERO SLIDER
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDotsContainer = document.getElementById('heroDots');
    const heroPrevBtn = document.getElementById('heroPrev');
    const heroNextBtn = document.getElementById('heroNext');

    let currentHeroSlide = 0;
    let heroSlideInterval;

    // Create dots
    if (heroDotsContainer) {
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('hero-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToHeroSlide(index));
            heroDotsContainer.appendChild(dot);
        });
    }

    function goToHeroSlide(n) {
        if (heroSlides.length === 0) return;
        heroSlides[currentHeroSlide].classList.remove('active');
        const dots = document.querySelectorAll('.hero-dot');
        if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.remove('active');

        currentHeroSlide = (n + heroSlides.length) % heroSlides.length;

        heroSlides[currentHeroSlide].classList.add('active');
        if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.add('active');
    }

    function nextHeroSlide() {
        goToHeroSlide(currentHeroSlide + 1);
    }

    function prevHeroSlide() {
        goToHeroSlide(currentHeroSlide - 1);
    }

    if (heroNextBtn) heroNextBtn.addEventListener('click', nextHeroSlide);
    if (heroPrevBtn) heroPrevBtn.addEventListener('click', prevHeroSlide);

    // Auto-play hero slider
    function startHeroSlider() {
        heroSlideInterval = setInterval(nextHeroSlide, 5000);
    }

    function stopHeroSlider() {
        clearInterval(heroSlideInterval);
    }

    // Only start hero slider if hero slides exist
    if (heroSlides.length > 0) {
        startHeroSlider();
    }

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopHeroSlider);
        heroSection.addEventListener('mouseleave', startHeroSlider);
    }

    // ==========================================
    // TESTIMONIAL SLIDER
    // ==========================================
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDotsContainer = document.getElementById('testimonialDots');
    const testimonialPrevBtn = document.getElementById('testimonialPrev');
    const testimonialNextBtn = document.getElementById('testimonialNext');

    let currentTestimonialSlide = 0;
    let testimonialSlideInterval;

    // Create dots
    if (testimonialDotsContainer) {
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonialSlide(index));
            testimonialDotsContainer.appendChild(dot);
        });
    }

    function goToTestimonialSlide(n) {
        if (testimonialSlides.length === 0) return;
        testimonialSlides[currentTestimonialSlide].classList.remove('active');
        const dots = document.querySelectorAll('.testimonial-dot');
        if (dots[currentTestimonialSlide]) dots[currentTestimonialSlide].classList.remove('active');

        currentTestimonialSlide = (n + testimonialSlides.length) % testimonialSlides.length;

        testimonialSlides[currentTestimonialSlide].classList.add('active');
        if (dots[currentTestimonialSlide]) dots[currentTestimonialSlide].classList.add('active');
    }

    function nextTestimonialSlide() {
        goToTestimonialSlide(currentTestimonialSlide + 1);
    }

    function prevTestimonialSlide() {
        goToTestimonialSlide(currentTestimonialSlide - 1);
    }

    if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', nextTestimonialSlide);
    if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', prevTestimonialSlide);

    // Auto-play testimonial slider
    function startTestimonialSlider() {
        testimonialSlideInterval = setInterval(nextTestimonialSlide, 6000);
    }

    function stopTestimonialSlider() {
        clearInterval(testimonialSlideInterval);
    }

    // Only start testimonial slider if slides exist
    if (testimonialSlides.length > 0) {
        startTestimonialSlider();
    }

    // Pause on hover
    const testimonialSection = document.querySelector('.testimonials');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopTestimonialSlider);
        testimonialSection.addEventListener('mouseleave', startTestimonialSlider);
    }

    // ==========================================
    // USP CAROUSEL SLIDER
    // ==========================================
    const uspSlides = document.querySelectorAll('.usp-slide');
    const uspDots = document.querySelectorAll('.usp-dot');
    const uspPrevBtn = document.getElementById('uspPrev');
    const uspNextBtn = document.getElementById('uspNext');

    let currentUspSlide = 0;
    let uspSlideInterval;

    function goToUspSlide(n) {
        if (uspSlides.length === 0) return;

        // Remove active from current slide
        uspSlides[currentUspSlide].classList.remove('active');
        uspSlides[currentUspSlide].classList.add('prev');
        if (uspDots[currentUspSlide]) uspDots[currentUspSlide].classList.remove('active');

        // Calculate new slide
        currentUspSlide = (n + uspSlides.length) % uspSlides.length;

        // Remove prev class from all slides
        setTimeout(() => {
            uspSlides.forEach(slide => slide.classList.remove('prev'));
        }, 800);

        // Add active to new slide
        uspSlides[currentUspSlide].classList.add('active');
        if (uspDots[currentUspSlide]) uspDots[currentUspSlide].classList.add('active');
    }

    function nextUspSlide() {
        goToUspSlide(currentUspSlide + 1);
    }

    function prevUspSlide() {
        goToUspSlide(currentUspSlide - 1);
    }

    // Click handlers for arrows
    if (uspNextBtn) uspNextBtn.addEventListener('click', () => {
        nextUspSlide();
        resetUspSliderInterval();
    });

    if (uspPrevBtn) uspPrevBtn.addEventListener('click', () => {
        prevUspSlide();
        resetUspSliderInterval();
    });

    // Click handlers for dots
    uspDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToUspSlide(index);
            resetUspSliderInterval();
        });
    });

    // Auto-play USP slider
    function startUspSlider() {
        uspSlideInterval = setInterval(nextUspSlide, 3000);
    }

    function stopUspSlider() {
        clearInterval(uspSlideInterval);
    }

    function resetUspSliderInterval() {
        stopUspSlider();
        startUspSlider();
    }

    // Only start USP slider if slides exist
    if (uspSlides.length > 0) {
        startUspSlider();
    }

    // Pause on hover
    const uspCarouselSection = document.querySelector('.usp-carousel-section');
    if (uspCarouselSection) {
        uspCarouselSection.addEventListener('mouseenter', stopUspSlider);
        uspCarouselSection.addEventListener('mouseleave', startUspSlider);
    }

    // ==========================================
    // SCROLL TO TOP BUTTON
    // ==========================================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ==========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenuContainerRef = document.getElementById('mobileMenuContainer');
                    const mobileToggleRef = document.getElementById('mobileToggle');
                    const mobileMenuOverlayRef = document.getElementById('mobileMenuOverlay');

                    if (mobileMenuContainerRef && mobileMenuContainerRef.classList.contains('active')) {
                        mobileMenuContainerRef.classList.remove('active');
                        if (mobileMenuOverlayRef) {
                            mobileMenuOverlayRef.classList.remove('active');
                        }
                        if (mobileToggleRef) {
                            mobileToggleRef.classList.remove('active');
                        }
                        document.body.style.overflow = '';
                    }

                    // Smooth scroll to target
                    const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.service-card, .treatment-card, .stat-card, .about-feature');

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // ==========================================
    // FORM VALIDATION
    // ==========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#c5705d';

                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });

            if (isValid) {
                // Here you would typically send the form data to your server
                alert('Thank you for your enquiry! We will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.dataset.suffix || '+');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));

                // Store suffix for later use
                if (text.includes('+')) {
                    element.dataset.suffix = '+';
                }

                animateValue(element, 0, number, 2000);
                statsObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // PARALLAX EFFECT ON HERO
    // ==========================================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // ==========================================
    // LOADING PLACEHOLDER IMAGES
    // ==========================================
    // Since we're generating images, let's add placeholders with colors
    const imageElements = {
        'navbar-logo': { bg: '#1a4d2e', icon: '🌿' },
        'digestive-icon': { bg: '#2d6a4f', icon: '🍃' },
        'joint-icon': { bg: '#2d6a4f', icon: '🦴' },
        'liver-icon': { bg: '#2d6a4f', icon: '💚' },
        'respiratory-icon': { bg: '#2d6a4f', icon: '🫁' },
        'hair-icon': { bg: '#2d6a4f', icon: '💆' },
        'heart-icon': { bg: '#2d6a4f', icon: '❤️' },
        'insurance-bg': { bg: 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%)' },
        'tourism-bg': { bg: 'linear-gradient(135deg, #2d6a4f 0%, #1a4d2e 100%)' },
        'consultation-icon': { bg: '#2d6a4f', icon: '👨‍⚕️' },
        'residential-icon': { bg: '#2d6a4f', icon: '🏥' },
        'panchakarma-icon': { bg: '#2d6a4f', icon: '💆‍♀️' },
        'cupping-icon': { bg: '#2d6a4f', icon: '🔮' },
        'leech-icon': { bg: '#2d6a4f', icon: '🩺' },
        'ksharsutra-icon': { bg: '#2d6a4f', icon: '⚕️' },
        'naadi-icon': { bg: '#2d6a4f', icon: '🫀' },
        'yoga-icon': { bg: '#2d6a4f', icon: '🧘' },
        'herbs-basket': { bg: 'linear-gradient(135deg, #9caf88 0%, #2d6a4f 100%)' },
        'doctor-profile': { bg: 'linear-gradient(135deg, #1a4d2e 0%, #2d6a4f 100%)' },
        'patient1': { bg: '#d4af37' },
        'patient2': { bg: '#2d6a4f' },
        'patient3': { bg: '#c5705d' }
    };

    Object.keys(imageElements).forEach(id => {
        const element = document.getElementById(id);
        if (element && element.tagName === 'IMG') {
            const config = imageElements[id];

            // Create SVG placeholder
            const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1a4d2e;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#2d6a4f;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="${config.bg.includes('gradient') ? `url(#grad-${id})` : config.bg}"/>
          ${config.icon ? `<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="120">${config.icon}</text>` : ''}
        </svg>
      `;

            // Use encodeURIComponent for Unicode support (emojis)
            element.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
        }
    });

    // ==========================================
    // HEALING JOURNEY POPUP - AFTER 5 SECONDS
    // ==========================================
    const healingPopupOverlay = document.getElementById('healingPopupOverlay');
    const healingPopupClose = document.getElementById('healingPopupClose');
    const healingPopupForm = document.getElementById('healingPopupForm');

    // Show popup after 5 seconds
    console.log('🌿 Popup code reached! healingPopupOverlay:', healingPopupOverlay);
    if (healingPopupOverlay) {
        console.log('🌿 Setting up popup timer for 5 seconds...');
        setTimeout(() => {
            console.log('🌿 Timer fired! Opening popup now...');
            openHealingPopup();
        }, 5000); // 5 seconds delay
    } else {
        console.log('🌿 ERROR: healingPopupOverlay element not found!');
    }

    function openHealingPopup() {
        if (healingPopupOverlay) {
            healingPopupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeHealingPopup() {
        if (healingPopupOverlay) {
            healingPopupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close popup on close button click
    if (healingPopupClose) {
        healingPopupClose.addEventListener('click', closeHealingPopup);
    }

    // Close popup on overlay click (outside modal)
    if (healingPopupOverlay) {
        healingPopupOverlay.addEventListener('click', function (e) {
            if (e.target === healingPopupOverlay) {
                closeHealingPopup();
            }
        });
    }

    // Close popup on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && healingPopupOverlay && healingPopupOverlay.classList.contains('active')) {
            closeHealingPopup();
        }
    });

    // Handle form submission
    if (healingPopupForm) {
        healingPopupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('healingName').value,
                age: document.getElementById('healingAge').value,
                sex: document.getElementById('healingSex').value,
                problem: document.getElementById('healingProblem').value,
                severity: document.querySelector('input[name="severity"]:checked')?.value
            };

            // Validate all fields
            if (!formData.name || !formData.age || !formData.sex || !formData.problem || !formData.severity) {
                alert('Please fill in all required fields.');
                return;
            }

            console.log('Healing Journey Form Data:', formData);

            // Show success message
            alert('🌿 Thank you for taking the first step toward your healing journey!\n\nOur Ayurvedic experts will review your information and reach out to you shortly with personalized guidance.');

            // Reset form and close popup
            healingPopupForm.reset();
            closeHealingPopup();
        });
    }

    console.log('🌿 Royal Ayurveda Website Initialized');
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for scroll events
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
