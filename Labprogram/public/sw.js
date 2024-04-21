var cachename='v1';
var assetstocache=[
'/',
'/index.html',
"/git",

];
self.addEventListener('install',e=>{
    console.log('Service worker installing');
    e.waitUntil(
        caches.open(cachename)
        .then(cache=>{
            console.log('service worker installed');
            cache.addAll(assetstocache);
        })
        .then(()=>{
            self.skipWaiting();
        }
    )
    )
})

self.addEventListener('activate',e=>{
    console.log('service worker activating');
    e.waitUntil(caches.delete(cachename))
    console.log('service worker activated');

})

self.addEventListener('fetch',e=>{
    console.log('fetching request: ',e.request.url);
e.respondWith(
    caches.match(e.request).then(async (response)=>{
        if(response)
        {
            return response;
        }
        let data=fetch(e.request);
        let data_clone=(await data).clone();
        e.waitUntil(caches.open(cachename).then(cache=>cache.put(e.request,data_clone)))
        return data;
    })

)

})