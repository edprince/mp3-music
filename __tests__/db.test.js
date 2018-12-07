const db = require('../persistence/db.js');
const hasher = require('../modules/hash.js');
const playlistId = '5c03ec2a84d56909315c0250';
const faker = require('faker'); 
const fakeUser = {
  email: faker.internet.email(),
  password: 'pass'
}
let connect;
jest.mock('../persistence/db.js');

beforeAll(async () => {
  connect = await db.connect(); 
});

describe('Test registering', () => {
  test('Should fail when no user is passed', () => {
    db.registerUser().then(response => {
      expect(response).toBe(undefined);
    }).catch(err => {
      expect(err).not.toBe(undefined);
    });

  });

  test('Invalid email address', () => {
    let invalidUser = {
      email: 'edgmail.com',
      password: 'pass'
    };
    db.registerUser(invalidUser, connect).then(response => {
      expect(response.message).toBe(undefined);
    }).catch(err => {
      expect(err).not.toBe(undefined);
    });
  });

  test('Should successfully add user', () => {
    db.registerUser(fakeUser, connect).then(response => {
      expect(response.message).not.toBe(undefined);
    }).catch(err => {
      expect(err).toBe(undefined);
    });
  });
});

describe('Uploads', () => {
  test('Not valid path type', async () => {
    let song = {path: 1, name: 1};
    return db.uploadSong(song, playlistId, connect).catch(err => {
      expect(err).not.toBe(undefined);
    });
  });

  test('Should upload song', async () => {
    let song = {
      path: '__tests__/test.mp3',
      name: 'test'
    }
    let response = await db.uploadSong(song, playlistId, connect);
    expect(response).not.toBe(undefined);
  });
});

describe('Update playlist', () => {
  test('update playlist with url', () => {
    let url = 'test-link';
    return db.updatePlaylistWithSong(url, playlistId, connect).catch(err => {
      expect(err).toBe(undefined);
    });
    
  });
});

