const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3001;
let db;

(async () => {
  db = await open({
    filename: "BD4.3/BD4.3-HW2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW2 Template" });
});

const filterByCuisine = async (cuisine) => {
  return await db.all("SELECT * FROM recipes WHERE cuisine = ?", [cuisine]);
};

const filterByMainIngredient = async (mainIngredient) => {
  return await db.all("SELECT * FROM recipes WHERE main_ingredient = ?", [
    mainIngredient,
  ]);
};

const filterByPreparationTime = async (preparationTime) => {
  return await db.all("SELECT * FROM recipes WHERE preparation_time <= ?", [
    preparationTime,
  ]);
};

const filterByDifficulty = async (difficulty) => {
  return await db.all("SELECT * FROM recipes WHERE difficulty = ?", [
    difficulty,
  ]);
};

const filterByVegetarian = async (vegetarian) => {
  return await db.all(
    'SELECT * FROM recipes where vegetarian = "' + vegetarian + '"');
};

app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const recipes = await filterByCuisine(cuisine);
    if (recipes.length === 0) {
      res
        .status(404)
        .json({ error: `No recipes found for cuisine: ${cuisine}` });
    } else {
      res.status(200).json({ recipes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  const mainIngredient = req.params.main_ingredient;
  try {
    const recipes = await filterByMainIngredient(mainIngredient);
    if (recipes.length === 0) {
      res
        .status(404)
        .json({
          error: `No recipes found for main ingredient: ${mainIngredient}`,
        });
    } else {
      res.status(200).json({ recipes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  const preparationTime = req.params.preparation_time;
  try {
    const recipes = await filterByPreparationTime(preparationTime);
    if (recipes.length === 0) {
      res
        .status(404)
        .json({
          error: `No recipes found with preparation time <= ${preparationTime} minutes`,
        });
    } else {
      res.status(200).json({ recipes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  const difficulty = req.params.difficulty;
  try {
    const recipes = await filterByDifficulty(difficulty);
    if (recipes.length === 0) {
      res
        .status(404)
        .json({ error: `No recipes found for difficulty: ${difficulty}` });
    } else {
      res.status(200).json({ recipes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  const vegetarian = req.params.vegetarian === "true" ? true : false;
  try {
    const recipes = await filterByVegetarian(vegetarian);
    if (recipes.length === 0) {
      res
        .status(404)
        .json({
          error: `No recipes found for vegetarian status: ${req.params.vegetarian}`,
        });
    } else {
      res.status(200).json({ recipes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
