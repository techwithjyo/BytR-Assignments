const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3005;
let db;

(async () => {
  db = await open({
    filename: "BD4.5/BD4.5-HW3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW3 Template" });
});

app.get('/kitchen-items/rating', async (req, res) => {
    const { minRating } = req.query;
    try {
      let results = await filterKitchenItemsByRating(minRating);
      if (results.kitchenItems.length === 0) {
        return res.status(404).json({ error: "No kitchen items found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterKitchenItemsByRating = async (minRating) => {
    let query = 'SELECT * FROM kitchen_items WHERE rating >= ?';
    let response = await db.all(query, [minRating]);
    return { kitchenItems: response };
  };
  
  app.get('/kitchen-items/material-rating', async (req, res) => {
    const { material, minRating } = req.query;
    try {
      let results = await filterKitchenItemsByMaterialRating(material, minRating);
      if (results.kitchenItems.length === 0) {
        return res.status(404).json({ error: "No kitchen items found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterKitchenItemsByMaterialRating = async (material, minRating) => {
    let query = 'SELECT * FROM kitchen_items WHERE material = ? AND rating >= ?';
    let response = await db.all(query, [material, minRating]);
    return { kitchenItems: response };
  };
  

  app.get('/kitchen-items/ordered-by-price', async (req, res) => {
    try {
      let results = await filterKitchenItemsOrderedByPrice();
      if (results.kitchenItems.length === 0) {
        return res.status(404).json({ error: "No kitchen items found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterKitchenItemsOrderedByPrice = async () => {
    let query = 'SELECT * FROM kitchen_items ORDER BY price DESC';
    let response = await db.all(query, []);
    return { kitchenItems: response };
  };

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
