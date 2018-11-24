const Mongo = require('mongodb');
const MongoClient = Mongo.MongoClient;
const mongoUrl = 'mongodb://princee3:340ct340ct@ds115434.mlab.com:15434/princee3-music';
//const users = 'users';
//const client = new MongoClient(mongoUrl, {useNewUrlParser: true});
const validate = require('./validate.js');
const hasher = require('./hash.js');

exports.registerUser = (user) => {
  //Validate details
  validate.email(user.email);
  hasher.hashPassword(user.password).then(hash => {
    console.log(hash);
    /*
    client.connect(err => {
      collection.insert({
        username: user.username,
        email: user.email,
        password: user.password
      }, err => {
        console.error(err);
      });
    });
    */
  }).catch(err => {
    console.log(err);
  });
};
