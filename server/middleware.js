const database = require('../modules/db.js');

exports.db = async(ctx, next) => {
  // Use connect method to connect to the server
  ctx.state.db = await database.connect();
  await next();
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
