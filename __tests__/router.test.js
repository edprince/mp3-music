const Server = require('../server/server.js');
const router = require('../server/router.js');
const request = require('supertest');
const status = require('http-status-codes');
const faker = require('faker');
const PORT = 8080;
const id = '5bfc382b8bd7f145fbc14a6b';
const user = {email: faker.internet.email(), password: 'pass'};
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
    expect.assertions(1);
    const response = await request(server).get('/');
    expect(response.status).toEqual(status.OK);
  });

  test('get home without id GET /home', async () => {
    const response = await request(server).get('/home');
    expect(response.status).toEqual(status.NOT_FOUND);
  });

  test('get home with id GET /home', async () => {
    const response = await request(server).get('/home/' + id);
    expect(response.status).toEqual(status.OK);
  });

  test('POST /register', async () => {
    const response = await request(server).post('/register');
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /register with user email but no password', async () => {
    const response = await request(server)
      .post('/register')
      .send({
          email: faker.internet.email()
      });
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /register with bogus email', async () => {
    const response = await request(server)
      .post('/register')
      .send({
        email: faker.name.findName(),
        password: 'pass'
      });
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /register with good details', async () => {
    const response = await request(server).post('/register').send(user);
    expect(response.status).toBe(status.OK);
  });

  test('POST /register again with same details', async() => {
    const response = await request(server).post('/register').send(user);
    expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
  });

  test('POST /login with good email bad password', async() => {
    const response = await request(server).post('/login')
      .send({
        email: user.email,
        password: 'THIS-IS-A-BAD-PASSWORD'
      });
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('GET /login', async () => {
    const response = await request(server).get('/login');
    expect(response.status).toBe(status.OK);
  });

  test('POST /login send empty object', async () => {
    const response = await request(server).post('/login').send({});
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /login send invalid details', async () => {
    const response = await request(server).post('/login').send({
      email: faker.internet.email(),
      password: faker.name.findName()
    });
    expect(response.status).toBe(status.NOT_FOUND);
  });

  test('POST /login valid user details', async () => {
    const response = await request(server).post('/login').send(user);
    expect(response.status).toBe(status.OK);
  });


  test('GET /playlist', async() => {
    const response = await request(server).get('/playlist');
    expect(response.status).toBe(status.NOT_FOUND);
  });

  test('GET /playlist', async() => {
    const response = await request(server).get('/playlist/5bfe8843dfa845185762dbb5');
    expect(response.status).toBe(status.OK);
  });

  test('POST /create no data', async() => {
    const response = await request(server).post('/create');
    expect(response.status).toBe(status.BAD_REQUEST);
  });

  test('POST /create good data', async() => {
    const response = await request(server)
      .post('/create')
      .send({title: 'Test', photo: 'https://via.placeholder.com/300', public: false});
    expect(response.status).toBe(status.OK);
  });
});
