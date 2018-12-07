const fakeer = require('faker');
const puppeteer = require('puppeteer');
const server = require('../server/server.js');
const timeout = 16000;
const url = 'http://localhost:3000/';
let page;
let browser;
const PORT = 8000;
const width = 800;
const height = 600;
const browserConfig = {
  headless: true,
  slowMo: 40,
  args: [`--window-size=${width},${height}`, '--disable-http2']
}

beforeAll(async () => {
  server.listen(PORT);
});

describe('Login page', () => {
  beforeEach (async () => {
    browser = await puppeteer.launch(browserConfig);
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterEach(async () => {
    browser.close();
  });
   
	test('Test home loads', async done => {
		await page.waitFor(1000);
		await page.tracing.start({path: 'trace.json'});
		await page.goto(url, { waitUntil: 'domcontentloaded' });
		const title = await page.title();
		expect(title).toBe('React App');
		await page.tracing.stop();
		done();
	}, timeout);

  test('Can go to create playlist', async done => {
		await page.waitFor(1000);
		await page.tracing.start({path: 'trace.json'});
		await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.screenshot({path: 'screenshots/home-create.png'});
    await page.click('#burger');
    await page.click('#create-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/create');
		await page.tracing.stop();
		done();
  }, timeout);
});
