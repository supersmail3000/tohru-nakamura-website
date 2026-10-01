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

## Events (Tohru)

- `.event-date` mit `data-date="YYYY-MM-DD"`, vergangene werden per JS ausgeblendet.
  Trotzdem gelegentlich alte Termine aus dem HTML löschen. Leere Saison-Labels (`.season-label`) auch.
- Reserve-Buttons: OpenTable-Experience-Links, `target="_blank" rel="noopener noreferrer"`.

## Schließzeiten / Ticker

- Status-Ticker (`#countdown-display`) in `script.js` und `schreiberei-script.js`, Array `closures`
  in `updateCountdown()`. Bei neuen Schließzeiten **beide** JS-Dateien anpassen (EN/DE-Text)
  und die Liste unter „Closures" in `tohru.html` (`#reserve`).
- Öffnungszeiten: Tohru Di–Sa ab 19 Uhr. Bar Tatar Di–Fr 17–01, Sa 13–01, So/Mo zu.

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
