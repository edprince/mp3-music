const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.hash = string => {
  if (string === '') return false;
  if (typeof string !== 'string') return false;
  return bcrypt.hashSync(string, salt);
};

/*
exports.hash = string => {
  bcrypt.hash(string, saltRounds, (err, hash) => {
    console.log(hash);
    if (err) return false;
    return hash;
  });
};
*/

