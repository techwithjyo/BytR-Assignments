const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3002;
let db;

(async () => {
  db = await open({
    filename: "BD4.5/BD4.5-CW/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 CW1 Template" });
});

app.get('/movies/year-actor', async (req, res) => {
  const { releaseYear, actor } = req.query;
  try {
    let results = await filterByYearAndActor(releaseYear, actor);
    if (results.movies.length === 0) {
      return res.status(404).json({ error: "No movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const filterByYearAndActor = async (releaseYear, actor) => {
  let query = 'SELECT * FROM movies WHERE release_year = ? AND actor = ?';
  let response = await db.all(query, [releaseYear, actor]);
  return { movies: response };
};

app.get('/movies/award-winning', async (req, res) => {
  try {
    let results = await filterAwardWinningMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ error: "No award-winning movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const filterAwardWinningMovies = async () => {
  let query = 'SELECT * FROM movies WHERE rating >= 4.5 ORDER BY rating ASC';
  let response = await db.all(query, []);
  return { movies: response };
};

app.get('/movies/blockbuster', async (req, res) => {
  try {
    let results = await fetchBlockbusterMovies();
    if (results.movies.length === 0) {
      return res.status(404).json({ error: "No blockbuster movies found" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const fetchBlockbusterMovies = async () => {
  let query = 'SELECT * FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection DESC';
  let response = await db.all(query, []);
  return { movies: response };
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
