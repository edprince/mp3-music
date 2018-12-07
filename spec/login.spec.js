const fakeer = require('faker');
const puppeteer = require('puppeteer');
const timeout = 16000;
const validUser = {
  email: 'edward_prince@hotmail.com',
  password: 'pass'
}
let page;
let browser;
const width = 800;
const height = 600;
const browserConfig = {
  headless: true,
  slowMo: 40,
  args: [`--window-size=${width},${height}`, '--disable-http2']
}


describe('Login page', () => {
  beforeEach (async () => {
    browser = await puppeteer.launch(browserConfig);
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterEach(async () => {
    browser.close();
  });
   
	test('Test login loads', async done => {
		await page.waitFor(1000);
		await page.tracing.start({path: 'trace.json'});
		await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
		const title = await page.title();
		expect(title).toBe('React App');
		await page.tracing.stop();
		done();
	}, timeout);

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
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.click('#register-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/register');
    done();
  }, timeout);

  test('login click without details keeps user on page', async done => {
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.click('#login-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/login');
    await page.screenshot({ path: 'screenshots/page.png' })
    done();
  }, timeout);

  test('login with good details', async done => {
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.click('#email');
    await page.type('#email', validUser.email);
    await page.click('#password');
    await page.type('#password', validUser.password);
    await page.click('#login-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/');
    await page.screenshot({path: 'screenshots/login.png'});
    await browser.close();
    done();
  }, timeout);
});
