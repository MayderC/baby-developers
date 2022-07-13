const sum = require('./sum')


const helpTest = (n) => {

  let response = '';

  if(n % 3 == 0){
    response += "Fizz";
  }
  if(n % 5 == 0){
    response += "Buzz";
  }

  return response;

} 

test('Buzz', () => {
  expect(helpTest(5)).toBe('Buzz');
});
test('Fizz', () => {
  expect(helpTest(3)).toBe('Fizz');
});
test('FizzBuzz', () => {
  expect(helpTest(15)).toBe('FizzBuzz');
});

