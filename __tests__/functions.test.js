const functions = require('../modules/functions.js');

test('Adds 2 + 2 to equal 4', () => {
  expect.assertions(1);
  const num1 = 2;
  const num2 = 2;
  const expectedResult = 4;
  expect(functions.add(num1, num2)).toBe(expectedResult);
});
