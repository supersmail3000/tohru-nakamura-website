# Zenchef Widget - User Flow & Integration

## 🎯 User Flow Diagram

```mermaid
flowchart TD
    Start[User besucht Tohru Website] --> Home[Home Section]
    Home --> NavReserve[User klickt Reserve]
    
    NavReserve --> ReserveSection[Reserve Section]
    ReserveSection --> ClickButton[User klickt Reserve a table Button]
    
    ClickButton --> OpenWidget[Zenchef Widget öffnet sich]
    OpenWidget --> WidgetLoaded{Widget geladen?}
    
    WidgetLoaded -->|Ja| SelectDate[User wählt Datum & Uhrzeit]
    WidgetLoaded -->|Nein| ErrorMsg[Error Message anzeigen]
    
    SelectDate --> SelectGuests[User wählt Anzahl Gäste]
    SelectGuests --> CheckAvail[Verfügbarkeit prüfen]
    
    CheckAvail -->|Verfügbar| EnterDetails[User gibt Details ein]
    CheckAvail -->|Nicht verfügbar| AlternativeTime[Alternative Zeiten anzeigen]
    
    AlternativeTime --> SelectDate
    
    EnterDetails --> ConfirmBooking[Reservierung bestätigen]
    ConfirmBooking --> Success[Erfolg! Bestätigung anzeigen]
    
    Success --> CloseWidget[Widget schließt sich]
    CloseWidget --> ThankYou[Thank you message]
    
    ErrorMsg --> RetryBtn[Retry Button]
    RetryBtn --> OpenWidget
    
    style Start fill:#d4af37
    style Success fill:#00ff00
    style ErrorMsg fill:#ff0000
    style OpenWidget fill:#cc0000
```

## 🎨 Integration Architecture

```mermaid
graph LR
    subgraph Website[Tohru Website]
        HTML[index.html]
        CSS[styles.css]
        JS[script.js]
    end
    
    subgraph ZenchefSDK[Zenchef SDK]
        SDK[ft.sdk.min.js]
        Widget[Widget Component]
        Analytics[Analytics Module]
    end
    
    subgraph Backend[Zenchef Backend]
        API[Zenchef API]
        Database[(Reservierungen)]
        Email[Email Service]
    end
    
    HTML -->|Lädt| SDK
    HTML -->|Enthält| Widget
    SDK -->|Initialisiert| Widget
    Widget -->|Sendet Daten| API
    API -->|Speichert| Database
    API -->|Sendet| Email
    Analytics -->|Tracked| GA[Google Analytics]
    
    style Widget fill:#cc0000
    style API fill:#d4af37
    style Database fill:#00ff00
```

## 📱 Button Actions Flow

```mermaid
sequenceDiagram
    participant User
    participant Button as Reserve Button
    participant Widget as Zenchef Widget
    participant API as Zenchef API
    participant Email as Email System
    
    User->>Button: Klickt Reserve a table
    Button->>Widget: Triggert #ft-open
    Widget->>Widget: Öffnet sich (Overlay)
    Widget->>API: Lädt verfügbare Zeiten
    API-->>Widget: Sendet Timeslots
    
    User->>Widget: Wählt Datum & Zeit
    User->>Widget: Gibt Details ein
    User->>Widget: Bestätigt Reservierung
    
    Widget->>API: POST /reservation
    API->>API: Validiert Daten
    API-->>Widget: 201 Created
    
    API->>Email: Sendet Bestätigung
    Email-->>User: Confirmation Email
    
    Widget->>Widget: Zeigt Erfolg
    Widget->>Widget: Schließt nach 3s
```

## 🔄 Gift Voucher Flow

```mermaid
flowchart TD
    GiftStart[User in Gift Section] --> GiftButton[Klickt Purchase Gift Voucher]
    GiftButton --> OpenShop[Widget öffnet mit Shop-View]
    
    OpenShop --> BrowseVouchers[User browst Gutscheine]
    BrowseVouchers --> SelectVoucher[Wählt Gutschein aus]
    
    SelectVoucher --> CustomAmount{Custom Amount?}
    CustomAmount -->|Ja| EnterAmount[User gibt Betrag ein]
    CustomAmount -->|Nein| FixedAmount[Fixed Amount ausgewählt]
    
    EnterAmount --> AddToCart[Zum Warenkorb hinzufügen]
    FixedAmount --> AddToCart
    
    AddToCart --> Checkout[Zur Kasse]
    Checkout --> Payment[Zahlungsdetails eingeben]
    Payment --> Process[Zahlung verarbeiten]
    
    Process -->|Erfolgreich| VoucherSuccess[Gutschein generiert]
    Process -->|Fehlgeschlagen| PaymentError[Payment Error]
    
    VoucherSuccess --> SendEmail[Email mit Gutschein-Code]
    SendEmail --> GiftComplete[Fertig!]
    
    PaymentError --> RetryPayment[Retry oder andere Methode]
    RetryPayment --> Payment
    
    style VoucherSuccess fill:#00ff00
    style PaymentError fill:#ff0000
    style AddToCart fill:#d4af37
```

