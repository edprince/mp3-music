const Router = require('koa-router');
const status = require('http-status-codes');
const db = require('../modules/db.js');
const validate = require('../modules/validate.js');
const hasher = require('../modules/hash.js');

const app = new Router();

app.get('/', ctx => {
  ctx.body = {message: 'Hello'};
});

app.get('/playlists', ctx => {
  ctx.body = {message: 'playlists'};
});

app.get('/login', ctx => {
  ctx.status = status.OK;
});

app.post('/login', async(ctx) => {
  if (!checkForEmailAndPassword(ctx.request.body)) {
    ctx.status = status.BAD_REQUEST;
    return;
  }
  const user = ctx.request.body;
  //Get user record from db
  const dbUser = await db.checkUserExists(user, ctx.state.db);
  if (dbUser.length > 0) {
    const passwordMatch = await hasher.comparePassword(dbUser[0].password, user.password);
    passwordMatch ? ctx.response.body = dbUser : ctx.status = status.BAD_REQUEST;
  } else {
    ctx.status = status.BAD_REQUEST;
  }
});

app.post('/register', async(ctx) => {
  ctx.set('Allow', 'GET, POST');
  if (!(ctx.request.body.email && ctx.request.body.password)) {
    ctx.status = status.BAD_REQUEST;
    return;
  }
  const user = ctx.request.body;
  if (!validate.email(user.email)) {
    ctx.status = status.BAD_REQUEST;
    return;
  }
  const request = await db.registerUser(user, ctx.state.db);
  ctx.status = status.OK;
});

function checkForEmailAndPassword(user) {
  const result = user.email && user.password ? true : false;
  return result;
}

module.exports = app;
