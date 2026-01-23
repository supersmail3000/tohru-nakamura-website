# Animation-Konzept: Hero-Bild-Slider
## Tohru Nakamura Restaurant

**Creative Director:** Jean-Paul Williams  
**Datum:** 23. Januar 2026  
**Projekt:** Fine-Dining Website Hero-Slider

---

## 🎯 Design-Philosophie

Für ein **3-Sterne Michelin Restaurant** benötigen wir eine Animation, die:
- **Elegant** und **subtil** ist – keine aufdringlichen Effekte
- **Sophisticated** wirkt – Premium-Ästhetik
- **Performance-optimiert** ist – flüssige 60fps Animationen
- **Respektvoll** gegenüber dem Inhalt bleibt – die Bilder stehen im Vordergrund

---

## 📋 Konkrete Empfehlungen

### 1. **Anzeigedauer pro Bild**

**Empfehlung: 6 Sekunden**

**Begründung:**
- Zu kurz (< 5s): Bilder werden nicht richtig wahrgenommen, wirkt hektisch
- Zu lang (> 8s): Langweilig, Besucher scrollen weiter bevor alle Bilder gesehen wurden
- **6 Sekunden** ist die optimale Balance: Genug Zeit, um das Bild zu erfassen, aber nicht langweilig
- Bei 4 Bildern = 24 Sekunden Gesamtzyklus (inkl. Übergänge)

---

### 2. **Übergangseffekt**

**Empfehlung: Sanftes Crossfade mit subtiler Ken Burns Variation**

**Technische Umsetzung:**
- **Haupteffekt:** Crossfade (opacity transition) zwischen den Bildern
- **Zusatzeffekt:** Sehr subtiler, langsamer Zoom (1.0 → 1.05) während der Anzeigedauer
- **Kein Pan** – die Bilder bleiben zentriert, nur minimaler Zoom für Tiefe

**Warum diese Kombination:**
- Crossfade ist klassisch elegant und nicht ablenkend
- Subtiler Zoom verleiht dem statischen Bild Leben ohne aufdringlich zu sein
- Ken Burns in voller Form wäre zu viel für Fine-Dining Ästhetik
- Slide/Wipe Effekte wirken zu "technisch" für diese Marke

---

### 3. **Timing & Easing-Funktion**

**Empfehlung: `cubic-bezier(0.4, 0.0, 0.2, 1.0)`**

**Alternative:** `ease-in-out` (falls cubic-bezier zu komplex)

**Begründung:**
- Diese Easing-Kurve ist inspiriert von Material Design's "Standard Easing"
- Sanfter Start, sanftes Ende – keine abrupten Bewegungen
- Wirkt natürlich und organisch
- Perfekt für Premium-Marken

**Für den Zoom-Effekt:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out-quad)
- Sanfter Start, langsames Ende
- Verleiht dem Bild eine "Atem"-Qualität

---

### 4. **Dauer des Übergangs**

**Empfehlung: 1.2 Sekunden**

**Begründung:**
- Zu kurz (< 1s): Wirkt abrupt, nicht elegant
- Zu lang (> 1.5s): Zu langsam, Besucher merken die Pause
- **1.2 Sekunden** ist die perfekte Balance für ein sanftes, aber nicht träges Crossfade
- Genug Zeit, um die Eleganz zu spüren, aber schnell genug, um nicht langweilig zu wirken

---

### 5. **User Interaction**

**Empfehlung: Subtile Navigation mit Pause bei Hover**

**Implementierung:**

**a) Hover-Verhalten:**
- ✅ **Slider pausiert bei Hover** über dem Hero-Bereich
- ✅ **Logo und Sterne bleiben sichtbar** (keine Änderung)
- ✅ **Sanfte Pause** – kein abruptes Stoppen

**b) Navigation-Elemente:**
- ✅ **Navigation-Dots:** Sehr subtil, nur bei Hover sichtbar
  - Position: Unten zentriert, 20px über dem unteren Rand des SVG
  - Größe: 6px Durchmesser, 8px Abstand
  - Farbe: Weiß mit 40% Opacity (normal), 80% Opacity (aktiv/hover)
  - Animation: Fade-in bei Hover des Hero-Bereichs (0.3s ease)
  
- ❌ **Keine Pfeile:** Würden die elegante Ästhetik stören
- ✅ **Klickbare Dots:** Ermöglicht manuelle Navigation
- ✅ **Keyboard-Navigation:** Arrow-Left/Right für Accessibility

**c) Touch-Gesten (Mobile):**
- ✅ **Swipe links/rechts** zum Wechseln
- ✅ **Keine automatische Pause bei Touch** (Mobile-Nutzer erwarten Kontrolle)

---

### 6. **Logo & Michelin-Sterne während Bildwechsel**

