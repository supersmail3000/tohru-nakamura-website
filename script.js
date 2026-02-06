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
    
    // Format: "Friday, January 23, Munich" (ohne Uhrzeit)
    const dateTimeString = `${dayName}, ${monthName} ${day}, Munich`;
    
    const display = document.getElementById('datetime-display');
    if (display) {
        display.textContent = dateTimeString;
    }
}

// Countdown to opening (Dienstag-Samstag ab 19 Uhr bis 02 Uhr) mit Sekunden
function updateCountdown() {
    const now = new Date();
    const currentDay = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    const currentHour = now.getHours();
    
    const countdownDisplay = document.getElementById('countdown-display');
    
    // SPECIAL: 23:00 - 02:00 Uhr = Cleaning time after service
    const isJustClosed = (currentDay >= 2 && currentDay <= 6 && currentHour >= 23) || 
                         (currentDay >= 3 && currentDay <= 6 && currentHour < 2) || 
                         (currentDay === 0 && currentHour < 2);
    
    if (isJustClosed) {
        countdownDisplay.innerHTML = '<span>Closed. Preparing for tomorrow.</span>';
        return;
    }
    
    // Prüfen ob Restaurant gerade geöffnet ist (19:00 - 23:00, Di-Sa)
    let isOpen = false;
    
    if (currentDay >= 2 && currentDay <= 6 && currentHour >= 19 && currentHour < 23) {
        // Dienstag-Samstag von 19 bis 23 Uhr
        isOpen = true;
    }
    
    if (isOpen) {
        // Restaurant ist geöffnet: Zeige grünen Dot und "Open and cooking"
        countdownDisplay.innerHTML = '<div class="open-status"><span class="open-dot"></span><span>Open and cooking.</span></div>';
        return;
    }
    
    // Restaurant ist geschlossen: Berechne nächste Öffnungszeit
    let nextOpening = new Date(now);
    let isClosedDay = false; // Sonntag oder Montag
    
    if (currentDay >= 2 && currentDay <= 6) {
        // Dienstag bis Samstag
        if (currentHour < 19) {
            if (currentHour >= 2) {
                // Nach 2 Uhr und vor 19 Uhr -> öffnet heute um 19 Uhr
                nextOpening.setHours(19, 0, 0, 0);
            } else {
                // Zwischen 0 und 2 Uhr, aber nicht während Öffnungszeit
                // Das sollte nicht vorkommen bei korrekter isOpen Logik
                nextOpening.setHours(19, 0, 0, 0);
            }
        } else {
            // Sollte nicht hier sein wenn isOpen korrekt ist
            if (currentDay === 6) {
                // Samstag nach 2 Uhr morgens -> nächster Dienstag
                const daysUntilTuesday = 3;
                nextOpening.setDate(nextOpening.getDate() + daysUntilTuesday);
                isClosedDay = true;
            } else {
                nextOpening.setDate(nextOpening.getDate() + 1);
            }
            nextOpening.setHours(19, 0, 0, 0);
        }
    } else if (currentDay === 0) {
        // Sonntag
        if (currentHour >= 2) {
            // Nach 2 Uhr -> nächster Dienstag
            nextOpening.setDate(nextOpening.getDate() + 2);
            nextOpening.setHours(19, 0, 0, 0);
            isClosedDay = true;
        }
    } else {
        // Montag -> morgen (Dienstag)
        nextOpening.setDate(nextOpening.getDate() + 1);
        nextOpening.setHours(19, 0, 0, 0);
        isClosedDay = true;
    }
    
    // Calculate difference mit Sekunden
    const diff = nextOpening - now;
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (countdownDisplay) {
        if (isClosedDay) {
            // Sonntag oder Montag
            countdownDisplay.innerHTML = `Opens on Tuesday in ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds.`;
        } else {
            // Dienstag-Samstag (geschlossen vor 19 Uhr)
            countdownDisplay.innerHTML = `Opens in ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds.`;
        }
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
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const successMsg = document.getElementById('newsletter-success');
    const errorMsg = document.getElementById('newsletter-error');
    
    // Hide previous messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.style.display = 'block';
        return false;
    }
    
    // TODO: Replace with actual newsletter service integration (Mailchimp, Brevo, etc.)
    // For now, show success message
    emailInput.value = '';
    successMsg.style.display = 'block';
    
    // Optional: Send to backend or newsletter service
    // Example for Mailchimp or similar:
    /*
    fetch('YOUR_NEWSLETTER_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        successMsg.style.display = 'block';
        emailInput.value = '';
    })
    .catch(error => {
        errorMsg.textContent = 'An error occurred. Please try again.';
        errorMsg.style.display = 'block';
    });
    */
    
    return false;
}
