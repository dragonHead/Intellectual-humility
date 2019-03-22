// https://github.com/GoogleChrome/puppeteer
const puppeteer = require('puppeteer')

// ブラウザ横
const width = 1280
// ブラウザ縦
const height = 800

const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox'
];

(async () => {
  const browser = await puppeteer.launch({ args })
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  await page.goto('https://www.google.co.jp/')
  await page.screenshot({ path: 'test/puppeteer/screenshot/example.png' })
  browser.close()
})()
