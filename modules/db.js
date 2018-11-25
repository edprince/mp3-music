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
  const hashedPassword = await module.exports.hashPassword(user.password);
  console.log(hashedPassword);

  (async() => {
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true});
    const db = client.db(dbName);
    db.collection('users').insertOne({
      email: user.email,
      pass: hashedPassword,
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
  /*
  await db.collection('users').insertOne({
    email: user.email,
    password: hashedPassword,
    admin: true
  }, (err, result) => {
    if (err) {
      reject({error: err});
    } else {
      resolve({message: 'okay'});
    }
  });
  */
});

exports.hashPassword = (password) => new Promise((resolve, reject) => {
  hasher.hash(password, (err, hash) => {
    if (err) {
      reject(err);
    } else {
      resolve(hash);
    }
  });
});
