// Verify JavaScript is loading
console.log('Portfolio JavaScript loaded successfully!');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500);
        
        // Initialize AOS animation library
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    });
    
    // Theme and Color Functionality - Fixed and Simplified
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeSelector = document.querySelector('.theme-selector-toggle');
    const themeSettings = document.querySelector('.theme-settings');
    const closeThemeSettings = document.querySelector('.close-theme-settings');
    const themeOptions = document.querySelectorAll('.theme-option');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Initially set the default theme and color if not set
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedColor = localStorage.getItem('color') || '#b74b4b';
    
    // Apply saved theme and color on page load
    applyTheme(savedTheme, savedColor);
    
    // Mark the active theme option
    document.querySelectorAll('.theme-option').forEach(option => {
        if (option.getAttribute('data-mode') === savedTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Mark the active color option
    document.querySelectorAll('.color-option').forEach(option => {
        if (option.getAttribute('data-color') === savedColor) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Theme Toggle Button (Moon/Sun)
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        const currentColor = body.getAttribute('data-color') || savedColor;
        
        applyTheme(newTheme, currentColor);
        localStorage.setItem('theme', newTheme);
        
        // Update active theme in settings panel
        themeOptions.forEach(option => {
            if (option.getAttribute('data-mode') === newTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        console.log('Theme toggled to:', newTheme);
    });
    
    // Open Theme Settings Panel
    themeSelector.addEventListener('click', () => {
        themeSettings.classList.toggle('open');
    });
    
    // Close Theme Settings Panel
    closeThemeSettings.addEventListener('click', () => {
        themeSettings.classList.remove('open');
    });
    
    // Theme Option Selection
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const mode = option.getAttribute('data-mode');
            const currentColor = body.getAttribute('data-color') || savedColor;
            
            // Remove active class from all options
            themeOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Apply theme
            applyTheme(mode, currentColor);
            localStorage.setItem('theme', mode);
            
            console.log('Theme set to:', mode);
        });
    });
    
    // Color Option Selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            const currentTheme = body.getAttribute('data-theme') || savedTheme;
            
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Apply color
            applyTheme(currentTheme, color);
            localStorage.setItem('color', color);
            
            console.log('Color set to:', color);
        });
    });
    
    // Function to apply theme and color
    function applyTheme(theme, color) {
        body.setAttribute('data-theme', theme);
        body.setAttribute('data-color', color);
        document.documentElement.style.setProperty('--main-color', color);
        updateThemeIcon(theme);
        
        // Update particles color if particles.js is initialized
        if (typeof updateParticlesColor === 'function') {
            updateParticlesColor();
        }
    }
    
    // Update theme icon based on theme
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Language Switcher
    const languageSelect = document.getElementById('language-select');
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLanguage;
    
    // Language change event
    languageSelect.addEventListener('change', function() {
        const lang = this.value;
        localStorage.setItem('language', lang);
        console.log('Language changed to:', lang);
        // Implement language switching functionality if needed
    });
    
    // 3D Flip Cards for Projects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add touch support for mobile
        card.addEventListener('touchstart', function() {
            const cardInner = this.querySelector('.card-inner');
            cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });
    
    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav');
    
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile nav when clicking on a nav item
    document.querySelectorAll('nav a').forEach(navLink => {
        navLink.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight * 100;
        scrollProgress.style.width = scrollPercent + '%';
        
        // Show/hide scroll-to-top button
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTop > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Particles.js initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 85,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim()
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.9,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 200,
                    "color": getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim(),
                    "opacity": 0.6,
                    "width": 1.5
                },
                "move": {
                    "enable": true,
                    "speed": 1.8,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 160,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Update particles color when theme or color changes
        function updateParticlesColor() {
            const mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color').trim();
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                // Update particles color
                window.pJSDom[0].pJS.particles.color.value = mainColor;
                window.pJSDom[0].pJS.particles.line_linked.color = mainColor;
                
                // Refresh particles
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }
        
        // Call update function when theme or color changes
        themeToggle.addEventListener('click', updateParticlesColor);
        colorOptions.forEach(option => {
            option.addEventListener('click', updateParticlesColor);
        });
    }
    
    // Function to check if element is in home section
    function isInHomeSection() {
        const homeSection = document.getElementById('home');
        const rect = homeSection.getBoundingClientRect();
        // Check if home section is more than 50% visible in the viewport
        return (
            rect.top < window.innerHeight/2 && 
            rect.bottom > window.innerHeight/2
        );
    }
    
    // Update particles visibility based on scroll position
    window.addEventListener('scroll', updateParticlesVisibility);
    
    // Function to update particles visibility
    function updateParticlesVisibility() {
        const particlesElement = document.getElementById('particles-js');
        const inHomeSection = isInHomeSection();
        
        if (inHomeSection) {
            particlesElement.style.opacity = '0';
            particlesElement.style.visibility = 'hidden';
        } else {
            particlesElement.style.opacity = '1';
            particlesElement.style.visibility = 'visible';
        }
        
        // Log visibility state for debugging
        console.log("In home section:", inHomeSection);
    }

    // Initial check for particles visibility
    if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', updateParticlesVisibility);
    } else {
        // DOM already loaded
        updateParticlesVisibility();
    }
    
    // Header Scroll Effects
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let scrollingTimeout;
    
    // Function to handle scroll events
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add background when scrolled down
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
            // Scrolling down - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
        }
        
        // Update last scroll position
        lastScrollY = currentScrollY;
        
        // Clear previous timeout
        clearTimeout(scrollingTimeout);
        
        // Set timeout to show header after scrolling stops
        scrollingTimeout = setTimeout(() => {
            header.classList.remove('hidden');
        }, 1000);
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
    
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Form Submission
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Typing Animation with improved effect
    const typingText = document.querySelector('.typing-text span');
    if (typingText) {
        const words = [
            'CSE Student', 
            'AI Enthusiast', 
            'Data Science Learner', 
            'Python Developer', 
            'Web Developer'
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;
    
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200;
            }
    
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 500;
            }
    
            setTimeout(type, typingDelay);
        }
    
        type();
    }
}); 