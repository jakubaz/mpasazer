# mPasażer Backend Spec & Mock API

Część serwerowa (Backend) aplikacji mPasażer. Odpowiada za integrację z partnerami zewnętrznymi (eSky), wysyłanie powiadomień SMS oraz obsługę uwierzytelniania bezhasłowego (OTP).

## Planowane API (Specyfikacja techniczna)

### 1. Webhook Integracji Partnerskiej (eSky)
Używany przez partnera w momencie zaznaczenia przez klienta zgody przy zakupie biletu.
*   **Endpoint**: `POST /api/v1/partners/booking`
*   **Headers**: `Authorization: Bearer <PARTNER_TOKEN>`
*   **Payload**:
    ```json
    {
      "flightNumber": "LO379",
      "flightDate": "2026-07-04",
      "passenger": {
        "firstName": "Katarzyna",
        "lastName": "Kowalska",
        "phone": "+48501234567"
      }
    }
    ```
*   **Odpowiedź (Success 201 Created)**: Tworzy profil użytkownika i wpis lotu w bazie danych, a następnie wyzwala asynchronicznie proces wysyłki SMS powitalnego.

### 2. Autoryzacja SMS OTP (Passwordless Auth)
*   **Żądanie kodu OTP**: `POST /api/v1/auth/request-otp`
    *   Payload: `{"phone": "+48501234567"}`
    *   Działanie: Generuje 6-cyfrowy kod, zapisuje w cache (np. Redis z TTL 5 min) i wysyła przez bramkę SMS.
*   **Weryfikacja kodu OTP**: `POST /api/v1/auth/verify-otp`
    *   Payload: `{"phone": "+48501234567", "code": "982317"}`
    *   Działanie: Weryfikuje kod i zwraca token sesyjny JWT oraz profil użytkownika.

### 3. Wysyłanie spraw do DelayFix (CRM Lead Receiver)
*   **Endpoint**: `POST /api/v1/claims`
    *   Headers: `Authorization: Bearer <USER_JWT>`
    *   Payload (w zależności od typu roszczenia):
        *   Opóźnienie lotu: `{"claimType": "FLIGHT_DELAY", "flightId": "..."}`
        *   Zgubienie bagażu: `{"claimType": "BAGGAGE_LOSS", "items": ["Paszport", "Laptop"], "photoUrls": ["...", "..."]}`
