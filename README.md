# mPasażer – Dokumentacja Projektu

> **Prototyp UX/UI** aplikacji dla pasażerów linii lotniczych, zbudowany we współpracy z DelayFix.  
> Wersja dokumentacji: **1.3** · Ostatnia aktualizacja: **2026-07-18**

---

## Spis treści

1. [Opis projektu](#1-opis-projektu)
2. [Stos technologiczny](#2-stos-technologiczny)
3. [Architektura plików](#3-architektura-plików)
4. [System ekranów i widoków](#4-system-ekranów-i-widoków)
5. [Stan aplikacji (appState)](#5-stan-aplikacji-appstate)
6. [Funkcje i moduły](#6-funkcje-i-moduły)
7. [System designu (CSS)](#7-system-designu-css)
8. [Silnik danych lotów (Flight Engine)](#8-silnik-danych-lotów-flight-engine)
9. [Procesy użytkownika (User Flows)](#9-procesy-użytkownika-user-flows)
10. [Wdrożenie i CI/CD](#10-wdrożenie-i-cicd)
11. [Znane ograniczenia prototypu](#11-znane-ograniczenia-prototypu)
12. [Changelog](#12-changelog)

---

## 1. Opis projektu

**mPasażer** to interaktywny prototyp aplikacji mobilnej (web) dla pasażerów lotniczych, działającej pod marką **DelayFix**. Aplikacja ma na celu:

- umożliwienie pasażerom samodzielnego zarządzania lotami i dokumentowania bagażu,
- automatyczne generowanie leadów do systemu CRM DelayFix przy dodawaniu lotu,
- prowadzenie pasażera przez proces zgłoszenia roszczeń (opóźnienie, bagaż, overbooking),
- dostarczenie informacji o locie w czasie zbliżonym do rzeczywistego (docelowo: AviationStack API).

### Kontekst biznesowy

Aplikacja jest wdrożona jako **statyczna strona internetowa** (SPA bez frameworka), przeznaczona do użytku na urządzeniach mobilnych. Prototyp służy do prezentacji ścieżek użytkownika i walidacji konceptu przed wdrożeniem produkcyjnym.

### URL środowiska testowego

```
https://limegreen-whale-496449.hostingersite.com
```

---

## 2. Stos technologiczny

| Warstwa | Technologia | Uwagi |
|---|---|---|
| Markup | **HTML5** | Semantyczny, z atrybutami `aria-label` |
| Style | **Vanilla CSS** | Design tokens, CSS Custom Properties |
| Logika | **Vanilla JavaScript** (ES6+) | Brak frameworka, jeden plik `app.js` |
| Czcionka | **Outfit** (Google Fonts) | Wagi: 300, 400, 500, 600, 700 |
| Hosting | **Hostinger** (Static) | Katalog: `public_html` |
| Repozytorium | **GitHub** | `github.com/jakubaz/mpasazer`, gałąź `main` |
| Deployment | **Git → Hostinger** | Ręczny deploy przez hPanel + czyszczenie cache |

---

## 3. Architektura plików

```
mPasazer/
├── index.html        # Cała struktura HTML aplikacji (ekrany, widoki, modale)
├── index.css         # Design system, wszystkie style
├── app.js            # Cała logika aplikacji (stan, renderowanie, eventy)
├── .gitignore        # Ignorowane pliki (DS_Store, .antigravity/ itp.)
└── README.md         # Ta dokumentacja
```

### Dlaczego jeden plik JS?

Projekt jest prototypem – decyzja o braku bundlera (Webpack, Vite) była świadoma. Pozwala to na szybkie iteracje i edycję bezpośrednio przez GitHub lub panel hostingu bez procesu budowania.

---

## 4. System ekranów i widoków

Aplikacja jest zbudowana jako **Single Page Application** z trzema głównymi ekranami i dwoma widokami wewnętrznymi.

### Ekrany (`.screen`)

Widoczność ekranów kontrolowana jest przez klasę `active` oraz `display: flex/none`.

```
screen-login        → Ekran logowania (krok 1: telefon, krok 2: OTP)
screen-main-app     → Główna aplikacja (po zalogowaniu)
screen-success      → Ekran potwierdzenia po wysłaniu zgłoszenia
```

**Przełączanie ekranów:** `showScreen(targetScreen)` — ukrywa wszystkie, pokazuje wybrany.

### Widoki wewnętrzne (`.route-view`)

Widoki działają wewnątrz `screen-main-app`. Widoczność kontrolowana przez klasy `active` / `hidden`.

```
view-home           → Pulpit główny (lista lotów, profil, sprawy, FAQ)
view-flight-details → Szczegóły wybranego lotu (karta, checklista, roszczenia)
```

**Przełączanie widoków:** `showView(targetView)` — obsługuje też pasek nawigacji wstecz.

### Modale

Modale mają klasę `modal-overlay hidden`. Otwieranie = usunięcie klasy `hidden`.

```
modal-demo              → Panel testowy (symulacje zdarzeń)
modal-baggage-wizard    → Wizard zgłoszenia bagażowego (3 ekrany)
modal-disruption-wizard → Wizard zgłoszenia zakłócenia (overbooking / zmiana daty)
modal-add-flight        → Formularz ręcznego dodania lotu
modal-verification      → [Dynamiczny] Modal weryfikacji email/telefonu
```

---

## 5. Stan aplikacji (appState)

Cały stan aplikacji przechowywany jest w jednym globalnym obiekcie `appState` w `app.js`.

```javascript
let appState = {
    phone: '',                  // Numer telefonu z logowania (np. "+48 501 234 567")
    smsCode: '982317',          // Kod OTP do weryfikacji (stały w prototypie)
    isPurchaseSimulated: false, // Flaga symulacji zakupu (nieużywana aktywnie)
    activeFlightId: null,       // ID aktualnie otwartego lotu (null = widok home)
    activeFilter: 'all',        // Aktywny filtr listy lotów

    profile: {
        name: 'Jan Kowalski',               // Imię i nazwisko użytkownika
        email: 'jan.kowalski@example.com',  // Adres email
        phone: ''                           // Uzupełniany po zalogowaniu
    },

    flights: [ /* Tablica obiektów lotów */ ],
    claims:  [ /* Tablica obiektów spraw */ ]
};
```

### Struktura obiektu lotu

```javascript
{
    id: 1,                    // Unikalny identyfikator (Number)
    number: 'LO 379',         // Numer lotu (format: "XX 1234")
    routeFrom: 'WAW',         // Kod IATA lotniska wylotu
    routeTo: 'FRA',           // Kod IATA lotniska przylotu
    timeStart: '13:10',       // Planowana godzina wylotu (format "HH:MM")
    timeEnd: '15:00',         // Planowana godzina przylotu
    date: '04 Lipca 2026',    // Data lotu (format "DD Miesiąc YYYY" po polsku)
    status: 'pending',        // Status: 'pending' | 'delayed' | 'cancelled'
    checklist: [
        { id: 1, text: 'Paszport i dokumenty podróżne', checked: true }
    ],
    photos: []                // Tablica zdjęć bagażu (base64 strings)
}
```

### Struktura obiektu sprawy

```javascript
{
    id: 101,
    type: 'flight' | 'baggage' | 'overbooking',
    title: 'Weryfikacja opóźnienia lotu (LO 379)',
    date: '04.07.2026 15:30',
    status: 'sent' | 'rejected' | 'completed'
}
```

---

## 6. Funkcje i moduły

### Nawigacja

| Funkcja | Opis |
|---|---|
| `showScreen(targetScreen)` | Przełącza między ekranami logowania, aplikacji i sukcesu |
| `showView(targetView)` | Przełącza między widokiem Home a szczegółami lotu |
| `getActiveFlight()` | Zwraca obiekt lotu na podstawie `activeFlightId` |

### Renderowanie

| Funkcja | Opis |
|---|---|
| `renderFlightsList()` | Renderuje listę lotów z uwzględnieniem aktywnego filtra |
| `renderChecklist()` | Renderuje checklistę bagażową, aktualizuje licznik i stan przycisku |
| `renderPhotos()` | Renderuje siatkę zdjęć bagażu |
| `renderProfile()` | Wypełnia formularz profilu danymi z `appState` |
| `renderClaims()` | Renderuje listę spraw w sekcji "Moje sprawy" |
| `updateBaggageButtonVisibility()` | Odblokowuje przycisk zgłoszenia gdy checklista ukończona |

### Filtry lotów

Filtr przechowywany w `appState.activeFilter`. Możliwe wartości:

| Wartość | Opis | Logika |
|---|---|---|
| `'all'` | Wszystkie | Pomija loty starsze niż 7 dni (niebędące opóźnionymi) |
| `'pending'` | Zaplanowane | `status === 'pending'` i data >= dziś |
| `'delayed'` | Do odszkodowania | `status === 'delayed'` |
| `'archived'` | Archiwalne | Data przeszła (diffDays > 0) |

> **UWAGA:** Symulowana data "dziś" = `new Date(2026, 6, 18)` zakodowana w `renderFlightsList()`.  
> Przed produkcją zastąp przez `new Date()`.

### Funkcje pomocnicze

| Funkcja | Opis |
|---|---|
| `addMinutes(timeStr, minutes)` | Dodaje minuty do czasu "HH:MM", zwraca nowy czas |
| `parseFlightDate(dateStr)` | Parsuje polskie daty ("04 Lipca 2026") do obiektu `Date` |
| `addLog(message, type)` | Dodaje wpis do konsoli developerskiej (typy: `system`, `sms`, `webhook`) |

### showVerificationModal(channel, value)

Dynamicznie tworzy modal weryfikacji i wstrzykuje go do `document.body`.

- `channel`: `'email'` lub `'phone'`
- `value`: nowy adres / numer do weryfikacji
- Przycisk "Symuluj kliknięcie w link" faktycznie aktualizuje `appState` (prototyp)
- Po potwierdzeniu: toast z komunikatem sukcesu przez 3 sekundy
- Wskazówka w modalu: dla email = "Sprawdź SPAM", dla tel = "Sprawdź SMS"

---

## 7. System designu (CSS)

### Design Tokens (CSS Custom Properties w `:root`)

```css
/* Tła */
--bg-page, --bg-surface, --bg-header
--surface-card, --surface-border, --surface-input

/* Tekst */
--text-primary (#0F172A), --text-secondary (#64748B), --text-muted (#94A3B8)

/* Akcenty */
--primary-accent (#3B82F6), --primary-hover (#2563EB)

/* Statusy */
--success-color (#10B981), --warning-color (#F59E0B)
--danger-color (#EF4444), --danger-dark (#B91C1C)

/* Promienie */
--radius-sm (8px), --radius-md (12px), --radius-lg (16px), --radius-xl (24px)

/* Inne */
--transition (0.2s ease), --font ('Outfit'), --content-max (680px)
```

### Dark Mode

Aktywowany klasą `dark-mode` na `<body>`. Nadpisuje te same zmienne CSS nowymi wartościami.

### Klasy statusów

```css
.status-pending         → Niebieski (zaplanowany lot)
.status-delayed         → Czerwony (opóźniony lot)
.claim-status.sent      → Pomarańczowy (Wysłano)
.claim-status.rejected  → Czerwony (Odrzucono)
.claim-status.completed → Zielony (Zakończony)
```

### Przyciski

```css
.btn.btn-primary          → Główny (niebieski wypełniony)
.btn.btn-secondary-action → Drugorzędny (przezroczysty z obramowaniem)
.btn.btn-secondary-danger → Niebezpieczna akcja (czerwone tło)
.btn.btn-link             → Tekstowy
.btn-disabled / [disabled] → Szary, cursor: not-allowed
```

---

## 8. Silnik danych lotów (Flight Engine)

Moduł symuluje pobieranie danych z zewnętrznego API (ok. linia 1285 w `app.js`).

### Scenariusze symulacji

| Scenariusz | Opóźnienie | Efekt w UI |
|---|---|---|
| `'on-time'` | 0 | Status "Zaplanowany" |
| `'risk'` | 0 (ale poprzedni lot +75 min) | Ostrzeżenie rotacji samolotu |
| `'delayed'` | +95 min | Status "Opóźniony +1h 35min" |
| `'heavy-delay'` | +195 min | Status "Opóźniony +3h 15min" + baner odszkodowania |

Scenariusze dostępne przez panel testowy (przycisk ⚙️ w prawym dolnym rogu).

### Baner odszkodowania

Wyświetlany automatycznie gdy opóźnienie >= 180 min. Zawiera informację statyczną (brak przycisku – weryfikacja w tle przez DelayFix).

### Docelowa integracja produkcyjna

```javascript
// Zastąp buildSimulatedApiResponse() przez:
async function fetchFlightStatus(flightIata) {
    const res = await fetch(
        `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightIata}`
    );
    const data = await res.json();
    return data.data[0];
}
```

---

## 9. Procesy użytkownika (User Flows)

### 9.1 Logowanie SMS OTP

```
Wpisanie numeru telefonu
    → Symulacja wysłania SMS (kod prefillowany dla testów)
    → Weryfikacja kodu (stały: 982317 lub 123456)
    → Załadowanie pulpitu + inicjalizacja profilu
```

### 9.2 Dodawanie lotu

```
[+ Dodaj lot] → formularz (numer, PNR 6 znaków, nazwisko, data, godzina)
             → sekcja danych kontaktowych (prefillowana z profilu)
             → 1s symulacja API → dodanie do appState + log webhooka CRM
```

### 9.3 Zgłoszenie bagażowe (Wizard 3-krokowy)

```
Dostępny po ukończeniu checklisty (zdjęcia opcjonalne)

Krok 0: Wybór lokalizacji (przy taśmie / na lotnisku / poza lotniskiem)
Krok 1: Instrukcje kontekstowe (A/B/C) + "Mam PIR →"
Krok 2: Formularz PIR + opis bagażu + wartość > 800 PLN
        → Przekaż sprawę → Ekran sukcesu
```

### 9.4 Zgłoszenie zakłócenia (Overbooking / Zmiana daty)

```
[Inne problemy z lotem] → wybór typu
    → formularz (różny dla overbooking i zmiany daty) + opcjonalny upload
    → Przekaż sprawę → Ekran sukcesu
```

### 9.5 Weryfikacja zmiany danych kontaktowych

```
Edycja emaila lub telefonu w profilu → [Zapisz dane]
    → Modal z informacją o wysłanym linku / SMS
    → [Symuluj kliknięcie w link] → dane zaktualizowane + toast
```

---

## 10. Wdrożenie i CI/CD

### Środowisko

| Element | Wartość |
|---|---|
| Hosting | Hostinger (static) |
| Katalog web root | `public_html` |
| URL testowy | `limegreen-whale-496449.hostingersite.com` |
| Repozytorium | `github.com/jakubaz/mpasazer` (gałąź `main`) |

### Workflow wdrożenia (krok po kroku)

```bash
# 1. Wprowadź zmiany lokalnie
# 2. Commituj i pushuj
git add -A
git commit -m "opis: co i dlaczego zmieniono"
git push origin main

# 3. W hPanel Hostinger: Git → Deploy (ręczny deploy)
# 4. W hPanel Hostinger: Cache → Wyczyść cache serwera
# 5. Weryfikacja zmian na URL testowym
```

> ⚠️ **Krytyczne:** Hostinger cachuje pliki statyczne po stronie serwera. Bez czyszczenia cache zmiany NIE będą widoczne nawet po poprawnym deployu i twardym odświeżeniu przeglądarki.

### Po ręcznej edycji pliku (GitHub web / Hostinger File Manager)

```bash
# Synchronizuj lokalny projekt z GitHubem przed dalszą pracą:
git pull origin main
```

---

## 11. Znane ograniczenia prototypu

| Ograniczenie | Stan w prototypie | Wymagane produkcyjnie |
|---|---|---|
| Backend / baza danych | Brak – dane tracone po odświeżeniu | API REST + DB |
| Kod SMS | Stały: `982317` / `123456` | Integracja SMS (Twilio, SMSAPI) |
| CRM lead | Logowany do konsoli devtools | Webhook do CRM (HubSpot itp.) |
| Flight API | Dane generowane lokalnie | AviationStack API z kluczem |
| Weryfikacja email/tel | Przycisk "Symuluj" w modalu | Tokeny + deep-linki |
| Data "dziś" | Hardcoded: `new Date(2026, 6, 18)` | Zastąpić `new Date()` |
| Persystencja danych | Brak (reset po odświeżeniu) | localStorage lub sesja |
| Autentykacja | Brak (po odświeżeniu użytkownik wylogowany) | JWT / session cookie |

---

## 12. Changelog

> Aktualizuj tę sekcję przy każdej zmianie. Format: `### vX.Y — YYYY-MM-DD`

### v1.3 — 2026-07-18
- Weryfikacja zmiany emaila i telefonu przez modal z symulacją linku weryfikacyjnego
- Numer telefonu z logowania wyświetlany i edytowalny w profilu
- Odblokowanie przycisku zgłoszenia bagażowego po ukończeniu checklisty (zdjęcia opcjonalne)
- Zaktualizowane copy sekcji zdjęć bagażu: "(opcjonalnie)"
- Pasek "Dane na żywo" nie wyświetla "Odświeżam..." przy otwarciu szczegółów lotu
- Poprawka tekstu w modalu weryfikacji: SMS vs email
- Filtry lotów działają poprawnie

### v1.2 — 2026-07-18
- Sekcja "Moje dane kontaktowe" z formularzem profilu na pulpicie
- Planowana godzina wylotu w formularzu dodawania lotu
- Wysyłanie leada do CRM przy dodaniu lotu (symulacja webhook)
- Baner odszkodowania za lot: statyczna informacja (bez przycisku)
- Wskaźnik "⚠️ Dokończ checklistę bagażową" na kafelkach lotów
- Pytanie o wartość bagażu > 800 PLN w wizardzie bagażowym
- Filtry lotów (Wszystkie / Zaplanowane / Do odszkodowania / Archiwalne)
- Statusy spraw: Wysłano (pomarańczowy) / Odrzucono (czerwony) / Zakończony (zielony)

### v1.1 — 2026-07-10
- Wizard zgłoszenia bagażowego (3 ścieżki lokalizacyjne)
- Wizard zgłoszenia zakłócenia lotu (overbooking / zmiana daty)
- Silnik danych lotów z 4 scenariuszami symulacji
- Historyczny wskaźnik ryzyka opóźnienia
- Propagacja opóźnienia z poprzedniego lotu samolotu
- Upload zdjęć bagażu i dokumentów PIR
- Ekran potwierdzenia zgłoszenia

### v1.0 — 2026-07-10
- Logowanie SMS OTP (dwuetapowe)
- Lista lotów z kafelkami i statusami
- Checklista bagażowa z dodawaniem/usuwaniem przedmiotów
- Szczegóły lotu z kartą trasy
- Sekcja "Moje sprawy"
- FAQ accordion
- Dark / Light mode
- Ręczne i demo dodawanie lotów
- Panel testowy (FAB ⚙️)
- Deploy na Hostinger + integracja z GitHub

---

*Dokumentację należy aktualizować przy każdej zmianie funkcjonalnej: nowe feature, zmiana logiki biznesowej, modyfikacja struktury danych lub zmiana procesu wdrożenia.*
