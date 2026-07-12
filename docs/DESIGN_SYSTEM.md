# Design System – mPasażer

System spójności wizualnej (Design System) i UX dla aplikacji webowej mPasażer. Zoptymalizowany pod kątem urządzeń mobilnych (Mobile-First) z zachowaniem nowoczesnej, luksusowej estetyki (Dark Mode, Glassmorphism, płynne mikro-animacje).

## 1. Paleta Kolorów (Color Palette)

Używamy palety HSL/HEX opartej na głębokich granatach i szarościach, z kontrastowymi akcentami budującymi zaufanie i czytelność w warunkach lotniskowych stresu.

| Rola koloru | HEX | Opis |
| :--- | :--- | :--- |
| **Background (Dark)** | `#0B0F19` | Główne tło aplikacji (głęboki, nocny granat). |
| **Surface (Card)** | `#1E293B` | Tło kart, sekcji (z opcjonalnym backdrop-filter dla efektu szkła). |
| **Primary Accent** | `#0EA5E9` | Kolor interaktywny (przyciski, linki, aktywne stany). |
| **Secondary Accent** | `#38BDF8` | Pomocniczy błękit (podświetlenia, focus). |
| **Alert/Warning** | `#F59E0B` | Statusy ostrzeżeń (np. opóźnienia, brak raportu PIR). |
| **Success** | `#10B981` | Prawidłowe statusy (np. spakowany bagaż, lot na czasie). |
| **Text Primary** | `#F8FAFC` | Główny czytelny tekst. |
| **Text Secondary** | `#94A3B8` | Teksty pomocnicze, opisy, labele. |

## 2. Typografia (Typography)

*   **Font główny**: **Outfit** lub **Inter** (importowane z Google Fonts).
*   **Nagłówki (Headings)**:
    *   `h1`: Bold, 24px (tytuły stron)
    *   `h2`: Semi-Bold, 20px (sekcje)
    *   `h3`: Medium, 16px (podsekcje, tytuły kart)
*   **Tekst akapitowy**: Regular, 14px (zoptymalizowany pod urządzenia mobilne).

## 3. Komponenty UI & Efekty (UI Components & Effects)

### Glassmorphism (Efekt szkła)
Karty w aplikacji powinny imitować półprzezroczyste szkło:
```css
background: rgba(30, 41, 59, 0.7);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

### Przyciski (Buttons)
*   **Primary Button**: Pełny błękit (`#0EA5E9`), zaokrąglony (`border-radius: 12px`), z delikatnym cieniem o kolorze akcentu.
*   **Secondary Button**: Półprzezroczysty z ramką (`border: 1px solid rgba(14, 165, 233, 0.4)`).
*   **Stany interakcji**:
    *   `hover`: Rozjaśnienie tła i delikatne powiększenie (`scale(1.02)`).
    *   `active/tap`: Skala w dół (`scale(0.97)`).

## 4. Mikro-animacje (Transitions)

*   Przejścia stanów: `transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);`
*   Animacje wejścia: Delikatny slide-up (przesunięcie w pionie z jednoczesnym opacity fade-in) dla nowo dodawanych elementów checklisty lub kart lotów.
