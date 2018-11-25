const axios = require('axios');
const url = 'http://localhost:8080';
const config = {
  headers: {}
};

/**
 * Send request to server to register user
 * @parm {object} user - contains email and password attributes
 */
export function register(user) {
  const urlExtension = '/register';
  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension,
      {
        user: user
      },
      config).then(response => {
      resolve(response);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}


