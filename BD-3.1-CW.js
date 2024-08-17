const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let numbers = [1, 2, 3, 4, 5];
let strings = ["hello", "world", "javascript", "node"];

app.get("/numbers/add", (req, res) => {
  let result = addToArr(numbers, 6);
  res.json(result);
});

function addToArr(numbers, num) {
  numbers.push(num);
  return numbers;
}

app.get("/strings/add", (req, res) => {
  let result = addString(strings, "express");
  res.json(result);
});

function addString(arr, str) {
  arr.push(str);
  return arr;
}

app.get('/numbers/sum', (req, res) => {
  let result = sumNumbers(numbers);
  res.json({ sum: result });
});

function sumNumbers(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

app.get('/numbers/max', (req, res) => {
  let result = findMax(numbers);
  res.json({ max: result });
});

function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

