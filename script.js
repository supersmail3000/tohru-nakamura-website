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

// Only update the status line when its content actually changes —
// rewriting it every second restarted the open-dot pulse animation
function setStatus(el, html) {
    if (el.dataset.status === html) return;
    el.dataset.status = html;
    el.innerHTML = html;
}

function updateCountdown() {
    const now = new Date();
    const day = now.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;

    const countdownDisplay = document.getElementById('countdown-display');
    if (!countdownDisplay) return;

    // Local date keys, e.g. '2026-12-24'
    const dateKey = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const todayKey = dateKey(now);
    const tomorrowKey = dateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));

    // Closure periods — creative breaks and holidays (optional custom message)
    const closures = [
        { start: new Date(2026, 11, 24), end: new Date(2026, 11, 27), message: 'With our families for the holidays — we reopen on December 28.' }
    ];
    for (const c of closures) {
        if (now >= c.start && now < new Date(c.end.getTime() + 86400000)) {
            setStatus(countdownDisplay, '<span>' + (c.message || 'Creative break — we reopen on ' + c.reopen + '.') + '</span>');
            return;
        }
    }

    // Year-end 2026: Mondays with dinner service, and days with lunch instead of dinner
    const extraOpenDays = ['2026-12-21', '2026-12-28'];
    const lunchDays = ['2026-12-23', '2026-12-31'];

    if (lunchDays.includes(todayKey)) {
        if (time < 12.5) {
            setStatus(countdownDisplay, '<span>Lunch service starts at 12:30 p.m.</span>');
        } else if (time < 16) {
            setStatus(countdownDisplay, '<div class="open-status"><span class="open-dot"></span><span>Lunch service is underway.</span></div>');
        } else {
            setStatus(countdownDisplay, '<span>The kitchen is resting.</span>');
        }
        return;
    }

    // Sunday (0) or Monday (1): closed all day, unless it is an extra open day
    if ((day === 0 || day === 1) && !extraOpenDays.includes(todayKey)) {
        setStatus(countdownDisplay, extraOpenDays.includes(tomorrowKey) ? '<span>We reopen on Monday evening.</span>' : '<span>We reopen on Tuesday evening.</span>');
        return;
    }

    // Tuesday (2) - Saturday (6): schedule based on time
    if (time >= 19 && time < 23) {
        setStatus(countdownDisplay, '<div class="open-status"><span class="open-dot"></span><span>Dinner service is underway.</span></div>');
    } else if (time >= 1 && time < 9) {
        setStatus(countdownDisplay, '<span>The kitchen is resting.</span>');
    } else if (time >= 9 && time < 13) {
        setStatus(countdownDisplay, '<span>Sourcing the finest ingredients.</span>');
    } else if (time >= 13 && time < 18) {
        setStatus(countdownDisplay, '<span>Preparing for tonight\'s service.</span>');
    } else if (time >= 18 && time < 18.75) {
        setStatus(countdownDisplay, '<span>The team is gathering for family meal.</span>');
    } else if (time >= 18.75 && time < 19) {
        setStatus(countdownDisplay, '<span>Final preparations before service.</span>');
    } else if (time >= 23 || time < 1) {
        setStatus(countdownDisplay, '<span>Winding down for the evening.</span>');
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
let pendingNavigation = false;
let isInitialLoad = true;
const TRANSITION_MS = 1000; // matches the 1s section slide in CSS
// The content stagger starts once the panel is mostly in view, not while it
// is still travelling in from below (no delay for reduced motion)
const REVEAL_DELAY_MS = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;
let revealTimer = null;

// Null checks for critical elements
if (!homeSection) {
    // Critical element missing - fail silently in production
}
if (!reserveSection) {
    // Critical element missing - fail silently in production
}

function handlePageNavigation() {
    if (!homeSection || !reserveSection) return;

    // A hash change during a running transition is queued, not dropped —
    // otherwise URL and visible section get out of sync (e.g. fast back button)
    if (isAnimating) {
        pendingNavigation = true;
        return;
    }

    const hash = window.location.hash;
    const isPageSection = hash && (hash === '#reserve' || hash === '#menu' || hash === '#events' || hash === '#origin' || hash === '#gift' || hash === '#contact' || hash === '#newsletter' || hash === '#impressum' || hash === '#datenschutz');

    // Update document title based on active section
    var sectionTitles = {
        '#reserve': 'Reserve a Table — Tohru',
        '#menu': 'Menu — Tohru',
        '#origin': 'Origin — Tohru',
        '#events': 'Events — Tohru',
        '#gift': 'Gift Voucher — Tohru',
        '#contact': 'Contact — Tohru',
        '#newsletter': 'Newsletter — Tohru',
        '#impressum': 'Legal Notice — Tohru',
        '#datenschutz': 'Privacy Policy — Tohru'
    };
    document.title = sectionTitles[hash] || 'Tohru — 3-starred Michelin Restaurant in Munich by Tohru Nakamura';

    const initialLoad = isInitialLoad;
    isInitialLoad = false;

    requestAnimationFrame(() => {
        isAnimating = true;
        const allSections = [reserveSection, ...pageSections];

        if (isPageSection) {
            // Home slides up, target section slides up from the bottom
            homeSection.classList.add('slide-up');
            homeSection.classList.remove('slide-in-from-top');

            allSections.forEach(section => {
                const isTarget = ('#' + section.id) === hash;
                if (isTarget) {
                    // Content stays hidden while the panel slides in, then the
                    // reveal restarts for this section
                    section.classList.remove('animate-in');
                    section.classList.add('active');
                    section.classList.remove('slide-down');
                    clearTimeout(revealTimer);
                    revealTimer = setTimeout(() => {
                        if (section.classList.contains('active')) {
                            section.classList.add('animate-in');
                        }
                    }, REVEAL_DELAY_MS);
                } else {
                    section.classList.remove('active');
                    section.classList.add('slide-down');
                }
            });

            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        } else {
            // All sections slide down, Home slides in from the top
            allSections.forEach(section => {
                section.classList.add('slide-down');
                section.classList.remove('active');
            });

            homeSection.classList.remove('slide-up');
            // On first load the curtain intro reveals Home — no extra slide-in
            if (!initialLoad) homeSection.classList.add('slide-in-from-top');

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        }

        setTimeout(() => {
            homeSection.classList.remove('slide-in-from-top');
            // Tidy up closed sections only once they are off-screen
            // (no visible scroll jump or content flash while sliding down)
            allSections.forEach(section => {
                if (!section.classList.contains('active')) {
                    section.classList.remove('animate-in');
                    section.scrollTop = 0;
                }
            });
            isAnimating = false;
            if (pendingNavigation) {
                pendingNavigation = false;
                handlePageNavigation();
            }
        }, (initialLoad && !isPageSection) ? 0 : TRANSITION_MS); // nothing moves on a plain first load
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
        window.location.hash = '#home';
    });
});

