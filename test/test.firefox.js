const puppeteer = require('puppeteer-firefox')
// const devices = require('puppeteer/DeviceDescriptors');

const url = 'http://localhost'
const port = ":8080";

const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox'
];

(async () => {
  const browser = await puppeteer.launch({ args })
  console.info(browser);

  const page = await browser.newPage()
  // await page.setViewport({ width, height })
  await page.goto(`${url}${port}/`);
  console.info(page);

  page.once('domcontentloaded', () => console.info('✅ DOM is ready'));
  page.once('load', () => console.info('✅ Page is loaded'));
  page.on('error', error => console.error(`❌ ${error}`));
  page.on('pageerror', error => console.error(`❌ ${error}`));
  page.once('close', () => console.info('✅ Page is closed'));

  const snapshot = await page.accessibility.snapshot();
  console.info(snapshot);

  await page.screenshot({ path: 'test/puppeteer/screenshot/example.png' })
  await browser.close()
})()