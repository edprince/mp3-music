const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hash = async string => {
  if (string === '') return false;
  if (typeof string !== 'string') return false;
  const hash = await bcrypt.hash(string, saltRounds);
  return hash;
};

