document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animated vine growth on scroll
    const vinePath = document.querySelector('.vine-path path');
    if (vinePath) {
        const length = vinePath.getTotalLength();
        
        // Set initial state
        vinePath.style.strokeDasharray = length;
        vinePath.style.strokeDashoffset = length;
        
        // Animation on scroll
        gsap.to(vinePath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });
    }
    
    // Hero section animations
    gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3
    });
    
    gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6
    });
    
    gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.9
    });
    
    // Section entrance animations
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });
    
    // Product card hover animations
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power1.out',
            paused: true,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onComplete: function() {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -15,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: -10,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                });
            }
        });
    });
    
    // Testimonial card hover animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        gsap.to(card, {
            y: -5,
            duration: 0.3,
            ease: 'power1.out',
            paused: true,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            onComplete: function() {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: -5,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                });
            }
        });
    });
    
    // Contact form leaf decorations animation
    const leafDecorations = document.querySelectorAll('.leaf-decoration');
    
    leafDecorations.forEach(leaf => {
        gsap.from(leaf, {
            scaleX: 0,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: leaf.parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Navbar animation on scroll
    gsap.to('.navbar', {
        scrollTrigger: {
            trigger: 'body',
            start: '50px top',
            end: 'max',
            toggleClass: { targets: '.navbar', className: 'navbar-scrolled' }
        }
    });
});