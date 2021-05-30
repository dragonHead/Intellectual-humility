// Event(install, activate, message, fetch, sync, push)

const CACHE_NAME = `monacache`;
const CACHE_VERSION = `0.1.0`;

const CACHE_LIST = [
    '/monaka/',
    '/monaka/index.html',
    '/monaka/about.html',
    '/monaka/404.html',
    '/monaka/offline.html',
    '/monaka/manifest.json',
    '/monaka/js/app.js',
    '/monaka/js/sub.js',
    '/monaka/js/about.js',
    '/monaka/js/components/header/header.js',
    '/monaka/js/components/header/logo.js',
    '/monaka/js/components/header/nav.js',
    '/monaka/css/components/header/header.css',
    '/monaka/css/components/header/logo.css',
    '/monaka/css/components/header/nav.css',
];

// const CACHE_LIST = [
//     '/',
//     '/index.html',
//     '/about.html',
//     '/404.html',
//     '/offline.html',
//     '/manifest.json',
//     '/js/app.js',
//     '/js/sub.js',
//     '/js/about.js',
//     '/js/components/header/header.js',
//     '/js/components/header/logo.js',
//     '/js/components/header/nav.js',
//     '/css/components/header/header.css',
//     '/css/components/header/logo.css',
//     '/css/components/header/nav.css',
// ];

// install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(`${CACHE_NAME}_${CACHE_VERSION}`)
        .then(cache => {
            console.log(`Opened cache`);
            return cache.addAll(CACHE_LIST);
        })
    )

    // 待機しているService Workerがアクティブになるように強制
    // self.skipWaiting();
});

// active
self.addEventListener('active', event => {
    // 古いキャッシュの削除
    const cacheKeepList = [`${CACHE_NAME}_${CACHE_VERSION}`];
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (cacheKeepList.includes(key) === -1) {
                    return caches.delete(key);
                }
            }));
        }).then(() => {
            // アクティブなサービスワーカーが自身のスコープ内のすべてのクライアントのコントローラーとして自分自身を設定できる。
            // これにより、このサービスワーカーによって制御されるようになるクライアントのサービスワーカーで"controllerchange"イベントがトリガーされる。
            // サービスワーカーが最初に登録されると、ページは次に読み込まれるまでそれを使用しないが、ページがすぐに制御したい場合
            // clients.claim();
        })
    )
});

// fetch
self.addEventListener('fetch', event => {
    // console.debug(event.request);
    const url = new URL(event.request.url);
    if (url.origin == location.origin) {
        event.respondWith(
            caches.match(event.request)
            .then(response => {
                if (response) {
                    // 利用可能なキャッシュと一致する場合
                    console.debug(`cache match response: `, event.request)
                    return response;
                } else {
                    // リソース取得する場合
                    return fetch(event.request).then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            console.log(`test`);
                            return response;
                        }
                        const responseClone = response.clone();
                        caches.open(`${CACHE_NAME}_${CACHE_VERSION}`).then(cache => {
                            cache.put(event.request, responseClone);
                        });

                        console.debug(`fetch response: `, event.request)
                        return response;
                    }).catch(() => {
                        console.log(`request not match...`);
                    })
                }
            })
        );
    } else {
        console.debug(`fetch response(not origin): `, event.request);
        return fetch(event.request);
    }
})