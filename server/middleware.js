const database = require('../modules/db.js');
const DEFAULT_ERROR_PORT = 500;

exports.db = async(ctx, next) => {
  // Use connect method to connect to the server
  ctx.state.db = await database.connect();
  await next();
};

exports.error = async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || DEFAULT_ERROR_PORT;
    ctx.body = {error: err.message};
    ctx.app.emit('error', err, ctx);
  }
};

/*
exports.requiresLogin = (ctx, next) => {
  if (ctx.request.jwt && ctx.request.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}
*/
