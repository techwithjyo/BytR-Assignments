const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let numbers = [1, 2, 3, 4, 5];
let strings = ['hello', 'world', 'javascript', 'node'];

app.get('/numbers/multiply', (req, res) => {
  const multiplier = parseInt(req.query.multiplier);
  let result = multiplyNumbers(numbers, multiplier);
  res.json({ result });
});

app.get('/strings/concat', (req, res) => {
  const suffix = req.query.suffix;
  let result = concatStrings(strings, suffix);
  res.json({ result });
});

app.get('/numbers/remove-odds', (req, res) => {
  let result = removeOddNumbers(numbers);
  res.json({ result });
});

app.get('/strings/join', (req, res) => {
  let result = joinStrings(strings);
  res.json({ result });
});

app.get('/numbers/double', (req, res) => {
  let result = doubleNumbers(numbers);
  res.json({ result });
});

function multiplyNumbers(arr, multiplier) {
  return arr.map(num => num * multiplier);
}

function concatStrings(arr, suffix) {
  return arr.map(str => str + suffix);
}

function removeOddNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}

function joinStrings(arr) {
  return arr.join(' ');
}

function doubleNumbers(arr) {
  return arr.map(num => num * 2);
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));