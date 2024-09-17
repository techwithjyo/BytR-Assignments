const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3007;
let db;

(async () => {
  db = await open({
    filename: "BD4-Assignment1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 Assignment1 Template" });
});

app.get('/restaurants', async (req, res) => {
    try {
      let results = await fetchAllRestaurants();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchAllRestaurants = async () => {
    let query = 'SELECT * FROM restaurants';
    let response = await db.all(query, []);
    return { restaurants: response };
  };
  
  app.get('/restaurants/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
      let results = await fetchRestaurantById(id);
      if (!results.restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchRestaurantById = async (id) => {
    let query = 'SELECT * FROM restaurants WHERE id = ?';
    let response = await db.get(query, [id]);
    return { restaurant: response };
  };
  
  app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const { cuisine } = req.params;
    try {
      let results = await fetchRestaurantsByCuisine(cuisine);
      if (results.restaurants.length === 0) {
        return res.status(404).json({ error: "No restaurants found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchRestaurantsByCuisine = async (cuisine) => {
    let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
    let response = await db.all(query, [cuisine]);
    return { restaurants: response };
  };
  
  app.get('/restaurants/filter', async (req, res) => {
    const { isVeg, hasOutdoorSeating, isLuxury } = req.query;
    try {
      let results = await fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury);
      if (results.restaurants.length === 0) {
        return res.status(404).json({ error: "No restaurants found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchRestaurantsByFilter = async (isVeg, hasOutdoorSeating, isLuxury) => {
    let query = 'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
    let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
    return { restaurants: response };
  };
  
  app.get('/restaurants/sort-by-rating', async (req, res) => {
    try {
      let results = await fetchRestaurantsSortedByRating();
      if (results.restaurants.length === 0) {
        return res.status(404).json({ error: "No restaurants found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchRestaurantsSortedByRating = async () => {
    let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
    let response = await db.all(query, []);
    return { restaurants: response };
  };
  
  app.get('/dishes', async (req, res) => {
    try {
      let results = await fetchAllDishes();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchAllDishes = async () => {
    let query = 'SELECT * FROM dishes';
    let response = await db.all(query, []);
    return { dishes: response };
  };
  
  app.get('/dishes/details/:id', async (req, res) => {
    const { id } = req.params;
    try {
      let results = await fetchDishById(id);
      if (!results.dish) {
        return res.status(404).json({ error: "Dish not found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchDishById = async (id) => {
    let query = 'SELECT * FROM dishes WHERE id = ?';
    let response = await db.get(query, [id]);
    return { dish: response };
  };
  
  app.get('/dishes/filter', async (req, res) => {
    const { isVeg } = req.query;
    try {
      let results = await fetchDishesByFilter(isVeg);
      if (results.dishes.length === 0) {
        return res.status(404).json({ error: "No dishes found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchDishesByFilter = async (isVeg) => {
    let query = 'SELECT * FROM dishes WHERE isVeg = ?';
    let response = await db.all(query, [isVeg]);
    return { dishes: response };
  };
  
  app.get('/dishes/sort-by-price', async (req, res) => {
    try {
      let results = await fetchDishesSortedByPrice();
      if (results.dishes.length === 0) {
        return res.status(404).json({ error: "No dishes found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchDishesSortedByPrice = async () => {
    let query = 'SELECT * FROM dishes ORDER BY price ASC';
    let response = await db.all(query, []);
    return { dishes: response };
  };

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
