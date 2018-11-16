const server = require('../server/server.js');
const request = require('supertest');

beforeAll(async () => {
  console.log('Running server tests');
});

afterAll(async () => {
  server.close();
  console.log('Server closed');
});

describe('routing tests', () => {
  test('get home route GET /', async () => {
    expect.assertions(1);
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });
  test('get playlist route GET /playlists', async () => {
    expect.assertions(1);
    const response = await request(server).get('/playlists');
    expect(response.status).toEqual(200);
  });
});
