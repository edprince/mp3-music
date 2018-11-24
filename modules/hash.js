const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async(string) => new Promise((resolve, reject) => {
  if (string === '') reject(false);
  if (typeof string !== 'string') reject(false);
  bcrypt.hash(string, saltRounds, (hash) => {
    resolve(hash);
  });
});

