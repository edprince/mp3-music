const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());
const router = new Router();

const port = 8000;

app.use( async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('content-type', 'application/json');
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(port);
console.log('Server listening on port: ', port);

module.exports = server;

