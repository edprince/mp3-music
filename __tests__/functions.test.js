const functions = require('../modules/functions.js');

test('Adds 2 + 2 to equal 4', () => {
  expect.assertions(2);
  expect(functions.add(2,2)).toBe(4);
  expect(functions.add(3, 2)).toBe(5);
});


test('Subtracts 1 from 2 to equal 1', () => {
  expect.assertions(1);
  expect(functions.subtract(2, 1)).toBe(1);
});
