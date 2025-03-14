// Global Variables
let index = 0;
const totalSlides = document.querySelectorAll("#carousel img").length;

// Carousel Functions
function showSlide(n) {
    index = n;
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    document.getElementById("carousel").style.transform = `translateX(-${index * 100}%)`;
    updateIndicators();
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

function goToSlide(n) {
    showSlide(n);
}

function updateIndicators() {
    const indicators = document.querySelectorAll(".carousel-container .bottom-4 button");
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add("opacity-100");
            indicator.classList.remove("opacity-50");
        } else {
            indicator.classList.add("opacity-50");
            indicator.classList.remove("opacity-100");
        }
    });
}

// Section title animation
function animateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (titlePosition < screenPosition) {
            title.classList.add('animate');
        }
    });
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animation');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
            
            // Add specific animate.css classes based on element type
            if (element.classList.contains('project-card')) {
                const delay = Array.from(element.parentNode.children).indexOf(element) * 0.2;
                element.style.animationDelay = `${delay}s`;
                element.classList.add('animate__fadeInUp');
            }
            
            // Animation for contact icons
            if (element.classList.contains('contact-icon')) {
                const delay = Array.from(element.parentNode.children).indexOf(element) * 0.15;
                element.style.animationDelay = `${delay}s`;
                element.classList.add('animate__bounceIn');
            }
        }
    });
}

// Project card interactions
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const frontSide = card.querySelector('.card-front');
        const backSide = card.querySelector('.card-back');
        
        card.addEventListener('mouseenter', () => {
            frontSide.style.transform = 'rotateY(180deg)';
            backSide.style.transform = 'rotateY(0deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            frontSide.style.transform = 'rotateY(0deg)';
            backSide.style.transform = 'rotateY(180deg)';
        });
    });
}

// Smooth scrolling navigation
function setupSmoothScrolling() {
    // For the navigation menu links
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollHandler);
    });
    
    // For View Projects button
    const viewProjectsBtn = document.querySelector('.view-projects-btn');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add pulse animation
            this.classList.add('animate__animated', 'animate__pulse');
            
            // Get the target section (projects section)
            const targetId = this.getAttribute('href') || '#projects';
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the section
                smoothScrollTo(targetSection);
            }
            
            // Remove animation class after it completes
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__pulse');
            }, 1000);
        });
    }
    
    // For Contact Me button
    const contactMeBtn = document.querySelector('.contact-me-btn');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add heartbeat animation
            this.classList.add('animate__animated', 'animate__heartBeat');
            
            // Get the target section (contact section)
            const targetId = this.getAttribute('href') || '#contact';
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to the section
                smoothScrollTo(targetSection);
            }
            
            // Remove animation class after it completes
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1500);
        });
    }
    
    // Handler for smooth scrolling
    function smoothScrollHandler(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        // Get the target section from href attribute
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Smooth scroll to the section
            smoothScrollTo(targetSection);
        }
    }
    
    // Smooth scroll function
    function smoothScrollTo(element) {
        const headerOffset = 80; // Adjust for fixed header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Smooth scroll to the element
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Contact form validation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.getElementById('formSuccess');
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                    
                    // Add animation to success message
                    successMessage.classList.add('animate__animated', 'animate__fadeIn');
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('animate__fadeOut');
                        setTimeout(() => {
                            successMessage.classList.add('hidden');
                            successMessage.classList.remove('animate__animated', 'animate__fadeIn', 'animate__fadeOut');
                        }, 1000);
                    }, 5000);
                }
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value
                });
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function highlightError(element) {
    element.classList.add('border-red-500');
    element.classList.add('animate__animated', 'animate__shakeX');
    
    // Remove animation class after it completes
    setTimeout(() => {
        element.classList.remove('animate__animated', 'animate__shakeX');
    }, 1000);
    
    const errorMessage = element.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.classList.remove('hidden');
    }
}

function removeError(element) {
    element.classList.remove('border-red-500');
    const errorMessage = element.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.classList.add('hidden');
    }
}

// Theme toggler
function setupThemeToggle() {
    const themeToggler = document.getElementById('themeToggle');
    if (themeToggler) {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            themeToggler.checked = true;
        }
        
        // When toggler changes
        themeToggler.addEventListener('change', () => {
            if (themeToggler.checked) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            
            // Add animation to the body when theme changes
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
}

// Skills progress bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (barPosition < screenPosition) {
            const percentage = bar.getAttribute('data-progress');
            bar.style.width = percentage + '%';
            bar.classList.add('animate-progress');
        }
    });
}

// Setup contact icons animation
function setupContactIcons() {
    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach(icon => {
        // Add animation class and scroll-animation class
        icon.classList.add('scroll-animation', 'animate__animated');
        
        // Add hover animation
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('animate__tada');
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.classList.remove('animate__tada');
        });
    });
}

// Testimonial carousel autoplay
function setupTestimonialCarousel() {
    const testimonialContainer = document.getElementById('testimonialCarousel');
    if (testimonialContainer) {
        let testimonialIndex = 0;
        const testimonials = testimonialContainer.querySelectorAll('.testimonial');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                if (i === index) {
                    testimonial.classList.remove('hidden');
                    testimonial.classList.add('animate__fadeIn');
                } else {
                    testimonial.classList.add('hidden');
                    testimonial.classList.remove('animate__fadeIn');
                }
            });
        }
        
        // Auto rotate testimonials
        if (totalTestimonials > 1) {
            setInterval(() => {
                testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
                showTestimonial(testimonialIndex);
            }, 5000);
        }
        
        // Initial display
        showTestimonial(testimonialIndex);
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    if (document.getElementById('carousel')) {
        showSlide(0);
        
        // Set up carousel controls
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Set up carousel indicators
        const indicators = document.querySelectorAll(".carousel-container .bottom-4 button");
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => goToSlide(i));
        });
        
        // Auto advance carousel
        setInterval(nextSlide, 5000);
    }
    
    // Set up scroll animations
    window.addEventListener('scroll', () => {
        animateSectionTitles();
        handleScrollAnimations();
        animateSkillBars();
    });
    
    // Initialize all components
    setupMobileMenu(); // This now contains the fixed mobile menu functionality
    setupProjectCards();
    setupContactForm();
    setupThemeToggle();
    setupTestimonialCarousel();
    setupSmoothScrolling();
    setupContactIcons();
    
    // Trigger scroll animations on page load
    setTimeout(() => {
        animateSectionTitles();
        handleScrollAnimations();
        animateSkillBars();
    }, 300);
});

// Add CSS for button animations and theme transition
document.addEventListener('DOMContentLoaded', function() {
    // Create a style element
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        .theme-transition {
            transition: background-color 0.5s ease, color 0.5s ease;
        }
        
        /* Button hover effects */
        .view-projects-btn, .contact-me-btn {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .view-projects-btn:hover, .contact-me-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .view-projects-btn:after, .contact-me-btn:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            border-radius: 100%;
            transform: scale(1, 1) translate(-50%);
            transform-origin: 50% 50%;
        }
        
        .view-projects-btn:focus:not(:active)::after, .contact-me-btn:focus:not(:active)::after {
            animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(0, 0);
                opacity: 0.5;
            }
            20% {
                transform: scale(25, 25);
                opacity: 0.3;
            }
            100% {
                opacity: 0;
                transform: scale(40, 40);
            }
        }
        
        /* Contact icons animations */
        .contact-icon {
            opacity: 0;
            transform: scale(0.8);
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .contact-icon.animate {
            opacity: 1;
            transform: scale(1);
        }
    `;
    
    // Append to head
    document.head.appendChild(style);
});