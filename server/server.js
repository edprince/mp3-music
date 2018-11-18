const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

app.use(bodyParser());
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

app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(port);
console.log('Server listening on port: ', port);

module.exports = server;

