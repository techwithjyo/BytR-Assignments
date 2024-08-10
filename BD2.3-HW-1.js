const express = require('express');
const app = express();
const port = 3000;

let employees = [
  { name: 'John', department: 'IT', salary: 70000 },
  { name: 'Jane', department: 'Marketing', salary: 65000 },
  { name: 'Alice', department: 'HR', salary: 60000 },
  { name: 'Bob', department: 'Finance', salary: 75000 }
];

let bikes = [
  { make: 'Hero', model: 'CBR500R', mileage: 95 },
  { make: 'Yamaha', model: 'YZF-R3', mileage: 50 },
  { make: 'Kawasaki', model: 'Ninja 400', mileage: 34 }
];

let songs = [
  { title: 'Shape of You', genre: 'Pop', rating: 5 },
  { title: 'Believer', genre: 'Rock', rating: 4 },
  { title: 'Tum Hi Ho', genre: 'Romantic', rating: 3 }
];

let tasks = [
  { taskId: 1, taskName: 'Task One', status: 'completed' },
  { taskId: 2, taskName: 'Task Two', status: 'in progress' },
  { taskId: 3, taskName: 'Task Three', status: 'completed' }
];

function filterByDepartment(employees, department) {
  return employees.filter(employee => employee.department === department);
}

app.get('/employees/department/:department', (req, res) => {
  const department = req.params.department;
  const filteredEmployees = filterByDepartment(employees, department);
  res.json(filteredEmployees);
});

function filterByMileage(bikes, minMileage) {
  return bikes.filter(bike => bike.mileage > minMileage);
}

app.get('/bikes/mileage/:minMileage', (req, res) => {
  const minMileage = parseInt(req.params.minMileage);
  const filteredBikes = filterByMileage(bikes, minMileage);
  res.json(filteredBikes);
});

function filterByMake(bikes, make){
  return bikes.filter(bike => bike.make === make);
}

app.get('/bikes/make/:make', (req, res )=>{
  const make = req.params.make;
  const filteredBikes = filterByMake(bikes, make);
  res.json(filteredBikes);
});

function filterByRating(songs, minRating) {
  return songs.filter(song => song.rating > minRating);
}

app.get('/songs/rating/:minRating', (req, res) => {
  const minRating = parseFloat(req.params.minRating);
  const filteredSongs = filterByRating(songs, minRating);
  res.json(filteredSongs);
});

function filterByGenre(songs, genre) {
  return songs.filter(song => song.genre === genre);
}

app.get('/songs/genre/:genre', (req, res) => {
  const genre = req.params.genre;
  const filteredSongs = filterByGenre(songs, genre);
  res.json(filteredSongs);
});

function filterByStatus(tasks, status) {
  return tasks.filter(task => task.status === status);
}

app.get('/tasks/status/:status', (req, res) => {
  const status = req.params.status;
  const filteredTasks = filterByStatus(tasks, status);
  res.json(filteredTasks);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});