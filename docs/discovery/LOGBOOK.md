# Dziennik projektu (Logbook)

Rejestr kluczowych decyzji projektowych, ustaleń z sesji Discovery oraz zmian w architekturze i kierunku projektu.

## Rejestr zmian i decyzji (Dziennik)

### [2026-07-04] Inicjalizacja procesu Discovery
- Zdefiniowano strukturę plików procesu Discovery w katalogu `docs/discovery/`.
- **Definicja Celu Biznesowego i Core Pomysłu**:
  - **Cel Główny**: Pozyskiwanie leadów dla firmy **DelayFix** zajmującej się odszkodowaniami lotniczymi (opóźnienia, odwołania, bagaż) od pasażerów, biur podróży i agregatorów (eSky, Skyscanner, Kiwi).
  - **Core Pomysł 1 (Bagaż)**: Interaktywna checklista bagażowa pozwalająca na sfotografowanie/spisanie zawartości i zgłoszenie "one-click" roszczenia do DelayFix (z instrukcją dopełnienia procedur lotniskowych, np. raportu PIR).
  - **Core Pomysł 2 (Monitoring Lotów)**: Dodanie lotu do aplikacji i automatyczny monitoring statusu pod kątem kwalifikowania się do odszkodowania (np. opóźnienie > 3h, odwołanie lotu).

- **Ustalenia techniczno-projektowe (2026-07-04 - sesja 2)**:
  - **Typ Aplikacji**: Samodzielna aplikacja webowa (Mobile-First Web App).
  - **Uwierzytelnianie (Auth)**: Brak haseł i e-maili. Logowanie odbywa się wyłącznie za pomocą **numeru telefonu i jednorazowego kodu SMS (OTP)**. Cała komunikacja z klientem odbywa się telefonicznie.
  - **Flow Wejścia Pasażera (Partner Webhook)**:
    1. Partner (np. eSky) w swoim procesie zakupowym umieszcza checkbox "Dodaj lot do mPasażer".
    2. Po zaznaczeniu checkboxa partner wywołuje nasz backendowy **webhook** z danymi pasażera (telefon, dane lotu).
    3. Nasz backend tworzy konto/lot i wysyła pasażerowi SMS z linkiem do logowania.
    4. Pasażer loguje się kodem SMS i widzi już swój pre-konfigurowany lot w panelu mPasażer.
  - **UX Checklisty Bagażowej**:
    - Ręczne dodawanie przedmiotów na listę w wygodny sposób + funkcja robienia/dodawania zdjęć spakowanego bagażu i jego zawartości jako dowód.
    - Na tym etapie brak automatycznego odczytywania (OCR/AI) zawartości ze zdjęć, skupiamy się na czystym i szybkim UX.

- **Ustalenia z sesji grillowania (2026-07-04 - sesja 3)**:
  - **Uproszczony Login**: Brak alternatywnego logowania (np. kod rezerwacji + nazwisko) na MVP. Trzymamy się czystego SMS OTP jako jedynej ścieżki.
  - **Timing przypomnień PIR i Bazy Wiedzy**:
    - Pasażer po przylocie może nie mieć internetu (roaming wyłączony) lub być w dużym stresie.
    - **Rozwiązanie**: SMS z przypomnieniem o procedurach i linkiem do sekcji "Co warto wiedzieć po przylocie" jest wysyłany **1-2 godziny przed wylotem** (kiedy pasażer czeka przy gate i scrolluje telefon).
    - Te informacje (FAQ / baza wiedzy o PIR i procedurach) są stale widoczne w głównym pulpicie aplikacji.
  - **Komunikacja roszczeń (UX Wording)**:
    - Unikamy stwierdzeń typu "Należy Ci się 250 EUR".
    - Stosujemy miękkie, bezpieczne sformułowania typu: *"Twój lot kwalifikuje się do weryfikacji odszkodowania. Zgłoś sprawę jednym kliknięciem, a eksperci DelayFix bezpłatnie sprawdzą szczegóły i dadzą znać"*.

- **Ustalenia z weryfikacji makiety (2026-07-04 - sesja 4)**:
  - **Dane Osobowe**: Opcjonalne zbieranie danych osobowych (imię, nazwisko, adres) na etapie logowania lub w dedykowanej zakładce profilu w celu przyspieszenia późniejszej weryfikacji przez DelayFix.
  - **Kontrolki Symulacji (FAB)**: Panel testowy przeniesiony do pływającego przycisku (Floating Action Button - FAB) w prawym dolnym rogu ekranu makiety, otwierającego modal z opcjami symulacji.
  - **Tryb Jasny/Ciemny**: Wprowadzenie możliwości przełączania motywu graficznego (Light/Dark mode) dla użytkowników preferujących jaśniejsze interfejsy.
  - **Zgłoszenie Bagażu i wymóg dokumentacji**: Zgłoszenie bagażu wiąże się z terminami (np. 7 dni dla uszkodzenia, 21 dla opóźnienia) oraz bezwzględnym wymogiem dołączenia dokumentu PIR. Wdrożono konieczność wgrania skanu/zdjęcia raportu PIR przed wysłaniem zgłoszenia do DelayFix.
  - **Realizm Makiety**: Zmodyfikowano UI urządzenia mobilnego, aby imitowało interfejs przeglądarki Safari na iOS (widoczny pasek adresu URL oraz dolny pasek nawigacyjny przeglądarki).
