# Code Review & Verbesserungsvorschläge

**Datum:** 2026-01-23  
**Reviewer:** CTO  
**Status:** 🔴 Kritisch | 🟡 Wichtig | 🟢 Optional

---

## 🔴 Kritische Probleme

### 1. HTML - SVG Syntaxfehler
**Datei:** `index.html` Zeile 336  
**Problem:** 
```html
<!-- FALSCH -->
<path fill="white" d="M1.7,28.1c0-16.5,11.9-24.9,25.6-24.9c11.4,0,12.9,4.6,20.5,4.6C54.4,7.8,56.4,1,60,1s5.6,6.8,12.2,6.8c7.6,0,9.1-4.6,20.5-4.6c13.7,0,25.6,8.4,25.6,24.9V135c0,2.2-1.8,4-4=4H5.7c-2.2,0-4-1.8-4-4V28.1z"/>

<!-- RICHTIG -->
<path fill="white" d="M1.7,28.1c0-16.5,11.9-24.9,25.6-24.9c11.4,0,12.9,4.6,20.5,4.6C54.4,7.8,56.4,1,60,1s5.6,6.8,12.2,6.8c7.6,0,9.1-4.6,20.5-4.6c13.7,0,25.6,8.4,25.6,24.9V135c0,2.2-1.8,4-4,4H5.7c-2.2,0-4-1.8-4-4V28.1z"/>
```
**Lösung:** `4=4H5.7` → `4,4H5.7`

### 2. JavaScript - Nicht existierendes Element
**Datei:** `script.js` Zeile 236  
**Problem:** 
```javascript
const heroImage = document.querySelector('.hero-image'); // Element existiert nicht!
```
**Lösung:** Entweder Element hinzufügen oder Code entfernen/anpassen

### 3. CSS - Doppelte Transform Deklaration
**Datei:** `styles.css` Zeile 264  
**Problem:** 
```css
.home-section {
    transform: translate3d(0, 0, 0);  /* Zeile 264 */
    /* ... */
    transform: translate3d(0, 0, 0);  /* Zeile 264 - Duplikat */
}
```
**Lösung:** Eine Deklaration entfernen

---

## 🟡 Wichtige Verbesserungen

### HTML Verbesserungen

#### 1. Semantische Struktur
```html
<!-- FEHLT: Main Landmark -->
<main id="main-content">
    <!-- Alle Sections hier -->
</main>
```

#### 2. Open Graph Images - Absolute URLs
**Problem:** Relative URLs funktionieren nicht in Social Media  
**Lösung:**
```html
<!-- VORHER -->
<meta property="og:image" content="images/hero-image.png">

<!-- NACHHER -->
<meta property="og:image" content="https://tohru-nakamura.de/images/hero-image.png">
```

#### 3. Alt-Text für Bilder
**Problem:** Einige Bilder haben generische Alt-Texte  
**Lösung:** Spezifischere, beschreibende Alt-Texte:
```html
<!-- VORHER -->
<img src="images/origin-image-1-optimized.jpg" alt="Tohru Restaurant">

<!-- NACHHER -->
<img src="images/origin-image-1-optimized.jpg" alt="Tohru in der Schreiberei Restaurant Interior - Historic building in Munich">
```

#### 4. Skip Link Ziel
**Problem:** Skip-Link führt zu `#home`, sollte zu `main` führen  
**Lösung:**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

#### 5. ARIA Labels
**Problem:** Back-Buttons haben Labels, aber Navigation fehlt `aria-current`  
**Lösung:**
```html
<nav class="home-navigation" aria-label="Main navigation">
    <a href="#reserve" class="nav-item" aria-current="page">Reserve</a>
</nav>
```

### CSS Verbesserungen

#### 1. Unbenutzte CSS entfernen
**Problem:** Viele ungenutzte Klassen (`.hero`, `.hero-content`, `.section`, etc.)  
**Lösung:** CSS aufräumen - ungenutzte Styles entfernen (ca. 200+ Zeilen)

#### 2. CSS Containment für Performance
**Lösung:**
```css
.home-section,
.reserve-section,
.page-section {
    contain: layout style paint;
}
```

#### 3. Font-Display Optimierung
**Problem:** Fonts blockieren Rendering  
**Lösung:**
```html
<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```
✅ Bereits implementiert!

#### 4. Will-Change Cleanup
**Problem:** `will-change` bleibt nach Animationen aktiv  
**Lösung:** JavaScript hinzufügen, um `will-change` nach Animationen zu entfernen:
```javascript
// Nach Animationen
element.style.willChange = 'auto';
```

#### 5. Doppelte Media Queries zusammenführen
**Problem:** Media Queries für `@media (max-width: 768px)` und `@media (max-width: 480px)` sind doppelt  
**Lösung:** Zusammenführen und organisieren

### JavaScript Verbesserungen

#### 1. Magic Numbers eliminieren
**Problem:** Hardcoded Werte im Code  
**Lösung:**
```javascript
// VORHER
setTimeout(() => {
    isAnimating = false;
}, 800);

// NACHHER
const ANIMATION_DURATION = 800; // ms
setTimeout(() => {
    isAnimating = false;
}, ANIMATION_DURATION);
```

