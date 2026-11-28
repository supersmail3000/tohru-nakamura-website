# Schreiberei München — Website (Bar Tatar & Tohru)

Statische Website, gehostet auf Vercel, Repo: `supersmail3000/tohru-nakamura-website`.
Kein Build-Schritt. Push auf `main` = Deploy. Kommunikation mit Smail auf Deutsch.

## Seiten

| URL          | Datei              | CSS                      | JS                      | Sprache  |
|--------------|--------------------|--------------------------|-------------------------|----------|
| `/`          | `index.html`       | `landing-styles.css`     | –                       | DE       |
| `/tohru`     | `tohru.html`       | `styles.css`             | `script.js`             | EN       |
| `/bar-tatar` | `schreiberei.html` | `schreiberei-styles.css` | `schreiberei-script.js` | DE (Du)  |

Rewrites/Redirects in `vercel.json`. Beide Unterseiten sind Single-Page-Apps mit Hash-Navigation
(`#reserve`, `#menu`, `#events`, `#origin`, `#gift`, `#contact`, `#newsletter`, `#impressum`, `#datenschutz`).
Impressum und Datenschutz stehen als Abschnitte in beiden HTML-Dateien (Tohru EN, Bar Tatar DE).

## Feste Regeln

- **Beide Seiten gleich behandeln.** Struktur, Layout, Abstände, Animationen und JS-Logik sind auf
  Tohru und Bar Tatar identisch. Nur die Grundlagen unterscheiden sich (Farben, Typo, Texte).
  Jede Änderung an Größen/Abständen/Verhalten immer global in beiden CSS- bzw. JS-Dateien.
- **Nach jeder Änderung `git diff` prüfen**, nur gewollte Änderungen, dann committen.
- Vor dem Commit kurz zusammenfassen, was geändert wurde.

## Typografie

- Tohru: Work Sans (300/400/500/600), lokal in `fonts/`
- Bar Tatar: Orpheus Pro (`"orpheuspro"`, primär) + Work Sans (sekundär)

## Speisekarte aktualisieren

1. PDF lesen und mit dem HTML vergleichen: neue, entfernte und verschobene Gerichte, Preise,
   Beschreibungen, Reihenfolge. Dem Nutzer die Änderungen kurz auflisten.
2. HTML anpassen:
   - Bar Tatar: `#menu` in `schreiberei.html`, Kategorien Starters, Tatar Collection, Specials,
     Oysters, Sides, Brot. Struktur `.menu-item` > `.menu-item-header` (name/price) + `.menu-item-desc`.
   - Tohru: `.menu-course-list` in `tohru.html` (englische Karte), dazu `.menu-price`.
3. PDF ersetzen: `Menu-BarTatar.pdf` bzw. `Menu-Tohru-EN.pdf` + `Menu-Tohru-DE.pdf`.
4. PDF-Titel (Browser-Tab) setzen:
   - `Menu-BarTatar.pdf` → `Speisekarte — Bar Tatar`
   - `Menu-Tohru-EN.pdf` → `Menu Tohru — English`
   - `Menu-Tohru-DE.pdf` → `Menü Tohru — Deutsch`

   ```python
   import pikepdf, shutil, tempfile
   pdf = pikepdf.open(f)
   with pdf.open_metadata() as m: m['dc:title'] = title
   tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.pdf').name
   pdf.save(tmp); pdf.close(); shutil.move(tmp, f)   # nicht direkt überschreiben
   ```
5. Der Tohru-Menüpreis steht zusätzlich im JSON-LD (`hasMenu.offers.price` im `<head>` von `tohru.html`)
   und in `llms.txt`. Bei einer Preisänderung dort mitziehen.

`pikepdf` ist lokal nicht installiert. Alternative mit `pypdf`:
`PdfWriter(clone_from=PdfReader(f)).add_metadata({'/Title': title})`, dann schreiben und mit `pdfinfo` prüfen.

## Events (Tohru)

- `.event-date` mit `data-date="YYYY-MM-DD"`, vergangene werden per JS ausgeblendet.
  Trotzdem gelegentlich alte Termine aus dem HTML löschen. Leere Saison-Labels (`.season-label`) auch.
- Reserve-Buttons: OpenTable-Experience-Links, `target="_blank" rel="noopener noreferrer"`.

## Schließzeiten / Ticker

- Status-Ticker (`#countdown-display`) in `script.js` und `schreiberei-script.js`, Array `closures`
  in `updateCountdown()`. **Schließzeiten gelten pro Restaurant:** Tohru-Kreativpausen nur in
  `script.js` + Liste unter „Closures" in `tohru.html` (`#reserve`). Bar Tatar hat dann geöffnet,
  `schreiberei-script.js` nur anpassen, wenn Bar Tatar selbst schließt.
- Öffnungszeiten: Tohru Di–Sa ab 19 Uhr. Bar Tatar Di–Fr 17–01, Sa 13–01, So/Mo zu.
- Sonderzeiten (Feiertage, Jahreswechsel) stehen bei Tohru an vier Stellen: Ticker in `script.js`
  (`closures`, `extraOpenDays`, `lunchDays`), Block „Holiday Hours" in `tohru.html` (`#reserve`),
  `specialOpeningHoursSpecification` im JSON-LD von `tohru.html` und Abschnitt „Year-end hours" in `llms.txt`.
  Nach Ablauf alle vier wieder entfernen.

## Team-Portraits (Tohru, `#origin`)

- JPG, 800 px breit, Qualität ~82, in `images/portrait-*.jpg`. Name in `alt` und `.portrait-name`.

## Technik-Hinweise

- Newsletter: `api/subscribe.js` (Vercel Function) → Flodesk, Env `FLODESK_API_KEY`.
  Segmente `tohru` / `bartatar`. Formular-Handler inline am Ende der HTML-Dateien.
- Gutschein: gastronovi-Widget, Script muss im Wrapper `<div class="gift-widget">` stehen
  (sonst schiebt dessen `margin:auto` das Widget im Flex-Layout nach unten).
- Abschnitts-Animationen laufen nur mit `.animate-in` (setzt das JS beim Öffnen).
  Einblend-Animationen dürfen `transform` nicht per `forwards` blockieren, wenn Hover `transform` nutzt
  (dann `fadeInUpTranslate` verwenden).
- Bilder vor dem Einbau komprimieren. Keine Icons in voller Auflösung (Michelin-Stern: 128 px).
- Datenschutz nennt OpenTable, Flodesk, gastronovi, Vercel. Bei neuen Drittanbietern dort ergänzen
  (DE + EN) und das Datum „Stand" aktualisieren.
- Bar Tatar hat zwei Eingänge: Burgstraße 5 und Dienerstraße 20. Beide Adressen sind korrekt.
- SEO/GEO: Kanonische Domain ist `https://www.schreiberei-muc.de` (ohne `www` leitet um). Jede Seite hat
  eine unsichtbare H1 mit dem Restaurantnamen (`.visually-hidden` im Home-Bereich), die sichtbaren
  Abschnittstitel bleiben, wie sie sind. `llms.txt` im Root fasst die Fakten beider Restaurants für
  KI-Assistenten zusammen: bei geänderten Öffnungszeiten, Preisen, Kontaktdaten oder Teamwechseln mitpflegen.
  `sitemap.xml`: `lastmod` bei inhaltlichen Änderungen aktualisieren.
