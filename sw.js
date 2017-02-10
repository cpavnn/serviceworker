console.log('aaa');

const version = 1;
self.addEventListener('install', function(event) {
    console.log('Service worker %s is installed at', version, new Date().toLocaleTimeString());
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service worker %s  Activated at', version, new Date().toLocaleTimeString());
});

self.addEventListener('fetch', function(event) {

    if (!navigator.onLine) {
        event.respondWith(new Response('<h1> offline </h1>',{headers:{'Content-Type': 'text/html'}}));
    } else {
        console.log(event.request.url);
        event.respondWith(fetch(event.request));
    }
  
});
