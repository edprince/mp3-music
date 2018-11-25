const hasher = require('../modules/hash.js');

describe('get hashes', () => {
  /*
  expect.assertions(2);
  test('get hashed pass', async () => {
    await hasher.hashPassword('hello').then(hash => {
      expect(hash).not.toBe(false);
      expect(hash).not.toBe(undefined);
    }).catch(err => {
      expect(err).toBe(undefined);
    });

    hasher.hashPassword('').then(hash => {
      expect(hash).toBe(undefined);
    }).catch(err => {
      expect(err).not.toBe(undefined);
    });

    hasher.hashPassword(1).then(hash => {
      expect(hash).toBe(undefined);
    }).catch(err => {
      expect(err).toBe(false);
    });
  });
  */

  test('other hash', () => {
    hasher.hash('hello', (err, hash) => {
      expect(hash).not.toBe(undefined);
      expect(hash).not.toBe(false);
    });
  });
});
