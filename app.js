// Aplikacja mPasażer - Interaktywny Prototyp UX/UI

// Stan aplikacji
let appState = {
    phone: '',
    smsCode: '982317',
    isPurchaseSimulated: false,
    activeFlightId: null,
    activeFilter: 'all',
    profile: {
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
        phone: ''
    },
    flights: [
        {
            id: 1,
            number: 'LO 379',
            routeFrom: 'WAW',
            routeTo: 'FRA',
            timeStart: '13:10',
            timeEnd: '15:00',
            date: '04 Lipca 2026',
            status: 'pending',
            checklist: [
                { id: 1, text: 'Paszport i dokumenty podróżne', checked: true },
                { id: 2, text: 'Ładowarka do telefonu i powerbank', checked: true },
                { id: 3, text: 'Lekarstwa pierwszej potrzeby', checked: true },
                { id: 4, text: 'Ubrania na 5 dni', checked: true }
            ],
            photos: []
        },
        {
            id: 2,
            number: 'W6 1302',
            routeFrom: 'LTN',
            routeTo: 'WAW',
            timeStart: '18:45',
            timeEnd: '22:15',
            date: '17 Lipca 2026',
            status: 'delayed',
            checklist: [
                { id: 1, text: 'Paszport i dokumenty podróżne', checked: false },
                { id: 2, text: 'Lekarstwa', checked: false }
            ],
            photos: []
        },
        {
            id: 3,
            number: 'LH 1614',
            routeFrom: 'MUC',
            routeTo: 'WAW',
            timeStart: '10:30',
            timeEnd: '12:00',
            date: '24 Lipca 2026',
            status: 'pending',
            checklist: [
                { id: 1, text: 'Paszport', checked: true },
                { id: 2, text: 'Bilety', checked: false }
            ],
            photos: []
        }
    ],
    claims: [
        {
            id: 101,
            type: 'flight',
            title: 'Weryfikacja opóźnienia lotu (LO 379)',
            date: '04.07.2026 15:30',
            status: 'completed'
        },
        {
            id: 102,
            type: 'baggage',
            title: 'Roszczenie bagażowe: Zniszczony bagaż',
            date: '10.07.2026 12:15',
            status: 'rejected'
        },
        {
            id: 103,
            type: 'overbooking',
            title: 'Zakłócenie: Odszkodowanie za Overbooking',
            date: '17.07.2026 10:45',
            status: 'sent'
        }
    ]
};

// Selektory DOM
const logConsole = document.getElementById('log-console');
const smsAlert = document.getElementById('sms-notification');
const smsLinkTrigger = document.getElementById('sms-link-trigger');

// Ekrany
const screenLogin = document.getElementById('screen-login');
const screenMainApp = document.getElementById('screen-main-app');
const screenSuccess = document.getElementById('screen-success');

// Widoki
const viewHome = document.getElementById('view-home');
const viewFlightDetails = document.getElementById('view-flight-details');
const btnBackHome = document.getElementById('btn-back-home');
const appBackNavBar = document.getElementById('app-back-nav-bar');
const flightsListContainer = document.getElementById('flights-list-container');
const btnAddDemoFlight = document.getElementById('btn-add-demo-flight');
const detailFlightNo = document.getElementById('detail-flight-no');

// Logowanie
const loginStepPhone = document.getElementById('login-step-phone');
const loginStepOtp = document.getElementById('login-step-otp');
const loginPhoneInput = document.getElementById('login-phone');
const loginOtpInput = document.getElementById('login-otp');
const btnSendOtp = document.getElementById('btn-send-otp');
const btnVerifyOtp = document.getElementById('btn-verify-otp');
const btnResendOtp = document.getElementById('btn-resend-otp');
const userPhoneDisplay = document.getElementById('user-phone-display');
const btnLogout = document.getElementById('btn-logout');

// Pulpit
const flightStatusBadge = document.getElementById('flight-status-badge');
const flightClaimBanner = document.getElementById('flight-claim-banner');
const btnClaimBaggage = document.getElementById('btn-claim-baggage');

// Demo
const btnDemoDelay = document.getElementById('btn-demo-delay');
const btnDemoResetFlight = document.getElementById('btn-demo-reset-flight');

// Checklista
const checklistUl = document.getElementById('checklist-ul');
const checklistProgress = document.getElementById('checklist-progress');
const newItemNameInput = document.getElementById('new-item-name');
const btnAddItem = document.getElementById('btn-add-item');

// Zdjęcia
const btnUploadPhoto = document.getElementById('btn-upload-photo');
const fileInput = document.getElementById('file-input');
const photosGrid = document.getElementById('photos-grid');

// Motyw
const appLogo = document.getElementById('app-logo');
const btnThemeToggle = document.getElementById('btn-theme-toggle');

// Profil
const profileNameInput = document.getElementById('profile-name');
const profileEmailInput = document.getElementById('profile-email');
const profilePhoneInput = document.getElementById('profile-phone');
const btnSaveProfile = document.getElementById('btn-save-profile');

// FAB i Modal
const btnFabDemo = document.getElementById('btn-fab-demo');
const modalDemo = document.getElementById('modal-demo');
const btnCloseDemoModal = document.getElementById('btn-close-demo-modal');

// Modal: Dodaj Lot
const btnAddFlightManual = document.getElementById('btn-add-flight-manual');
const modalAddFlight = document.getElementById('modal-add-flight');
const btnCloseFlightModal = document.getElementById('btn-close-flight-modal');
const btnConfirmAddFlight = document.getElementById('btn-confirm-add-flight');
const manualFlightNoInput = document.getElementById('manual-flight-no');
const manualFlightPnrInput = document.getElementById('manual-flight-pnr');
const manualPassengerLastnameInput = document.getElementById('manual-passenger-lastname');
const manualFlightDateInput = document.getElementById('manual-flight-date');
const manualFlightTimeInput = document.getElementById('manual-flight-time');
const manualContactNameInput = document.getElementById('manual-contact-name');
const manualContactEmailInput = document.getElementById('manual-contact-email');
const manualContactPhoneInput = document.getElementById('manual-contact-phone');
const manualContactConfirmInput = document.getElementById('manual-contact-confirm');

// Wizard Bagaż
const modalBaggageWizard = document.getElementById('modal-baggage-wizard');
const btnCloseWizard = document.getElementById('btn-close-wizard');

// Wizard Zakłócenia Lotu
const btnReportOverbooking = document.getElementById('btn-report-overbooking');
const btnReportDateChange = document.getElementById('btn-report-date-change');
const modalDisruptionWizard = document.getElementById('modal-disruption-wizard');
const btnCloseDisruptionWizard = document.getElementById('btn-close-disruption-wizard');
const disruptionWizardTitle = document.getElementById('disruption-wizard-title');
const disruptionFormOverbooking = document.getElementById('disruption-form-overbooking');
const disruptionFormDateChange = document.getElementById('disruption-form-date-change');
const disruptionBtnUpload = document.getElementById('disruption-btn-upload');
const disruptionFileInput = document.getElementById('disruption-file-input');
const disruptionUploadLabel = document.getElementById('disruption-upload-label');
const disruptionUploadOk = document.getElementById('disruption-upload-ok');
const btnSubmitDisruption = document.getElementById('btn-submit-disruption');

// Ekran Sukcesu
const btnSuccessBack = document.getElementById('btn-success-back');
const successCaseType = document.getElementById('success-case-type');
const successPhone = document.getElementById('success-phone');

// Moje Sprawy
const claimsListContainer = document.getElementById('claims-list-container');
const emptyClaimsMsg = document.getElementById('empty-claims-msg');

// ==========================================================================
// FUNKCJE POMOCNICZE
// ==========================================================================

