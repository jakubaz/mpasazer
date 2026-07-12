# mPasażer – Prototyp UX/UI (Frontend)

Interaktywna makieta i prototyp interfejsu (UX/UI) mPasażer połączona z symulatorem zakupowym eSky.

## Jak uruchomić prototyp?

1.  Otwórz plik `index.html` bezpośrednio w dowolnej nowoczesnej przeglądarce (Safari, Chrome, Edge) na swoim komputerze.
2.  Makieta jest w pełni samodzielna (nie wymaga internetu ani serwera Node.js). Wszystkie symulowane zdarzenia backendowe (webhooki, kody SMS) pojawiają się w dzienniku zdarzeń po lewej stronie ekranu.

## Instrukcja demonstracyjna dla DelayFix

1.  **Krok 1 (Zakup)**: Na lewym panelu zobaczysz podsumowanie lotu na eSky. Wpisz swój numer telefonu, zaznacz zgodę "Dodaj lot do mPasażer" i kliknij **Rezerwuj lot i aktywuj mPasażer**.
2.  **Krok 2 (Odebranie SMS)**: Na środku u góry ekranu pojawi się symulowane powiadomienie SMS z linkiem aktywacyjnym. Kliknij niebieski link **Zaloguj się**.
3.  **Krok 3 (Uproszczone Logowanie)**: Przeglądarka w telefonie po prawej stronie otworzy ekran OTP z wpisanym już kodem weryfikacyjnym. Kliknij **Zaloguj i przejdź do lotu**.
4.  **Krok 4 (Pulpit główny)**: Zobaczysz pulpit pasażera. Możesz tu:
    *   Dodawać przedmioty do checklisty i oznaczać je jako spakowane.
    *   Kliknąć **Dodaj zdjęcie** pod checklistą, aby wgrać rzeczywiste zdjęcie walizki z dysku i zobaczyć podgląd.
    *   Kliknąć żółty przycisk **Zasymuluj Opóźnienie (>3h)** w panelu testowym makiety – zobaczysz, jak karta lotu zmienia status i pojawia się czerwony baner z przyciskiem **Zleć weryfikację jednym kliknięciem**.
    *   Rozwinąć sekcję FAQ (baza wiedzy o PIR i odszkodowaniach) u dołu ekranu.
5.  **Krok 5 (Konwersja leadu)**: Kliknięcie przycisku zgłoszenia opóźnionego lotu lub zgłoszenia zgubienia bagażu natychmiast wyśle dane do DelayFix i pokaże ekran sukcesu z informacją o nadchodzącym kontakcie telefonicznym.
