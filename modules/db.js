const hasher = require('./hash.js');
const AWS = require('aws-sdk');
const Endpoint = 'sfo2.digitaloceanspaces.com';
const ACCESS_KEY = 'UY4UZXSGOTVEUWCEFKTH';
const SECRET_KEY = 'LkxGkGM8UIQLG/UTuYFwVJ1lpgZiyefCKQugVmUERAw';
const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const url = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';
const dbName = 'princee3-music';
const fs = require('fs');

/*
 * Validates user details and adds to database
 * @param {object} user - contains email and password attributes
 */
exports.registerUser = async(user, db) => {
  //Check for existing users
  const existingUser = await exports.checkUserExists(user, db);
  if (existingUser.length > 0) {
    throw new Error('Already exists');
  };
  const hashedPassword = await hasher.hash(user.password);
  const result = await db.collection('users').insertOne({
    email: user.email,
    password: hashedPassword,
    admin: true
  });
  return result;
};

exports.uploadSong = async(file, id, db) => {
  // Configure client for use with Spaces
  const spacesEndpoint = new AWS.Endpoint(Endpoint);

  const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
  });

  // Add a file to a Space
  const params = {
    Body: file,
    Bucket: 'princee3-music',
    Key: file.name
  };
  let FileData;
  const upload = await s3.upload({
    Bucket: 'princee3-music',
    Key: file.name,
    ACL: 'public-read',
    Body: fs.createReadStream(file.path),
  }, (err, data) => {
    if (err) {
      throw err;
    }
    const oid = new Mongo.ObjectID(id);
    db.collection('playlists').update({'_id': oid}, {$push: {songs: data.Location}});
  });
};

exports.getAllPlaylists = async(id, db) => {
  const playlists = await db.collection('playlists').find({public: 'true', userId: id}).toArray();
  return playlists;
};

exports.getPlaylist = async(id, db) => {
  const oid = new Mongo.ObjectID(id);
  const playlist = await db.collection('playlists').find({'_id': oid}).toArray();
  return playlist;
};

exports.savePlaylist = async(playlist, db) => {
  const insertion = await db.collection('playlists').insertOne(playlist);
  return insertion;
};

exports.checkUserExists = async(user, db) => {
  const dbUser = await db.collection('users').find({email: user.email}).toArray();
  return dbUser;
};

exports.connect = async() => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true});
  const db = client.db(dbName);
  return db;
};