function addLog(message, type = 'system') {
    if (!logConsole) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${time}] ${message}`;
    logConsole.appendChild(entry);
}

// Przełączanie głównych ekranów (Login / Main App / Success)
function showScreen(targetScreen) {
    [screenLogin, screenMainApp, screenSuccess].forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    targetScreen.style.display = 'flex';
    targetScreen.classList.add('active');
    window.scrollTo(0, 0);
}

// Przełączanie widoków wewnętrznych (Home / Flight Details)
function showView(targetView) {
    [viewHome, viewFlightDetails].forEach(v => {
        v.classList.remove('active');
        v.classList.add('hidden');
    });
    targetView.classList.add('active');
    targetView.classList.remove('hidden');

    const appMain = document.getElementById('app-scrollable-container');
    if (appMain) appMain.scrollTop = 0;
    window.scrollTo(0, 0);

    if (targetView === viewFlightDetails) {
        appBackNavBar.classList.remove('hidden');
    } else {
        appBackNavBar.classList.add('hidden');
    }
}

// Pobieranie aktywnego lotu
function getActiveFlight() {
    return appState.flights.find(f => f.id === appState.activeFlightId);
}

// ==========================================================================
// RENDEROWANIE LISTY LOTÓW
// ==========================================================================

function renderFlightsList() {
    flightsListContainer.innerHTML = '';
    
    // Filtrowanie lotów
    const today = new Date(2026, 6, 18); // Simulated date: 18 Lipca 2026
    
    const filteredFlights = appState.flights.filter(flight => {
        const flightDate = parseFlightDate(flight.date);
        const diffTime = today - flightDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const isOldArchive = diffDays > 7 && flight.status !== 'delayed';
        
        switch (appState.activeFilter) {
            case 'pending':
                // Zaplanowany: status pending i data dzisiaj lub w przyszłości (diffDays <= 0)
                return flight.status === 'pending' && diffDays <= 0;
            case 'delayed':
                // Do odszkodowania: status delayed
                return flight.status === 'delayed';
            case 'archived':
                // Archiwalne: starsze niż dzisiaj
                return diffDays > 0;
            case 'all':
            default:
                // Nie pokazujemy starych archiwalnych na głównym pulpicie
                return !isOldArchive;
        }
    });
    
    if (filteredFlights.length === 0) {
        flightsListContainer.innerHTML = '<div class="empty-claims">Brak lotów w tej kategorii.</div>';
        return;
    }
    
    filteredFlights.forEach(flight => {
        const item = document.createElement('div');
        item.className = 'flight-list-item';
        
        const flightDate = parseFlightDate(flight.date);
        const diffTime = today - flightDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let statusClass = 'status-pending';
        let statusText = 'Zaplanowany';
        let badgeHtml = '';
        
        if (flight.status === 'delayed') {
            statusClass = 'status-delayed';
            statusText = 'Opóźniony';
            badgeHtml = `<span style="font-size: 10px; font-weight: 700; background: rgba(139, 92, 246, 0.15); color: #C084FC; padding: 2px 8px; border-radius: 10px; margin-left: 8px;">Możliwe odszkodowanie</span>`;
        } else if (diffDays > 0) {
            statusClass = 'status-pending'; // szary/neutralny dla archiwum
            statusText = 'Zakończony';
        }
        
        // Wskaźnik checklisty bagażowej
        const uncheckedCount = flight.checklist.filter(c => !c.checked).length;
        const checklistPrompt = uncheckedCount > 0 
            ? `<div class="flight-list-checklist-prompt" style="font-size: 11px; color: #F59E0B; margin-top: 4px; font-weight: 600;">⚠️ Dokończ checklistę bagażową</div>` 
            : '';
        
        item.innerHTML = `
            <div class="flight-list-details">
                <span class="flight-list-number">LOT ${flight.number} ${badgeHtml}</span>
                <span class="flight-list-route">${flight.date} • ${flight.routeFrom} ➔ ${flight.routeTo}</span>
                ${checklistPrompt}
            </div>
            <span class="flight-list-status ${statusClass}">${statusText}</span>
        `;
        
        item.addEventListener('click', () => {
            openFlightDetailsWithRefresh(flight.id);
        });
        
        flightsListContainer.appendChild(item);
    });
}

// Obsługa kliknięć filtrów
const filtersBar = document.getElementById('flight-filters-bar');
if (filtersBar) {
    filtersBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        
        filtersBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        appState.activeFilter = btn.dataset.filter;
        renderFlightsList();
    });
}

function openFlightDetails(flightId) {
    appState.activeFlightId = flightId;
    const flight = getActiveFlight();
    if (!flight) return;
    
    // Zmiana danych w nagłówku szczegółów
    detailFlightNo.textContent = `LOT ${flight.number}`;
    const badge = document.getElementById('flight-status-badge');
    badge.textContent = flight.status === 'pending' ? 'Zaplanowany' : 'Opóźniony';
    badge.className = `flight-status ${flight.status === 'pending' ? 'status-pending' : 'status-delayed'}`;
    
    // Zmiana trasy
    const routePoints = document.querySelectorAll('#main-flight-card .route-point');
    if(routePoints.length >= 2) {
        routePoints[0].querySelector('.time-planned').textContent = flight.timeStart;
        routePoints[0].querySelector('.airport-code').textContent = flight.routeFrom;
        routePoints[1].querySelector('.time-planned').textContent = flight.timeEnd;
        routePoints[1].querySelector('.airport-code').textContent = flight.routeTo;
    }
    
    // Pokaż/ukryj baner odszkodowawczy
    if(flight.status === 'delayed') {
        flightClaimBanner.classList.remove('hidden');
    } else {
        flightClaimBanner.classList.add('hidden');
    }
    
    // Renderowanie powiązanej checklisty i zdjęć
    renderChecklist();
    renderPhotos();
    
    addLog(`Otwarto szczegóły lotu ${flight.number}.`, 'system');
    showView(viewFlightDetails);
}

function openFlightDetailsWithRefresh(flightId) {
    openFlightDetails(flightId);
    // Ustaw statyczny stan paska "na żywo" od razu (bez kręcenia spinnera)
    updateLiveBar('ok');
    // Auto-refresh uruchamiamy z opóźnieniem
    startFlightAutoRefresh();
}

// Dodawanie testowego lotu z FAB (lub przycisku)
btnAddDemoFlight.addEventListener('click', () => {
    const newId = appState.flights.length > 0 ? Math.max(...appState.flights.map(f => f.id)) + 1 : 1;
    appState.flights.push({
        id: newId,
        number: 'W6 1302',
        routeFrom: 'LTN',
        routeTo: 'WAW',
        timeStart: '18:45',
        timeEnd: '22:15',
        date: '05 Lipca 2026',
        status: 'pending',
        checklist: [
            { id: 1, text: 'Paszport i dokumenty podróżne', checked: false },
            { id: 2, text: 'Lekarstwa', checked: false }
        ],
        photos: []
    });
    renderFlightsList();
    addLog(`Dodano symulowany lot W6 1302 do listy.`, 'system');
});

// Kliknięcie w link w SMS toast
if (smsLinkTrigger) {
    smsLinkTrigger.addEventListener('click', () => {
        smsAlert.classList.remove('show');
        loginStepPhone.classList.add('hidden');
        loginStepOtp.classList.remove('hidden');
        loginOtpInput.value = appState.smsCode;
        showScreen(screenLogin);
    });
}
setTimeout(() => {
    if (smsAlert && smsAlert.classList.contains('show')) smsAlert.classList.remove('show');
}, 8000);


// ==========================================================================
// PROCES LOGOWANIA (W TELEFONIE)
// ==========================================================================

// Krok 1: Wpisanie numeru i wysłanie OTP (ścieżka ręczna)
btnSendOtp.addEventListener('click', () => {
    const rawPhone = loginPhoneInput.value.trim();
    if (!rawPhone) {
        alert('Podaj numer telefonu!');
        return;
    }
    appState.phone = `+48 ${rawPhone}`;
    
    addLog(`Użytkownik zażądał kodu SMS OTP na numer ${appState.phone}`, 'system');
    
    setTimeout(() => {
        addLog(`SMS OTP wysłany. Kod autoryzacyjny: ${appState.smsCode}`, 'sms');
        loginStepPhone.classList.add('hidden');
        loginStepOtp.classList.remove('hidden');
        loginOtpInput.value = appState.smsCode; // Prefill dla wygody testów
    }, 600);
});

// Krok 2: Weryfikacja kodu OTP i wejście na dashboard
btnVerifyOtp.addEventListener('click', () => {
    const code = loginOtpInput.value.trim();
    if (code === appState.smsCode || code === '123456') {
        addLog(`Udało się uwierzytelnić użytkownika kodem SMS.`, 'system');
        userPhoneDisplay.textContent = appState.phone || '+48 501 234 567';
        
        // Inicjalizacja profilu
        appState.profile.phone = appState.phone || '+48 501 234 567';
        renderProfile();
        
        // Inicjalizacja widoku głównego
        renderFlightsList();
        renderClaims();
        
        // Zmiana ekranu
        showScreen(screenMainApp);
        showView(viewHome);
        addLog(`Pulpit główny mPasażer załadowany.`, 'system');
        
        // Symulacja wysłania przypomnienia "gate" (1-2h przed wylotem) po załadowaniu
        setTimeout(() => {
            addLog(`[REGUŁA CZASOWA]: Minęły 2 godziny do wylotu. Wysyłanie SMS z linkiem do FAQ o przylotach.`, 'sms');
            addLog(`SMS wysłany: "Przygotuj się do lądowania. Zobacz co warto wiedzieć po przylocie: mpasazer.pl/faq/pir"`, 'sms');
        }, 3000);
    } else {
        alert('Nieprawidłowy kod weryfikacyjny!');
    }
});

btnResendOtp.addEventListener('click', () => {
    addLog(`Ponowne żądanie kodu SMS OTP.`, 'system');
    addLog(`Wysłano nowy SMS OTP. Kod: ${appState.smsCode}`, 'sms');
    alert('Kod został wysłany ponownie.');
});

btnLogout.addEventListener('click', () => {
    addLog(`Użytkownik wylogowany.`, 'system');
    appState.isPurchaseSimulated = false;
    loginStepOtp.classList.add('hidden');
    loginStepPhone.classList.remove('hidden');
    loginOtpInput.value = '';
    showScreen(screenLogin);
});

// ==========================================================================
// TESTOWANIE STATUSU LOTU (DEMO CONTROLS)
// ==========================================================================

btnDemoDelay.addEventListener('click', () => {
    const flight = getActiveFlight();
    if (!flight) {
        addLog(`Błąd symulacji: Najpierw otwórz szczegóły lotu, który chcesz opóźnić.`, 'system');
        return;
    }
    
    flight.status = 'delayed';
    
    // Zmiana UI karty lotu jeśli jesteśmy na widoku detali
    if(viewFlightDetails.classList.contains('active')) {
        const badge = document.getElementById('flight-status-badge');
        badge.textContent = 'Opóźniony';
        badge.className = 'flight-status status-delayed';
        flightClaimBanner.classList.remove('hidden');
    }
    
    btnDemoDelay.classList.add('hidden');
    btnDemoResetFlight.classList.remove('hidden');
    
    addLog(`[SYSTEM LOTNISKOWY]: Wykryto opóźnienie lotu ${flight.number} o 3 godz. 15 min.`, 'system');
    addLog(`Aplikacja mPasażer zaktualizowała status lotu i wyświetliła baner weryfikacji roszczenia.`, 'system');
    
    renderFlightsList(); // Aktualizacja listy na zapleczu
});

btnDemoResetFlight.addEventListener('click', () => {
    const flight = getActiveFlight();
    if (!flight) return;
    
    flight.status = 'pending';
    
    if(viewFlightDetails.classList.contains('active')) {
        const badge = document.getElementById('flight-status-badge');
        badge.textContent = 'Zaplanowany';
        badge.className = 'flight-status status-pending';
        flightClaimBanner.classList.add('hidden');
    }
    
    btnDemoResetFlight.classList.add('hidden');
    btnDemoDelay.classList.remove('hidden');
    
    addLog(`[SYSTEM LOTNISKOWY]: Przywrócono pierwotny status lotu ${flight.number}.`, 'system');
    
    renderFlightsList();
});

// Zmiana Motywu (Light/Dark)
btnThemeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    btnThemeToggle.textContent = isDark ? '☀️' : '🌙';
    addLog(`Przełączono motyw na ${isDark ? 'Ciemny' : 'Jasny'}.`, 'system');
});



// Zmiana Widoków (Nawigacja wstecz i logo)
btnBackHome.addEventListener('click', () => {
    appState.activeFlightId = null;
    showView(viewHome);
});

appLogo.addEventListener('click', () => {
    if (appState.activeFlightId !== null) {
        appState.activeFlightId = null;
        showView(viewHome);
        addLog('Nawigacja: Powrót do ekranu głównego (kliknięcie w logo).', 'system');
    }
});

// Modale (FAB & Ręczne dodawanie lotu)
btnFabDemo.addEventListener('click', () => modalDemo.classList.remove('hidden'));
btnCloseDemoModal.addEventListener('click', () => modalDemo.classList.add('hidden'));
btnCloseWizard.addEventListener('click', closeWizard);

// Ręczne dodawanie lotu modal
btnAddFlightManual.addEventListener('click', () => {
    if (manualContactNameInput) manualContactNameInput.value = appState.profile.name;
    if (manualContactEmailInput) manualContactEmailInput.value = appState.profile.email;
    if (manualContactPhoneInput) manualContactPhoneInput.value = appState.profile.phone || appState.phone || '+48 501 234 567';
    if (manualContactConfirmInput) manualContactConfirmInput.checked = true;

    manualFlightNoInput.value = '';
    manualFlightPnrInput.value = '';
    manualPassengerLastnameInput.value = '';
    manualFlightDateInput.value = '';
    if (manualFlightTimeInput) manualFlightTimeInput.value = '';

    modalAddFlight.classList.remove('hidden');
});
btnCloseFlightModal.addEventListener('click', () => {
    modalAddFlight.classList.add('hidden');
});
btnConfirmAddFlight.addEventListener('click', () => {
    const flightNo = manualFlightNoInput.value.trim();
    const pnr = manualFlightPnrInput.value.trim();
    const lastname = manualPassengerLastnameInput.value.trim();
    const flightDate = manualFlightDateInput.value;
    const flightTime = manualFlightTimeInput ? manualFlightTimeInput.value : '';
    const contactName = manualContactNameInput ? manualContactNameInput.value.trim() : '';
    const contactEmail = manualContactEmailInput ? manualContactEmailInput.value.trim() : '';
    const contactPhone = manualContactPhoneInput ? manualContactPhoneInput.value : '';
    
    if(!flightNo || !pnr || !lastname || !flightDate || !flightTime || !contactName || !contactEmail) {
        alert('Proszę wypełnić wszystkie pola formularza (w tym dane kontaktowe)!');
        return;
    }
    
    if(pnr.length !== 6) {
        alert('Kod rezerwacji (PNR) musi składać się dokładnie z 6 znaków!');
        return;
    }
    
    addLog(`[API LINII]: Odpytywanie systemu o rezerwację ${pnr.toUpperCase()} dla pasażera ${lastname}...`, 'system');
    
    setTimeout(() => {
        addLog(`[API LINII]: Bilet i status lotu ${flightNo.toUpperCase()} zweryfikowane pomyślnie.`, 'webhook');
        
        // Aktualizuj profil jeśli użytkownik potwierdził dane
        if (manualContactConfirmInput && manualContactConfirmInput.checked) {
            appState.profile.name = contactName;
            appState.profile.email = contactEmail;
            appState.profile.phone = contactPhone;
            renderProfile();
        }
        
        // Symulacja wysłania leada do CRM
        addLog(`[WEBHOOK]: Wysłano leada do CRM DelayFix. Pasażer: ${contactName}, E-mail: ${contactEmail}, Telefon: ${contactPhone}. Lot: ${flightNo.toUpperCase()}, PNR: ${pnr.toUpperCase()}, Planowany wylot: ${flightDate} o ${flightTime}.`, 'webhook');
        
        const newId = appState.flights.length > 0 ? Math.max(...appState.flights.map(f => f.id)) + 1 : 1;
        const formattedDate = new Date(flightDate).toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
        
        appState.flights.push({
            id: newId,
            number: flightNo.toUpperCase(),
            routeFrom: 'WAW',
            routeTo: 'LTN',
            timeStart: flightTime,
            timeEnd: addMinutes(flightTime, 95), // symulacja czasu dolotu
            date: formattedDate,
            status: 'pending',
            checklist: [
                { id: 1, text: 'Paszport i dokumenty podróżne', checked: false },
                { id: 2, text: 'Ładowarka do telefonu i powerbank', checked: false },
                { id: 3, text: 'Lekarstwa pierwszej potrzeby', checked: false },
                { id: 4, text: 'Ubrania na 5 dni', checked: false }
            ],
            photos: []
        });
        
        renderFlightsList();
        modalAddFlight.classList.add('hidden');
        
        // Czyszczenie pól
        manualFlightNoInput.value = '';
        manualFlightPnrInput.value = '';
        manualPassengerLastnameInput.value = '';
        manualFlightDateInput.value = '';
        if (manualFlightTimeInput) manualFlightTimeInput.value = '';
        
        addLog(`Dodano lot ${flightNo.toUpperCase()} ręcznie przez użytkownika.`, 'system');
    }, 1000);
});

// (PIR upload obsługiwany przez wizard – patrz niżej)

// ==========================================================================
// CHECKLISTA BAGAŻOWA
// ==========================================================================

function renderChecklist() {
    checklistUl.innerHTML = '';
    const flight = getActiveFlight();
    if (!flight) return;
    
    let checkedCount = 0;
    
    flight.checklist.forEach(item => {
        if (item.checked) checkedCount++;
        
        const li = document.createElement('li');
        li.className = 'checklist-item';
        
        li.innerHTML = `
            <label>
                <input type="checkbox" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
                <span>${item.text}</span>
            </label>
            <button class="btn-delete-item" data-id="${item.id}" title="Usuń">×</button>
        `;
        
        // Event na checkbox
        li.querySelector('input').addEventListener('change', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            const checked = e.target.checked;
            
            const targetItem = flight.checklist.find(i => i.id === id);
            if (targetItem) {
                targetItem.checked = checked;
            }
            renderChecklist();
        });
        
        // Event na usuwanie
        li.querySelector('.btn-delete-item').addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            flight.checklist = flight.checklist.filter(i => i.id !== id);
            renderChecklist();
            addLog(`Usunięto przedmiot z checklisty bagażu.`, 'system');
        });
        
        checklistUl.appendChild(li);
    });
    
    checklistProgress.textContent = `${checkedCount}/${flight.checklist.length} spakowane`;
    updateBaggageButtonVisibility();
}

// Dodawanie przedmiotów
function handleAddItem() {
    const flight = getActiveFlight();
    if (!flight) return;
    
    const text = newItemNameInput.value.trim();
    if (!text) return;
    
    const newId = flight.checklist.length > 0 ? Math.max(...flight.checklist.map(i => i.id)) + 1 : 1;
    flight.checklist.push({
        id: newId,
        text: text,
        checked: false
    });
    
    newItemNameInput.value = '';
    renderChecklist();
    addLog(`Dodano nowy przedmiot do checklisty: "${text}".`, 'system');
}

btnAddItem.addEventListener('click', handleAddItem);
newItemNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAddItem();
});

// ==========================================================================
// ZDJĘCIA BAGAŻU (DOWÓD)
// ==========================================================================

btnUploadPhoto.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const flight = getActiveFlight();
    if (!flight) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const base64Data = event.target.result;
        flight.photos.push(base64Data);
        
        renderPhotos();
        updateBaggageButtonVisibility();
        addLog(`Pomyślnie wgrano zdjęcie bagażu jako dowód roszczeniowy.`, 'system');
    };
    reader.readAsDataURL(file);
});

function renderPhotos() {
    const flight = getActiveFlight();
    if (!flight) return;
    
    // Usunięcie poprzednich podglądów (zostawiamy tylko slot dodawania)
    const existingPreviews = photosGrid.querySelectorAll('.photo-slot:not(.upload-trigger)');
    existingPreviews.forEach(el => el.remove());
    
    flight.photos.forEach((src, index) => {
        const slot = document.createElement('div');
        slot.className = 'photo-slot';
        
        slot.innerHTML = `
            <div class="photo-preview">
                <img src="${src}" alt="Bagaż">
                <button class="btn-remove-photo" data-index="${index}">×</button>
            </div>
        `;
        
        slot.querySelector('.btn-remove-photo').addEventListener('click', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            flight.photos.splice(idx, 1);
            renderPhotos();
            updateBaggageButtonVisibility();
            addLog(`Usunięto zdjęcie bagażu.`, 'system');
        });
        
        // Wstawiamy przed wyzwalaczem uploadu
        photosGrid.insertBefore(slot, btnUploadPhoto);
    });
}

// Zgłoszenie bagażu dostępne gdy cała checklista jest zaznaczona (zdjęcia są opcjonalne)
function updateBaggageButtonVisibility() {
    const flight = getActiveFlight();
    if (!flight) return;
    
    const allChecked = flight.checklist.length > 0 && flight.checklist.every(item => item.checked);
    
    const hintElement = document.getElementById('baggage-btn-hint');
    if (allChecked) {
        btnClaimBaggage.disabled = false;
        btnClaimBaggage.classList.remove('btn-disabled');
        if (hintElement) hintElement.style.display = 'none';
    } else {
        btnClaimBaggage.disabled = true;
        btnClaimBaggage.classList.add('btn-disabled');
        if (hintElement) {
            hintElement.style.display = 'block';
            hintElement.textContent = '(Dokończ checklistę bagażową, aby odblokować)';
        }
    }
}

// Renderowanie i zapisywanie profilu
function renderProfile() {
    if (profileNameInput) profileNameInput.value = appState.profile.name;
    if (profileEmailInput) profileEmailInput.value = appState.profile.email;
    // Numer telefonu z logowania – zawsze widoczny, ale pole jest readonly
    if (profilePhoneInput) profilePhoneInput.value = appState.phone || appState.profile.phone || '+48 501 234 567';
}

// Modal weryfikacji linku (email / telefon)
function showVerificationModal(channel, value) {
    // Usuń poprzedni modal jeśli istnieje
    const existing = document.getElementById('modal-verification');
    if (existing) existing.remove();

    const isEmail = channel === 'email';
    const channelLabel = isEmail ? 'adres e-mail' : 'numer telefonu';
    const channelIcon = isEmail ? '✉️' : '📱';
    const instruction = isEmail
        ? `Na adres <strong>${value}</strong> wysłaliśmy link weryfikacyjny.`
        : `Na numer <strong>${value}</strong> wysłaliśmy SMS z linkiem weryfikacyjnym.`;

    const overlay = document.createElement('div');
    overlay.id = 'modal-verification';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-content" style="max-width: 380px; text-align: center; padding: 32px 24px;">
            <div style="font-size: 48px; margin-bottom: 16px;">${channelIcon}</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">Potwierdź ${channelLabel}</h3>
            <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">${instruction}</p>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 24px;">Kliknij w link, aby potwierdzić zmianę. Do tego czasu Twoje dotychczasowe dane pozostają aktywne.</p>
            <div style="background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.2); border-radius: 10px; padding: 14px; margin-bottom: 20px;">
                <p style="font-size: 12px; color: var(--primary-accent); font-weight: 600; margin: 0;">📧 Sprawdź skrzynkę odbiorczą i folder SPAM</p>
            </div>
            <button id="btn-simulate-verify-link" class="btn btn-primary" style="margin-bottom: 10px;">Symuluj kliknięcie w link ✓</button>
            <button id="btn-close-verify-modal" class="btn btn-link">Zamknij</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Zamknięcie przez overlay
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    document.getElementById('btn-close-verify-modal').addEventListener('click', () => overlay.remove());

    // Symulacja kliknięcia w link – aktualizuje dane
    document.getElementById('btn-simulate-verify-link').addEventListener('click', () => {
        if (isEmail) {
            appState.profile.email = value;
            addLog(`Email potwierdzony: ${value}. Dane zaktualizowane.`, 'system');
        } else {
            appState.phone = value;
            appState.profile.phone = value;
            if (userPhoneDisplay) userPhoneDisplay.textContent = value;
            addLog(`Numer telefonu potwierdzony: ${value}. Dane zaktualizowane.`, 'system');
        }
        renderProfile();
        overlay.remove();

        // Feedback sukcesu
        const successToast = document.createElement('div');
        successToast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#10B981;color:#fff;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
        successToast.textContent = `✓ ${isEmail ? 'Adres e-mail' : 'Numer telefonu'} zaktualizowany!`;
        document.body.appendChild(successToast);
        setTimeout(() => successToast.remove(), 3000);
    });
}

if (btnSaveProfile) {
    btnSaveProfile.addEventListener('click', () => {
        const name = profileNameInput ? profileNameInput.value.trim() : '';
        const newEmail = profileEmailInput ? profileEmailInput.value.trim() : '';
        const newPhone = profilePhoneInput ? profilePhoneInput.value.trim() : '';

        if (!name) {
            alert('Proszę podać imię i nazwisko.');
            return;
        }

        // Zapisz imię od razu
        appState.profile.name = name;

        const currentEmail = appState.profile.email;
        const currentPhone = appState.phone || appState.profile.phone;

        const emailChanged = newEmail && newEmail !== currentEmail;
        const phoneChanged = newPhone && newPhone !== currentPhone;

        if (emailChanged) {
            addLog(`Zmiana adresu e-mail z ${currentEmail} na ${newEmail}. Wysłano link weryfikacyjny.`, 'system');
            showVerificationModal('email', newEmail);
        }
        if (phoneChanged) {
            addLog(`Zmiana numeru telefonu na ${newPhone}. Wysłano SMS z linkiem.`, 'system');
            showVerificationModal('phone', newPhone);
        }

        if (!emailChanged && !phoneChanged) {
            // Tylko imię zmienione – zapisz i pokaż feedback
            addLog(`Zapisano imię i nazwisko: ${name}.`, 'system');
            btnSaveProfile.textContent = 'Zapisano ✓';
            btnSaveProfile.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            btnSaveProfile.style.borderColor = '#10B981';
            btnSaveProfile.style.color = '#10B981';
            setTimeout(() => {
                btnSaveProfile.textContent = 'Zapisz dane';
                btnSaveProfile.style = '';
            }, 2000);
        }
    });
}

// Renderowanie sekcji Moje Sprawy
function renderClaims() {
    const existingClaims = claimsListContainer.querySelectorAll('.claim-item');
    existingClaims.forEach(el => el.remove());
    
    if (appState.claims.length === 0) {
        emptyClaimsMsg.classList.remove('hidden');
    } else {
        emptyClaimsMsg.classList.add('hidden');
        
        appState.claims.forEach(claim => {
            const item = document.createElement('div');
            item.className = 'claim-item';
            
            let statusClass = 'sent';
            let statusText = 'Wysłano';
            if (claim.status === 'completed') {
                statusClass = 'completed';
                statusText = 'Zakończony';
            } else if (claim.status === 'rejected') {
                statusClass = 'rejected';
                statusText = 'Odrzucono';
            }
            
            item.innerHTML = `
                <div class="claim-item-details">
                    <span class="claim-title">${claim.title}</span>
                    <span class="claim-date">${claim.date}</span>
                </div>
                <span class="claim-status ${statusClass}">${statusText}</span>
            `;
            claimsListContainer.appendChild(item);
        });
    }
}

// ==========================================================================
// OBSŁUGA ZGŁOSZEŃ (LEADS TO DELAYFIX)
// ==========================================================================



// Zgłoszenie bagażu – otwiera wizard
btnClaimBaggage.addEventListener('click', () => {
    openWizard();
    addLog('Otwarto kreator zgłoszenia bagażu.', 'system');
});

// Stara obsługa zastąpiona przez wizard (patrz niżej)

// Powrót z ekranu sukcesu
btnSuccessBack.addEventListener('click', () => {
    showScreen(screenMainApp);
});

// ==========================================================================
// FAQ ACCORDION LOGIC
// ==========================================================================

document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        
        // Zamknij wszystkie FAQ
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Otwórz kliknięte, jeśli nie było aktywne
        if (!isActive) {
            item.classList.add('active');
            addLog(`Użytkownik rozwinął FAQ: "${q.textContent.trim().replace(' ▼', '')}"`, 'system');
        }
    });
});

// ==========================================================================
// BAGGAGE CLAIM WIZARD – LOGIKA NAWIGACJI
// ==========================================================================

// Stan wizarda
const wizardState = {
    currentPath: null,   // 'a', 'b', or 'c'
    pirFileUploaded: false,
    prevScreen: null
};

// Wszystkie ekrany wizarda
const wizardScreens = {
    0: document.getElementById('wscreen-0'),
    '1a': document.getElementById('wscreen-1a'),
    '1b': document.getElementById('wscreen-1b'),
    '1c': document.getElementById('wscreen-1c'),
    2: document.getElementById('wscreen-2')
};

const wizardDots = [
    document.getElementById('wdot-0'),
    document.getElementById('wdot-1'),
    document.getElementById('wdot-2')
];

function openWizard() {
    // Reset stanu
    wizardState.currentPath = null;
    wizardState.pirFileUploaded = false;
    wizardState.prevScreen = null;

    // Reset pól formularza
    const pirInput = document.getElementById('wiz-pir-number');
    const pirError = document.getElementById('wiz-pir-error');
    const uploadLabel = document.getElementById('wiz-pir-upload-label');
    const uploadOk = document.getElementById('wiz-pir-upload-ok');
    const bagDesc = document.getElementById('wiz-baggage-desc');

    if (pirInput) pirInput.value = '';
    if (pirError) pirError.classList.add('hidden');
    if (uploadLabel) uploadLabel.textContent = 'Dotknij, aby dodać zdjęcie lub PDF';
    if (uploadOk) uploadOk.classList.add('hidden');
    if (bagDesc) {
        // Auto-import z checklisty
        const flight = getActiveFlight();
        if (flight && flight.checklist.length > 0) {
            const items = flight.checklist.map(i => i.text).join(', ');
            bagDesc.value = `Zawartość walizki: ${items}`;
            const hint = document.getElementById('wiz-checklist-import-hint');
            if (hint) hint.textContent = '✓ Automatycznie uzupełniono z Twojej checklisty bagażowej.';
        } else {
            bagDesc.value = '';
            const hint = document.getElementById('wiz-checklist-import-hint');
            if (hint) hint.textContent = '';
        }
    }

    showWizardScreen(0);
    modalBaggageWizard.classList.remove('hidden');
}

function closeWizard() {
    modalBaggageWizard.classList.add('hidden');
}

function showWizardScreen(screenKey) {
    // Ukryj wszystkie ekrany
    Object.values(wizardScreens).forEach(s => {
        if (s) s.classList.add('hidden');
    });
    // Pokaż właściwy
    const target = wizardScreens[screenKey];
    if (target) {
        target.classList.remove('hidden');
    }
    // Aktualizuj kropki kroków
    updateWizardDots(screenKey);
}

function updateWizardDots(screenKey) {
    // Krok 0 = ekran 0, Krok 1 = ekrany 1a/1b/1c, Krok 2 = ekran 2
    const stepMap = { 0: 0, '1a': 1, '1b': 1, '1c': 1, 2: 2 };
    const currentStep = stepMap[screenKey] ?? 0;

    wizardDots.forEach((dot, i) => {
        dot.classList.remove('active', 'done');
        if (i < currentStep) dot.classList.add('done');
        else if (i === currentStep) dot.classList.add('active');
    });
}

// --- Ekran 0: Wybór lokalizacji ---
document.getElementById('wloc-a').addEventListener('click', () => {
    wizardState.currentPath = 'a';
    wizardState.prevScreen = 0;
    showWizardScreen('1a');
    addLog('Wizard bagaż: pasażer wybrał – jestem przy taśmie.', 'system');
});

document.getElementById('wloc-b').addEventListener('click', () => {
    wizardState.currentPath = 'b';
    wizardState.prevScreen = 0;
    showWizardScreen('1b');
    addLog('Wizard bagaż: pasażer wybrał – wyszedłem z hali, na lotnisku.', 'system');
});

document.getElementById('wloc-c').addEventListener('click', () => {
    wizardState.currentPath = 'c';
    wizardState.prevScreen = 0;
    showWizardScreen('1c');
    addLog('Wizard bagaż: pasażer wybrał – opuściłem lotnisko.', 'system');
});

// --- Przyciski "Mam PIR" z każdej ścieżki ---
document.getElementById('wbtn-a-haspir').addEventListener('click', () => {
    wizardState.prevScreen = '1a';
    showWizardScreen(2);
    // Przewiń modal na górę
    const modal = document.querySelector('.wizard-modal');
    if (modal) modal.scrollTop = 0;
});

document.getElementById('wbtn-b-haspir').addEventListener('click', () => {
    wizardState.prevScreen = '1b';
    showWizardScreen(2);
    const modal = document.querySelector('.wizard-modal');
    if (modal) modal.scrollTop = 0;
});

document.getElementById('wbtn-c-haspir').addEventListener('click', () => {
    wizardState.prevScreen = '1c';
    showWizardScreen(2);
    const modal = document.querySelector('.wizard-modal');
    if (modal) modal.scrollTop = 0;
});

// --- Przyciski "Wróć" ---
document.getElementById('wbtn-a-back').addEventListener('click', () => showWizardScreen(0));
document.getElementById('wbtn-b-back').addEventListener('click', () => showWizardScreen(0));
document.getElementById('wbtn-c-back').addEventListener('click', () => showWizardScreen(0));
document.getElementById('wbtn-form-back').addEventListener('click', () => {
    showWizardScreen(wizardState.prevScreen || 0);
});

// --- Upload PIR w wizardzie ---
const wizBtnUploadPir = document.getElementById('wiz-btn-upload-pir');
const wizPirFileInput = document.getElementById('wiz-pir-file-input');
const wizPirUploadLabel = document.getElementById('wiz-pir-upload-label');
const wizPirUploadOk = document.getElementById('wiz-pir-upload-ok');

wizBtnUploadPir.addEventListener('click', () => wizPirFileInput.click());

wizPirFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const filename = e.target.files[0].name;
        wizardState.pirFileUploaded = true;
        wizPirUploadLabel.textContent = `✓ ${filename}`;
        wizBtnUploadPir.style.borderColor = '#10B981';
        wizPirUploadOk.textContent = `Wgrano: ${filename} – przyspieszy to weryfikację przez DelayFix.`;
        wizPirUploadOk.classList.remove('hidden');
        addLog(`Załączono dokument PIR/skan do formularza: ${filename}`, 'system');
    }
});

// --- Wysłanie zgłoszenia z wizarda ---
document.getElementById('wiz-btn-submit').addEventListener('click', () => {
    const pirNumber = document.getElementById('wiz-pir-number').value.trim();
    const pirError = document.getElementById('wiz-pir-error');

    // Walidacja – blokada bez PIR
    if (!pirNumber) {
        pirError.classList.remove('hidden');
        document.getElementById('wiz-pir-number').focus();
        return;
    }
    pirError.classList.add('hidden');

    const flight = getActiveFlight();
    if (!flight) return;

    const selectedRadio = document.querySelector('input[name="wiz_baggage_type"]:checked');
    const baggageTypeValue = selectedRadio ? selectedRadio.value : 'delayed_lost';
    const baggageTypeTitle = baggageTypeValue === 'damaged' ? 'Zniszczony bagaż' : 'Opóźniony / Zgubiony bagaż';
    const pathLabel = { a: 'z hali (PIR)', b: 'z lotniska (PIR telefoniczny)', c: 'po opuszczeniu lotniska' }[wizardState.currentPath] || '';

    closeWizard();
    addLog(`INICJACJA: Zgłoszenie bagażowe (${baggageTypeTitle}) dla lotu ${flight.number}. Numer PIR: ${pirNumber}. Ścieżka: ${pathLabel}.`, 'system');

    setTimeout(() => {
        const itemNames = flight.checklist.map(i => i.text).join(', ') || 'brak danych z checklisty';
        const photosInfo = flight.photos.length > 0 ? `${flight.photos.length} zdjęć bagażu` : 'brak zdjęć';
        const pirInfo = wizardState.pirFileUploaded ? 'z załączonym skanem PIR' : 'bez skanu PIR';
        
        const value800Radio = document.querySelector('input[name="wiz_baggage_value_800"]:checked');
        const valueOver800 = value800Radio ? value800Radio.value === 'yes' : false;
        const valueLabel = valueOver800 ? 'Wartość powyżej 800 PLN' : 'Wartość do 800 PLN';

        addLog(`LEAD WYSŁANY: ${baggageTypeTitle} (${pirInfo}). Wartość: ${valueLabel}. Numer PIR: ${pirNumber}. Zawartość: ${itemNames}. ${photosInfo}. Dane do CRM DelayFix.`, 'webhook');
        addLog(`Konsultant DelayFix sprawdzi wymogi prawne (terminy: 7-21 dni) i skontaktuje się telefonicznie.`, 'webhook');

        appState.claims.push({
            id: Date.now(),
            type: 'baggage',
            title: `Roszczenie bagażowe: ${baggageTypeTitle}`,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5),
            status: 'sent'
        });
        renderClaims();

        successCaseType.textContent = 'Odszkodowanie za bagaż';
        successPhone.textContent = appState.phone || '+48 501 234 567';
        showScreen(screenSuccess);
    }, 800);
});

// ==========================================================================
// FLIGHT DISRUPTION CLAIM WIZARD (OVERBOOKING / DATE CHANGE)
// ==========================================================================

const disruptionWizardState = {
    disruptionType: null, // 'overbooking' or 'date_change'
    fileUploaded: false
};

function openDisruptionWizard(type) {
    disruptionWizardState.disruptionType = type;
    disruptionWizardState.fileUploaded = false;

    // Reset pól
    document.getElementById('overbooking-details').value = '';
    document.getElementById('date-change-new-date').value = '';
    document.getElementById('date-change-details').value = '';
    disruptionUploadLabel.textContent = 'Dotknij, aby dodać zdjęcie lub zrzut ekranu';
    disruptionUploadOk.classList.add('hidden');
    disruptionBtnUpload.style.borderColor = '';

    if (type === 'overbooking') {
        disruptionWizardTitle.textContent = 'Zgłoś Overbooking (Odmowa wejścia)';
        disruptionFormOverbooking.classList.remove('hidden');
        disruptionFormDateChange.classList.add('hidden');
    } else {
        disruptionWizardTitle.textContent = 'Zgłoś zmianę daty / godziny lotu';
        disruptionFormOverbooking.classList.add('hidden');
        disruptionFormDateChange.classList.remove('hidden');
    }

    modalDisruptionWizard.classList.remove('hidden');
}

function closeDisruptionWizard() {
    modalDisruptionWizard.classList.add('hidden');
}

// Otwieranie wizarda z przycisków w szczegółach lotu
btnReportOverbooking.addEventListener('click', () => {
    openDisruptionWizard('overbooking');
    addLog('Otwarto kreator zgłoszenia Overbooking.', 'system');
});

btnReportDateChange.addEventListener('click', () => {
    openDisruptionWizard('date_change');
    addLog('Otwarto kreator zgłoszenia zmiany terminu lotu.', 'system');
});

btnCloseDisruptionWizard.addEventListener('click', closeDisruptionWizard);

modalDisruptionWizard.addEventListener('click', (e) => {
    if (e.target === modalDisruptionWizard) closeDisruptionWizard();
});

// Obsługa uploadu w wizardzie zakłóceń
disruptionBtnUpload.addEventListener('click', () => disruptionFileInput.click());

disruptionFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const filename = e.target.files[0].name;
        disruptionWizardState.fileUploaded = true;
        disruptionUploadLabel.textContent = `✓ ${filename}`;
        disruptionBtnUpload.style.borderColor = '#10B981';
        disruptionUploadOk.textContent = `Wgrano: ${filename} – posłuży jako dowód dla linii lotniczej.`;
        disruptionUploadOk.classList.remove('hidden');
        addLog(`Załączono dowód do formularza zakłóceń lotu: ${filename}`, 'system');
    }
});

// Wysłanie zgłoszenia zakłócenia lotu
btnSubmitDisruption.addEventListener('click', () => {
    const flight = getActiveFlight();
    if (!flight) return;

    const type = disruptionWizardState.disruptionType;
    let logMsg = '';
    let webhookMsg = '';
    let caseTitle = '';
    let successTitle = '';

    if (type === 'overbooking') {
        const altFlight = document.querySelector('input[name="overbooking_alt_flight"]:checked')?.value || 'no';
        const comp = document.querySelector('input[name="overbooking_comp"]:checked')?.value || 'no';
        const details = document.getElementById('overbooking-details').value.trim();

        caseTitle = 'Odszkodowanie za Overbooking';
        successTitle = 'Overbooking / Odmowa wejścia';
        logMsg = `INICJACJA: Zgłoszenie Overbooking dla lotu ${flight.number}. Lot alt: ${altFlight === 'yes' ? 'Tak' : 'Nie'}. Odszkodowanie na lotnisku: ${comp === 'yes' ? 'Tak' : 'Nie'}.`;
        webhookMsg = `LEAD WYSŁANY: Overbooking (lot ${flight.number}). Lot alt: ${altFlight}, Odszkodowanie: ${comp}. Szczegóły: ${details || 'brak'}. Dane do CRM DelayFix.`;
    } else {
        const notice = document.querySelector('input[name="date_change_notice"]:checked')?.value || 'under_14';
        const newDate = document.getElementById('date-change-new-date').value.trim();
        const details = document.getElementById('date-change-details').value.trim();

        caseTitle = 'Zmiana terminu lotu';
        successTitle = 'Zmiana terminu lotu';
        logMsg = `INICJACJA: Zgłoszenie zmiany terminu lotu ${flight.number}. Powiadomienie: ${notice === 'under_14' ? '< 14 dni' : '>= 14 dni'}. Nowy termin: ${newDate || 'nieznany'}.`;
        webhookMsg = `LEAD WYSŁANY: Zmiana terminu (lot ${flight.number}). Powiadomienie: ${notice}, Nowy termin: ${newDate || 'brak'}. Szczegóły: ${details || 'brak'}. Dane do CRM DelayFix.`;
    }

    closeDisruptionWizard();
    addLog(logMsg, 'system');

    setTimeout(() => {
        const docInfo = disruptionWizardState.fileUploaded ? 'z załączonym dowodem' : 'bez załącznika';
        addLog(`${webhookMsg} (${docInfo}).`, 'webhook');
        addLog(`Konsultant DelayFix sprawdzi regulacje EU261/2004 pod kątem odszkodowania (250-600 EUR) i oddzwoni.`, 'webhook');

        appState.claims.push({
            id: Date.now(),
            type: type,
            title: `Zakłócenie: ${caseTitle}`,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5),
            status: 'sent'
        });
        renderClaims();

        successCaseType.textContent = successTitle;
        successPhone.textContent = appState.phone || '+48 501 234 567';
        showScreen(screenSuccess);
    }, 800);
});

// Zamknięcie wizarda kliknięciem w overlay
modalBaggageWizard.addEventListener('click', (e) => {
    if (e.target === modalBaggageWizard) closeWizard();
});


// ==========================================================================
// FLIGHT DATA ENGINE – Symulacja / Docelowo: AviationStack API
// ==========================================================================

/**
 * ARCHITEKTURA DOCELOWA (produkcja):
 *
 * async function fetchFlightStatus(flightIata) {
 *   const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightIata}`;
 *   const res = await fetch(url);
 *   const data = await res.json();
 *   return data.data[0]; // pierwszy wynik to aktywny lot
 * }
 *
 * W tej wersji używamy realistycznej SYMULACJI z tą samą strukturą JSON.
 */

