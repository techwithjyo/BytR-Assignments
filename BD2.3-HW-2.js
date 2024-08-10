const express = require('express');
const app = express();
const port = 3000;

let products = [
  { name: 'Laptop', inStock: true },
  { name: 'Smartphone', inStock: false },
  { name: 'Tablet', inStock: true }
];
let newProducts = [
  { name: 'Laptop', price: 1200 },
  { name: 'Smartphone', price: 700 },
  { name: 'Tablet', price: 300 },
  { name: 'Headphones', price: 150 },
  { name: 'USB Cable', price: 20 }
];

let users = [
  { name: 'IronMann', age: 37 },
  { name: 'Bob', age: 17 },
  { name: 'Amanda', age: 30 }
];

let articles = [
  { title: 'Hi1', wordCount: 1500 },
  { title: 'Hi12', wordCount: 750 },
  { title: 'Hi13', wordCount: 350 },
  { title: 'Hi14', wordCount: 1200 },
  { title: 'Hi15', wordCount: 450 }
];

let movies = [
  { title: 'Inception', rating: 8.8 },
  { title: 'The Matrix', rating: 8.7 },
  { title: 'Interstellar', rating: 8.6 },
  { title: 'The Lion King', rating: 8.5 },
  { title: 'Fight Club', rating: 8.8 },
];

let employees = [
  { name: 'Alice', experience: 4 },
  { name: 'Bob', experience: 6 },
  { name: 'Charlie', experience: 10 },
  { name: 'David', experience: 2 },
  { name: 'Eve', experience: 5 }
];

function filterInStockProducts(products) {
  return products.filter(product => product.inStock === true);
}

app.get('/in-stock-products', (req, res) => {
  const inStockProducts = filterInStockProducts(products);
  res.json(inStockProducts);
});

function filterAdults(users) {
  return users.filter(user => user.age >= 18);
}

app.get('/adult-users', (req, res) => {
  const adultUsers = filterAdults(users);
  res.json(adultUsers);
});

function filterExpensiveProducts(newProducts, priceThreshold) {
  return newProducts.filter(prd => prd.price > priceThreshold);
}

app.get('/expensive-products', (req, res) => {
  const priceThreshold = parseFloat(req.query.price);
  const expensiveProducts = filterExpensiveProducts(newProducts, priceThreshold);
  res.json(expensiveProducts);
});

function filterLongArticles(articles, minWords) {
  return articles.filter(article => article.wordCount > minWords);
}

app.get('/long-articles', (req, res) => {
  const minWords = parseInt(req.query.minWords);
  const longArticles = filterLongArticles(articles, minWords);
  res.json(longArticles);
});

function filterHighRatedMovies(movies, minRating) {
  return movies.filter(movie => movie.rating > minRating);
}

app.get('/high-rated-movies', (req, res) => {
  const minRating = parseFloat(req.query.rating);
  const highRatedMovies = filterHighRatedMovies(movies, minRating);
  res.json(highRatedMovies);
});

function filterExperiencedEmployees(employees, minYears) {
  return employees.filter(employee => employee.experience > minYears);
}

app.get('/experienced-employees', (req, res) => {
  const minYears = parseInt(req.query.years);
  const experiencedEmployees = filterExperiencedEmployees(employees, minYears);
  res.json(experiencedEmployees);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});