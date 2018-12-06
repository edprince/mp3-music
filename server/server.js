const Koa = require('koa');
//const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body')
const cors = require('@koa/cors');
const errorHandler = require('koa-better-error-handler');
const notFound = require('koa-404-handler');
const middleware = require('./middleware');
const router = require('./router');

const app = new Koa();

/*
app.use(bodyParser({
  enableTypes: ['json', 'form'],
  formLimit: '5mb'
}));
*/
app.use(koaBody({ multipart: true }));
app.context.onerror = errorHandler;

app.use(cors());
app.use( async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('content-type', 'application/json');
  await next();
});

app.use(middleware.error);
app.use(middleware.db);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

module.exports = app;

