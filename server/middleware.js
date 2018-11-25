const database = require('../modules/db.js');

exports.db = async(ctx, next) => {
  // Use connect method to connect to the server
  ctx.state.db = await database.connect();
  await next();
};
