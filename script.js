// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

// Initialize form inputs based on theme
function initializeFormInputs() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        // Clear any browser-specific styles
        input.style.setProperty('background', 'transparent', 'important');
        input.style.setProperty('background-image', 'none', 'important');
        input.style.setProperty('-webkit-appearance', 'none', 'important');
        input.style.setProperty('-moz-appearance', 'none', 'important');
        input.style.setProperty('appearance', 'none', 'important');
    });
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add theme transition animation
    document.body.style.transition = 'background-color 0.5s, color 0.5s';
    
    // Fix for email input field - clear browser auto-fill icons
    setTimeout(() => {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            // Force clear any browser auto-fill styles
            input.style.setProperty('background', 'transparent', 'important');
            input.style.setProperty('background-image', 'none', 'important');
            input.style.setProperty('-webkit-appearance', 'none', 'important');
            input.style.setProperty('-moz-appearance', 'none', 'important');
            input.style.setProperty('appearance', 'none', 'important');
            
            // For light theme, set specific background
            if (newTheme === 'light') {
                input.style.setProperty('background-color', '#f9fafb', 'important');
                input.style.setProperty('color', '#111827', 'important');
            } else {
                input.style.setProperty('background-color', 'transparent', 'important');
                input.style.setProperty('color', '#f8f9fa', 'important');
            }
        });
        
        document.body.style.transition = '';
    }, 50);
});

// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function toggleMobileMenu() {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

hamburgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Close mobile menu when clicking on overlay
navOverlay.addEventListener('click', () => {
    toggleMobileMenu();
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileMenu();
    });
});

// Close mobile menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 767) {
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target) && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Close mobile menu on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            if (window.innerWidth <= 767) {
                toggleMobileMenu();
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 100) {
        navbar.style.padding = '0.8rem 0';
        navbar.style.boxShadow = '0 5px 20px var(--shadow)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
});

// Interactive 3D Cube
const rotatingCube = document.getElementById('rotatingCube');
let isCubeHovered = false;
let cubeRotation = { x: 0, y: 0 };

// Only enable hover effects on non-touch devices
if (window.matchMedia("(hover: hover)").matches) {
    rotatingCube.addEventListener('mouseenter', () => {
        isCubeHovered = true;
        rotatingCube.style.animationPlayState = 'paused';
    });

    rotatingCube.addEventListener('mouseleave', () => {
        isCubeHovered = false;
        rotatingCube.style.animationPlayState = 'running';
    });

    rotatingCube.addEventListener('mousemove', (e) => {
        if (!isCubeHovered) return;
        
        const rect = rotatingCube.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 180;
        const rotateX = ((centerY - y) / centerY) * 180;
        
        cubeRotation = { x: rotateX, y: rotateY };
        rotatingCube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
}

// Touch interaction for cube
rotatingCube.addEventListener('touchstart', () => {
    rotatingCube.style.transform = 'scale(0.95)';
    setTimeout(() => {
        rotatingCube.style.transform = 'scale(1)';
    }, 200);
});

// Interactive background blocks
const backgroundBlocks = document.querySelectorAll('.floating-block');

// Only enable parallax effect on non-touch devices
if (window.matchMedia("(hover: hover)").matches) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        backgroundBlocks.forEach((block, index) => {
            const speed = 0.03 + (index * 0.01);
            const x = (mouseX - 0.5) * 50 * speed;
            const y = (mouseY - 0.5) * 50 * speed;
            
            block.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Floating icons interaction
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach(icon => {
    // Desktop hover effects
    if (window.matchMedia("(hover: hover)").matches) {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.zIndex = '10';
            icon.style.color = 'var(--accent)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.zIndex = '';
            icon.style.color = '';
        });
    }
    
    // Touch interaction
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        icon.style.animationPlayState = 'paused';
        icon.style.transform = 'scale(1.5)';
        icon.style.color = 'var(--primary)';
        
        setTimeout(() => {
            icon.style.animationPlayState = 'running';
            icon.style.transform = '';
            icon.style.color = '';
        }, 1000);
    });
});

