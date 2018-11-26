const Server = require('../server/server.js');
const router = require('../server/router.js');
const request = require('supertest');
const status = require('http-status-codes');
const PORT = 8080;
const user = {email: 'edward@gmail.com', password: 'pass'}
let server;


beforeAll(async () => {
  console.log('Running server tests');
  server = Server.listen(PORT);
});

afterAll(async () => {
  //server.close();
});

describe('routing tests', () => {

  test('get home route GET /', async () => {
    //expect.assertions(2);
    const response = await request(server).get('/');
    expect(response.status).toEqual(status.OK);
    expect(response.type).toEqual("application/json");
  });

  test('get playlist route GET /playlists', async () => {
    //expect.assertions(2);
    const response = await request(server).get('/playlists');
    expect(response.status).toEqual(status.OK);
    expect(response.type).toEqual("application/json");
  });

  test('GET /login', async () => {
    const response = await request(server).get('/login');
    expect(response.status).toBe(status.OK);
  });

  test('POST /login', async () => {
    const response = await request(server).post('/login');
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /login', async () => {
    const response = await request(server)
      .post('/login')
      .send(user);
    //expect(response.status).toBe(status.OK);
  });

  test('POST /register', async () => {
    const response = await request(server).post('/register');
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /register with user email but no password', async () => {
    const response = await request(server)
      .post('/register')
      .send({
          email: 'ed@gmail.com'
      })
      expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /register with bogus email', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        email: 'ed',
        password: 'pass'
      })
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /register with good details', async () => {
    const response = await request(server)
      .post('/register')
      .send(user)
    expect(response.status).toBe(status.OK);
  });
});