// --- Konfiguracja silnika ---
const FLIGHT_ENGINE = {
    refreshIntervalMs: 30000,  // co 30s w symulacji (prod: co 5 min)
    refreshTimer: null,
    lastUpdated: null,
    simulatedDelayMin: 0,      // aktualnie symulowane opóźnienie w minutach
    scenario: 'on-time',       // 'on-time' | 'risk' | 'delayed' | 'heavy-delay'
};

// --- Historyczne dane lotów (symulacja localStorage) ---
const FLIGHT_HISTORY_DB = {
    'LO 379': {
        checks: 18,
        delayedCount: 7,
        avgDelayMin: 42,
        delayRate: 0.39,
        label: 'LOT LO 379 (WAW→FRA)',
        historySummary: 'Na podstawie 18 poprzednich lotów tego połączenia: 7 razy opóźniony (avg +42 min).',
    },
    'W6 1302': {
        checks: 24,
        delayedCount: 14,
        avgDelayMin: 78,
        delayRate: 0.58,
        label: 'Wizz Air W6 1302 (WAW→BCN)',
        historySummary: 'Na podstawie 24 poprzednich lotów: 14 razy opóźniony (avg +78 min). Trasa o podwyższonym ryzyku.',
    },
};

// --- Symulowane dane „AviationStack API response" ---
function buildSimulatedApiResponse(flight, scenarioOverride) {
    const scenario = scenarioOverride || FLIGHT_ENGINE.scenario;
    const now = new Date();
    const plannedDepart = new Date(now);
    plannedDepart.setHours(parseInt(flight.timeStart.split(':')[0]), parseInt(flight.timeStart.split(':')[1]), 0, 0);

    const scenarios = {
        'on-time': {
            flight_status: 'scheduled',
            departure: { delay: null, scheduled: flight.timeStart, actual: null },
            aircraft: { registration: 'SP-LNA' },
            previous_flight: null,
        },
        'risk': {
            flight_status: 'scheduled',
            departure: { delay: null, scheduled: flight.timeStart, actual: null },
            aircraft: { registration: 'SP-LNA' },
            previous_flight: {
                flight_iata: 'LO 100',
                route: 'KRK → WAW',
                departure_delay: 75,
                status: 'active',
            },
        },
        'delayed': {
            flight_status: 'active',
            departure: { delay: 95, scheduled: flight.timeStart, actual: addMinutes(flight.timeStart, 95) },
            aircraft: { registration: 'SP-LNA' },
            previous_flight: {
                flight_iata: 'LO 100',
                route: 'KRK → WAW',
                departure_delay: 95,
                status: 'landed',
            },
        },
        'heavy-delay': {
            flight_status: 'active',
            departure: { delay: 195, scheduled: flight.timeStart, actual: addMinutes(flight.timeStart, 195) },
            aircraft: { registration: 'SP-LNA' },
            previous_flight: {
                flight_iata: 'LO 100',
                route: 'KRK → WAW',
                departure_delay: 210,
                status: 'active',
            },
        },
    };

    return scenarios[scenario] || scenarios['on-time'];
}

