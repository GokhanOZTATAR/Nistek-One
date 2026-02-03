/* =============================================
   NISTEK OTOMOTİV - JAVASCRIPT
   Interactive Features & Animations
   ============================================= */

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== SCROLL ANIMATION - FADE IN EFFECT =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing after animation
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    fadeInObserver.observe(element);
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email') ? document.getElementById('email').value : '',
            vehicle: document.getElementById('vehicle').value,
            service: document.getElementById('service') ? document.getElementById('service').value : '',
            message: document.getElementById('message') ? document.getElementById('message').value : ''
        };
        
        // Log form data (in production, this would be sent to a backend)
        console.log('Form submitted with data:', formData);
        
        // Show success message
        if (formMessage) {
            formMessage.classList.add('show');
            
            // Scroll to success message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 8 seconds
        setTimeout(function() {
            if (formMessage) {
                formMessage.classList.remove('show');
            }
        }, 8000);
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NUMBER COUNTER ANIMATION (FOR STATS) =====
const statsSection = document.querySelector('.stats');

if (statsSection) {
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateNumbers();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
    
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateNumber();
        });
    }
}

// ===== LOADING STATE =====
window.addEventListener('load', function() {
    // Add a small delay to ensure smooth initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== PREVENT FORM RESUBMISSION ON PAGE REFRESH =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== CONSOLE MESSAGE =====
console.log('%c Nistek Otomotiv ', 'background: #ff6b35; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Profesyonel Oto Servis | Şanlıurfa ', 'font-size: 14px; color: #162447;');
console.log('%c 📞 0544 606 8949 ', 'font-size: 12px; color: #718096;');
