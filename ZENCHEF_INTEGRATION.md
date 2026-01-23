# Zenchef/Formitable Widget Integration - Implementierungsplan

**Restaurant ID:** `0b624972`  
**Dokumentation:** https://formitable.com/nl/developers/widget?uid=0b624972  
**Status:** Ready to implement

---

## 📋 ÜBERSICHT

Zenchef (ehemals Formitable) bietet ein Widget für Online-Reservierungen. Das Widget wird in die Website eingebettet und öffnet sich als Overlay.

### Was das Widget kann:
- ✅ Online-Reservierungen
- ✅ Gift Vouchers (Gutscheine)
- ✅ Takeaway-Bestellungen (falls aktiviert)
- ✅ Event-Tickets (falls aktiviert)
- ✅ Tracking & Analytics Integration
- ✅ Multi-Language Support (DE, EN, NL, etc.)

---

## 🎯 INTEGRATION OPTIONEN

### **Option 1: Button-triggered Widget** (Empfohlen!)
- Widget öffnet sich nur wenn User auf "Reserve a table" klickt
- Beste User Experience
- Kein Auto-Open beim Seitenaufruf

### **Option 2: Auto-Open Widget**
- Widget öffnet sich automatisch nach X Sekunden
- Kann aggressiv wirken
- **Nicht empfohlen** für Fine Dining

### **Option 3: Toolbar Widget**
- Permanenter Button am Bildschirmrand
- Widget öffnet sich bei Klick
- Alternative zu Button-Trigger

**→ Wir implementieren Option 1!**

---

## 🛠️ IMPLEMENTIERUNG - SCHRITT FÜR SCHRITT

### Schritt 1: Zenchef SDK Script einbinden

**Wo:** Im `<head>` oder vor dem schließenden `</body>` Tag in `index.html`

```html
<!-- Zenchef/Formitable Widget SDK -->
<script>
(function (d, s, id, h) {
    var ftjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    var js = d.createElement(s);
    js.id = id;
    js.src = "https://cdn.formitable.com/sdk/v1/ft.sdk.min.js";
    h && (js.onload = h);
    ftjs.parentNode.insertBefore(js, ftjs);
}(document, 'script', 'formitable-sdk', function () {
    FT.load('analytics'); // Analytics Modul aktivieren
}));
</script>
```

**Position:** Vor dem schließenden `</body>` Tag (nach script.js)

---

### Schritt 2: Widget Container hinzufügen

**Wo:** Im `<body>` von `index.html`, am besten ganz am Ende vor `</body>`

```html
<!-- Zenchef Widget Container -->
<div class="ft-widget-b2"
     data-restaurant="0b624972"
     data-open="false"
     data-open-mobile="false"
     data-color="#d4af37"
     data-language="de"
     data-tag="tohru-website"
     data-toolbar="false"
     data-toolbar-mobile="false">
</div>
```

**Konfiguration Erklärung:**
- `data-restaurant="0b624972"` → Restaurant ID (aus URL)
- `data-open="false"` → Nicht automatisch öffnen
- `data-color="#d4af37"` → Gold-Akzent (passend zum Design)
- `data-language="de"` → Deutsch als Standard
- `data-tag="tohru-website"` → Tracking-Tag für Analytics
- `data-toolbar="false"` → Kein Toolbar (wir nutzen Button)

---

### Schritt 3: Button-Link aktualisieren

**Wo:** Reserve Section in `index.html`

**Aktuell:**
```html
<a href="https://schreiberei-muc.de/reservierungen" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="reserve-button">
   Reserve a table
</a>
```

**NEU (Option A - Anchor Link):**
```html
<a href="#ft-open" 
   class="reserve-button">
   Reserve a table
</a>
```

**NEU (Option B - JavaScript):**
```html
<a href="javascript:void(0)" 
   onclick="FT.widgets.get().open()"
   class="reserve-button">
   Reserve a table
</a>
```

**Empfehlung:** Option A (Anchor Link) - funktioniert auch ohne JavaScript!

---

### Schritt 4: CSS für Widget anpassen (optional)

**Wo:** Am Ende von `styles.css`

```css
/* Zenchef Widget Customization */
.ft-widget-b2 {
    z-index: 10000 !important; /* Über allem anderen */
}

/* Widget Overlay Background */
.ft-widget-overlay {
    background: rgba(0, 0, 0, 0.9) !important; /* Dunkler Hintergrund */
}

/* Widget Container */
.ft-widget-container {
    border-radius: 0 !important; /* Kein Border-Radius für cleanen Look */
}

/* Widget Close Button anpassen (falls nötig) */
.ft-widget-close {
    color: #d4af37 !important; /* Gold */
}
```