function addMinutes(timeStr, minutes) {
    const [h, m] = timeStr.split(':').map(Number);
    const total = h * 60 + m + minutes;
    const nh = Math.floor(total / 60) % 24;
    const nm = total % 60;
    return `${String(nh).padStart(2, '0')}:${String(nm).padStart(2, '0')}`;
}

// --- Główna funkcja odświeżania statusu lotu ---
async function refreshFlightStatus(forceScenario) {
    const flight = getActiveFlight();
    if (!flight) return;

    // Wizualny spin przycisku
    const btnRefresh = document.getElementById('btn-refresh-flight');
    if (btnRefresh) btnRefresh.classList.add('spinning');

    // Symulacja opóźnienia sieci (300-800ms)
    await new Promise(r => setTimeout(r, 300 + Math.random() * 500));

    // Pobierz dane (symulacja lub docelowo: fetch z API)
    const apiData = buildSimulatedApiResponse(flight, forceScenario);

    // Aktualizuj UI na podstawie danych
    applyFlightStatusToUI(flight, apiData);

    // Pokaż wskaźnik historyczny
    renderDelayRiskCard(flight.number);

    // Zapisz timestamp
    FLIGHT_ENGINE.lastUpdated = new Date();
    updateLiveBar('ok');

    if (btnRefresh) btnRefresh.classList.remove('spinning');

    addLog(`Status lotu ${flight.number} zaktualizowany. Status API: ${apiData.flight_status}, opóźnienie: ${apiData.departure.delay ?? 0} min.`, 'system');
}

