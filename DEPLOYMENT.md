# Deployment Anleitung - Tohru Website

Diese Anleitung hilft dir, die Website auf Vercel oder Netlify zu deployen.

## 🚀 Option 1: Vercel (Empfohlen)

**Vorteile:**
- Kostenlos für Static Sites
- Automatisches SSL/HTTPS
- Global CDN (schnell weltweit)
- Automatische Deployments via Git
- Sehr einfach & schnell

### Schritt-für-Schritt:

#### 1. Git Repository erstellen

```bash
cd "/Users/supersmail/Desktop/Tohru Nakamura"
git init
git add .
git commit -m "Initial commit - Tohru Website ready for launch"
```

#### 2. GitHub Repository erstellen

1. Gehe zu https://github.com/new
2. Repository Name: `tohru-website` (oder anderer Name)
3. **Private** auswählen (empfohlen)
4. NICHT "Initialize with README" auswählen
5. "Create repository" klicken

#### 3. Code zu GitHub pushen

```bash
git remote add origin https://github.com/YOUR_USERNAME/tohru-website.git
git branch -M main
git push -u origin main
```

#### 4. Vercel Account erstellen & Deployment

1. Gehe zu https://vercel.com/signup
2. "Continue with GitHub" auswählen
3. GitHub authorisieren
4. "Import Project" klicken
5. Dein Repository auswählen: `tohru-website`
6. **Build Settings:**
   - Framework Preset: `Other` (keine Build-Step nötig!)
   - Build Command: (leer lassen)
   - Output Directory: (leer lassen)
7. "Deploy" klicken
8. ⏱️ Warten ~30 Sekunden
9. ✅ Fertig! Website ist live!

#### 5. Custom Domain verbinden

**Falls du bereits eine Domain hast:**

1. In Vercel: Settings → Domains
2. "Add" klicken
3. Domain eingeben (z.B. `tohru-nakamura.de`)
4. DNS Records setzen (Anweisungen werden angezeigt):
   - A Record: `76.76.21.21` (Vercel IP)
   - ODER CNAME: `cname.vercel-dns.com`
5. Warten auf DNS-Propagation (5 Minuten - 24 Stunden)
6. SSL wird automatisch eingerichtet (kostenlos via Let's Encrypt)

**Domain kaufen (falls noch nicht vorhanden):**
- Namecheap: https://www.namecheap.com
- Google Domains: https://domains.google
- Empfehlung: `tohru-nakamura.de` (~12€/Jahr)

---

## 🌐 Option 2: Netlify (Alternative)

**Vorteile:**
- Ähnlich wie Vercel
- Gute Form-Handling Features
- Serverless Functions included

### Schritt-für-Schritt:

#### 1. Git Repository erstellen (wie oben bei Vercel)

```bash
cd "/Users/supersmail/Desktop/Tohru Nakamura"
git init
git add .
git commit -m "Initial commit - Tohru Website"
```

#### 2. GitHub Repository erstellen & pushen (wie oben)

#### 3. Netlify Deployment

1. Gehe zu https://app.netlify.com/signup
2. "Continue with GitHub" auswählen
3. "New site from Git" klicken
4. GitHub authorisieren
5. Repository auswählen: `tohru-website`
6. **Build Settings:**
   - Build command: (leer lassen)
   - Publish directory: `.` (Root)
7. "Deploy site" klicken
8. ✅ Fertig! Website ist live!

#### 4. Custom Domain verbinden

1. Site Settings → Domain Management
2. "Add custom domain"
3. Domain eingeben
4. DNS Records setzen (wie bei Vercel)

---

## 📦 Option 3: Manuelles Deployment (einfachster Start)

**Für schnelle Tests oder wenn kein Git gewünscht:**

### Vercel CLI:

```bash
# Vercel CLI installieren
npm install -g vercel

# In Projekt-Ordner gehen
cd "/Users/supersmail/Desktop/Tohru Nakamura"

# Deployen
vercel

# Produktions-Deployment
vercel --prod
```

### Netlify CLI:

```bash
# Netlify CLI installieren
npm install -g netlify-cli

# In Projekt-Ordner gehen
cd "/Users/supersmail/Desktop/Tohru Nakamura"

# Deployen
netlify deploy

# Produktions-Deployment
netlify deploy --prod
```

---

## ✅ Nach dem Deployment: Checklist

**1. Website testen:**
- [ ] https://DEINE-DOMAIN.de lädt schnell
- [ ] HTTPS/SSL funktioniert (grünes Schloss)
- [ ] Alle Sections funktionieren (Home, Reserve, Origin, etc.)
- [ ] Bilder laden korrekt
- [ ] Mobile: Website funktioniert auf Smartphone
- [ ] Reserve-Link funktioniert
- [ ] Contact-Infos korrekt

**2. SEO Setup:**
- [ ] Google Search Console: https://search.google.com/search-console
  - Property hinzufügen
  - Ownership verifizieren
  - Sitemap einreichen: `https://DEINE-DOMAIN.de/sitemap.xml`
- [ ] Google Analytics (falls gewünscht)
  - Account erstellen
  - Tracking ID im HTML einfügen

**3. Performance Check:**
- [ ] Lighthouse Score testen: Chrome DevTools → Lighthouse
  - Target: Performance > 85
  - Target: Accessibility > 90
  - Target: SEO > 90
- [ ] PageSpeed Insights: https://pagespeed.web.dev/
  - Mobile & Desktop testen

**4. Social Media Preview:**
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  - URL eingeben und "Scrape Again"
- [ ] Twitter Card Validator: https://cards-dev.twitter.com/validator
  - URL eingeben und Preview prüfen

---

## 🔄 Automatische Updates

**Nach dem ersten Deployment:**

Jedes Mal wenn du Code änderst:

```bash
git add .
git commit -m "Beschreibung der Änderung"
git push
```

→ Vercel/Netlify deployed automatisch die neue Version! (30-60 Sekunden)

**Preview Deployments:**
- Jeder Git Branch bekommt eine eigene Preview-URL
- Perfekt zum Testen vor Production

---

## 🆘 Troubleshooting

**Problem: "Repository not found"**
- Lösung: GitHub Repository ist private → In Vercel/Netlify GitHub App neu authorisieren

**Problem: "Build failed"**
- Lösung: Build Command leer lassen (keine Build-Step nötig!)

**Problem: "Images not loading"**
- Lösung: Prüfen ob Bild-Pfade korrekt sind (relativ: `images/...`)

**Problem: "SSL not working"**
- Lösung: Warten 5-10 Minuten nach Domain-Setup, SSL braucht Zeit

**Problem: "Domain not working"**
- Lösung: DNS-Propagation dauert bis zu 24h. Mit https://www.whatsmydns.net/ prüfen

---

## 📞 Support

**Vercel:**
- Dokumentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

**Netlify:**
- Dokumentation: https://docs.netlify.com
- Community: https://answers.netlify.com

---

**Status:** Ready for deployment! 🚀
**Letzte Aktualisierung:** 23. Januar 2026
