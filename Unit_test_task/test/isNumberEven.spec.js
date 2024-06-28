import { expect } from 'chai';
import { describe, beforeEach, afterEach, it } from 'mocha';
import NumbersValidator from '../app/unit_test_task.js'; // Adjusted import path

describe('NumbersValidator', function () {
  let validator;

  beforeEach(function () {
    validator = new NumbersValidator();
  });

  afterEach(function () {
    validator = null;
  });

  describe('isNumberEven', function () {
    it('should return true if number is even', function () {
      expect(validator.isNumberEven(4)).to.be.equal(true);
    });

    it('should throw an error when provided a string', function () {
      expect(() => {
        validator.isNumberEven('4');
      }).to.throw('[4] is not of type "Number" it is of type "string"');
    });
  });

  describe('getEvenNumbersFromArray', function () {
    it('should return an array of even numbers', function () {
      const arrayOfNumbers = [5, 2, 6, 11, 22];
      const evenNumberArray = validator.getEvenNumbersFromArray(arrayOfNumbers);
      expect(evenNumberArray).to.be.eql([2, 6, 22]);
    });

    it('should throw an error if array is not full of numbers', function () {
      const arrayOfNumbers = [5, '2', 11, 22];
      expect(() => {
        validator.getEvenNumbersFromArray(arrayOfNumbers);
      }).to.throw('[5,2,11,22] is not an array of "Numbers"');
    });
  });

  describe('isAllNumbers', function () {
    it('should return true if all elements in array are numbers', function () {
      const numbersArray = [1, 2, 3, 4, 5];
      expect(validator.isAllNumbers(numbersArray)).to.be.equal(true);
    });
  
    it('should return false if not all elements in array are numbers', function () {
      const mixedArray = [1, '2', '3', 4, 5];
      expect(validator.isAllNumbers(mixedArray)).to.be.false;
    });
  
    it('should throw an error if not passed an array', function () {
      const nonArray = 'not an array';
      expect(() => validator.isAllNumbers(nonArray)).to.throw(Error, `[${nonArray}] is not an array`);
    });
  });

  describe('isInteger', function () {
    it('should return true if value is an integer', function () {
      const intValue = 42;
      expect(validator.isInteger(intValue)).to.be.equal(true);
    });

    it('should throw an error if value is not a number', function () {
      const nonIntegerValue = '42';
      expect(() => validator.isInteger(nonIntegerValue)).to.throw(Error, `[${nonIntegerValue}] is not a number`);
    });
  });
});
