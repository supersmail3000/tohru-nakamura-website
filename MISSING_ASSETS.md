# Fehlende Assets für Launch

Diese Assets müssen noch erstellt/beschafft werden:

## 1. Favicon-Dateien

Die folgenden Favicon-Dateien werden im HTML referenziert, fehlen aber noch:

- `favicon-16x16.png` (16x16 px)
- `favicon-32x32.png` (32x32 px)
- `apple-touch-icon.png` (180x180 px)
- `android-chrome-192x192.png` (192x192 px)
- `android-chrome-512x512.png` (512x512 px)

**Empfehlung:** 
- Tool nutzen: https://realfavicongenerator.net/
- Oder: https://favicon.io/
- Einfach das Hero-Image oder Logo hochladen

## 2. OG (Open Graph) Image

Für Social Media Previews (Facebook, Twitter, LinkedIn):

- `og-image.jpg` (1200x630 px)
- Sollte zeigen: Restaurant-Ambiente, Dish, oder Chef Tohru

**Aktuell:** Hero-Image wird verwendet (sollte aber optimiert werden)

## 3. Formitable/Zenchef Integration

**Benötigt:**
- Zenchef Account-Details / Restaurant ID
- Widget Embed-Code
- Oder: API Keys

**Kontakt:** Zenchef Support oder Restaurant-Team fragen

## 4. Newsletter Service

**Empfehlung:** Mailchimp
- Account erstellen: mailchimp.com
- Audience erstellen
- Embed-Form Code kopieren
- In Newsletter-Section (#journal) einfügen

**Aktuell:** Email-Link als temporäre Lösung

## 5. Analytics

**Empfehlung:** 
- Google Analytics 4 (kostenlos)
- ODER Plausible (privacy-friendly, €9/Monat)

**Setup:**
1. Account erstellen
2. Tracking ID erhalten
3. Code im `<head>` einfügen

## 6. Impressum & Datenschutzerklärung

**Rechtlich erforderlich in Deutschland (DSGVO):**

- Impressum (Pflichtangaben)
- Datenschutzerklärung (Privacy Policy)

**Generator nutzen:**
- https://www.e-recht24.de/impressum-generator.html
- https://www.e-recht24.de/muster-datenschutzerklaerung.html

**Als neue Sections hinzufügen:**
- Footer-Link zu `/impressum.html`
- Footer-Link zu `/datenschutz.html`

## Priorität

**Vor Launch (Kritisch):**
1. ✅ Bilder optimiert (erledigt!)
2. ❌ Favicon-Dateien (5 Minuten mit Tool)
3. ❌ Formitable Widget (warten auf Account-Details)

**Vor Launch (Wichtig):**
4. ❌ Impressum & Datenschutz (rechtlich erforderlich!)
5. ❌ OG-Image (optional, aber empfohlen)

**Nach Launch (Optional):**
6. ❌ Newsletter Service (Mailchimp)
7. ❌ Analytics (Google Analytics oder Plausible)

---

**Status:** Aktualisiert am 23. Januar 2026
