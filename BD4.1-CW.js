const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

const fetchAllMovies = async () => {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);

  return { movies: response };
};

app.get('/movies', async (req, res) => {
  let results = await fetchAllMovies();

  res.status(200).json(results);
});

async function fetchMovieByGenre(genre) {
  let query = 'SELECT * FROM movies WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return { movies: response };
};

app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchMovieByGenre(genre);

  res.status(200).json(results);
});

async function fetchMovieById(id) {
let query = 'SELECT * FROM movies WHERE id = ?';
    let response = await db.get(query, [id]);

    return { movie: response };
};

app.get('/movies/details/:id', async (req, res) => {
    let id = req.params.id;
    let results = await fetchMovieById(id);

    res.status(200).json(results);
});
async function fetchMovieByReleaseYear(release_year) {
  let query = 'SELECT * FROM movies WHERE release_year = ?';
  let response = await db.all(query, [release_year]);

  return { movie: response };
}

// endpoint: /movies/release_year/2019
app.get('/movies/release_year/:year', async (req, res) => {
  let release_year = req.params.year;
  let results = await fetchMovieByReleaseYear(release_year);

  res.status(200).json(results);
});
// YOUR ENPOINTS GO HERE

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
