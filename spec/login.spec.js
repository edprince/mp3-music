//const faker = require('faker');
const puppeteer = require('puppeteer');

/*
const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email()
};
*/

let page;
let browser;
const width = 800;
const height = 600;
const timeout = 16000;

beforeAll( async() => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 40,
    args: [`--window-size=${width},${height}`, '--disable-http2']
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

// afterAll(() => {
//   browser.close()
// })

describe('Login Form', () => {
  test.skip('clicking register takes user to register page', async done => {
    await page.goto('http://localhost:3000/login', { waitUntil: 'domcontentloaded' });
    await page.click('#register-btn');
    await page.waitFor(1000);
    expect(page.url()).toBe('http://localhost:3000/register');
    await browser.close();
    done();
  }, timeout);

});