// --- Aplikuj dane do UI ---
function applyFlightStatusToUI(flight, apiData) {
    const statusBadge = document.getElementById('flight-status-badge');
    const departTime = document.getElementById('flight-depart-time');
    const departActual = document.getElementById('flight-depart-actual');
    const claimBanner = document.getElementById('flight-claim-banner');
    const bannerDelayText = document.getElementById('banner-delay-text');
    const rotationWarning = document.getElementById('rotation-warning');
    const delayRiskCard = document.getElementById('delay-risk-card');

    const delay = apiData.departure.delay || 0;
    const status = apiData.flight_status;
    const prevFlight = apiData.previous_flight;

    // Status badge
    if (!statusBadge) return;
    statusBadge.className = 'flight-status';
    if (status === 'scheduled' && !delay) {
        statusBadge.textContent = 'Zaplanowany';
        statusBadge.classList.add('status-pending');
        flight.status = 'pending';
    } else if (status === 'active' && delay > 0) {
        const h = Math.floor(delay / 60);
        const m = delay % 60;
        const delayStr = h > 0 ? `+${h}h ${m}min` : `+${m} min`;
        statusBadge.textContent = `Opóźniony ${delayStr}`;
        statusBadge.classList.add('status-delayed');
        flight.status = 'delayed';
    } else if (status === 'cancelled') {
        statusBadge.textContent = 'Odwołany';
        statusBadge.classList.add('status-cancelled');
        flight.status = 'cancelled';
    } else if (status === 'active') {
        statusBadge.textContent = 'W powietrzu';
        statusBadge.classList.add('status-active');
    }

    // Czasy
    if (departTime) departTime.textContent = apiData.departure.scheduled;
    if (departActual) {
        if (delay > 0 && apiData.departure.actual) {
            departActual.textContent = `▶ ${apiData.departure.actual}`;
            departActual.classList.remove('hidden');
        } else {
            departActual.classList.add('hidden');
        }
    }

    // Baner odszkodowawczy (>3h = 180 min)
    if (claimBanner) {
        if (delay >= 180) {
            const h = Math.floor(delay / 60);
            const m = delay % 60;
            if (bannerDelayText) bannerDelayText.textContent = `Twój lot jest opóźniony o ${h}h ${m}min. Przysługuje Ci odszkodowanie do 600 EUR.`;
            claimBanner.classList.remove('hidden');
        } else {
            claimBanner.classList.add('hidden');
        }
    }

    // Propagacja opóźnienia (poprzedni lot)
    if (rotationWarning) {
        if (prevFlight && prevFlight.departure_delay > 30) {
            document.getElementById('prev-flight-no').textContent = prevFlight.flight_iata;
            document.getElementById('prev-flight-route').textContent = prevFlight.route;
            document.getElementById('prev-flight-delay').textContent = `+${prevFlight.departure_delay} min`;
            document.getElementById('tail-number').textContent = apiData.aircraft.registration;
            rotationWarning.classList.remove('hidden');
        } else {
            rotationWarning.classList.add('hidden');
        }
    }

    // Aktualizuj też kafelek na liście lotów
    renderFlightsList();
}

