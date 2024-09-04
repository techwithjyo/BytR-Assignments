const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.4/BD4.4-CW/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 CW1 Template" });
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await db.all("SELECT id, title, release_year FROM movies");
    if (movies.length === 0) {
      return res.status(404).json({ error: "No movies found" });
    }
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies/actor/:actor", async (req, res) => {
  try {
    const actor = req.params.actor;
    const movies = await db.all(
      "SELECT id, title, actor, release_year FROM movies WHERE actor = ?",
      actor,
    );
    if (movies.length === 0) {
      return res
        .status(404)
        .json({ error: "No movies found for the specified actor" });
    }
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies/director/:director", async (req, res) => {
  try {
    const director = req.params.director;
    const movies = await db.all(
      "SELECT id, title, director, release_year FROM movies WHERE director = ?",
      director,
    );
    if (movies.length === 0) {
      return res
        .status(404)
        .json({ error: "No movies found for the specified director" });
    }
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
