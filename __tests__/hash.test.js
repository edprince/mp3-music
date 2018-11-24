const hasher = require('../modules/hash.js');

describe('get hashes', () => {
  test('get hashed pass', () => {
    expect(hasher.hash('hello')).not.toBe(false);
  });
  test('', () => {
    expect(hasher.hash('')).toBe(false);
    expect(hasher.hash(1)).toBe(false);
  });
});
