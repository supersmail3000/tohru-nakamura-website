// Dynamic Date/Time Display — same as Tohru
function updateDateTime() {
    const now = new Date();

    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const dayName = days[now.getDay()];

    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const monthName = months[now.getMonth()];
    const day = now.getDate();

    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const wrapDigits = str => str.split('').map(ch => /\d/.test(ch) ? `<span class="digit">${ch}</span>` : ch).join('');
    const timeStr = wrapDigits(h) + ':' + wrapDigits(m) + ':' + wrapDigits(s);
    const dateTimeString = `${dayName}, ${day}. ${monthName}, ${timeStr}, München`;

    const display = document.getElementById('datetime-display');
    if (display) {
        display.innerHTML = dateTimeString;
    }
}

// ===== COUNTDOWN / STATUS DISPLAY =====
// Bar Tatar opening hours:
// Di–Fr: 17:00 – 01:00 Uhr
// Sa: 13:00 – 01:00 Uhr
// So + Mo: geschlossen
// Only update the status line when its content actually changes —
// rewriting it every second restarted the open-dot pulse animation
function setStatus(el, html) {
    if (el.dataset.status === html) return;
    el.dataset.status = html;
    el.innerHTML = html;
}

function updateCountdown() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, 2=Tue...6=Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;

    const countdownDisplay = document.getElementById('countdown-display');
    if (!countdownDisplay) return;

    // Closure periods — creative breaks
    const closures = [
        { start: new Date(2026, 9, 11), end: new Date(2026, 9, 18), reopen: '19. Oktober' }
    ];
    for (const c of closures) {
        if (now >= c.start && now < new Date(c.end.getTime() + 86400000)) {
            setStatus(countdownDisplay, '<span>Kreativpause — wir sind ab dem ' + c.reopen + ' wieder da.</span>');
            return;
        }
    }

    // Sunday (0) or Monday (1): closed all day
    if (day === 0 || day === 1) {
        // Different message depending on day
        if (day === 0) {
            setStatus(countdownDisplay, '<span>Ruhetag. Morgen auch. Ab Dienstag wieder.</span>');
        } else {
            setStatus(countdownDisplay, '<span>Ruhetag. Morgen ab 17 Uhr wieder da.</span>');
        }
        return;
    }

    // Saturday (6): opens at 13:00
    if (day === 6) {
        if (time >= 13 || time < 1) {
            setStatus(countdownDisplay, '<div class="open-status"><span class="open-dot"></span><span>Wir sind da. Kommt vorbei.</span></div>');
        } else if (time >= 1 && time < 10) {
            setStatus(countdownDisplay, '<span>Noch geschlossen. Samstags ab 13 Uhr.</span>');
        } else if (time >= 10 && time < 11) {
            setStatus(countdownDisplay, '<span>Der Markt wird gerade leergeräumt.</span>');
        } else if (time >= 11 && time < 12.5) {
            setStatus(countdownDisplay, '<span>In der Küche wird schon geschnippelt.</span>');
        } else if (time >= 12.5 && time < 13) {
            setStatus(countdownDisplay, '<span>Gleich geht\u2019s los.</span>');
        }
        return;
    }

    // Tuesday (2) – Friday (5): opens at 17:00
    if (time >= 17 || time < 1) {
        setStatus(countdownDisplay, '<div class="open-status"><span class="open-dot"></span><span>Wir sind da. Kommt vorbei.</span></div>');
    } else if (time >= 1 && time < 10) {
        setStatus(countdownDisplay, '<span>Noch geschlossen. Ab 17 Uhr wieder.</span>');
    } else if (time >= 10 && time < 13) {
        setStatus(countdownDisplay, '<span>Der Markt wird gerade leergeräumt.</span>');
    } else if (time >= 13 && time < 16) {
        setStatus(countdownDisplay, '<span>In der Küche wird schon geschnippelt.</span>');
    } else if (time >= 16 && time < 16.75) {
        setStatus(countdownDisplay, '<span>Das Team trudelt ein.</span>');
    } else if (time >= 16.75 && time < 17) {
        setStatus(countdownDisplay, '<span>Gleich geht\u2019s los.</span>');
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
        '#reserve': 'Reservieren — Bar Tatar',
        '#menu': 'Speisekarte — Bar Tatar',
        '#origin': 'Story — Bar Tatar',
        '#events': 'Events — Bar Tatar',
        '#gift': 'Gutschein — Bar Tatar',
        '#contact': 'Kontakt — Bar Tatar',
        '#newsletter': 'Newsletter — Bar Tatar',
        '#impressum': 'Impressum — Bar Tatar',
        '#datenschutz': 'Datenschutz — Bar Tatar'
    };
    document.title = sectionTitles[hash] || 'Bar Tatar — Tatar & Drinks in der Schreiberei München';

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
                    // Restart the content reveal for this section
                    section.classList.remove('animate-in');
                    void section.offsetWidth;
                    section.classList.add('animate-in');
                    section.classList.add('active');
                    section.classList.remove('slide-down');
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

// Image Loading Handler
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
            img.style.display = 'none';
            const parent = img.closest('.page-image');
            if (parent) {
                parent.style.minHeight = '400px';
                parent.style.backgroundColor = 'rgba(0,0,0,0.1)';
            }
        });
    }
});

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

function initHeroSlider() {
    try {
        heroSlider.init();
    } catch (error) {
        // fail silently
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
    initHeroSlider();
}
