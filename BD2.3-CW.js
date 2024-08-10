const express = require('express');
const app = express();
const port = 3000;

let products = [
  { Price: 100, name: 'Laptop', category: 'Electronics' },
  { Price: 200, name: 'Shirt', category: 'Apparel' },
  { Price: 300, name: 'Smartphone', category: 'Electronics' },
  { Price: 400, name: 'Sofa', category: 'Furniture' },
  { Price: 500, name: 'Coffee Table', category: 'Furniture' },
  { Price: 600, name: 'T-Shirt', category: 'Apparel' }
];
let cars = [
  { make: 'Toyota', model: 'Corolla', mileage: 15000 },
  { make: 'Honda', model: 'Civic', mileage: 22000 },
  { make: 'Ford', model: 'Mustang', mileage: 12000 }
];

let movies = [
  { title: 'Inception', genre: 'Sci-Fi', rating: 8.8 },
  { title: 'The Godfather', genre: 'Crime', rating: 9.2 },
  { title: 'The Dark Knight', genre: 'Action', rating: 9.0 }
];

let orders = [
  { orderId: 1, customerName: 'John Doe', status: 'shipped' },
  { orderId: 2, customerName: 'Jimmy Doe', status: 'processing' },
  { orderId: 3, customerName: 'Jason Doe', status: 'shipped' }
];


app.get('/products/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredProducts = products.filter(products => products.category === category)
  res.json(filteredProducts);
});

function filterByMileage(cars, maxMileage) {
  return cars.filter(car => car.mileage < maxMileage);
}

app.get('/cars/mileage/:maxMileage', (req, res) => {
  const maxMileage = parseInt(req.params.maxMileage);
  res.json(filterByMileage(cars, maxMileage));
});


function filterByRating(movies, minRating) {
  return movies.filter(movie => movie.rating > minRating);
}

app.get('/movies/rating/:minRating', (req, res) => {
  const minRating = parseFloat(req.params.minRating);
  res.json(filterByRating(movies, minRating));
});

function filterByStatus(orders, status) {
  return orders.filter(order => order.status === status);
}

app.get('/orders/status/:status', (req, res) => {
  const status = req.params.status;
  res.json(filterByStatus(orders, status));
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});