import { expect } from 'chai';
import { describe, beforeEach, afterEach, it } from 'mocha';
import NumbersValidator from '../../app/numbers-validator.js';

describe('isNumberEven', function () {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(function () {
    validator = null;
  });

  it('should return true if number is even', function () {
    expect(validator.isNumberEven(4)).to.be.equal(true);
  });
  it('should return true if number is even', function () {
    expect(validator.isNumberEven(5)).to.be.equal(false);
  });

  // Additional tests would follow for different test cases, such as testing if an odd number
  // returns false or if passing a non-number throws an error.
  it('should throw an erro when provided string', () => {
    expect(() =>{
        validator.isNumberEven('4');
    }).to.throw('[4] is not "Number" it is of type "string"');
  });
});

