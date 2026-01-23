# 🚀 Launch Checklist - Tohru Nakamura Website

**Datum:** 2026-01-23  
**Status:** Pre-Launch

---

## ✅ KRITISCH - Muss vor Launch erledigt werden

### 1. Zenchef/Formitable Integration
- [x] Widget-Script eingebunden
- [x] Links auf Formitable-Anker angepasst (`#ft-open`, `#ft-openShop-vouchers`)
- [ ] **Widget testen** - Funktioniert das Reservierungssystem?
- [ ] **Mobile Test** - Funktioniert auf Smartphones?
- [ ] **Cross-Browser Test** - Chrome, Safari, Firefox, Edge

### 2. Domain & Hosting
- [ ] Domain konfiguriert (`tohru-nakamura.de`)
- [ ] SSL-Zertifikat aktiviert (HTTPS)
- [ ] DNS-Einträge korrekt
- [ ] Website läuft auf Produktions-Server

### 3. Bilder & Assets
- [ ] Alle Bilder optimiert (WebP + Fallback)
- [ ] Favicon-Dateien vorhanden (`favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`)
- [ ] `site.webmanifest` vorhanden und korrekt
- [ ] Hero-Image lädt korrekt
- [ ] Origin-Bilder (`origin-image-1-optimized.jpg`, `origin-image-2-optimized.jpg`) vorhanden

### 4. Meta-Tags & SEO
- [ ] Open Graph Images auf **absolute URLs** ändern (nicht relativ!)
  ```html
  <!-- VORHER: -->
  <meta property="og:image" content="images/hero-image.png">
  
  <!-- NACHHER: -->
  <meta property="og:image" content="https://tohru-nakamura.de/images/hero-image.png">
  ```
- [ ] Canonical URL korrekt (`https://tohru-nakamura.de/`)
- [ ] Structured Data (Schema.org) testen mit [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] `robots.txt` vorhanden und korrekt
- [ ] `sitemap.xml` vorhanden und korrekt

### 5. Funktionalität
- [ ] Navigation funktioniert (Home → Reserve/Origin/Gift/Contact/Newsletter)
- [ ] Back-Buttons funktionieren
- [ ] Countdown/Öffnungszeiten-Anzeige funktioniert
- [ ] Datum/Zeit-Anzeige funktioniert
- [ ] Alle Links funktionieren (Email, Telefon, Maps)
- [ ] Mobile Navigation funktioniert

---

## 🟡 WICHTIG - Sollte vor Launch erledigt werden

### 6. Performance
- [ ] **Lighthouse Test durchführen** (Ziel: >90 Score)
  - Öffne Chrome DevTools → Lighthouse → Generate Report
- [ ] Bilder komprimiert (WebP Format)
- [ ] CSS/JS minifiziert (für Production)
- [ ] Font-Loading optimiert (`font-display: swap` ✅ bereits implementiert)

### 7. Accessibility
- [ ] **WCAG 2.1 AA Test** durchführen
- [ ] Keyboard-Navigation funktioniert (Tab-Order)
- [ ] Screen Reader Test (VoiceOver/NVDA)
- [ ] Kontrast-Verhältnisse prüfen
- [ ] Alt-Texte für alle Bilder vorhanden

### 8. Cross-Browser Testing
- [ ] Chrome (Desktop + Mobile)
- [ ] Safari (Desktop + iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet (Android)

### 9. Mobile Testing
- [ ] iPhone (verschiedene Größen)
- [ ] Android (verschiedene Größen)
- [ ] Tablet (iPad, Android Tablet)
- [ ] Touch-Gesten funktionieren
- [ ] Keine horizontalen Scrollbars

---

## 🟢 OPTIONAL - Kann nach Launch optimiert werden

### 10. Analytics & Monitoring
- [ ] Google Analytics einrichten (falls gewünscht)
- [ ] Error-Tracking (z.B. Sentry)
- [ ] Performance-Monitoring

### 11. Content Review
- [ ] Alle Texte auf Rechtschreibung prüfen
- [ ] Öffnungszeiten korrekt
- [ ] Kontaktdaten korrekt
- [ ] Preise aktuell

### 12. Social Media
- [ ] Open Graph Tags testen (Facebook Debugger, Twitter Card Validator)
- [ ] Social Media Preview-Bilder optimiert

---

## 📋 Quick-Check vor Launch

### Letzte 5 Minuten Check:
1. ✅ Website lädt schnell (< 2 Sekunden)
2. ✅ Keine Console-Errors (F12 → Console)
3. ✅ Reservierungssystem öffnet sich
4. ✅ Mobile Ansicht funktioniert
5. ✅ Alle Links funktionieren

---

## 🔧 Technische Details

### Formitable/Zenchef Widget
```html
<!-- Widget Container -->
<div class="ft-widget-b2"
     data-restaurant="0b624972"
     data-open="false"
     data-open-mobile="false"
     data-color="#d4af37"
     data-language="de"
     data-tag="tohru-website">
</div>
```

**Wichtig:** 
- `data-restaurant="0b624972"` muss korrekt sein
- `data-color="#d4af37"` passt zum Design (Gold)
- Widget muss getestet werden!

### Kritische URLs die angepasst werden müssen:
1. **Open Graph Images:** `images/hero-image.png` → `https://tohru-nakamura.de/images/hero-image.png`
2. **Twitter Image:** `images/hero-image.png` → `https://tohru-nakamura.de/images/hero-image.png`
3. **Schema.org Image:** `https://tohru-nakamura.de/images/hero-image.png` ✅ bereits korrekt

---

## 🚨 Häufige Launch-Probleme

### Problem 1: Bilder laden nicht
**Lösung:** Relative Pfade prüfen, absolute URLs verwenden

### Problem 2: Widget öffnet sich nicht
**Lösung:** 
- Formitable Script lädt?
- Restaurant-ID korrekt?
- Console-Errors prüfen

### Problem 3: Mobile sieht komisch aus
**Lösung:** 
- Viewport Meta-Tag vorhanden? ✅
- Responsive CSS aktiv?
- Touch-Events funktionieren?

---

## ✅ Launch-Ready Checklist

Wenn alle Punkte in **KRITISCH** erledigt sind:
- [ ] Domain funktioniert
- [ ] HTTPS aktiv
- [ ] Widget getestet
- [ ] Bilder laden
- [ ] Navigation funktioniert
- [ ] Mobile getestet
- [ ] Keine Console-Errors

**→ Dann kannst du freigeben! 🚀**

---

## 📞 Support-Kontakte

Bei Problemen:
- **Formitable Support:** support@formitable.com
- **Hosting Support:** [Dein Hosting-Provider]

---

**Letzte Aktualisierung:** 2026-01-23  
**Nächste Review:** Nach Launch
