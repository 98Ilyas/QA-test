// numbers-validator.js

class NumbersValidator {
  isNumberEven(number) {
    const typeOfVariable = typeof number;
    if (typeOfVariable !== 'number') {
      throw new Error(`[${number}] is not "Number" it is of type "${typeOfVariable}"`);
    } else {
      return number % 2 === 0;
    }
  }

  getEvenNumbersFromArray(arrayOfNumbers) {
    if (Array.isArray(arrayOfNumbers) && arrayOfNumbers.every(item => typeof item === 'number')) {
      return arrayOfNumbers.filter(number => number % 2 === 0);
    }
    throw new Error(`[${arrayOfNumbers}] is not an array of "Numbers"`);
  }


}

export default NumbersValidator;

