const axios = require('axios');
const url = 'http://localhost:8000';
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
    axios.post(url + urlExtension, user,
      config).then(response => {
      resolve(response);
    }).catch(err => {
      console.log(err);
      reject(err);
    });
  });
}

/**
 * Send request to server to log user in
 * @parm {object} user - contains email and password attributes
 */
export function login(user) {
  console.log('making request');
  const urlExtension = '/login';
  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, user, config)
      .then(response => {
        resolve(response);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}


