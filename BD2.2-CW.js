const express = require('express');
const app = express();
const port = 3000;

let numbers = [1,2,3,4,5,6,7,8,9,10];


function filterEvenNumbers(numbers) {
  return numbers.filter(number => number % 2 === 0);
}

function filterAges(ages) {
  return ages.filter(age => age > 18);
}

function filterLongWords(words) {
  return words.filter(word => word.length > 5);
}

function filterSmallFiles(files, maxSize) {
  return files.filter(fileSize => fileSize < maxSize);
}

app.get('/even-numbers', (req, res) => {
  const evenNumbers = filterEvenNumbers(numbers);
  res.json(evenNumbers);
});

app.get('/adult-ages', (req, res) => {
  const givenAges = [10, 20, 30, 15, 17, 25];
  const adultAges = filterAges(givenAges);
  res.json(adultAges);
});

app.get('/long-words', (req, res) => {
  const givenWords = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
  const longWords = filterLongWords(givenWords);
  res.json(longWords);
});

app.get('/small-files', (req, res) => {
  const givenFiles = [50, 200, 75, 120, 30, 90, 150];
  const filterParam = parseInt(req.query.filterParam);
  const smallFiles = filterSmallFiles(givenFiles, filterParam);
  res.json(smallFiles);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});