## 🎭 Widget States

```mermaid
stateDiagram-v2
    [*] --> Closed: Initial State
    
    Closed --> Opening: Button Click
    Opening --> Open: SDK Loaded
    Opening --> Error: Load Failed
    
    Open --> Selecting: User interacts
    Selecting --> Confirming: Selection made
    Confirming --> Processing: Submit clicked
    
    Processing --> Success: Booking confirmed
    Processing --> Failed: Booking failed
    
    Success --> Closing: Auto-close after 3s
    Failed --> Selecting: User retries
    
    Open --> Closing: User clicks X
    Closing --> Closed: Animation complete
    
    Error --> Closed: Timeout
    
    Closed --> [*]
```

## 🚀 Implementation Steps

```mermaid
gantt
    title Zenchef Integration Timeline
    dateFormat  HH:mm
    axisFormat %H:%M
    
    section Setup
    SDK Script einfügen           :a1, 00:00, 2min
    Widget Container hinzufügen   :a2, after a1, 2min
    
    section Code Changes
    Reserve Button Update         :b1, after a2, 2min
    Gift Voucher Button Update    :b2, after b1, 2min
    Optional CSS Anpassungen      :b3, after b2, 3min
    
    section Testing
    Desktop Testing               :c1, after b3, 5min
    Mobile Testing                :c2, after c1, 5min
    Cross-Browser Testing         :c3, after c2, 5min
    
    section Verification
    Test Reservierung             :d1, after c3, 3min
    Backend Check                 :d2, after d1, 2min
    Analytics Verification        :d3, after d2, 3min
```

## 📊 Widget Configuration Options

| Option | Wert | Beschreibung | Empfehlung |
|--------|------|-------------|-----------|
| `data-restaurant` | `0b624972` | Restaurant ID | ✅ Erforderlich |
| `data-open` | `false` | Auto-Open beim Load | ✅ Aus lassen |
| `data-open-mobile` | `false` | Auto-Open Mobile | ✅ Aus lassen |
| `data-color` | `#d4af37` | Akzentfarbe | ✅ Gold (passend) |
| `data-language` | `de` | Widget-Sprache | ✅ Deutsch |
| `data-tag` | `tohru-website` | Tracking-Tag | ✅ Für Analytics |
| `data-toolbar` | `false` | Toolbar anzeigen | ✅ Aus (Button besser) |
| `data-toolbar-mobile` | `false` | Mobile Toolbar | ✅ Aus |

## 🎯 Integration Priorities

```mermaid
pie title Integration Features Priorität
    "Reserve Widget" : 40
    "Gift Vouchers" : 30
    "Analytics" : 15
    "Styling" : 10
    "Testing" : 5
```

## ✅ Success Metrics

Nach erfolgreicher Integration sollte folgendes funktionieren:

### Desktop
- [x] Widget öffnet bei Button-Click
- [x] Widget lädt in < 2 Sekunden
- [x] Reservierung kann durchgeführt werden
- [x] Gift Voucher Shop öffnet
- [x] Widget hat korrekte Farbe
- [x] Widget ist auf Deutsch
- [x] Widget kann geschlossen werden
- [x] Keine JavaScript-Errors

### Mobile
- [x] Widget öffnet fullscreen
- [x] Touch-optimiert
- [x] Keine Scroll-Probleme
- [x] Close-Button erreichbar
- [x] Formulare funktionieren

### Analytics (falls GA aktiv)
- [x] Widget Open Events getrackt
- [x] Reservierungen getrackt
- [x] E-Commerce Events getrackt

---

**Visual Documentation:** Flow Diagrams & Architecture  
**Status:** Ready for Implementation  
**Estimated Time:** 30 minutes  
**Complexity:** ⭐⭐☆☆☆ (Easy)