// ESC key to navigate back to home
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.location.hash && window.location.hash !== '#home') {
        window.location.hash = '#home';
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
// 6s per image, 1.8s true crossfade (incoming fades in on top of the outgoing
// image), Ken Burns zoom. Pauses in background tabs; off for reduced motion.
const heroSlider = {
    slides: document.querySelectorAll('.hero-image-slide'),
    currentIndex: 0,
    intervalId: null,
    slideDuration: 6000,
    fadeDuration: 1800,

    init() {
        if (this.slides.length < 2) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let settled = 0;
        const onSettled = () => {
            settled++;
            if (settled === this.slides.length) this.start();
        };
        this.slides.forEach(slide => {
            if (slide.complete) {
                settled++;
            } else {
                slide.addEventListener('load', onSettled, { once: true });
                slide.addEventListener('error', () => {
                    slide.style.display = 'none';
                    onSettled();
                }, { once: true });
            }
        });
        if (settled === this.slides.length) this.start();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.stop(); else this.start();
        });
    },

    nextSlide() {
        const current = this.slides[this.currentIndex];
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        const next = this.slides[nextIndex];
        if (!current || !next) return;

        // Outgoing stays visible underneath (zoom keeps running),
        // incoming fades in on top
        this.slides.forEach(s => s.classList.remove('prev'));
        current.classList.remove('active');
        current.classList.add('prev');
        next.classList.add('active');
        this.currentIndex = nextIndex;

        setTimeout(() => current.classList.remove('prev'), this.fadeDuration);
    },

    start() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            requestAnimationFrame(() => this.nextSlide());
        }, this.slideDuration);
    },

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
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

// ===== PAST EVENT FILTER =====
// Automatically hides events whose date has passed.
// Each .event-date element needs a data-date="YYYY-MM-DD" attribute.
// Season labels (.season-label) are hidden when all their following events are gone.
(function() {
    var today = new Date();
    today.setHours(23, 59, 59, 999); // Keep visible until end of event day

    var eventDates = document.querySelectorAll('.event-date[data-date]');
    eventDates.forEach(function(el) {
        var dateStr = el.getAttribute('data-date');
        if (!dateStr) return;
        var eventDate = new Date(dateStr + 'T23:59:59');
        if (eventDate < today) {
            el.style.display = 'none';
        }
    });

    // Hide season labels that have no visible events after them
    var seasonLabels = document.querySelectorAll('.season-label');
    seasonLabels.forEach(function(label) {
        var hasVisibleEvent = false;
        var sibling = label.nextElementSibling;
        while (sibling) {
            // Stop at the next season label or non-event-date element that isn't an event
            if (sibling.classList.contains('season-label')) break;
            if (sibling.classList.contains('event-date') && sibling.style.display !== 'none') {
                hasVisibleEvent = true;
                break;
            }
            sibling = sibling.nextElementSibling;
        }
        if (!hasVisibleEvent) {
            label.style.display = 'none';
        }
    });
})();
