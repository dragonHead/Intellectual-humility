const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.co.jp/');
  await page.screenshot({ path: 'test/puppeteer/screenshot/example.png' });

  browser.close();
})();