// Animate elements on scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add staggered animations
            if(entry.target.classList.contains('project-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            } else if(entry.target.classList.contains('skill-category')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add CSS animations dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
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
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .animated {
        opacity: 1 !important;
    }
`;
document.head.appendChild(styleSheet);

// Particle effect for hero section (show on mobile too)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Clear existing particles
    document.querySelectorAll('.particle').forEach(p => p.remove());
    
    // Create particles based on screen size
    const particleCount = window.innerWidth <= 768 ? 8 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * (window.innerWidth <= 768 ? 2 : 3) + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = 'var(--primary)';
        particle.style.opacity = window.innerWidth <= 768 ? '0.15' : '0.3';
        particle.style.position = 'absolute';
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '1';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `floatParticle ${duration}s infinite ${delay}s`;
        
        hero.appendChild(particle);
    }
    
    // Add particle animation to styles if not already added
    if (!document.querySelector('#particle-animation')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-animation';
        particleStyle.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0);
                    opacity: 0.15;
                }
                25% {
                    transform: translate(${window.innerWidth <= 768 ? '10' : '20'}px, -${window.innerWidth <= 768 ? '10' : '20'}px);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(-${window.innerWidth <= 768 ? '8' : '15'}px, ${window.innerWidth <= 768 ? '8' : '15'}px);
                    opacity: 0.1;
                }
                75% {
                    transform: translate(${window.innerWidth <= 768 ? '5' : '10'}px, -${window.innerWidth <= 768 ? '5' : '10'}px);
                    opacity: 0.25;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = `<i class="fas fa-check"></i><span>Message Sent!</span>`;
            submitBtn.style.background = 'var(--success)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i><span>${originalText}</span>`;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recreate particles on resize
        createParticles();
        
        // Update animations for mobile/desktop
        if (window.innerWidth <= 768) {
            rotatingCube.style.animationPlayState = 'running';
        }
        
        // Update floating icons visibility
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            if (window.innerWidth <= 480) {
                icon.style.display = 'flex';
                icon.style.visibility = 'visible';
                icon.style.opacity = '0.7';
            }
        });
        
        // Update background blocks
        const floatingBlocks = document.querySelectorAll('.floating-block');
        floatingBlocks.forEach(block => {
            if (window.innerWidth <= 768) {
                block.style.display = 'block';
                block.style.visibility = 'visible';
                block.style.opacity = '0.05';
            }
        });
        
        // Close mobile menu if switching to desktop view
        if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250);
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create particles (now works on mobile too)
    createParticles();
    
    // Initialize form inputs
    initializeFormInputs();
    
    // Animate progress bars
    setTimeout(animateProgressBars, 500);
    
    // Trigger initial animations for elements in view
    setTimeout(() => {
        document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInView = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9;
            
            if(isInView) {
                el.classList.add('animated');
                el.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
        
        // Force show hero visual elements on mobile
        if (window.innerWidth <= 768) {
            const heroVisual = document.querySelector('.hero-visual');
            const rotatingCube = document.getElementById('rotatingCube');
            const floatingIcons = document.querySelectorAll('.floating-icon');
            const background3d = document.querySelector('.background-3d');
            
            if (heroVisual) {
                heroVisual.style.display = 'flex';
                heroVisual.style.visibility = 'visible';
                heroVisual.style.opacity = '1';
            }
            
            if (rotatingCube) {
                rotatingCube.style.display = 'block';
                rotatingCube.style.visibility = 'visible';
                rotatingCube.style.opacity = '1';
            }
            
            floatingIcons.forEach(icon => {
                icon.style.display = 'flex';
                icon.style.visibility = 'visible';
                icon.style.opacity = '0.7';
            });
            
            if (background3d) {
                background3d.style.display = 'block';
                background3d.style.visibility = 'visible';
                background3d.style.opacity = '0.3';
            }
        }
    }, 500);
    
    // Add keyboard shortcuts (desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('keydown', (e) => {
            // Toggle theme with Ctrl+T
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }
});

// Add touch event for theme toggle on mobile
if ('ontouchstart' in window) {
    themeToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        themeToggle.click();
    });
}