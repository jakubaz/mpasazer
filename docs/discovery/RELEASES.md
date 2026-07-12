# Plany wydań (Releases)

Harmonogram wydań, zakres funkcjonalny MVP oraz kolejne fazy wdrożenia aplikacji.

## 1. Zakres MVP (Minimum Viable Product)
Cel MVP: Stworzenie działającej, samodzielnej aplikacji webowej (Mobile-First Web App) wraz z backendem, demonstrującej pełny przepływ pozyskiwania leadów dla DelayFix bez użycia e-maili i tradycyjnych haseł.

### Zakres funkcjonalny MVP:
*   **Uwierzytelnianie (Auth) & Komunikacja**:
    *   Logowanie bezhasłowe: Użytkownik podaje numer telefonu -> otrzymuje kod SMS OTP -> loguje się.
    *   Brak zbierania adresów e-mail, brak haseł.
*   **Integracja Webhooka z Partnerem (eSky)**:
    *   Endpoint API (Webhook) na backendzie mPasażer przyjmujący dane o zakupionym locie: imię, nazwisko, numer telefonu klienta, numer lotu, data lotu.
    *   Automatyczne utworzenie użytkownika w bazie i powiązanie z lotem po odebraniu webhooka.
    *   Wygenerowanie i wysłanie SMS-a (np. przez Twilio / mock w wersji dev) do użytkownika z powitaniem i linkiem do logowania po zakupie, a także drugiego SMS-a z linkiem do bazy wiedzy na 1-2 godziny przed wylotem.
*   **Bagaż (Checklista UX)**:
    *   Ręczna interaktywna checklista spakowanych rzeczy (czysty, szybki interfejs do szybkiego wpisywania).
    *   Dodawanie zdjęć walizki (zarówno zawartości, jak i wyglądu zewnętrznego) jako dowód.
    *   Moduł pomocy: Stała sekcja FAQ / baza wiedzy "Co warto wiedzieć po przylocie" (m.in. jak i gdzie zgłosić raport PIR).
    *   Przycisk "Zgłoś zgubiony bagaż do DelayFix" wysyłający wniosek ze spisem, zdjęciami i danymi kontaktowymi (One-Click Claim).
*   **Monitoring Lotów**:
    *   Domyślny widok pre-konfigurowanego lotu (po zalogowaniu użytkownik widzi lot dodany webhookiem).
    *   Możliwość ręcznego dodania lotu (numer lotu + data) bezpośrednio w aplikacji.
    *   Sprawdzanie statusu lotu pod kątem opóźnienia powyżej 3 godzin (we wczesnym MVP na mock-upach danych lub darmowym API typu Aviationstack).
    *   Powiadomienie w aplikacji: "Twój lot kwalifikuje się do bezpłatnej weryfikacji odszkodowania!".
    *   Przycisk "Zgłoś roszczenie za opóźniony lot do DelayFix" w celach weryfikacji (One-Click Claim).
*   **Backend & DelayFix Lead Receiver**:
    *   Baza danych (np. SQLite/PostgreSQL w zależności od setupu) do przechowywania profili użytkowników (numery telefonów), ich lotów, zawartości checklist bagażowych i powiązanych zdjęć.
    *   System przesyłania leadów do DelayFix: w MVP wysyłanie ustrukturyzowanej wiadomości e-mail/notyfikacji do konsultantów DelayFix lub zapis do prostej bazy CRM DelayFix.

---

## 2. Faza 1 (Rozwój po MVP)
*   **Pełna automatyzacja monitoringu**:
    *   Automatyczne powiadomienia PUSH o zmianach statusu lotu w czasie rzeczywistym.
    *   Integracja z profesjonalnym, produkcyjnym API lotniczym o wysokim SLA.
*   **Autofill i OCR**:
    *   Skanowanie kodów kreskowych z kart pokładowych (OCR lub czytnik kodów 2D) w celu automatycznego uzupełnienia danych lotu.
    *   OCR dokumentów (np. raportu PIR), aby pasażer mógł bezpośrednio załączyć go do zgłoszenia.
*   **Partnerstwo z biurami podróży**:
    *   Integracja z systemami eSky, Kiwi lub biurami podróży (importowanie rezerwacji bezpośrednio do aplikacji).

---

## 3. Faza 2 (Kolejne usprawnienia)
*   **Program lojalnościowy / poleceń**:
    *   System "Poleć znajomego, którego lot był opóźniony" – dodatkowe prowizje za udane leady.
    *   Śledzenie statusu sprawy odszkodowawczej w czasie rzeczywistym bezpośrednio w aplikacji mPasażer (komunikacja zwrotna z DelayFix).
