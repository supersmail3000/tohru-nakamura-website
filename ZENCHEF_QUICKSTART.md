# Zenchef Integration - Quick Start Checklist ⚡

**Restaurant ID:** `0b624972`  
**Zeitaufwand:** 15-30 Minuten  
**Schwierigkeit:** ⭐⭐☆☆☆ (Einfach)

---

## ✅ QUICK CHECKLIST

### Schritt 1: SDK Script einfügen (2 Min)

**Datei:** `index.html`  
**Position:** Vor dem schließenden `</body>` Tag

```html
<!-- Zenchef Widget SDK - Vor </body> einfügen -->
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
```

✅ Einfügen → Speichern

---

### Schritt 2: Widget Container hinzufügen (2 Min)

**Datei:** `index.html`  
**Position:** Direkt nach dem SDK Script, vor `</body>`

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

✅ Einfügen → Speichern

---

### Schritt 3: Reserve Button aktualisieren (2 Min)

**Datei:** `index.html`  
**Zeile:** ~64 (in Reserve Section)

**SUCHEN:**
```html
<a href="https://schreiberei-muc.de/reservierungen" target="_blank" rel="noopener noreferrer" class="reserve-button">Reserve a table</a>
```

**ERSETZEN MIT:**
```html
<a href="#ft-open" class="reserve-button">Reserve a table</a>
```

✅ Ersetzen → Speichern

---

### Schritt 4: Gift Voucher Button aktualisieren (2 Min)

**Datei:** `index.html`  
**Zeile:** ~198 (in Gift Section)

**SUCHEN:**
```html
<a href="mailto:kontakt@schreiberei-muc.de?subject=Gift%20Voucher%20Request&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20purchase%20a%20gift%20voucher.%0D%0A%0D%0APlease%20provide%20me%20with%20more%20information.%0D%0A%0D%0AThank%20you!" class="page-button" target="_blank" rel="noopener noreferrer">Purchase Gift Voucher</a>
```

**ERSETZEN MIT:**
```html
<a href="#ft-openShop-vouchers" class="page-button">Purchase Gift Voucher</a>
```

✅ Ersetzen → Speichern

---

### Schritt 5: Testing (10 Min)

**Desktop Test:**
1. [ ] Öffne `index.html` im Browser
2. [ ] Klicke "Reserve a table" Button
3. [ ] Widget öffnet sich? ✅
4. [ ] Widget hat Gold-Farbe? ✅
5. [ ] Widget ist auf Deutsch? ✅
6. [ ] Widget kann geschlossen werden? ✅

**Mobile Test:**
7. [ ] Öffne auf Smartphone (oder Chrome DevTools Mobile)
8. [ ] "Reserve a table" Button klicken
9. [ ] Widget öffnet fullscreen? ✅
10. [ ] Widget ist touch-optimiert? ✅

**Gift Voucher Test:**
11. [ ] Zur Gift Section navigieren
12. [ ] "Purchase Gift Voucher" Button klicken
13. [ ] Widget öffnet sich mit Gutscheinen? ✅

---

## 🎨 ANPASSUNGEN (Optional)

### Farbe ändern:

```html
data-color="#d4af37"  <!-- Gold (Standard) -->
data-color="#cc0000"  <!-- Rot -->
data-color="#000000"  <!-- Schwarz -->
```

### Sprache ändern:

```html
data-language="de"    <!-- Deutsch (Standard) -->
data-language="en"    <!-- Englisch -->
data-language="auto"  <!-- Automatisch -->
```

### Auto-Open aktivieren (nicht empfohlen):

```html
data-open="2000"      <!-- Widget öffnet nach 2 Sekunden -->
data-open="false"     <!-- Widget öffnet nicht automatisch (Standard) -->
```

---

## 🐛 TROUBLESHOOTING

### Widget öffnet sich nicht?

**Lösung 1:** Browser Console öffnen (F12)
- Fehler sichtbar? → Screenshot machen
- `typeof FT` eingeben → sollte `object` sein

**Lösung 2:** Restaurant-ID prüfen
- Muss `0b624972` sein (ohne Leerzeichen)

**Lösung 3:** Cache leeren
- Strg+F5 (Windows) oder Cmd+Shift+R (Mac)

### Widget hat falsche Farbe?

- `data-color="#d4af37"` prüfen (ohne Leerzeichen)
- Hex-Code mit # beginnen

### Widget auf falscher Sprache?

- `data-language="de"` explizit setzen
- Nicht `"auto"` verwenden

---

## 📋 CHECKLISTE FÜR LAUNCH

- [ ] SDK Script eingefügt
- [ ] Widget Container eingefügt
- [ ] Reserve Button aktualisiert
- [ ] Gift Voucher Button aktualisiert
- [ ] Desktop: Reserve funktioniert
- [ ] Desktop: Gift Voucher funktioniert
- [ ] Mobile: Reserve funktioniert
- [ ] Mobile: Gift Voucher funktioniert
- [ ] Widget Farbe korrekt (Gold)
- [ ] Widget Sprache korrekt (Deutsch)
- [ ] Widget schließt sich korrekt

---

## 🚀 FERTIG!

**Nach erfolgreicher Integration:**

✅ Reserve Button öffnet Zenchef Widget  
✅ Gift Voucher Button öffnet Gutschein-Shop  
✅ Keine toten Links mehr  
✅ Professionelles Reservierungssystem  
✅ Analytics-ready (wenn GA aktiv)

**Nächste Schritte:**
1. Test-Reservierung durchführen
2. Im Zenchef Dashboard prüfen
3. Website deployen! 🎉

---

**Detaillierte Dokumentation:** `ZENCHEF_INTEGRATION.md`  
**Support:** support@zenchef.com  
**Status:** Ready to implement! ⚡
