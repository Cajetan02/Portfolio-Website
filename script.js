// Global Variables
let index = 0;
const totalSlides = document.querySelectorAll("#carousel img").length;


const myButton = document.getElementById('main');
if (window.matchMedia("(max-width: 775px)").matches) {
  myButton.disabled = false;
} else {
  myButton.disabled = true;
}
// Carousel Functions
function showSlide(n) {
    index = n;
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    document.getElementById("carousel").style.transform = `translateX(-${index * 100}%)`;
    updateIndicators();
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
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

// Theme toggler
function setupThemeToggle() {
    const themeToggler = document.getElementById('themeToggle');
    if (themeToggler) {
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-theme');
            themeToggler.checked = true;
        }
        
        // When toggler changes
        themeToggler.addEventListener('change', () => {
            if (themeToggler.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
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

// Smooth scrolling navigation
function setupSmoothScrolling() {
    // For the navigation menu links
    const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScrollHandler);
    });
    
    // For buttons with href attributes
    const actionButtons = document.querySelectorAll('a[href^="#"]');
    actionButtons.forEach(button => {
        button.addEventListener('click', smoothScrollHandler);
    });
    
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

// Setup mobile menu
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    if (document.getElementById('carousel')) {
        showSlide(0);
        
        // Auto advance carousel
        setInterval(nextSlide, 5000);
    }
    
    // Set up scroll animations
    window.addEventListener('scroll', () => {
        animateSectionTitles();
        handleScrollAnimations();
    });
    
    // Initialize all components
    setupMobileMenu();
    setupProjectCards();
    setupThemeToggle();
    setupSmoothScrolling();
    
    // Trigger scroll animations on page load
    setTimeout(() => {
        animateSectionTitles();
        handleScrollAnimations();
    }, 300);
});