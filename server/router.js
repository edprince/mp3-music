const Router = require('koa-router');
const status = require('http-status-codes');
const db = require('../persistence/db.js');
const validate = require('../modules/validate.js');
const hasher = require('../modules/hash.js');

const app = new Router();

app.get('/', ctx => {
  ctx.body = {message: 'Hello'};
});

//Protected route
app.get('/home/:id', async ctx => {
  const id = ctx.params.id;
  const playlists = await db.getAllPlaylists(id, ctx.state.db);
  ctx.body = {response: playlists};
});

app.get('/login', ctx => {
  ctx.status = status.OK;
});

app.post('/upload/:id', async ctx => {
  const id = ctx.params.id;
  console.log(ctx.request.files);
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
  ctx.status = status.OK;
});

app.post('/login', async(ctx) => {
  if (!checkForEmailAndPassword(ctx.request.body)) {
    console.log('Bad details');
    ctx.throw(status.BAD_REQUEST, 'Invalid Email Address or Password');
  }
  const user = ctx.request.body;
  const dbUser = await login(user, ctx);
  ctx.response.body = dbUser;
  ctx.status = status.OK;
});

app.post('/create/', async(ctx) => {
  if (!checkForPlaylistData(ctx.request.body)) {
    ctx.throw(status.BAD_REQUEST, 'Invalid playlist data');
  }
  const playlist = ctx.request.body;
  playlist.songs = [];
  await db.savePlaylist(playlist, ctx.state.db);
  ctx.status = status.OK;
});

app.get('/playlist/:id', async(ctx) => {
  const id = ctx.params.id;
  const playlist = await db.getPlaylist(id, ctx.state.db);
  ctx.response.body = playlist;
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
  await db.registerUser(user, ctx.state.db);
  ctx.status = status.OK;
});

function checkForEmailAndPassword(user) {
  const result = user.email && user.password ? true : false;
  return result;
}

function checkForPlaylistData(playlist) {
  const result = playlist.title && playlist.photo ? true : false;
  return result;
}

module.exports = app;
