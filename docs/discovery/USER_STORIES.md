# Historyjki użytkownika (User Stories)

Zbiór historyjek użytkownika (User Stories) opisujących wymagania funkcjonalne z perspektywy person.

## 1. Epiki (Epics)

### Epik 1: Zarządzanie Bagażem i Checklista Przed Wylotem (Baggage & Checklist)
Cel: Umożliwienie pasażerowi udokumentowania spakowanego bagażu i zgłoszenia roszczenia w razie jego zgubienia lub uszkodzenia (szybki UX, ręczne dodawanie przedmiotów, wgrywanie zdjęć).

### Epik 2: Monitoring Lotów i Kwalifikacja Odszkodowań (Flight Monitoring)
Cel: Umożliwienie pasażerowi łatwego monitorowania statusu lotu oraz natychmiastowego zgłoszenia roszczenia, jeśli lot jest opóźniony/odwołany.

### Epik 3: Integracja z DelayFix i Systemami Partnerskimi (Integrations)
Cel: Pozyskiwanie danych lotów i użytkowników bezpośrednio od partnerów handlowych (np. eSky) oraz automatyczne przesyłanie sprawdzonych zgłoszeń roszczeniowych do DelayFix.

### Epik 4: Uwierzytelnianie Bezhasłowe i Komunikacja SMS (Passwordless Auth & SMS)
Cel: Uwierzytelnianie użytkowników wyłącznie na podstawie numeru telefonu za pomocą kodów SMS, eliminując hasła i e-maile.

---

## 2. Szczegółowe historyjki (User Stories)

### Epik 1: Bagaż i Checklista
*   **US-1.1 [Checklista pakowania]**: Jako *podróżny*, chcę łatwo i szybko tworzyć listę przedmiotów w mojej walizce (poprzez ręczne dopisywanie pozycji), aby upewnić się, że spakowałem wszystko i mieć spis zawartości.
*   **US-1.2 [Zdjęcia walizki]**: Jako *podróżny*, chcę zrobić i przypisać zdjęcia wyglądu zewnętrznego mojej walizki oraz jej spakowanej zawartości, aby stanowiły one dowód rzeczowy dla ubezpieczyciela lub DelayFix.
*   **US-1.3 [Zgłoszenie zgubionego bagażu - One-Click Claim]**: Jako *podróżny, którego bagaż zaginął*, chcę za pomocą jednego przycisku w aplikacji wysłać wniosek do DelayFix zawierający spis i zdjęcia walizki, aby firma mogła natychmiast rozpocząć dochodzenie roszczeń.
*   **US-1.4 [Instrukcja PIR i Baza Wiedzy]**: Jako *podróżny*, chcę mieć stały dostęp na pulpicie głównym do bazy wiedzy FAQ "Co warto wiedzieć po przylocie" (m.in. jak zgłosić raport PIR), oraz otrzymać SMS z linkiem do tej bazy na 1-2h przed wylotem (podczas oczekiwania przy gate), abym mógł przeczytać zasady zanim wyląduję i stracę dostęp do internetu.

### Epik 2: Monitoring Lotów
*   **US-2.1 [Przegląd pre-konfigurowanego lotu]**: Jako *podróżny logujący się po raz pierwszy*, chcę od razu po wejściu do aplikacji zobaczyć dane mojego lotu, który został dodany podczas zakupu u partnera (np. eSky), abym nie musiał wpisywać go ręcznie.
*   **US-2.2 [Dodawanie lotu ręcznie]**: Jako *podróżny*, chcę mieć możliwość ręcznego dodania innego lotu (numer lotu + data), jeśli nie został on dodany automatycznie przez partnera.
*   **US-2.3 [Weryfikacja kwalifikacji do odszkodowania]**: Jako *podróżny opóźnionego lotu*, chcę dowiedzieć się z aplikacji, że mój lot kwalifikuje się do bezpłatnej weryfikacji odszkodowania przez DelayFix, z jasnym wyjaśnieniem, że eksperci sprawdzą szczegóły techniczne i okoliczności, aby uniknąć fałszywych obietnic.
*   **US-2.4 [Zgłoszenie roszczenia za opóźnienie - One-Click Claim]**: Jako *podróżny opóźnionego lotu*, chcę jednym kliknięciem zainicjować proces odszkodowawczy z DelayFix, automatycznie przekazując dane mojego lotu i dane kontaktowe.

### Epik 3: Integracja z Partnerami i DelayFix
*   **US-3.1 [Odbiór webhooka od partnera]**: Jako *system mPasażer*, chcę odbierać webhooki od partnerów (np. eSky) z danymi pasażera (telefon, numer lotu, data, imię i nazwisko) po zaznaczeniu zgody przy zakupie, aby automatycznie utworzyć konto użytkownika i przypisać lot.
*   **US-3.2 [Przesyłanie leadów do DelayFix]**: Jako *system mPasażer*, chcę automatycznie przesyłać ustrukturyzowane dane zgłoszeń roszczeniowych (dane pasażera, lotu, zdjęcia i opis bagażu) do systemu DelayFix w celu podjęcia obsługi telefonicznej.

### Epik 4: Uwierzytelnianie Bezhasłowe i SMS
*   **US-4.1 [Link aktywacyjny w SMS]**: Jako *podróżny*, po zakupie biletu u partnera chcę otrzymać powitalną wiadomość SMS z linkiem aktywacyjnym mPasażer, a na 1-2h przed wylotem kolejną z linkiem bezpośrednio do bazy wiedzy.
*   **US-4.2 [Logowanie kodem SMS]**: Jako *podróżny*, chcę zalogować się do aplikacji podając swój numer telefonu i jednorazowy kod SMS (OTP), aby proces logowania był maksymalnie szybki i bezpieczny, bez konieczności pamiętania hasła.
*   **US-4.3 [Brak danych e-mail]**: Jako *podróżny*, chcę korzystać z aplikacji bez podawania adresu e-mail, wiedząc, że cała komunikacja ze mną (w tym proces roszczeń) będzie prowadzona wyłącznie telefonicznie.

---

## 3. Kryteria akceptacji (Acceptance Criteria) - Przykład dla US-4.2
*   Wpisanie numeru telefonu inicjuje wysyłkę kodu SMS. Kod musi składać się z 6 cyfr i być ważny przez 5 minut.
*   Błędne wpisanie kodu 3 razy pod rząd blokuje możliwość ponownego wysłania kodu na ten numer na 15 minut (ochrona przed spamem/brute-force).
*   Po pomyślnej weryfikacji kodu użytkownik jest przekierowywany bezpośrednio do widoku głównego ze swoim przypisanym lotem (brak formularza rejestracji, profil tworzy się w tle).
