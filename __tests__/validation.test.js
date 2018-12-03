const validate = require('../modules/validate.js');

describe('test email addresses', () => {
  test('Test different address structures', () => {
    expect.assertions(6);
    expect(validate.email('test@gmail.com')).toBe(true);
    expect(validate.email('')).toBe(false);
    expect(validate.email('.@.')).toBe(false);
    expect(validate.email(1)).toBe(false);
    expect(validate.email(-1)).toBe(false);
    expect(validate.email()).toBe(false);
  });
});
