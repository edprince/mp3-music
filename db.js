const MongoClient = require('mongodb').MongoClient;
/*
const url = 'mongodb://localhost:27017';
const mongoUrl = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
*/

//const MongoClient = Mongo.MongoClient;
const mongoUrl = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';
const dbName = 'princee3-music';

(async () => {
  const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true});
  const db = client.db(dbName);
  db.collection('users').insertOne({
    email: 'edward@gmail.com',
    pass: 'pass',
    admin: true
  }, (err, result) => {
    if (err) throw err;
    console.log("result:", result);
  });
  client.close();
})();


/*



MongoClient.connect(mongoUrl, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(err, client);

}, {useNewUrlParser: true}); 
*/


/*
client.connect((err, client) => {
  if (err) return err;
  const db = client.db(dbName);
  db.collection('users').insert({
    email: user.email,
    password: hash,
    admin: false
  }, err => {
    console.log(err);
    return;
  });
});
*/
