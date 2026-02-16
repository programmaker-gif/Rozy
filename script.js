/*
 * Logic Section
 */

// Create Stars for Background (deprecated - using image background now)
function createStars() {
    // Background image now handles the visual elements
    // This function is kept for compatibility but does nothing
    console.log('Using wooden background with teddy bear image');
}

function checkAnswers() {
    const nameInput = document.getElementById('nameInput');
    const dateInput = document.getElementById('dateInput');
    const loginBox = document.getElementById('login-box');
    const errorMsg = document.getElementById('errorMsg');

    const name = nameInput.value.trim();
    const date = dateInput.value.trim();

    // Validation Logic
    // Name: "بيستي روزي" (case-insensitive for English if typed, but requesting Arabic)
    // Let's accept both Arabic and maybe English "Rozy" just in case, but instructions said "Rozy" input in Arabic context implies Arabic script usually or just phonetic. 
    // The user said: 'السؤال الأول: "من صاحبة العيد ميلاد؟" → يجب إدخال "بيستي روزي"'
    // I will match 'بيستي روزي' loosely.
    const isNameValid = name.includes('بيستي روزي') || name.includes('بيستي') || name.toLowerCase().includes('besty rozy') || name.toLowerCase().includes('besty rozi');

    // Date: 16-2, 16/2, 16 2
    const isDateValid = (date.includes('16') && date.includes('2')) && (date.includes('-') || date.includes('/') || date.includes(' '));

    if (isNameValid && isDateValid) {
        // Success
        errorMsg.style.opacity = '0';
        startCelebration();
    } else {
        // Failure
        errorMsg.style.opacity = '1';
        // Add shaking class
        loginBox.classList.remove('shaking'); // reset
        void loginBox.offsetWidth; // trigger reflow
        loginBox.classList.add('shaking');
        
        // Clear inputs to force retry? Or keep them? User said "re-enable fields".
        // I'll keep them so she can correct them.
    }
}

function startCelebration() {
    const loginScreen = document.getElementById('login-screen');
    const surpriseScreen = document.getElementById('surprise-screen');
    const celebrationText = document.getElementById('celebration-text');

    // Transition: Fade out login
    loginScreen.style.opacity = '0';
    
    setTimeout(() => {
        loginScreen.style.display = 'none';
        
        // Prepare surprise screen
        surpriseScreen.style.display = 'flex';
        // Trigger reflow to ensure transition works
        void surpriseScreen.offsetWidth; 
        
        // Start Fireworks loop
        const duration = 15 * 1000;
        const end = Date.now() + duration;

        // Simple fireworks loop
        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#00ff00', '#0000ff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#00ff00', '#0000ff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Show Text
        setTimeout(() => {
            celebrationText.style.opacity = '1'; 
        }, 500);
        
    }, 1000); // Wait for fade out
}

// Initialize
createStars();
