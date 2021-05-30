import { hello } from './sub';
hello();

import { HeaderElement } from './components/header/header';
customElements.define('m-header', HeaderElement);

// service worker
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/monaka/sw.js', {scope: '/monaka/'})
        // navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            let sw = registration.installing || registration.waiting || registration.active;
            console.log(`service worker: ${sw.state} `, registration.scope);

            if (sw) {
                // installing, installed, activating, activated, redundant
                sw.addEventListener('statechange', e => {
                    console.log(`service worker change state: ${e.target.state}`);
                });
            }

            registration.addEventListener('updatefound', () => {
                // 新しいサービスワーカーを取得時
                let installWorker = registration.installing;
                console.log(`新しいservice workerをインストールしています。`, installWorker);
                // インストール中のservice workerの状態変更
                // installWorker.addEventListener('statechange', e =>{});
            });
        }).catch((error) => {
            console.log(`service worker 登録失敗 `, error);
        });

        // 現在service workerが制御されているかどうか。
        if (navigator.serviceWorker.controller) {
            console.log(`このページは現在 service worker によって制御されています。`, navigator.serviceWorker.controller)
        }

        // 新しいactiveなワーカーを取得すると発生
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log(`このページは今 service worker によって制御されています。`, navigator.serviceWorker.controller);
        })
    } else {
        console.log(`service workerをサポートしていません。`);
    }
});