// Dynamic Date/Time Display
function updateDateTime() {
    const now = new Date();
    
    // Get day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[now.getDay()];
    
    // Get month name and day
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[now.getMonth()];
    const day = now.getDate();
    
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
    const dateTimeString = `${dayName}, ${monthName} ${day}, ${timeStr}, Munich`;
    
    const display = document.getElementById('datetime-display');
    if (display) {
        display.textContent = dateTimeString;
    }
}

function updateCountdown() {
    const now = new Date();
    const day = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;
    
    const countdownDisplay = document.getElementById('countdown-display');
    if (!countdownDisplay) return;
    
    // Sunday (0) or Monday (1): closed all day
    if (day === 0 || day === 1) {
        countdownDisplay.innerHTML = '<span>We open on Tuesday again.</span>';
        return;
    }
    
    // Tuesday (2) - Saturday (6): schedule based on time
    if (time >= 19 && time < 23) {
        countdownDisplay.innerHTML = '<div class="open-status"><span class="open-dot"></span><span>The restaurant is in Action!</span></div>';
    } else if (time >= 1 && time < 9) {
        countdownDisplay.innerHTML = '<span>Sleeping Time!</span>';
    } else if (time >= 9 && time < 13) {
        countdownDisplay.innerHTML = '<span>Morning Sports!</span>';
    } else if (time >= 13 && time < 18) {
        countdownDisplay.innerHTML = '<span>We are getting ready for Dinner Service!</span>';
    } else if (time >= 18 && time < 18.75) {
        countdownDisplay.innerHTML = '<span>Staff Food is served!</span>';
    } else if (time >= 18.75 && time < 19) {
        countdownDisplay.innerHTML = '<span>Service Meeting!</span>';
    } else if (time >= 23 || time < 1) {
        countdownDisplay.innerHTML = '<span>Polishing the Glasses!</span>';
    }
}

// Update immediately and then every second
updateDateTime();
updateCountdown();
setInterval(() => {
    updateDateTime();
    updateCountdown();
}, 1000);

// Page Navigation Management with Smooth Animations
const homeSection = document.querySelector('.home-section');
const reserveSection = document.querySelector('.reserve-section');
const pageSections = document.querySelectorAll('.page-section');
let isAnimating = false;

// Null checks for critical elements
if (!homeSection) {
    // Critical element missing - fail silently in production
}
if (!reserveSection) {
    // Critical element missing - fail silently in production
}

function handlePageNavigation() {
    if (isAnimating) return;
    if (!homeSection || !reserveSection) return;
    
    const hash = window.location.hash;
    const isPageSection = hash && (hash === '#reserve' || hash === '#origin' || hash === '#gift' || hash === '#contact' || hash === '#newsletter' || hash === '#impressum' || hash === '#datenschutz');
    
    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
        if (isPageSection) {
            // Navigate to any page section - Home slides up, Page slides up from bottom
            isAnimating = true;
            
            // Home slides up
            homeSection.classList.add('slide-up');
            homeSection.classList.remove('slide-in-from-top');
            
            // Hide all other sections first
            if (hash === '#reserve') {
                reserveSection.classList.add('active');
                reserveSection.classList.remove('slide-down');
                pageSections.forEach(section => {
                    section.classList.remove('active');
                    section.classList.add('slide-down');
                });
            } else {
                reserveSection.classList.remove('active');
                reserveSection.classList.add('slide-down');
                
                pageSections.forEach(section => {
                    const sectionId = '#' + section.id;
                    if (sectionId === hash) {
                        section.classList.add('active');
                        section.classList.remove('slide-down');
                    } else {
                        section.classList.remove('active');
                        section.classList.add('slide-down');
                    }
                });
            }
            
            // Allow scrolling for page sections
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        } else {
            // Navigate to Home - All pages slide down, Home slides down from top
            isAnimating = true;
            
            // All sections slide down
            reserveSection.classList.add('slide-down');
            reserveSection.classList.remove('active');
            
            pageSections.forEach(section => {
                section.classList.add('slide-down');
                section.classList.remove('active');
                section.scrollTop = 0;
            });
            
            // Home slides in from top
            homeSection.classList.remove('slide-up');
            homeSection.classList.add('slide-in-from-top');
            
            // Prevent scrolling on home page
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            
            // Scroll all sections to top for next time
            reserveSection.scrollTop = 0;
            
            setTimeout(() => {
                homeSection.classList.remove('slide-in-from-top');
                isAnimating = false;
            }, 800);
        }
    });
}

// Handle navigation on page load
handlePageNavigation();

// Handle navigation when hash changes
window.addEventListener('hashchange', handlePageNavigation);

// Home Navigation Click Handling
const homeNavItems = document.querySelectorAll('.home-navigation .nav-item');
homeNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            if (!isAnimating) {
                window.location.hash = href;
            }
        }
    });
});

