# Lista zadań - mPasażer

## Wykonane zadania
- [x] Stworzenie podstawowej struktury katalogów i pliku README.md
- [x] Inicjalizacja procesu Discovery – stworzenie katalogu docs/discovery i plików
- [x] Sesja 1: Ustalenie celu biznesowego (DelayFix leads)
- [x] Sesja 2: Utworzenie pierwszego prototypu makiety (Dual-panel, Vanilla HTML/CSS/JS)
- [x] Sesja 3: Pytania "grillujące" i decyzje (tylko SMS OTP, brak haseł, timing powiadomień)
- [x] Sesja 4: Refaktoryzacja makiety (Profile, FAB test panel, Light/Dark mode, Safari UI, PIR Upload flow)

## TODO (Kolejne kroki)
1. **Analiza Danych Analitycznych / Trackingowych**:
   - Omówienie i dodanie znaczników / strategii analityki webowej dla prototypu (jakie zdarzenia chcemy śledzić, żeby DelayFix wiedziało, czy UI jest skuteczne).
2. **Architektura pod PWA (Progressive Web App)**:
   - Dodanie `manifest.json` oraz podstawowego Service Workera, aby symulacja była jeszcze bliższa natywnej aplikacji na urządzeniach mobilnych z opcją "Zainstaluj aplikację na ekranie głównym".
3. **Decyzje backendowe MVP (Firebase / Supabase)**:
   - Biorąc pod uwagę brak środowiska Node.js (zgodnie z poprzednimi sesjami), podjęcie decyzji czy korzystamy z usług BaaS (Backend as a Service) takich jak Firebase do obsługi autoryzacji SMS OTP oraz zapisywania leadów do DelayFix, aby zachować lekkość architektury bez konieczności utrzymywania własnego serwera z bazą danych na wczesnym etapie.
