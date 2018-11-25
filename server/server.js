const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const status = require('http-status-codes');
const db = require('../modules/db.js');
const validate = require('../modules/validate.js');
const app = new Koa();
const router = new Router();
const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

app.use(bodyParser());
app.use(cors());
app.use( async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('content-type', 'application/json');
  await next();
});

router.get('/', ctx => {
  ctx.body = {message: 'Hello'};
});

router.get('/playlists', ctx => {
  ctx.body = {message: 'playlists'};
});

router.get('/login', ctx => {
  ctx.status = status.OK;
});

router.post('/register', async (ctx) => {
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
  const request = await db.registerUser(user);
  ctx.status = status.OK;
});


app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(port);
console.log('Server listening on port: ', port);

module.exports = server;