// Back button handling for all sections
const backButtons = document.querySelectorAll('.back-button');
backButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isAnimating) {
            window.location.hash = '#home';
        }
    });
});

// ESC key to navigate back to home
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.location.hash && window.location.hash !== '#home') {
        if (!isAnimating) {
            window.location.hash = '#home';
        }
    }
});

// Optimized Parallax Effect for Hero Image using RequestAnimationFrame
// Note: Parallax currently disabled as .hero-image element doesn't exist in HTML
// If parallax is needed, add .hero-image class to the hero SVG container
let lastScrollTop = 0;
let ticking = false;
const heroImage = document.querySelector('.hero-image') || document.querySelector('.home-hero-image');

function updateParallax() {
    if (!heroImage) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply parallax on home section
    if (window.location.hash === '' || window.location.hash === '#home') {
        const parallaxOffset = scrollTop * 0.3;
        heroImage.style.transform = `translate3d(-50%, ${parallaxOffset - 50}%, 0)`;
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

// Only add scroll listener if hero element exists
if (heroImage) {
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Image Loading Handler with Error Handling
const pageImages = document.querySelectorAll('.page-image img');
pageImages.forEach(img => {
    if (!img) return;
    
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            // Fallback für fehlende Bilder - hide gracefully
            img.style.display = 'none';
            const parent = img.closest('.page-image');
            if (parent) {
                parent.style.minHeight = '400px';
                parent.style.backgroundColor = '#1a1a1a';
            }
        });
    }
});

// Production ready - Console messages removed for performance

// ===== HERO IMAGE SLIDER =====
// Creative Director Grade: Virgil Abloh Level 🔥
// 6s per image, 1.8s crossfade (butterweich), Ken Burns zoom

const heroSlider = {
    slides: document.querySelectorAll('.hero-image-slide'),
    currentIndex: 0,
    intervalId: null,
    slideDuration: 6000, // 6 seconds per image
    fadeDuration: 1800, // 1.8s crossfade
    
    init() {
        if (!this.slides.length) {
            // No slides found - fail silently
            return;
        }
        
        // Check if images are loaded
        let imagesLoaded = 0;
        this.slides.forEach((slide, index) => {
            const img = slide;
            if (img.complete) {
                imagesLoaded++;
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === this.slides.length) {
                        this.startAutoplay();
                    }
                });
                img.addEventListener('error', () => {
                    // Hide broken image gracefully
                    img.style.display = 'none';
                });
            }
        });
        
        // Start if all images already loaded
        if (imagesLoaded === this.slides.length) {
            this.startAutoplay();
        }
    },
    
    nextSlide() {
        if (!this.slides.length) return;
        
        const currentSlide = this.slides[this.currentIndex];
        if (!currentSlide) return;
        
        // Add fade-out to current slide for smooth exit
        currentSlide.classList.add('fade-out');
        
        // Calculate next index
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        const nextSlide = this.slides[nextIndex];
        
        if (!nextSlide) return;
        
        // After a brief delay, swap slides
        setTimeout(() => {
            // Remove both classes from old slide
            currentSlide.classList.remove('active', 'fade-out');
            
            // Add active to new slide (triggers fade-in + zoom)
            nextSlide.classList.add('active');
            
            // Update index
            this.currentIndex = nextIndex;
        }, this.fadeDuration);
    },
    
    startAutoplay() {
        this.intervalId = setInterval(() => {
            requestAnimationFrame(() => {
                this.nextSlide();
            });
        }, this.slideDuration);
    }
};

// Initialize hero slider when DOM is ready
function initHeroSlider() {
    try {
        heroSlider.init();
    } catch (error) {
        // Hero slider initialization failed - fail silently
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
    // DOM already loaded
    initHeroSlider();
}

// ===== NEWSLETTER FORM HANDLER =====
(function() {
    function setupNewsletterForm(form) {
        if (!form) return;
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            var emailInput = form.querySelector('.newsletter-input');
            var messageEl = form.querySelector('.newsletter-info');
            var submitBtn = form.querySelector('.newsletter-button');
            
            var email = emailInput.value.trim();
            
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                messageEl.textContent = 'Please enter a valid email address.';
                messageEl.className = 'newsletter-info newsletter-error';
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            messageEl.textContent = '';
            messageEl.className = 'newsletter-info';
            
            fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.success) {
                    messageEl.textContent = 'Welcome to our Circle \u2013 we look forward to sharing the journey with you.';
                    messageEl.className = 'newsletter-info newsletter-success';
                    emailInput.value = '';
                } else {
                    messageEl.textContent = data.error || 'Something went wrong. Please try again.';
                    messageEl.className = 'newsletter-info newsletter-error';
                }
            })
            .catch(function() {
                messageEl.textContent = 'Something went wrong. Please try again.';
                messageEl.className = 'newsletter-info newsletter-error';
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            });
        });
    }
    
    var forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(setupNewsletterForm);
})();
