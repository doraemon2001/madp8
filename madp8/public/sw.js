const cacheName = 'site-cache-v1'
const assestsToCache = [
    "/",
    "/index.html",
]

self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assestsToCache);
        })
    );
});

 self.addEventListener('activate',(event)=>{
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(assestsToCache);
        })
    );

});