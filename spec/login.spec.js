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

describe('Shopping List', () => {
  test('can add a single item', async done => {
    //await page.waitFor(1000);
    //await page.tracing.start({path: 'trace.json',screenshots: true});
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title).toBe('React App');
    //await page.tracing.stop()
    await browser.close();
    done();
  }, timeout);
});
