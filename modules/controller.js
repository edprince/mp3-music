const db = require('../persistence/db.js');
const status = require('http-status-codes');
const hasher = require('../modules/hash.js');
const validate = require('../modules/validate.js');

exports.uploadSong = async(id, ctx) => {
  if (!(ctx.request.files && ctx.request.files.song)) {
    ctx.throw(status.BAD_REQUEST, 'No song');
  }
  const file = ctx.request.files.song;
  db.uploadSong(file).then(response => {
    db.updatePlaylistWithSong(response, id, ctx.state.db);
  }).catch(err => {
    ctx.throw(status.BAD_REQUEST, 'Could not add song to db' + err);
  }).catch(err => {
    ctx.throw(status.BAD_REQUEST, 'Could not upload song' + err);
  });
};

exports.loginUser = async(ctx) => {
  if (!checkForEmailAndPassword(ctx.request.body)) {
    console.log('Bad details');
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address or Password');
  }
  const user = ctx.request.body;
  return await login(user, ctx);
};

exports.create = async(ctx) => {
  if (!checkForPlaylistData(ctx.request.body)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid playlist data');
  }
  const playlist = ctx.request.body;
  playlist.songs = [];
  await db.savePlaylist(playlist, ctx.state.db);
};

exports.register = async(ctx) => {
  if (!checkForEmailAndPassword(ctx.request.body)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address or Password');
  }
  const user = ctx.request.body;
  if (!validate.email(user.email)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address');
  }
  await db.registerUser(user, ctx.state.db);
};

exports.getPlaylist = async(ctx) => {
  const id = ctx.params.id;
  return await db.getPlaylist(id, ctx.state.db);
};

exports.getAllPlaylists = async(ctx) => {
  const id = ctx.params.id;
  return await db.getAllPlaylists(id, ctx.state.db);
};

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

function checkForEmailAndPassword(user) {
  const result = user.email && user.password ? true : false;
  return result;
}

function checkForPlaylistData(playlist) {
  const result = playlist.title && playlist.photo ? true : false;
  return result;
}
