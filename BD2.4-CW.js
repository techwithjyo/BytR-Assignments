const express = require('express');
const app = express();

let ages = [25, 30, 18, 22, 27];

let students = [{"name" : "Rahul", "rollNo": 101, "marks": 85},
                {"name" : "Sita", "rollNo": 102, "marks": 95},
                {"name" : "Amit", "rollNo": 103, "marks": 70}];

let cars = [
  { make: "Maruti", model: "Swift", mileage: 22 },
  { make: "Hyundai", model: "i20", mileage: 18 },
  { make: "Tata", model: "Nexon", mileage: 21 }
];

function sortAgesAscending(ages) {
  return ages.sort((a, b) => a - b);
}

app.get('/ages/sort-ascending', (req, res) => {
  let sortedAges = sortAgesAscending(ages);
  res.json(sortedAges);
});

function sortAgesDescending  (ages) {
  return ages.sort((a, b) => b - a);
}

app.get('/ages/sort-descending', (req, res) => {
  let sortedAges = sortAgesDescending (ages);
  res.json(sortedAges);
});

function sortStudentsByMarksDescending(students) {
  return students.sort((a, b) => b.marks - a.marks);
}

app.get('/students/sort-by-marks-descending', (req, res) => {
  let sortedStudents = sortStudentsByMarksDescending(students);
  res.json(sortedStudents);
});

function sortCarsByMileageDescending(cars) {
  return cars.sort((a, b) => b.mileage - a.mileage);
}

app.get('/cars/sort-by-mileage-descending', (req, res) => {
  let sortedCars = sortCarsByMileageDescending(cars);
  res.json(sortedCars);
});

const PORT = 3009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));