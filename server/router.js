const Router = require('koa-router');
const status = require('http-status-codes');
const db = require('../modules/db.js');
const validate = require('../modules/validate.js');
const hasher = require('../modules/hash.js');

const app = new Router();

app.get('/', ctx => {
  ctx.body = {message: 'Hello'};
});

//Protected route
app.get('/home', async ctx => {
  const playlists = await db.getPlaylists(ctx.state.db);
  ctx.body = {response: playlists};
});

app.get('/login', ctx => {
  ctx.status = status.OK;
});

app.post('/login', async(ctx) => {
  if (!checkForEmailAndPassword(ctx.request.body)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address or Password');
  }
  const user = ctx.request.body;
  const dbUser = await login(user, ctx);
  ctx.response.body = dbUser;
  ctx.status = status.OK;
});

async function login(user, ctx) {
  const dbUser = await db.checkUserExists(user, ctx.state.db);
  if (dbUser.length > 0) {
    const passwordMatch = await hasher.comparePassword(dbUser[0].password, user.password);
    if (passwordMatch) {
      return dbUser[0];
    } else {
      ctx.throw(status.BAD_REQUEST, 'Passwords do not match');
    }
  } else {
    ctx.throw(status.NOT_FOUND, 'User not found');
  }
}

app.post('/register', async(ctx) => {
  ctx.set('Allow', 'GET, POST');
  if (!checkForEmailAndPassword(ctx.request.body)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address or Password');
  }
  const user = ctx.request.body;
  if (!validate.email(user.email)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address');
  }
  const request = await db.registerUser(user, ctx.state.db);
  ctx.status = status.OK;
});

function checkForEmailAndPassword(user) {
  const result = user.email && user.password ? true : false;
  return result;
}

module.exports = app;
