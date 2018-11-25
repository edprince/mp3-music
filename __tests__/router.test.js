const server = require('../server/server.js');
const router = require('../server/router.js');
const request = require('supertest');
process.env.PORT = 5050;

beforeAll(async () => {
  console.log('Running server tests');
});

afterAll(async () => {
  server.close();
});

describe('routing tests', () => {

  test('get home route GET /', async () => {
    //expect.assertions(2);
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test('get playlist route GET /playlists', async () => {
    //expect.assertions(2);
    const response = await request(server).get('/playlists');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test('GET /login', async () => {
    const response = await request(server).get('/login');
    expect(response.status).toBe(200);
  });

  test('POST /register', async () => {
    const response = await request(server).post('/register');
    expect(response.status).toBe(400);
  });

  test('POST /register with user email but no password', async () => {
    const response = await request(server)
      .post('/register')
      .send({
          email: 'ed@gmail.com'
      })
      expect(response.status).toBe(400);
  });

  test('POST /register with bogus email', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        email: 'ed',
        password: 'pass'
      })
    expect(response.status).toBe(400);
  });

  test('POST /register with good details', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        email: 'ed@gmail.com',
        password: 'pass'
      })
    expect(response.status).toBe(200);
  });
});