// --- Wskaźnik historyczny ---
function renderDelayRiskCard(flightNumber) {
    const card = document.getElementById('delay-risk-card');
    const badge = document.getElementById('risk-badge');
    const fill = document.getElementById('risk-bar-fill');
    const pct = document.getElementById('risk-pct');
    const detail = document.getElementById('risk-detail');

    if (!card) return;

    const history = FLIGHT_HISTORY_DB[flightNumber];
    if (!history) {
        card.classList.add('hidden');
        return;
    }

    card.classList.remove('hidden');

    const rate = history.delayRate; // 0.0 – 1.0
    const pctVal = Math.round(rate * 100);

    // Wypełnienie paska
    setTimeout(() => {
        if (fill) fill.style.width = `${pctVal}%`;
        if (pct) pct.textContent = `${pctVal}%`;
    }, 200);

    // Klasa i etykieta ryzyka
    let riskClass, riskLabel;
    if (pctVal <= 20)      { riskClass = 'low';       riskLabel = '🟢 Niskie'; }
    else if (pctVal <= 50) { riskClass = 'medium';    riskLabel = '🟡 Umiarkowane'; }
    else if (pctVal <= 75) { riskClass = 'high';      riskLabel = '🟠 Wysokie'; }
    else                   { riskClass = 'very-high'; riskLabel = '🔴 Bardzo wysokie'; }

    if (badge) { badge.textContent = riskLabel; badge.className = `risk-badge ${riskClass}`; }
    if (detail) detail.textContent = history.historySummary;
}

