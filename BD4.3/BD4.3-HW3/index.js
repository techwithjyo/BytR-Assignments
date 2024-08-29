const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3002;
let db;

(async () => {
  db = await open({
    filename: "BD4.3/BD4.3-HW3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW3 Template" });
});

const fetchProductsByCategory = async (category) => {
  return await db.all('SELECT * FROM products WHERE category = ?', [category]);
};

const fetchProductsByBrand = async (brand) => {
  return await db.all('SELECT * FROM products WHERE brand = ?', [brand]);
};

const fetchProductsByRating = async (rating) => {
  return await db.all('SELECT * FROM products WHERE rating >= ?', [rating]);
};

const fetchProductsByStocks = async (stock) => {
  return await db.all('SELECT * FROM products WHERE stock < ?', [stock]);
};

app.get('/products/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    const products = await fetchProductsByCategory(category);
    if (products.length === 0) {
      res.status(404).json({ error: `No products found for category: ${category}` });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/brand/:brand', async (req, res) => {
  const brand = req.params.brand;
  try {
    const products = await fetchProductsByBrand(brand);
    if (products.length === 0) {
      res.status(404).json({ error: `No products found for brand: ${brand}` });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/rating/:rating', async (req, res) => {
  const rating = req.params.rating;
  try {
    const products = await fetchProductsByRating(rating);
    if (products.length === 0) {
      res.status(404).json({ error: `No products found with rating >= ${rating}` });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/stocks/:stock', async (req, res) => {
  const stock = req.params.stock;
  try {
    const products = await fetchProductsByStocks(stock);
    if (products.length === 0) {
      res.status(404).json({ error: `No products found with stock less than ${stock}` });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
