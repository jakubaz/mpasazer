# Metodologia "Grillowania" Pomysłów (Interactive Grilling Framework)

Dokument ten definiuje zestaw technik i pytań, których AI używa do krytycznej analizy i kwestionowania pomysłów projektowych zgłaszanych przez użytkownika. Celem jest wyciągnięcie maksymalnej wartości biznesowej, wykrycie luk w UX i uszczelnienie procesów przed napisaniem pierwszej linii kodu.

## Złote zasady "Grillowania"

1.  **Kwestionuj oczywistości (Challenge the Obvious)**: Nie przyjmuj założeń na wiarę. Pytaj o alternatywy (np. "Dlaczego SMS OTP, a nie Magic Link?", "Co jeśli użytkownik nie ma zasięgu na lotnisku?").
2.  **Scenariusze skrajne (Edge Cases First)**: Skupiaj się na tym, co może pójść źle (brak internetu, zgubiony telefon, rozładowana bateria, odrzucenie wniosku, brak dokumentu PIR).
3.  **Optymalizacja pod cel biznesowy (Business Focus)**: Każda funkcja musi wspierać pozyskiwanie leadów dla DelayFix. Jeśli funkcja nie konwertuje, kwestionuj jej obecność w MVP.
4.  **Bariery wejścia (Friction Analysis)**: Analizuj każdy krok użytkownika pod kątem zmęczenia (UX Friction). Dąż do minimalizacji kliknięć i formularzy.

## Schemat Pytań Krytycznych (Grilling Checklist)

*   **Cel Biznesowy**: Jak ta funkcja przekłada się na to, że DelayFix dostanie poprawnego leada?
*   **UX / Użyteczność**: Co robi pasażer, gdy jest zestresowany na lotnisku? Czy ten ekran jest dla niego wtedy czytelny?
*   **Techniczne ryzyko**: Czy to rozwiązanie nie jest zbyt skomplikowane na MVP? Czy możemy to uprościć za pomocą makiet/mocków?
*   **Zgodność prawna/proceduralna**: Czy pasażer ma świadomość, jakie kroki prawne musi podjąć (np. pobranie PIR), by DelayFix mógł wygrać sprawę?
