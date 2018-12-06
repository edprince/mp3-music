const axios = require('axios');
const url = 'http://localhost:8000';
const config = {
  headers: {}
};
const audioConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
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
  const urlExtension = '/login';
  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, user, config)
      .then(response => {
        resolve(response);
      }).catch(err => {
        reject(err);
      });
  });
}

/**
 * Send request to server to get playlists
 */
export function getAllPlaylists() {
  const id = getUserId();
  const urlExtension = '/home/' + id;
  return new Promise((resolve, reject) => {
    axios.get(url + urlExtension).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Send request for specific playlist data
 * @param {string} id - id of requested playlist
 */
export function getPlaylist(id) {
  const urlExtension = '/playlist/' + id;
  console.log(url + urlExtension);
  return new Promise((resolve, reject) => {
    axios.get(url + urlExtension).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });

}

/**
 * Sends request to save playlist to the database
 * @param {object} playlist - contains photo and title
 */
export function savePlaylist(playlist) {
  const id = getUserId();
  const urlExtension = '/create/';
  //playlist.id = playlist;
  playlist.userId = id;
  return new Promise((resolve, reject) => {
    axios.post(url + urlExtension, playlist, config).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * Send song file to server
 * @param {file} song - the user's uploaded file to add to playlist
 */
export function postSong(song, id) {
  const urlExtension = '/upload/' + id;
  const bodyFormData = new FormData();
  bodyFormData.append('song', song);
  return new Promise((resolve, reject) => {
    axios.post(
      url + urlExtension,
      bodyFormData,
      audioConfig
    ).then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}

function getUserId() {
  return localStorage.getItem('userId');
}
