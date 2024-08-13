const express = require('express');
const app = express();

let books = [
   { title: 'Moby Jonas', author: 'Herman Melville', publication_year: 2023 },
   { title: '1984', author: 'George Orwell', publication_year: 1984 },
   { title: 'A Tale of Two Cities', author: 'Charles Jonas', publication_year: 2000 },
];

let employees = [
  { name: 'Alice', salary: 70000 },
  { name: 'Bob', salary: 50000 },
  { name: 'Charlie', salary: 60000 }
];

let products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Smartphone', price: 800 },
  { name: 'Tablet', price: 600 }
];

let movies = [
  { title: 'Inception', rating: 8.8 },
  { title: 'The Matrix', rating: 8.7 },
  { title: 'Interstellar', rating: 8.6 }
];

function sortBooksByYear(books)
{
  return books.sort((a,b) => a.publication_year - b.publication_year)
}

app.get("/books/sort-by-year", (req, res) =>{
  let sortedBooks = sortBooksByYear([...books]);
  res.json(sortedBooks);
});

function sortEmployeesBySalary(employees) {
  return employees.sort((a, b) => b.salary - a.salary);
}

app.get('/employees/sort-by-salary', (req, res) => {
  const sortedEmployees = sortEmployeesBySalary([...employees]);
  res.json(sortedEmployees);
});

function sortProductsByPrice(products) {
  return products.sort((a, b) => a.price - b.price);
}

app.get('/products/sort-by-price', (req, res) => {
  const sortedProducts = sortProductsByPrice([...products]);
  res.json(sortedProducts);
});

function sortMoviesByRating(movies) {
  return movies.sort((a, b) => b.rating - a.rating);
}

app.get('/movies/sort-by-rating', (req, res) => {
  const sortedMovies = sortMoviesByRating([...movies]);
  res.json(sortedMovies);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));