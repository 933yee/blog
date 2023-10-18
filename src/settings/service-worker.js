self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('my-blog-cache').then(cache => {
            return cache.addAll([
                '/',  // Add the paths you want to cache
                '/index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('beforeinstallprompt', event => {
    // Show install prompt when available
    event.preventDefault();
    const promptEvent = event;
    // Show a button or other UI element to prompt the user to install the app
    // This could be a "Add to Home Screen" button
});
