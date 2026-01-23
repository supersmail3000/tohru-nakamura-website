# Figma MCP Setup Anleitung

## Schritt 1: Figma Desktop App Vorbereitung

1. **Figma Desktop App öffnen**
2. **Dev Mode aktivieren:** Drücke `Shift + D` oder klicke auf "Dev Mode" in der oberen Leiste
3. **MCP Server aktivieren:**
   - Öffne das Inspect Panel (rechts)
   - Scrolle zur Sektion "MCP server"
   - Klicke auf "Enable desktop MCP server"
   - Der Server läuft dann auf `http://127.0.0.1:3845/mcp`

## Schritt 2: Cursor MCP Konfiguration

1. **Cursor Settings öffnen:**
   - Cursor → Settings → Features → MCP
   - Oder: `Cmd + ,` (Mac) / `Ctrl + ,` (Windows) → nach "MCP" suchen

2. **Neuen MCP Server hinzufügen:**
   - Klicke auf "+ Add New MCP Server" oder "+ Add New Global MCP Server"
   - Name: `Figma`
   - Transport Type: `http` (aus Dropdown auswählen)
   - URL: `http://127.0.0.1:3845/mcp`

3. **Speichern und Cursor neu starten:**
   - Einstellungen speichern
   - Cursor komplett neu starten (nicht nur Fenster schließen)

## Schritt 3: Verbindung testen

Nach dem Neustart sollte Figma MCP verfügbar sein. Die Verbindung funktioniert nur, wenn:
- Figma Desktop App läuft
- Dev Mode aktiviert ist
- MCP Server in Figma aktiviert ist
- Das Figma File geöffnet ist, das du verwenden möchtest

## Troubleshooting

- **MCP Server nicht erreichbar:** Stelle sicher, dass Figma Desktop App läuft und Dev Mode aktiv ist
- **Keine Tools verfügbar:** Cursor komplett neu starten nach der Konfiguration
- **Verbindung fehlgeschlagen:** Prüfe, ob die URL `http://127.0.0.1:3845/mcp` korrekt ist

## Nächste Schritte

Sobald Figma MCP konfiguriert ist, können wir:
- Design-Spezifikationen direkt aus Figma abrufen
- Farben, Typografie und Spacing automatisch extrahieren
- Komponenten-Strukturen analysieren
- Assets exportieren
