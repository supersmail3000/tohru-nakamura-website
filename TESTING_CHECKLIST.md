# 🧪 Tohru Website - Testing Checklist

**Dev Server:** http://localhost:8000  
**Status:** ✅ Server läuft!

---

## 🖥️ DESKTOP TESTING

### Chrome/Edge
- [ ] Homepage lädt (Hero Slider funktioniert)
- [ ] Navigation: Reserve, Origin, Vouchers, Contact, Newsletter
- [ ] Zenchef Widget öffnet sich (Reserve Button)
- [ ] Gift Voucher Widget öffnet sich
- [ ] Footer Links: Impressum, Datenschutz
- [ ] Alle Animationen smooth
- [ ] Favicon sichtbar im Tab
- [ ] Keine Console Errors (F12 → Console)

### Safari
- [ ] Homepage lädt
- [ ] Alle Sections funktionieren
- [ ] Zenchef Widget funktioniert
- [ ] Back-Button von Sections zu Home
- [ ] Favicon sichtbar

### Firefox
- [ ] Homepage lädt
- [ ] Navigation funktioniert
- [ ] Widget funktioniert
- [ ] Keine Errors

---

## 📱 MOBILE TESTING

### iPhone/iOS Safari
- [ ] Homepage lädt und sieht gut aus
- [ ] Hero Image centered
- [ ] Navigation stacked vertikal
- [ ] Footer 40px Abstand zur Navigation
- [ ] Zenchef Widget öffnet sich fullscreen
- [ ] Touch Navigation funktioniert
- [ ] Scrolling smooth
- [ ] Alle Sections erreichbar
- [ ] Back-Button funktioniert

### Android Chrome
- [ ] Homepage lädt
- [ ] Responsive Layout korrekt
- [ ] Widget funktioniert
- [ ] Navigation funktioniert

---

## ✨ FEATURES TESTING

### Hero Slider
- [ ] 5 Bilder rotieren automatisch (6s Interval)
- [ ] Ken Burns Effekt sichtbar (leichter Zoom)
- [ ] Fade-Transition smooth (1.8s)
- [ ] Logo & Michelin Stars über Bildern
- [ ] Kein Flackern zwischen Slides

### Navigation
- [ ] Home → Reserve (slide in)
- [ ] Home → Origin (slide in)
- [ ] Home → Vouchers (slide in)
- [ ] Home → Contact (slide in)
- [ ] Home → Newsletter (slide in)
- [ ] Back-Button → Home (slide out)
- [ ] Hash URLs funktionieren (#reserve, #origin, etc.)
- [ ] Hover-Effekte auf Links

### Zenchef Widget
- [ ] Reserve Button öffnet Widget
- [ ] Voucher Button öffnet Shop
- [ ] Widget hat korrekte Farben (Gold)
- [ ] Widget auf Deutsch
- [ ] Test-Reservierung möglich
- [ ] Widget schließt sich korrekt

### Footer
- [ ] Home Footer: 40px Abstand zu Navigation (Desktop)
- [ ] Home Footer: Sichtbar und centered
- [ ] Section Footer: Am unteren Rand (24px padding)
- [ ] Links: Impressum, Datenschutz, |
- [ ] Hover-Effekt: Underline animation
- [ ] Font: 12px (10px Mobile), 60% Opacity

### Legal Pages
- [ ] Impressum Section öffnet sich
- [ ] Datenschutz Section öffnet sich
- [ ] Content auf Englisch
- [ ] Fade-in Animation funktioniert
- [ ] Back-Button funktioniert
- [ ] Scrolling funktioniert

### Performance
- [ ] Erste Ladung < 3 Sekunden
- [ ] Smooth Scrolling
- [ ] Animationen flüssig (60fps)
- [ ] Keine Verzögerungen
- [ ] Bilder laden schnell

---

## 🔍 VISUAL QA

### Spacing (8px Grid)
- [ ] Abstände wirken konsistent
- [ ] Padding harmonisch
- [ ] Margins gleichmäßig
- [ ] Keine zu engen/weiten Abstände

### Colors
- [ ] Warm Black Background (#0e0c0a)
- [ ] Warm White Text (#faf8f6)
- [ ] Burgundy Buttons (#7d1a1a)
- [ ] Sage Green Dot (#8ba888)
- [ ] Keine Farbfehler

### Typography
- [ ] Work Sans Font lädt
- [ ] Text gut lesbar
- [ ] Line-height angenehm
- [ ] Keine Font-Größen-Sprünge

### Responsive Breakpoints
- [ ] Desktop (>768px): 3-spaltig gut
- [ ] Tablet (481-768px): 2-spaltig gut
- [ ] Mobile (≤480px): Stacked gut

---

## 🐛 BUG CHECKLIST

### Häufige Probleme
- [ ] Bilder laden vollständig (keine 404s)
- [ ] Favicon sichtbar
- [ ] Keine JavaScript Errors
- [ ] Zenchef SDK lädt korrekt
- [ ] Scrolling nicht blockiert
- [ ] Hover-States funktionieren
- [ ] Transitions nicht abgehackt

### Browser Console (F12)
- [ ] Keine Errors (rot)
- [ ] Keine wichtigen Warnings (gelb)
- [ ] Network Tab: Alle Assets 200 OK
- [ ] Performance: 60fps während Animationen

---

## 📸 SCREENSHOTS

Mache Screenshots von:
- [ ] Desktop Homepage
- [ ] Mobile Homepage
- [ ] Reserve Section (Desktop)
- [ ] Zenchef Widget geöffnet
- [ ] Footer (Home & Section)

---

## ✅ FINAL CHECK

Nach Testing:
- [ ] Alle kritischen Features funktionieren
- [ ] Keine Blocker-Bugs
- [ ] Performance gut
- [ ] Mobile & Desktop OK
- [ ] Bereit für Deployment

---

## 🚨 GEFUNDENE BUGS

### Bug Template:
```
Bug #1:
- Was: [Beschreibung]
- Wo: [Section/Page]
- Browser: [Chrome/Safari/etc.]
- Device: [Desktop/Mobile]
- Screenshot: [Link falls vorhanden]
```

---

**Testing Started:** [Zeit eintragen]  
**Testing Completed:** [Zeit eintragen]  
**Result:** [ ] Pass / [ ] Fail (mit Bugs)  

---

**Next Step:** Wenn alles funktioniert → Deployment! 🚀
