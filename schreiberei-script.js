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
function updateCountdown() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, 2=Tue...6=Sat
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;

    const countdownDisplay = document.getElementById('countdown-display');
    if (!countdownDisplay) return;

    // Sunday (0) or Monday (1): closed all day
    if (day === 0 || day === 1) {
        // Different message depending on day
        if (day === 0) {
            countdownDisplay.innerHTML = '<span>Ruhetag. Morgen auch. Ab Dienstag wieder.</span>';
        } else {
            countdownDisplay.innerHTML = '<span>Ruhetag. Morgen ab 17 Uhr wieder da.</span>';
        }
        return;
    }

    // Saturday (6): opens at 13:00
    if (day === 6) {
        if (time >= 13 || time < 1) {
            countdownDisplay.innerHTML = '<div class="open-status"><span class="open-dot"></span><span>Wir sind da. Kommt vorbei.</span></div>';
        } else if (time >= 1 && time < 10) {
            countdownDisplay.innerHTML = '<span>Noch geschlossen. Samstags ab 13 Uhr.</span>';
        } else if (time >= 10 && time < 11) {
            countdownDisplay.innerHTML = '<span>Der Markt wird gerade leergeräumt.</span>';
        } else if (time >= 11 && time < 12.5) {
            countdownDisplay.innerHTML = '<span>In der Küche wird schon geschnippelt.</span>';
        } else if (time >= 12.5 && time < 13) {
            countdownDisplay.innerHTML = '<span>Gleich geht\u2019s los.</span>';
        }
        return;
    }

    // Tuesday (2) – Friday (5): opens at 17:00
    if (time >= 17 || time < 1) {
        countdownDisplay.innerHTML = '<div class="open-status"><span class="open-dot"></span><span>Wir sind da. Kommt vorbei.</span></div>';
    } else if (time >= 1 && time < 10) {
        countdownDisplay.innerHTML = '<span>Noch geschlossen. Ab 17 Uhr wieder.</span>';
    } else if (time >= 10 && time < 13) {
        countdownDisplay.innerHTML = '<span>Der Markt wird gerade leergeräumt.</span>';
    } else if (time >= 13 && time < 16) {
        countdownDisplay.innerHTML = '<span>In der Küche wird schon geschnippelt.</span>';
    } else if (time >= 16 && time < 16.75) {
        countdownDisplay.innerHTML = '<span>Das Team trudelt ein.</span>';
    } else if (time >= 16.75 && time < 17) {
        countdownDisplay.innerHTML = '<span>Gleich geht\u2019s los.</span>';
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

function handlePageNavigation() {
    if (isAnimating) return;
    if (!homeSection || !reserveSection) return;

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

    requestAnimationFrame(() => {
        if (isPageSection) {
            isAnimating = true;

            homeSection.classList.add('slide-up');
            homeSection.classList.remove('slide-in-from-top');

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

            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';

            setTimeout(() => {
                isAnimating = false;
            }, 800);
        } else {
            isAnimating = true;

            reserveSection.classList.add('slide-down');
            reserveSection.classList.remove('active');

            pageSections.forEach(section => {
                section.classList.add('slide-down');
                section.classList.remove('active');
                section.scrollTop = 0;
            });

            homeSection.classList.remove('slide-up');
            homeSection.classList.add('slide-in-from-top');

            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';

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
const heroSlider = {
    slides: document.querySelectorAll('.hero-image-slide'),
    currentIndex: 0,
    intervalId: null,
    slideDuration: 6000,
    fadeDuration: 1800,

    init() {
        if (!this.slides.length) return;

        let imagesLoaded = 0;
        this.slides.forEach((slide) => {
            if (slide.complete) {
                imagesLoaded++;
            } else {
                slide.addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === this.slides.length) {
                        this.startAutoplay();
                    }
                });
                slide.addEventListener('error', () => {
                    slide.style.display = 'none';
                });
            }
        });

        if (imagesLoaded === this.slides.length) {
            this.startAutoplay();
        }
    },

    nextSlide() {
        if (!this.slides.length) return;

        const currentSlide = this.slides[this.currentIndex];
        if (!currentSlide) return;

        currentSlide.classList.add('fade-out');

        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        const nextSlide = this.slides[nextIndex];
        if (!nextSlide) return;

        setTimeout(() => {
            currentSlide.classList.remove('active', 'fade-out');
            nextSlide.classList.add('active');
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
