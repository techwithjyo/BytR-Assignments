const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

let cartItems = [
  { item: 'Book', price: 30 },
  { item: 'Pen', price: 5 },
  { item: 'Notebook', price: 50 },
  { item: 'Bag', price: 125 }
];

let students = [
  { name: 'John', grade: 'A' },
  { name: 'Jane', grade: 'A' },
  { name: 'Jack', grade: 'B' },
  { name: 'Jill', grade: 'C' }
];

let temperatures = [0, 20, 30, 100];

let student_scores = [
  { name: 'John', score: 85 },
  { name: 'Jane', score: 90 },
  { name: 'Jack', score: 70 },
  { name: 'Jill', score: 60 }
];

let sentence = 'The quick brown fox jumps over the lazy dog';

app.get('/cart/total', (req, res) => {
  let totalPrice = calculateTotalPrice(cartItems);
  res.json({ totalPrice });
});

app.get('/students/filter', (req, res) => {
  const grade = req.query.grade;
  let filteredStudents = filterStudentsByGrade(students, grade);
  res.json({ students: filteredStudents });
});

app.get('/temperatures/convert', (req, res) => {
  let convertedTemperatures = convertCelsiusToFahrenheit(temperatures);
  res.json({ convertedTemperatures });
});

app.get('/students/average-score', (req, res) => {
  let averageScore = calculateAverageScore(student_scores);
  res.json({ averageScore });
});

app.get('/sentence/count-words', (req, res) => {
  let wordCount = countWords(sentence);
  res.json({ wordCount });
});

function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

function filterStudentsByGrade(students, grade) {
  return students.filter(student => student.grade === grade);
}

function convertCelsiusToFahrenheit(temperatures) {
  return temperatures.map(temp => (temp * 9/5) + 32);
}

function calculateAverageScore(student_scores) {
  let totalScore = student_scores.reduce((total, student) => total + student.score, 0);
  return totalScore / student_scores.length;
}

function countWords(sentence) {
  return sentence.split(' ').length;
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));