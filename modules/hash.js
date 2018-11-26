const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hash = async string => {
  if (string === '') return false;
  if (typeof string !== 'string') return false;
  const hash = await bcrypt.hash(string, saltRounds);
  return hash;
};

exports.comparePassword = async(hashedPassword, password) => {
  const match = await bcrypt.compare(password, hashedPassword);
  if(match) {
    return true;
  } else {
    return false;
  }
};