**Hinweis:** Das CSS ist bereits vorbereitet in `styles.css` (Zeile 73-85)!

---

### Schritt 5: Analytics Integration (optional)

**Wenn Google Analytics aktiv ist:**

Das Zenchef Widget tracked automatisch:
- Widget Open/Close Events
- Reservierungs-Abschlüsse
- E-Commerce Conversions (für Gift Vouchers)

**Voraussetzung:** Google Analytics (gtag.js) oder Facebook Pixel (fbq) muss im `<head>` sein.

**Events die getrackt werden:**
- `ft-widget-open` → Widget geöffnet
- `ft-widget-close` → Widget geschlossen
- `ft-widget-navigated` → User navigiert im Widget
- `ft-widget-ordered` → Reservierung abgeschlossen ✅

---

## 🎨 DESIGN-ANPASSUNGEN

### Widget Farben

**Standard:** Das Widget nutzt `data-color="#d4af37"` (Gold) als Akzentfarbe.

**Anpassen:** Falls andere Farbe gewünscht:
```html
data-color="#cc0000"  <!-- Rot wie Reserve-Button -->
data-color="#000000"  <!-- Schwarz -->
data-color="#d4af37"  <!-- Gold (aktuell) -->
```

### Widget Sprache

**Standard:** `data-language="de"` (Deutsch)

**Andere Sprachen:**
```html
data-language="en"  <!-- Englisch -->
data-language="auto" <!-- Automatisch basierend auf Browser -->
data-language="nl"  <!-- Niederländisch -->
data-language="fr"  <!-- Französisch -->
```

**Empfehlung für Launch:** `"de"` (Deutsch)  
**Nach Launch:** `"auto"` für internationale Gäste

---

## 🚀 ERWEITERTE FEATURES

### 1. Gift Voucher Integration

**Button in Gift Section aktualisieren:**

**Aktuell:**
```html
<a href="mailto:kontakt@schreiberei-muc.de?subject=Gift%20Voucher%20Request" 
   class="page-button">
   Purchase Gift Voucher
</a>
```

**NEU:**
```html
<a href="#ft-openShop-vouchers" 
   class="page-button">
   Purchase Gift Voucher
</a>
```

**Oder mit JavaScript:**
```html
<a href="javascript:void(0)" 
   onclick="FT.widgets.get().openShop('vouchers')"
   class="page-button">
   Purchase Gift Voucher
</a>
```

---

### 2. Newsletter → Event Tickets (optional)

Falls Events/Cooking Classes über Zenchef laufen:

```html
<a href="#ft-openShop-tickets" class="page-button">
   View Events
</a>
```

---

### 3. Multiple Call-to-Actions

**Verschiedene Buttons können verschiedene Zenchef-Features öffnen:**

```html
<!-- Reserve Table -->
<a href="#ft-open">Reserve a table</a>

<!-- Gift Vouchers -->
<a href="#ft-openShop-vouchers">Buy Gift Voucher</a>

<!-- Takeaway (falls aktiviert) -->
<a href="#ft-openShop-takeaway">Order Takeaway</a>

<!-- Specific Event (mit Event-ID) -->
<a href="#ft-openTicket-a1b2c3d4">Book Cooking Class</a>
```

---

## 🧪 TESTING CHECKLIST

Nach der Integration testen:

