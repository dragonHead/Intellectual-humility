// Event(install, activate, message, fetch, sync, push)

const MAIN_CACHE_NAME = `monacache`;
const MAIN_CACHE_VERSION = `0.1.0`;
const MAIN_CACHE = `${MAIN_CACHE_NAME}_${MAIN_CACHE_VERSION}`;

const OFFLINE_CACHE_NAME = `monacache_offline`;
const OFFLINE_CACHE_VERSION = `0.1.0`;
const OFFLINE_CACHE = `${OFFLINE_CACHE_NAME}_${OFFLINE_CACHE_VERSION}`;

const CACHE_LIST = [
    '/monaka/',
    '/monaka/index.html',
    '/monaka/about.html',
    '/monaka/404.html',
    '/monaka/manifest.json',
    '/css/components/header/header.css',
    '/css/components/header/logo.css',
    '/css/components/header/nav.css',
    '/css/app.css',
    '/monaka/js/app.js',
    '/monaka/js/about.js',
];

// const CACHE_LIST = [
//     '/',
//     '/index.html',
//     '/about.html',
//     '/404.html',
//     '/manifest.json',
//     '/css/app.css',
//     '/css/base.css',
//     '/css/components/header/header.css',
//     '/css/components/header/logo.css',
//     '/css/components/header/nav.css',
//     '/js/app.js',
//     '/js/sub.js',
//     '/js/about.js',
//     '/js/components/header/header.js',
//     '/js/components/header/logo.js',
//     '/js/components/header/nav.js',
// ];

// install
self.addEventListener('install', event => {
    event.waitUntil(
        (async() => {
            console.log(`Open cache`);
            const cache = await caches.open(`${MAIN_CACHE}`);
            await cache.addAll(CACHE_LIST);

            const offline_cache = await caches.open(`${OFFLINE_CACHE}`);
            await offline_cache.add("/offline.html", { cache: "reload"});
        })()
    )

    // 待機しているService Workerがアクティブになるように強制
    // self.skipWaiting();
});

// active
self.addEventListener('active', event => {
    // 古いキャッシュの削除
    const cacheKeepList = [`${MAIN_CACHE}`, `${OFFLINE_CACHE}`];
    event.waitUntil(
        (async () => {
            await caches.keys().then(keyList => {
                return Promise.all(keyList.map(key => {
                    console.log(`Delete old cache`);
                    if (cacheKeepList.includes(key) === -1) {
                        return caches.delete(key);
                    }
                }));
            });

            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
              }
        })()
    )

    // アクティブなサービスワーカーが自身のスコープ内のすべてのクライアントのコントローラーとして自分自身を設定できる。
    // これにより、このサービスワーカーによって制御されるようになるクライアントのサービスワーカーで"controllerchange"イベントがトリガーされる。
    // サービスワーカーが最初に登録されると、ページは次に読み込まれるまでそれを使用しないが、ページがすぐに制御したい場合
    // clients.claim();
});

// fetch
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.origin == location.origin) {
        if (event.request.mode === "navigate") {
            console.log("navigate...");
            event.respondWith(
              (async () => {
                try {
                  const preloadResponse = await event.preloadResponse;
                  if (preloadResponse) {
                    console.log("Preload Response", preloadResponse);
                    return preloadResponse;
                  }

                  const networkResponse = await fetch(event.request);
                  return networkResponse;
                } catch (error) {
                  console.log("Fetch failed; returning offline page instead.", error);

                  const cache = await caches.open(OFFLINE_CACHE);
                  const cachedResponse = await cache.match("/offline.html");
                  return cachedResponse;
                }
              })()
            );
        } else {
            event.respondWith(
                (async () => {
                    const cachedResponse = await caches.match(event.request);
                    if (cachedResponse) {
                        // 利用可能なキャッシュと一致する場合
                        console.debug(`cache match response: `, event.request)
                        return cachedResponse;
                    }

                    const networkResponse = await fetch(event.request);
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        console.log(`test`);
                        return networkResponse;
                    }

                    const responseClone = await networkResponse.clone();
                    const cache = await caches.open(`${MAIN_CACHE}`);
                    await cache.put(event.request, responseClone);

                    console.debug(`fetch response: `, event.request)
                    return networkResponse;
                })()
            );
        }
    } else {
        event.respondWith(
            (async () => {
                console.debug(`fetch response(not origin): `, event.request);
                const networkResponse = await fetch(event.request);
                return networkResponse;
            })()
        )
    }
})