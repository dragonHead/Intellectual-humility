// https://github.com/GoogleChrome/puppeteer
const puppeteer = require('puppeteer');

// デバイス指定
// const devices = require('puppeteer/DeviceDescriptors');
// const iPhone = devices['iPhone X'];

// ヘッドレスモードで実行するかどうか(デフォルトtrue)
const headless = false;
// 動作をミリ秒単位で遅らせる
const slowMo = 10;
// DevToolsパネルを自動で開くかどうか。
const devtools = false;
// ブラウザインスタンスの開始を待つ最大時間(デフォルト3000)
const timeout = 3000;
// ブラウザ横
const width = 1280;
// ブラウザ縦
const height = 800;

// 起動時にブラウザウィンドウを自動的に開かない
// --no-startup-window
// HTTP-Referer ヘッダーを送信しない
// --no-referrers
// ブラウザをシークレットモードで直接起動する
// --incognito
// デフォルトのブラウザ情報バーが表示されないようにす,,るUI/ブラウザテストに役立つ
// --no-default-browser-check
// スクリーンショットのスクロールバーを非表示にする
// --hide-scrollbars
// ユーザーにブラウザが自動テストによって制御されていることを通知する
// --enable-automation
//
// '--no-sandbox'
//
// '--disable-setuid-sandbox'
const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
];

(async () => {
  const browser = await puppeteer.launch({
    headless, slowMo, devtools, timeout, args,
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto('https://www.google.co.jp/');
  await page.screenshot({ path: 'test/puppeteer/screenshot/example.png' });
  browser.close();
})();
