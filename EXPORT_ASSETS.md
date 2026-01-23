# Bilder aus Figma exportieren

## Schritt 1: Hero-Bild exportieren

1. **In Figma:** Wähle das Hero-Bild (das große zentrale Bild mit dem organischen Clip-Path)
2. **Rechtsklick** auf das Bild → **"Export"** oder nutze das Export-Panel rechts
3. **Export-Einstellungen:**
   - Format: **PNG** oder **JPG** (PNG für bessere Qualität)
   - Größe: **2x** oder **3x** für Retina-Displays
   - Oder: **SVG** falls das Bild vektorbasiert ist
4. **Exportieren** und speichere als `hero-image.jpg` oder `hero-image.png`

## Schritt 2: Bild im Projekt speichern

1. Speichere das exportierte Bild in: `/Users/supersmail/Desktop/Tohru Nakamura/images/`
2. Benenne es: `hero-image.jpg` (oder `.png`)

## Schritt 3: HTML aktualisieren

Das HTML ist bereits vorbereitet und verwendet:
```html
<img src="images/hero-image.jpg" alt="Culinary experience" class="hero-image">
```

## Alternative: Automatischer Export

Falls du mehrere Bilder hast:
1. Wähle alle Bilder in Figma aus
2. Rechtsklick → **"Export selection"**
3. Wähle Format und Größe
4. Exportiere alle auf einmal

## Empfohlene Bildgrößen

- **Hero-Bild:** 2400px Breite (für 2x Retina) oder 1200px (für 1x)
- **Format:** JPG für Fotos, PNG für Grafiken mit Transparenz
- **Optimierung:** Komprimiere die Bilder vor dem Upload (z.B. mit TinyPNG oder ImageOptim)
