const hasher = require('./hash.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';
const dbName = 'princee3-music';

/*
 * Validates user details and adds to database
 * @param {object} user - contains email and password attributes
 */
exports.registerUser = async(user, db) => {
  const hashedPassword = await hasher.hash(user.password);
  const result = await db.collection('users').insertOne({
    email: user.email,
    pass: hashedPassword,
    admin: true
  });
  return result;
};

exports.connect = async() => {
  const client = await MongoClient.connect(url, {useNewUrlParser: true});
  const db = client.db(dbName);
  return db;
};
