// getEvenNumbersFromArray.spec.js

import { expect } from 'chai';
import { describe, beforeEach, afterEach, it } from 'mocha';
import NumbersValidator from '../../app/numbers-validator.js';  // Adjust the path as needed

describe('NumbersValidator', function () {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(function () {
    validator = null;
  });

  it('should return an array of even numbers', () => {
    const arrayOfNumbers = [5, 2, 6, 11, 22];
    const evenNumberArray = validator.getEvenNumbersFromArray(arrayOfNumbers);
    expect(evenNumberArray).to.be.eql([2, 6, 22]);
  });

  it('should throw an error if the array is not full of numbers', () => {
    const arrayOfNumbers = [5, '2', 11, 22];
    expect(() => {
      validator.getEvenNumbersFromArray(arrayOfNumbers);
    }).to.throw('[5,2,11,22] is not an array of "Numbers"');
  });

  // Additional tests would follow for different test cases, such as testing if an odd number
  // returns false or if passing a non-number throws an error.
});