// --- Aktualizacja paska "na żywo" ---
function updateLiveBar(state) {
    const dot = document.getElementById('live-dot');
    const label = document.getElementById('live-label');
    const updated = document.getElementById('live-updated');

    if (!dot) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (state === 'ok') {
        dot.className = 'live-dot';
        if (label) label.textContent = 'Dane na żywo';
        if (updated) updated.textContent = `Ostatnia aktualizacja: ${timeStr}`;
    } else if (state === 'error') {
        dot.className = 'live-dot error';
        if (label) { label.textContent = 'Błąd połączenia'; label.style.color = 'var(--danger-color)'; }
    }
}

// --- Auto-odświeżanie ---
function startFlightAutoRefresh() {
    stopFlightAutoRefresh();
    FLIGHT_ENGINE.refreshTimer = setInterval(() => {
        refreshFlightStatus();
    }, FLIGHT_ENGINE.refreshIntervalMs);
}

function stopFlightAutoRefresh() {
    if (FLIGHT_ENGINE.refreshTimer) {
        clearInterval(FLIGHT_ENGINE.refreshTimer);
        FLIGHT_ENGINE.refreshTimer = null;
    }
}


// --- Przycisk ręcznego odświeżenia statusu ---
// (rejestrujemy JEDEN raz tutaj, bez duplikacji)
const btnRefreshFlight = document.getElementById('btn-refresh-flight');
if (btnRefreshFlight) {
    btnRefreshFlight.addEventListener('click', () => {
        if (!appState.activeFlightId) {
            addLog('Odśwież: najpierw otwórz szczegóły lotu.', 'system');
            return;
        }
        refreshFlightStatus();
        addLog('Ręczne odświeżenie statusu lotu.', 'system');
    });
}

