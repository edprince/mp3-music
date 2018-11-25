const db = require('../modules/db.js');

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
    db.registerUser(invalidUser).then(response => {
      expect(response.message).toBe(undefined);
    }).catch(err => {
      expect(err).not.toBe(undefined);
    });
  });

  /*
  test('Should successfully add user', () => {
    let user = {
      email: 'NEW@gmail.com',
      password: 'pass'
    };
    db.registerUser(user, ctx.state.db).then(response => {
      expect(response.message).not.toBe(undefined);
    }).catch(err => {
      expect(err).toBe(undefined);
    });
  });
  */
});
