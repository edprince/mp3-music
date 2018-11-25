const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const errorHandler = require('koa-better-error-handler');
const notFound = require('koa-404-handler');
const middleware = require('./middleware');
const router = require('./router');
const defaultPort = 8080;
const port = process.env.PORT || defaultPort;

const app = new Koa();

app.use(bodyParser());
app.context.onerror = errorHandler;

app.use(cors());
app.use( async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('content-type', 'application/json');
  // Use connect method to connect to the server
  await next();
});

app.use(middleware.db);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);
const server = app.listen(port);
console.log('Server listening on port: ', port);

module.exports = server;
