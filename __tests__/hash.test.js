const hasher = require('../modules/hash.js');

describe('get hashes', () => {
  test('get hashed pass', async () => {
    await hasher.hashPassword('hello').then(hash => {
      expect(hash).not.toBe(false);
    }).catch(err => {
      console.log(err);
    });

    hasher.hashPassword('').then(hash => {
      console.log(hash);
    }).catch(err => {
      expect(err).not.toBe(undefined);
    });

    hasher.hashPassword(1).then(hash => {
      expect(hash).toBe(undefined);
    }).catch(err => {
      expect(err).toBe(false);
    });
    /*
    expect(hasher.hashPassword('hello')).not.toBe(false);
    expect(hasher.hashPassword('')).toBe(false);
    expect(hasher.hashPassword(1)).toBe(false);
    */
  });
});