#### 2. Countdown-Logik vereinfachen
**Problem:** Komplexe, verschachtelte if-else Logik  
**Lösung:** Refactoring mit klarerer Struktur:
```javascript
const OPENING_HOURS = {
    tuesday: { open: 19, close: 2 },
    wednesday: { open: 19, close: 2 },
    // ...
};

function isRestaurantOpen(day, hour) {
    // Klarere Logik
}
```

#### 3. Error Handling
**Problem:** Keine Fehlerbehandlung  
**Lösung:**
```javascript
function updateDateTime() {
    try {
        const now = new Date();
        // ... rest of code
    } catch (error) {
        console.error('Error updating date/time:', error);
        // Fallback
    }
}
```

#### 4. Event Listener Cleanup
**Problem:** Event Listener werden nie entfernt  
**Lösung:** Cleanup-Funktionen für Single-Page-App:
```javascript
function cleanup() {
    // Remove event listeners
    window.removeEventListener('scroll', updateParallax);
}
```

#### 5. Null-Checks verbessern
**Problem:** Einige Null-Checks fehlen  
**Lösung:**
```javascript
const homeSection = document.querySelector('.home-section');
if (!homeSection) {
    console.error('Home section not found');
    return;
}
```

---

## 🟢 Optionale Optimierungen

### Performance

#### 1. Bilder optimieren
- **WebP Format** mit Fallback
- **Lazy Loading** für alle Bilder (bereits teilweise implementiert)
- **Responsive Images** mit `srcset`

```html
<picture>
    <source srcset="images/hero-image.webp" type="image/webp">
    <img src="images/hero-image.png" alt="Tohru Nakamura Restaurant">
</picture>
```

#### 2. Resource Hints
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="prefetch" href="images/origin-image-1-optimized.jpg">
```

#### 3. CSS Minification
- Production Build sollte minifiziertes CSS haben
- Unused CSS entfernen (PurgeCSS)

#### 4. JavaScript Bundle
- Code-Splitting für größere Features
- Module Pattern für bessere Organisation

### SEO

#### 1. Structured Data erweitern
- **BreadcrumbList** hinzufügen
- **LocalBusiness** Schema erweitern
- **Review** Schema (falls vorhanden)

#### 2. Meta Keywords entfernen
**Problem:** Meta Keywords werden von Google ignoriert  
**Lösung:** Entfernen (Zeile 7 in index.html)

#### 3. Canonical URL
✅ Bereits implementiert!

### Accessibility

#### 1. Focus Management
```javascript
// Focus trap für modale Sections
function trapFocus(element) {
    // Implementierung
}
```

#### 2. Keyboard Navigation
- Tab-Order überprüfen
- Escape-Taste für Navigation zurück

#### 3. Screen Reader Optimierung
```html
<div role="status" aria-live="polite" aria-atomic="true">
    <span id="countdown-display"></span>
</div>
```

### Code-Organisation

#### 1. JavaScript Module
```javascript
// utils/dateTime.js
export function updateDateTime() { }

// utils/countdown.js
export function updateCountdown() { }

// navigation/pageNavigation.js
export function handlePageNavigation() { }
```

#### 2. CSS Organisation
- BEM Naming Convention
- CSS Variables besser strukturieren
- Separate Dateien für: base, components, layout, utilities

#### 3. Kommentare
- JSDoc für Funktionen
- Komplexe Logik erklären

---

## Priorisierte To-Do Liste

### Sofort (🔴 Kritisch)
1. ✅ SVG Syntaxfehler beheben
2. ✅ Nicht existierendes `.hero-image` Element fixen
3. ✅ Doppelte CSS Transform Deklaration entfernen

### Diese Woche (🟡 Wichtig)
1. ✅ Unbenutzte CSS entfernen (~200 Zeilen)
2. ✅ Open Graph Images auf absolute URLs ändern
3. ✅ Magic Numbers in Konstanten auslagern
4. ✅ Error Handling hinzufügen
5. ✅ Alt-Texte verbessern

### Nächste Iteration (🟢 Optional)
1. ✅ Bilder auf WebP umstellen
2. ✅ CSS/JS Module organisieren
3. ✅ Structured Data erweitern
4. ✅ Performance-Monitoring einrichten

---

## Metriken & Ziele

### Aktuelle Performance (geschätzt)
- **Lighthouse Score:** ~85-90
- **First Contentful Paint:** ~1.2s
- **Time to Interactive:** ~2.8s
- **Bundle Size:** ~15KB (JS) + ~20KB (CSS)

### Ziel-Performance
- **Lighthouse Score:** >95
- **First Contentful Paint:** <1.0s
- **Time to Interactive:** <2.5s
- **Bundle Size:** <10KB (JS) + <15KB (CSS) nach Minification

---

## Code-Qualität Checkliste

- [ ] Keine Console Errors
- [ ] Alle Bilder haben Alt-Texte
- [ ] Alle Links haben `rel="noopener noreferrer"` (✅ bereits implementiert)
- [ ] Semantisches HTML
- [ ] ARIA Labels wo nötig
- [ ] Keyboard Navigation funktioniert
- [ ] Mobile Responsive
- [ ] Cross-Browser getestet
- [ ] Performance optimiert
- [ ] SEO optimiert

---

**Nächste Schritte:**  
1. Kritische Probleme zuerst beheben
2. Wichtige Verbesserungen implementieren
3. Optionale Optimierungen in nächster Iteration

**Review-Datum:** 2026-01-23  
**Nächste Review:** Nach Implementierung der kritischen Fixes
