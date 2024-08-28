const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.1_HW3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW3 Template" });
});

app.get('/products', async (req, res) => {
  let results = await fetchAllProducts();
  res.status(200).json(results);
});

const fetchAllProducts = async () => {
  let query = 'SELECT * FROM products';
  let response = await db.all(query, []);
  return { products: response };
};

app.get('/products/brand/:brand', async (req, res) => {
  let results = await fetchProductsByBrand(req.params.brand);
  res.status(200).json(results);
});

const fetchProductsByBrand = async (brand) => {
  let query = 'SELECT * FROM products WHERE brand = ?';
  let response = await db.all(query, [brand]);
  return { products: response };
};

app.get('/products/category/:category', async (req, res) => {
  let results = await fetchProductsByCategory(req.params.category);
  res.status(200).json(results);
});

const fetchProductsByCategory = async (category) => {
  let query = 'SELECT * FROM products WHERE category = ?';
  let response = await db.all(query, [category]);
  return { products: response };
};

app.get('/products/stock/:stock', async (req, res) => {
  let results = await fetchProductsByStock(req.params.stock);
  res.status(200).json(results);
});

const fetchProductsByStock = async (stock) => {
  let query = 'SELECT * FROM products WHERE stock = ?';
  let response = await db.all(query, [stock]);
  return { products: response };
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});