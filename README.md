# Tohru Nakamura Restaurant Website

Official website for Tohru Nakamura's 3 Michelin Star restaurant in Munich.

**Live:** [tohru-nakamura-website.vercel.app](https://tohru-nakamura-website.vercel.app)

---

## Features

- 🎨 **Premium Design** - Elegant, minimalist interface for fine dining
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🖼️ **Hero Image Slider** - Smooth Ken Burns effect with 5 restaurant images
- 🍽️ **Zenchef Integration** - Direct table reservations via Zenchef widget
- ⭐ **3 Michelin Stars** - Prominent star display
- 🌍 **Les Grandes Tables du Monde** - Membership logo integration
- 🎯 **Performance Optimized** - GPU-accelerated animations, lazy loading
- ♿ **Accessible** - WCAG compliant with semantic HTML and ARIA labels

---

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **Vanilla JavaScript** - No dependencies, pure performance
- **Zenchef/Formitable** - Reservation system integration
- **Vercel** - Hosting with global CDN

---

## Design System

### Colors
- Warm Black: `#0e0c0a` (Background)
- Warm White: `#faf8f6` (Text)
- Burgundy: `#b8252c` (Accents)
- Sage Green: `#8ba888` (Open status dot)

### Typography
- Work Sans (sans-serif)

### Spacing
8px baseline grid system (`--spacing-xs` to `--spacing-4xl`)

---

## Project Structure

```
.
├── index.html           # Main page
├── styles.css           # All styles
├── script.js            # Interactivity
├── images/              # Hero images & assets
├── favicon.svg          # SVG favicon
├── vercel.json          # Deployment config
├── robots.txt           # SEO crawling rules
└── sitemap.xml          # Site map
```

---

## Local Development

```bash
# Start local server
python -m http.server 8000

# Or with Node.js
npx http-server

# Open browser
http://localhost:8000
```

---

## Deployment

Automatically deployed to Vercel on every push to `main` branch.

**Production URL:** https://tohru-nakamura-website.vercel.app

---

## Restaurant Information

**Tohru in der Schreiberei**
- 3 Michelin Stars ⭐⭐⭐
- Member of Les Grandes Tables du Monde
- Location: Munich, Germany
- Cuisine: Japanese-German-French Fusion
- Seats: 27 intimate seats

**Reservations:** Via Zenchef widget on website

---

## Browser Support

- Chrome/Edge (latest)
- Safari (latest)
- Firefox (latest)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

---

## License

© 2026 Tohru Nakamura. All rights reserved.

---

## Credits

**Design & Development:** Modern web standards  
**Hosting:** Vercel  
**Reservations:** Zenchef/Formitable