### Desktop:
- [ ] Button "Reserve a table" öffnet Widget
- [ ] Widget lädt schnell (< 2 Sekunden)
- [ ] Widget hat korrekte Farbe (Gold #d4af37)
- [ ] Widget ist auf Deutsch
- [ ] Widget kann geschlossen werden (X-Button)
- [ ] Reservierung kann durchgeführt werden
- [ ] Widget öffnet sich über allen anderen Elementen

### Mobile:
- [ ] Button funktioniert auf Smartphone
- [ ] Widget ist fullscreen auf Mobile
- [ ] Widget ist touch-optimiert
- [ ] Keine Scroll-Probleme
- [ ] Close-Button gut erreichbar

### Cross-Browser:
- [ ] Chrome (Desktop & Mobile)
- [ ] Safari (Desktop & Mobile)
- [ ] Firefox
- [ ] Edge

---

## 📊 ANALYTICS & TRACKING

### Google Analytics Events

**Automatisch getrackt (wenn GA aktiv):**

| Event | Beschreibung |
|-------|-------------|
| **widget/open** | Widget wurde geöffnet |
| **widget/close** | Widget wurde geschlossen |
| **ecommerce/purchase** | Reservierung abgeschlossen |
| **ecommerce/add_to_cart** | Item zum Warenkorb hinzugefügt |

**Custom Event Tracking:**

```javascript
// Eigene Events für spezifisches Tracking
document.addEventListener('ft-widget-ordered', function(e) {
    console.log('Reservierung erfolgreich!', e.detail);
    
    // Eigenes Tracking
    gtag('event', 'reservation_completed', {
        'restaurant_id': '0b624972',
        'order_amount': e.detail.order.totalAmount,
        'party_size': e.detail.reservation.numberOfPeople
    });
});
```

---

## 🔧 TROUBLESHOOTING

### Problem: Widget öffnet sich nicht

**Lösung:**
1. Console öffnen (F12) und nach Fehlern suchen
2. Prüfen ob SDK geladen ist: `typeof FT` sollte `object` sein
3. Prüfen ob Restaurant-ID korrekt: `0b624972`

### Problem: Widget hat falsche Farbe

**Lösung:**
- `data-color` Attribut prüfen
- Hex-Code ohne Leerzeichen: `#d4af37`
- CSS Overrides entfernen

### Problem: Widget öffnet automatisch

**Lösung:**
- `data-open="false"` setzen
- `data-open-mobile="false"` setzen

### Problem: Widget auf falscher Sprache

**Lösung:**
- `data-language="de"` explizit setzen
- Nicht `"auto"` verwenden wenn Deutsch gewünscht

---

## 📝 IMPLEMENTIERUNGS-CODE (Komplett)

### 1. Vor schließendem `</body>` in index.html einfügen:

```html
<!-- Zenchef/Formitable Widget Integration -->
<script>
(function (d, s, id, h) {
    var ftjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    var js = d.createElement(s);
    js.id = id;
    js.src = "https://cdn.formitable.com/sdk/v1/ft.sdk.min.js";
    h && (js.onload = h);
    ftjs.parentNode.insertBefore(js, ftjs);
}(document, 'script', 'formitable-sdk', function () {
    FT.load('analytics');
}));
</script>

<!-- Zenchef Widget Container -->
<div class="ft-widget-b2"
     data-restaurant="0b624972"
     data-open="false"
     data-open-mobile="false"
     data-color="#d4af37"
     data-language="de"
     data-tag="tohru-website"
     data-toolbar="false"
     data-toolbar-mobile="false">
</div>
```

### 2. Reserve Button aktualisieren (Zeile 64):

**Ersetze:**
```html
<a href="https://schreiberei-muc.de/reservierungen" target="_blank" rel="noopener noreferrer" class="reserve-button">Reserve a table</a>
```

**Mit:**
```html
<a href="#ft-open" class="reserve-button">Reserve a table</a>
```

### 3. Gift Voucher Button aktualisieren (Zeile 198):

**Ersetze:**
```html
<a href="mailto:kontakt@schreiberei-muc.de?subject=Gift%20Voucher%20Request..." class="page-button">Purchase Gift Voucher</a>
```

**Mit:**
```html
<a href="#ft-openShop-vouchers" class="page-button">Purchase Gift Voucher</a>
```

---

## ⏱️ ZEITAUFWAND

**Geschätzte Implementierungszeit:** 15-30 Minuten

**Schritte:**
1. SDK Script einfügen (2 Min)
2. Widget Container hinzufügen (2 Min)
3. Button-Links aktualisieren (5 Min)
4. Testing Desktop (5 Min)
5. Testing Mobile (5 Min)
6. Cross-Browser Testing (10 Min)

---

## ✅ NACH DER INTEGRATION

**Sofort testen:**
1. [ ] Reservierung durchführen (Test-Buchung)
2. [ ] Gift Voucher öffnen
3. [ ] Mobile Testing
4. [ ] Analytics prüfen (falls aktiv)

**Im Backend prüfen:**
1. Zenchef Dashboard öffnen
2. Prüfen ob Test-Reservierung angekommen ist
3. Widget-Settings anpassen (falls nötig)

---

## 🔗 WICHTIGE LINKS

- **Widget Dokumentation:** https://formitable.com/nl/developers/widget?uid=0b624972
- **Zenchef Dashboard:** https://app.zenchef.com/ (Login erforderlich)
- **Support:** support@zenchef.com
- **Analytics Guide:** https://formitable.com/nl/developers/analytics

---

## 📞 SUPPORT

**Bei Problemen:**
1. Zenchef Support kontaktieren: support@zenchef.com
2. Telefon: +31 (0)20 261 36 50 (NL) / +49 (0)30 568 37468 (DE)
3. Live Chat im Zenchef Dashboard

---

**Status:** Ready to implement! 🚀  
**Restaurant ID:** 0b624972  
**Geschätzter Aufwand:** 30 Minuten  
**Priorität:** Hoch (für Launch)

---

**Letzte Aktualisierung:** 23. Januar 2026
