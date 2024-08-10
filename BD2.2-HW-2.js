const express = require('express');
const app = express();
const port = 3000;

let numbers =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let mixedNumbers =  [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimeNumbers(numbers) {
  return numbers.filter(isPrime);
}

app.get('/prime-numbers', (req, res) => {
  const primeNumbers = filterPrimeNumbers(numbers);
  res.json(primeNumbers);
});

function filterPositiveNumbers(numbers) {
  return numbers.filter(number => number > 0);
}

app.get('/positive-numbers', (req, res) => {
  const primeNumbers = filterPositiveNumbers(mixedNumbers);
  res.json(primeNumbers);
});

function filterNegativeNumbers(numbers) {
  return numbers.filter(number => number < 0);
}

app.get('/negative-numbers', (req, res) => {
  const negativeNumbers = filterNegativeNumbers(mixedNumbers);
  res.json(negativeNumbers);
});

function filterOddNumbers(numbers) {
  return numbers.filter(number => number % 2 !== 0);
}

app.get('/odd-numbers', (req, res) => {
  const oddNumbers = filterOddNumbers(mixedNumbers);
  res.json(oddNumbers);
});

function filterNumbersGreaterThan(numbers, value) {
  return numbers.filter(number => number > value);
}

app.get('/numbers-greater-than', (req, res) => {
  const value = parseInt(req.query.value);
  const greaterThanNumbers = filterNumbersGreaterThan(mixedNumbers, value);
  res.json(greaterThanNumbers);
});

function filterNumbersLessThan(numbers, value) {
  return numbers.filter(number => number < value);
}

app.get('/numbers-less-than', (req, res) => {
  const value = parseInt(req.query.value);
  const lessThanNumbers = filterNumbersLessThan(mixedNumbers, value);
  res.json(lessThanNumbers);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});