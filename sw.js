const CACHE_NAME = 'lady-care-v2';
const ASSETS = [
    './',
    './index.html',
    'https://img.icons8.com/fluency/512/calendar-2026.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('push', (event) => {
    const options = {
        body: "🌸 ခလေးလေးရဲ့ ခန္ဓာကိုယ်လေးကို ဂရုစိုက်ရမယ့် အချိန်ရောက်ပြီ‌နော် 🌸 အစားအသောက်လေးတွေကို ဂရုစိုက်ပေးပါနော် 🌸 ရေများများသောက်ပေးပါ 🌸",
        icon: "https://img.icons8.com/fluency/512/calendar-2026.png",
        badge: "https://img.icons8.com/fluency/512/calendar-2026.png",
        vibrate: [500, 100, 500, 100, 500],
        data: { url: './index.html' }
    };
    event.waitUntil(self.registration.showNotification('Lady Care Pro', options));
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientsArr => {
            if (clientsArr.length > 0) return clientsArr[0].focus();
            return clients.openWindow('./index.html');
        })
    );
});
