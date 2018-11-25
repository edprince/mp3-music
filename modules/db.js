const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';
const dbName = 'princee3-music';
const validate = require('./validate.js');
const hasher = require('./hash.js');

/*
 * Validates user details and adds to database
 * @param {object} user - contains email and password attributes
 */
exports.registerUser = (user) => new Promise(async(resolve, reject) => {
  //Hash password
  hasher.hash(user.password, (err, hash) => {
    (async () => {
      const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true});
      const db = client.db(dbName);
      db.collection('users').insertOne({
        email: user.email,
        pass: hash,
        admin: true
      }, (err, result) => {
        if (err) {
          reject({error: err});
        } else {
          resolve({message: 'okay'});
        }
      });
      client.close();
    })();
  });
});
