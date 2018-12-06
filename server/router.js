const Router = require('koa-router');
const status = require('http-status-codes');
const logic = require('../modules/business.js');

const app = new Router();

app.get('/', ctx => {
  ctx.body = {message: 'Hello'};
});

//Protected route
app.get('/home/:id', async ctx => {
  const playlists = await logic.getAllPlaylists(ctx);
  ctx.body = {response: playlists};
});

app.get('/login', ctx => {
  ctx.status = status.OK;
});

app.post('/login', async(ctx) => {
  const dbUser = await logic.loginUser(ctx);
  ctx.response.body = dbUser;
  ctx.status = status.OK;
});

app.post('/upload/:id', async ctx => {
  const id = ctx.params.id;
  await logic.uploadSong(id, ctx);
  ctx.status = status.OK;
});

app.post('/create/', async(ctx) => {
  await logic.create(ctx);
  ctx.status = status.OK;
});

app.get('/playlist/:id', async(ctx) => {
  ctx.response.body = await logic.getPlaylist(ctx);
  ctx.status = status.OK;
});

app.post('/register', async(ctx) => {
  ctx.set('Allow', 'GET, POST');
  await logic.register(ctx);
  ctx.status = status.OK;
});

module.exports = app;