**Empfehlung: Statisch bleiben, keine Animation**

**Begründung:**
- Logo und Sterne sind **Brand-Elemente** – sie müssen konstant sichtbar sein
- Animation würde von den Restaurant-Bildern ablenken
- Die Bilder wechseln, aber die Marke bleibt stabil – das schafft Vertrauen
- Aktuell haben Logo/Sterne bereits einen eleganten Fade-In beim Page-Load – das bleibt unverändert

**Technische Umsetzung:**
- Logo und Sterne bleiben mit `z-index: 20` über den Bildern
- Keine zusätzlichen Animationen während des Slider-Wechsels
- Opacity bleibt konstant bei 1.0 (nach initialem Fade-In)

---

## 🎨 Visuelle Details

### Bild-Stacking (Technik)
- **4 `<image>` Elemente** im SVG, alle mit gleicher Mask
- Alle Bilder sind geladen, aber nur das aktive ist sichtbar (opacity)
- GPU-beschleunigt durch `transform` und `opacity` Properties

### Zoom-Animation pro Bild
- **Start:** `scale(1.0)` bei Bildwechsel
- **Ende:** `scale(1.05)` nach 6 Sekunden
- **Timing:** Langsam über die gesamte Anzeigedauer (6s)
- **Transform-Origin:** `center center`

### Crossfade-Animation
- **Aktives Bild:** `opacity: 1` → bleibt 1 während Anzeige
- **Nächstes Bild:** `opacity: 0` → `opacity: 1` über 1.2s
- **Vorheriges Bild:** `opacity: 1` → `opacity: 0` über 1.2s
- **Overlap:** 1.2s Crossfade während 6s Anzeige = sanfter Übergang

---

## ⚡ Performance-Optimierungen

### GPU-Beschleunigung
```css
.hero-image-slide {
    will-change: transform, opacity;
    transform: translateZ(0); /* Force GPU layer */
    backface-visibility: hidden;
}
```

### Bild-Preloading
- Alle 4 Bilder werden beim Page-Load vorgeladen
- Verhindert sichtbare Ladezeiten während des Sliders
- Nutze `<link rel="preload">` für kritische Assets

### RequestAnimationFrame
- Slider-Timing nutzt `requestAnimationFrame` für flüssige Animationen
- Keine `setInterval` – nur `setTimeout` mit rekursivem `requestAnimationFrame`

---

## 📐 Exakte Werte – Zusammenfassung

| Parameter | Wert | Einheit |
|-----------|------|---------|
| **Anzeigedauer pro Bild** | 6 | Sekunden |
| **Übergangsdauer** | 1.2 | Sekunden |
| **Gesamtzyklus (4 Bilder)** | 24 | Sekunden |
| **Zoom-Start** | 1.0 | scale |
| **Zoom-Ende** | 1.05 | scale |
| **Zoom-Dauer** | 6 | Sekunden |
| **Easing (Crossfade)** | cubic-bezier(0.4, 0.0, 0.2, 1.0) | - |
| **Easing (Zoom)** | cubic-bezier(0.25, 0.46, 0.45, 0.94) | - |
| **Dot-Größe** | 6 | px |
| **Dot-Abstand** | 8 | px |
| **Dot-Fade-In** | 0.3 | Sekunden |

---

## 🎬 Animation-Timeline (Beispiel)

```
Zeit:  0s ──────────── 6s ──────────── 7.2s ──────────── 13.2s
       │              │                │                 │
Bild 1: [════════════════] (opacity 1, zoom 1.0→1.05)
Bild 2:                   [════════════════════════════] (opacity 0→1, zoom 1.0→1.05)
Bild 3:                                                      [════════════════]
Bild 4:                                                                        [════════════════]

Crossfade:                [───] (1.2s transition)
```

---

## ✅ Finale Empfehlung

**Für das Tohru Nakamura Restaurant empfehle ich:**

1. ✅ **6 Sekunden** Anzeigedauer pro Bild
2. ✅ **Sanftes Crossfade** mit subtilem Zoom (1.0 → 1.05)
3. ✅ **1.2 Sekunden** Übergangsdauer
4. ✅ **cubic-bezier(0.4, 0.0, 0.2, 1.0)** für Crossfade
5. ✅ **Pause bei Hover** + subtile Navigation-Dots (nur bei Hover sichtbar)
6. ✅ **Logo & Sterne bleiben statisch** – keine Animation

Diese Kombination schafft eine **elegante, sophisticated Animation**, die der Premium-Marke Tohru Nakamura gerecht wird, ohne die Aufmerksamkeit von den wunderschönen Restaurant-Bildern abzulenken.

---

**Jean-Paul Williams**  
Creative Director  
*"Elegance is refusal."* – Coco Chanel
