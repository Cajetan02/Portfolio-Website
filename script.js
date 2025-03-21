// Global Variables
let index = 0;
const totalSlides = document.querySelectorAll("#carousel img").length;

const myButton = document.getElementById('main');
if (window.matchMedia("(max-width: 755px)").matches) {
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

// Modified Project Card Interactions
// Project card interactions
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        
        card.addEventListener('click', () => {
            card.classList.toggle('clicked');
        });
    });
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Force project cards to be visible immediately
    setupProjectCards();
    
    // Make sure scroll animations are triggered for projects
    const projectElements = document.querySelectorAll('#projects .scroll-animation');
    projectElements.forEach(element => {
        element.classList.add('animate');
    });
    
    // Rest of your initialization code...
});

// Ensure scroll animations are applied properly
// Fixed function for handling scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animation, .project-card');
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
        }
    });
}

// Make sure this function runs on page load and scroll
document.addEventListener('DOMContentLoaded', function() {
    // Trigger animations on page load
    setTimeout(() => {
        handleScrollAnimations();
    }, 300);
    
    // Set up scroll animations
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
    });
});
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

// Blog Section Functionality

// Function to handle blog animations
function initializeBlogAnimations() {
    const blogPosts = document.querySelectorAll('#blog .scroll-animation');
    
    // Set up initial animation delays
    blogPosts.forEach((post, index) => {
        post.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Trigger animations when scrolled into view
    function animateBlogPosts() {
        blogPosts.forEach(post => {
            const postPosition = post.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (postPosition < screenPosition) {
                post.classList.add('animate');
            }
        });
    }
    
    // Run on page load and scroll
    animateBlogPosts();
    window.addEventListener('scroll', animateBlogPosts);
}

// Function to handle blog post modals
function initializeBlogModals() {
    // Get all "Read More" links
    const readMoreLinks = document.querySelectorAll('#blog a[href^="#blog-post-"]');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target post ID
            const targetId = this.getAttribute('href');
            const targetPost = document.querySelector(targetId);
            
            if (targetPost) {
                // Create modal container if it doesn't exist
                let modal = document.querySelector('.blog-modal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.className = 'blog-modal';
                    document.body.appendChild(modal);
                }
                
                // Create modal content
                modal.innerHTML = `
                    <div class="blog-modal-content">
                        <div class="blog-close-btn">&times;</div>
                        ${targetPost.innerHTML}
                    </div>
                `;
                
                // Show modal with animation
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
                
                // Add event listener to close button
                const closeBtn = modal.querySelector('.blog-close-btn');
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                });
                
                // Close on click outside content
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        setTimeout(() => {
                            modal.remove();
                        }, 300);
                    }
                });
            }
        });
    });
}

// Add a "View All Posts" functionality
function initializeViewAllPosts() {
    const viewAllBtn = document.querySelector('#blog a[href="#all-blogs"]');
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // This would typically redirect to a full blog page
            // For this demo, we'll simply show a message
            alert('This would take you to a full blog archive page with all F1 posts');
        });
    }
}

// Initialize blog functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogAnimations();
    initializeBlogModals();
    initializeViewAllPosts();
    
    // Add blog section to navigation
    const navLinks = document.querySelectorAll('nav ul');
    navLinks.forEach(ul => {
        // Create new list item for blog
        const blogLi = document.createElement('li');
        const blogLink = document.createElement('a');
        blogLink.href = "#blog";
        blogLink.className = "hover:underline nav-link";
        blogLink.textContent = "F1 Blog";
        blogLi.appendChild(blogLink);
        
        // Insert before Contact link
        const contactLi = Array.from(ul.children).find(li => 
            li.querySelector('a')?.textContent === "Contact");
        
        if (contactLi) {
            ul.insertBefore(blogLi, contactLi);
        } else {
            ul.appendChild(blogLi);
        }
    });
    
    // Add blog to sidebar navigation as well
    const sidebar = document.getElementById('mySidebar');
    if (sidebar) {
        const blogLink = document.createElement('a');
        blogLink.href = "#blog";
        blogLink.textContent = "F1 Blog";
        
        // Find the Contact link and insert before it
        const links = sidebar.querySelectorAll('a');
        const contactLink = Array.from(links).find(a => 
            a.textContent === "Contact");
        
        if (contactLink) {
            sidebar.insertBefore(blogLink, contactLink);
        } else {
            // Append after the last section link
            const closeBtn = sidebar.querySelector('.closebtn');
            if (closeBtn) {
                sidebar.insertBefore(blogLink, closeBtn.nextSibling);
            } else {
                sidebar.appendChild(blogLink);
            }
        }
    }
});

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
    setupProjectCards(); // Make sure this runs after DOM is loaded
    setupThemeToggle();
    setupSmoothScrolling();
    
    // Trigger scroll animations on page load
    setTimeout(() => {
        animateSectionTitles();
        handleScrollAnimations();
    }, 300);
});