// --- Rozszerzenie panelu testowego o nowe scenariusze ---
// Zamiast nadpisywać showView (problem z hoistingiem), wstrzykujemy nowe przyciski
// i wpinamy je bezpośrednio w logikę engine'u.
(function setupDemoScenarios() {
    const modalBody = document.querySelector('#modal-demo .modal-body');
    if (!modalBody) return;

    // Dodaj nowe przyciski scenariuszy jeśli jeszcze nie istnieją
    if (!document.getElementById('btn-demo-risk')) {
        modalBody.insertAdjacentHTML('beforeend', `
            <hr style="border:none; border-top: 1px solid var(--surface-border); margin: 8px 0;">
            <p style="font-size:11px; color: var(--text-muted); margin: 0 0 6px; font-weight: 600;">SILNIK DANYCH NA ŻYWO:</p>
            <button class="btn-demo-action" id="btn-demo-risk">⚠️ Zagrożony (rotacja samolotu +75min)</button>
            <button class="btn-demo-action" id="btn-demo-heavy">🔴 Ciężkie opóźnienie (+3h 15min)</button>
            <button class="btn-demo-action" id="btn-demo-on-time">✅ Lot na czas (reset)</button>
        `);
    }

    // Obsługa wszystkich scenariuszy – z obsługą braku aktywnego lotu
    function applyScenario(scenario, scenarioLabel, closeModal) {
        FLIGHT_ENGINE.scenario = scenario;

        // Jeśli user nie jest w szczegółach lotu – ustaw pierwszy lot jako aktywny i przejdź
        if (!appState.activeFlightId && appState.flights.length > 0) {
            appState.activeFlightId = appState.flights[0].id;
            openFlightDetails(appState.activeFlightId);
        }

        if (closeModal) modalDemo.classList.add('hidden');

        // Odśwież status z nowym scenariuszem
        refreshFlightStatus(scenario);
        addLog(`SYMULACJA: ${scenarioLabel}`, 'system');
    }

    // Istniejący przycisk "Zasymuluj Opóźnienie" – nadpisujemy jego zachowanie
    // używając event delegation na modalBody (nie ruszamy referencji stałych)
    const existingDelay = document.getElementById('btn-demo-delay');
    if (existingDelay) {
        // Usuń stary listener klonując (bezpieczniejsze niż removeEventListener bez ref)
        const freshDelay = existingDelay.cloneNode(true);
        existingDelay.replaceWith(freshDelay);
        freshDelay.addEventListener('click', () => {
            applyScenario('delayed', 'Opóźnienie lotu LO 379 o +1h 35min.', true);
        });
    }

    const existingReset = document.getElementById('btn-demo-reset-flight');
    if (existingReset) {
        const freshReset = existingReset.cloneNode(true);
        existingReset.replaceWith(freshReset);
        freshReset.classList.remove('hidden');
        freshReset.addEventListener('click', () => {
            applyScenario('on-time', 'Lot przywrócony do statusu "Na czas".', true);
        });
    }

    document.getElementById('btn-demo-risk')?.addEventListener('click', () => {
        applyScenario('risk', 'Poprzedni lot samolotu opóźniony o 75 min – ryzyko propagacji.', true);
    });

    document.getElementById('btn-demo-heavy')?.addEventListener('click', () => {
        applyScenario('heavy-delay', 'Ciężkie opóźnienie +3h 15min. Lot kwalifikuje się do odszkodowania.', true);
    });

    document.getElementById('btn-demo-on-time')?.addEventListener('click', () => {
        applyScenario('on-time', 'Lot na czas – wszystkie wskaźniki zielone.', true);
    });
})();

// --- Zatrzymaj auto-refresh gdy user wraca do home ---
const btnBackHomeNav = document.getElementById('btn-back-home');
if (btnBackHomeNav) {
    btnBackHomeNav.addEventListener('click', () => {
        stopFlightAutoRefresh();
    });
}

function addMinutes(timeString, minutes) {
    if (!timeString || !timeString.includes(':')) return '18:00';
    const [h, m] = timeString.split(':').map(Number);
    let totalMinutes = h * 60 + m + minutes;
    const newH = Math.floor(totalMinutes / 60) % 24;
    const newM = totalMinutes % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

function parseFlightDate(dateStr) {
    const months = {
        'stycznia': 0, 'lutego': 1, 'marca': 2, 'kwietnia': 3, 'maja': 4, 'czerwca': 5,
        'lipca': 6, 'sierpnia': 7, 'września': 8, 'października': 9, 'listopada': 10, 'grudnia': 11,
        'styczeń': 0, 'luty': 1, 'marzec': 2, 'kwiecień': 3, 'maj': 4, 'czerwiec': 5,
        'lipiec': 6, 'sierpień': 7, 'wrzesień': 8, 'październik': 9, 'listopad': 10, 'grudzień': 11
    };
    if (!dateStr) return new Date();
    const parts = dateStr.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    if (parts.length >= 3) {
        const day = parseInt(parts[0], 10);
        const monthName = parts[1];
        const year = parseInt(parts[2], 10);
        const monthIndex = months[monthName] !== undefined ? months[monthName] : 6;
        return new Date(year, monthIndex, day);
    }
    return new Date(dateStr);
}
