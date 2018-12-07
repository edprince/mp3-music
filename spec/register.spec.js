const faker = require('faker');
const puppeteer = require('puppeteer');
//const config = require('./config');

let page;
let browser;
const timeout = 16000;
const width = 800;
const height = 600;
const browserConfig = {
  headless: true,
  slowMo: 40,
  args: [`--window-size=${width},${height}`, '--disable-http2']
}

describe('Register page', () => {
  beforeEach (async () => {
    browser = await puppeteer.launch(browserConfig);
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterEach(async () => {
    browser.close();
  });
   
	test('Register loads', async done => {
		await page.waitFor(1000);
		await page.tracing.start({path: 'trace.json'});
		await page.goto('http://localhost:3000/register', { waitUntil: 'domcontentloaded' });
		const title = await page.title();
		expect(title).toBe('React App');
		await page.tracing.stop();
		done();
	}, timeout);

  test('clicking register takes user to register page', async done => {
    await page.goto('http://localhost:3000/register', { waitUntil: 'domcontentloaded' });
    await page.click('#login-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/login');
    await browser.close();
    done();
  }, timeout);

  test('register click without details keeps user on page', async done => {
    await page.goto('http://localhost:3000/register', { waitUntil: 'domcontentloaded' });
    await page.click('#login-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/login');
    await browser.close();
    done();
  }, timeout);

  test('register with good details', async done => {
    await page.goto('http://localhost:3000/register', { waitUntil: 'domcontentloaded' });
    await page.click('#email');
    await page.type('#email', faker.internet.email());
    await page.click('#password');
    await page.type('#password', faker.internet.password());
    await page.click('#register-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/login');
    await browser.close();
    done();
  }, timeout);
});
