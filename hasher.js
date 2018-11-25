const hasher = require('./modules/hash.js');

hasher.hash('pass', (err, response) => {
  console.log(response);
});
