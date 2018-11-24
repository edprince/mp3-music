const hasher = require('./modules/hash.js');

hasher.hashPassword({}).then(hash => {
  console.log(hash);
}).catch(err => {
  console.log(err);
});

