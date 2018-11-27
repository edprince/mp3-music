const hasher = require('./hash.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';
const dbName = 'princee3-music';

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

exports.getPlaylists = async(user, db) => {
  const playlists = await db.collection('playlists').find({userId: user._id}).toArray();
  return playlists;
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
