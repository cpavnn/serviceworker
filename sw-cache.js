const version = 'v2';

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(version)
        .then(function(cache) {
            return cache.addAll(['app.css',
                'index.html',
                'page1.html',
                'offline.html'
            ]);
        }));
});

self.addEventListener('activate', function(event) {
    //REMOVE PREIVOUS CACHE
    // event.waitUntil(
    //   caches.keys()
    //   .then(function (keys) {
    //     return Promise.all(keys.filter(function(key) {
    //         return key!==version;
    //     }).map(function(key) {
    //         return caches.delete(key);
    //     }));
    //   }));
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res)
                return res;

            if (!navigator.onLine)
                return caches.match(new Request('offline.html'));

            return fetchAndUpdate(event.request);

        })
    )
});

//PUSH NEW NAVIGATION TO CACHE
function fetchAndUpdate(request) {

    return fetch(request)
        .then(function(res) {
            if (res) {
                return caches.open(version)
                    .then(function(cache) {
                        return cache.put(request, res.clone())
                            .then(function() {
                                return res;
                            });
                    });
            }
        });
}


function cacheFirstPattern(request) {
  event.respondWith(
    caches.match(event.request).then(function(cResponse) {
      if(cResponse) {return cResponse;}
      return fetch(event.request).then(function(fResponse){
        return caches.open('v1').then(function(cache){
          return cache.put(event.target, fResponse.clone()).then(function(){
            return fResponse;
          });
        });
      });
    });
  );
}


function networkFirstPattern() {
  event.respondWith(
    fetch(event.request).then(function(fResponse){
      return caches.open('v1').then(function(cache){
        if(!fResponse.ok) {
          return cache.match(event.request);
        } else {
          cache.put(event.request, fResponse.clone());
          return fResponse;
        }
      });
    });
  );
}

//BURN UP EXTRA BANDWIDTH
function fastestPattern() {
  event.respondWith(() => {
    var promises = [catches.match(event.request),
                    fetch(event.request)];
    return new Promise((resolve, reject) => {
      promises.map(p => Promise.resolve(promise));
      promises.forEach(p => p.then(resolve));
      promises.reduce(a,b) => a.catch(() => b)
      .catch(() => reject(new Error('Both promises failed')));
    });
  });
}
