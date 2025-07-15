document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    // const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        // document.body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    } else {
        // document.body.setAttribute('data-theme', 'light');
        themeSwitch.checked = false;
    }

    
//     localStorage.removeItem('theme');
// document.body.removeAttribute('data-theme');
    // Listen for theme toggle
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            // document.body.setAttribute('data-theme', 'dark');
            // localStorage.setItem('theme', 'dark');
        } else {
            // document.body.setAttribute('data-theme', 'light');
            // localStorage.setItem('theme', 'light');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Initialize animations when elements come into view
    const animateOnScroll = function() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };
    

    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Leaf growth animation counter
    const growthElement = document.querySelector('.leaf-growth');
    if (growthElement) {
        const targetCount = parseInt(growthElement.getAttribute('data-count'));
        let currentCount = 0;
        const increment = targetCount / 100;
        
        const counter = setInterval(() => {
            currentCount += increment;
            growthElement.textContent = Math.floor(currentCount).toLocaleString();
            
            if (currentCount >= targetCount) {
                growthElement.textContent = targetCount.toLocaleString();
                clearInterval(counter);
            }
        }, 20);
    }

    
});