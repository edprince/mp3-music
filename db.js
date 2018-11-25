const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://test:testpass1@ds115434.mlab.com:15434/princee3-music';
const dbName = 'princee3-music';

(async() => {
  const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true});
  const db = client.db(dbName);
  db.collection('users').insertOne({
    email: 'edward@gmail.com',
    pass: 'pass',
    admin: true
  }, (err, result) => {
    if (err) throw err;
    console.log('result:', result);
  });
  client.close();
})();
