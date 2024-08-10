const express = require('express');
const app = express();
const port = 3000;

let temperatures = [22,26,19,30,23,28,17,31];
let prices = [80, 120, 95, 150, 60, 110];
let ratings = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];
let names = ['Akshay', 'Priyanka', 'Arjun', 'Anushka', 'Rajesh', 'Kavita'];

function filterHighTemperatures(temp) {
  return temp > 25;
}

app.get('/high-temperatures', (req, res) => {
  const highTemperatures = temperatures.filter(filterHighTemperatures);
  res.json(highTemperatures);
});

function filterLowPrices(price) {
  return price <= 100;
}

app.get('/low-prices', (req, res) => {
  const lowPrices = prices.filter(filterLowPrices);
  res.json(lowPrices);
});

function filterHighRatings(rating) {
  return rating > 3.5;
}

app.get('/high-ratings', (req, res) => {
  const highRatings = ratings.filter(filterHighRatings);
  res.json(highRatings);
});

function filterLongIndianNames(name) {
  return name.length > 6;
}

app.get('/long-indian-names', (req, res) => {
  const longNames = names.filter(filterLongIndianNames);
  res.json(longNames);
});

function filterFindCheaperProduct(price, filterParam)
{
  return price < filterParam;
}
app.get('/cheaper-products', (req, res) => {
  const filterParam = parseInt(req.query.filterParam);
  const cheaperProducts = prices.filter(prices => filterFindCheaperProduct(prices, filterParam));
  res.json(cheaperProducts);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});