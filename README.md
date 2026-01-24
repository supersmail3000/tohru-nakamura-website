# Tohru Nakamura Website

Eine moderne, professionelle Website für den deutsch-japanischen Sternekoch Tohru Nakamura aus München.

**Status:** Live on Vercel 🚀

## 🎨 Features

- **Responsive Design**: Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **Moderne UI/UX**: Elegantes Design mit Gold-Akzenten passend für Fine Dining
- **Smooth Scrolling**: Nahtlose Navigation zwischen Sections
- **Interaktive Elemente**: Animierte Übergänge und Hover-Effekte
- **Mobile Navigation**: Hamburger-Menü für mobile Geräte
- **Kontaktformular**: Funktionales Kontaktformular (bereit für Backend-Integration)

## 📁 Projektstruktur

```
Tohru Nakamura/
├── index.html              # Haupt-HTML-Datei
├── styles.css              # Alle Styles und Responsive Design
├── script.js               # JavaScript für Interaktivität
├── images/                 # Bilder und Assets
│   ├── hero-image.png      # Hero-Bild aus Figma
│   └── hero-shape.svg      # SVG-Form für Hero-Bild
├── FIGMA_MCP_SETUP.md      # Anleitung für Figma MCP Integration
├── EXPORT_ASSETS.md        # Anleitung zum Exportieren von Assets
├── CTO_RECOMMENDATIONS.md # Technische Empfehlungen & Entscheidungen
└── README.md               # Projekt-Dokumentation
```

## 🚀 Verwendung

1. Öffne `index.html` in einem modernen Webbrowser
2. Die Website funktioniert vollständig ohne Server (Client-Side)

### Lokaler Server (empfohlen)

Für die beste Erfahrung kannst du einen lokalen Server starten:

```bash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

Dann öffne `http://localhost:8000` im Browser.

## 🎯 Sections

1. **Home**: Minimalistische Startseite mit organischer Hero-Form basierend auf Figma Design
   - Tagline: "Join an intimate cooking experience"
   - Zentrales Bild mit SVG-Clip-Path
   - Navigation unten (Reserve, Origin, Gift, Contact, Journal)
2. **Über mich**: Persönliche Geschichte und Hintergrund
3. **Restaurants**: Informationen zu "Tohru in der Schreiberei" und "Schreiberei"
4. **TV Shows**: Übersicht der Fernsehauftritte
5. **Philosophie**: Kulinarische Philosophie und Vision
6. **Kontakt**: Kontaktformular und Restaurant-Informationen

## 🛠️ Technologien

- **HTML5**: Semantisches Markup
- **CSS3**: Modernes Styling mit CSS Grid, Flexbox, Animations
- **Vanilla JavaScript**: Keine Dependencies, pure Performance
- **Google Fonts**: Playfair Display & Inter für elegante Typografie

## 🎨 Design-System

### Farben
- **Primary**: `#1a1a1a` (Dunkelgrau/Schwarz)
- **Secondary**: `#d4af37` (Gold)
- **Accent**: `#8b7355` (Warmes Braun)
- **Text Light**: `#f5f5f5`
- **Text Dark**: `#333`
- **Home Background**: `#000000` (Schwarz)

### Typografie
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-Serif)

### Figma Integration
Das Design wurde mit Figma MCP erstellt und integriert:
- Hero-Bild mit organischer SVG-Form
- Exakte Design-Tokens und Spacing
- Siehe `FIGMA_MCP_SETUP.md` für Setup-Anleitung

### Technische Entscheidungen
Alle CTO-Empfehlungen und technischen Entscheidungen sind in `CTO_RECOMMENDATIONS.md` dokumentiert.
Diese Datei sollte von allen Agents konsultiert werden, bevor größere technische Änderungen vorgenommen werden.

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 481px - 768px
- **Mobile**: ≤ 480px

## 🔧 Anpassungen

### Bilder hinzufügen

Ersetze die `.image-placeholder` Divs mit echten Bildern:

```html
<div class="restaurant-image">
    <img src="path/to/image.jpg" alt="Tohru in der Schreiberei">
</div>
```

### Kontaktformular Backend

Das Kontaktformular ist aktuell für Demo-Zwecke. Für Produktion:

1. Backend-Endpoint erstellen
2. In `script.js` die Form-Submit-Funktion anpassen:

```javascript
fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

### Mehrsprachigkeit

Die Website ist aktuell auf Deutsch. Für mehrsprachige Unterstützung:

1. Sprach-Dateien erstellen (z.B. `lang/de.json`, `lang/en.json`)
2. JavaScript für Sprachumschaltung implementieren
3. Content-Dynamik hinzufügen

## 📝 Nächste Schritte

- [x] Home-Seite mit Figma Design umgesetzt
- [x] Hero-Bild mit organischer SVG-Form
- [x] Responsive Design implementiert
- [ ] Weitere Sections aus Figma umsetzen
- [ ] Backend für Kontaktformular integrieren
- [ ] SEO-Optimierungen (Meta-Tags, Structured Data)
- [ ] Mehrsprachigkeit (Deutsch/Englisch/Japanisch)
- [ ] Reservierungssystem integrieren
- [ ] Social Media Links hinzufügen
- [ ] Performance-Optimierungen (Minification, CDN)

## 📄 Lizenz

© 2026 Tohru Nakamura. Alle Rechte vorbehalten.

## 👨‍💻 Entwickelt mit

- Modern Web Standards
- Best Practices für Accessibility
- Performance-Optimierung
- SEO-Freundliches Markup

---

**Hinweis**: Diese Website ist eine Vorlage und kann nach Bedarf angepasst und erweitert werden.