const hasher = require('../modules/hash.js');

describe('get hashes', () => {
  test('other hash', () => {
    hasher.hash('hello', (err, hash) => {
      expect(hash).not.toBe(undefined);
      expect(hash).not.toBe(false);
    });
  });

  test('invalid hash', () => {
    hasher.hash(1, (err, hash) => {
      expect(err).not.toBe(undefined);
      expect(hash).toBe(undefined);
    });
  });

  /*
  test('invalid hash', () => {
    hasher.hash('', (err, hash) => {
      expect(err).not.toBe(undefined);
      expect(hash).toBe(undefined);
    });
  });
  */
});
