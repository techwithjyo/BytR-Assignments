const express = require('express');
const app = express();

let heights = [160, 175, 180, 165, 170];

let employees = [
  { name: 'Rahul', employeeId: '101', salary: 50000 },
  { name: 'Sita', employeeId: '102', salary: 60000 },
  { name: 'Amit', employeeId: '103', salary: 55000 }
];

let books = [
  { title: 'The God of Small Things', author: 'Arundhati Roy', pages: 340 },
  { title: 'The White Tiger', author: 'Aravind Adiga', pages: 318 },
  { title: 'The Palace of Illusions', author: 'Chitra Banerjee Divakaruni', pages: 360 }
];

function sortHeightsAscending(heights) {
  return heights.sort((a, b) => a - b);
}

app.get('/heights/sort-ascending', (req, res) => {
  let sortedHeights = sortHeightsAscending([...heights]); //using spread operator :)
  res.json(sortedHeights);
});

function sortHeightsDescending(heights) {
  return heights.sort((a, b) => b - a);
}

app.get('/heights/sort-descending', (req, res) => {
  let sortedHeights = sortHeightsDescending([...heights]);
  res.json(sortedHeights);
});

function sortEmployeesBySalaryDescending(employees) {
  return employees.sort((a, b) => b.salary - a.salary);
}

app.get('/employees/sort-by-salary-descending', (req, res) => {
  const sortedEmployees = sortEmployeesBySalaryDescending([...employees]);
  res.json(sortedEmployees);
});

function sortBooksByPagesAscending(books) {
  return books.sort((a, b) => a.pages - b.pages);
}

app.get('/books/sort-by-pages-ascending', (req, res) => {
  const sortedBooks = sortBooksByPagesAscending([...books]);
  res.json(sortedBooks);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));