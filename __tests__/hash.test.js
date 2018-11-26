const hasher = require('../modules/hash.js');

describe('get hashes', () => {
  test('valid hash', async () => {
    const hash = await hasher.hash('hello');
    expect(hash).not.toBe(undefined);
    expect(hash).not.toBe(false);
  });
  test('invalid hash', async () => {
    const hash = await hasher.hash('');
    expect(hash).toBe(false);
  });
  test('invalid hash wrong type', async () => {
    const hash = await hasher.hash(1);
    expect(hash).toBe(false);
  });
});

describe('Test login password comparison', () => {
  test('Should match correct password', async () => {
    const password = 'hello';
    const hashedPassword = await hasher.hash(password);
    const match = await hasher.comparePassword(hashedPassword, password);
    expect(match).toBe(true);
  });

  test('Should not match incorrect password', async () => {
    const password = 'hello';
    const hashedPassword = await hasher.hash('hello1');
    const match = await hasher.comparePassword(hashedPassword, password);
    expect(match).toBe(false);
  });
});
