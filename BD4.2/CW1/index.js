const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.2/CW1//database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 Template" });
});

const getAllMovies = async () => {
  return await db.all("SELECT * FROM movies");
};

const getMoviesByGenre = async (genre) => {
  return await db.all("SELECT * FROM movies WHERE genre = ?", [genre]);
};

const getMovieById = async (id) => {
  return await db.get("SELECT * FROM movies WHERE id = ?", [id]);
};

const getMoviesByReleaseYear = async (year) => {
  return await db.all("SELECT * FROM movies WHERE release_year = ?", [year]);
};

app.get("/movies", async (req, res) => {
  try {
    const movies = await getAllMovies();
    if (movies.length === 0) {
      res.status(404).json({ error: "No movies found" });
    } else {
      res.status(200).json({ movies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies/genre/:genre", async (req, res) => {
  const genre = req.params.genre;
  try {
    const movies = await getMoviesByGenre(genre);
    if (movies.length === 0) {
      res.status(404).json({ error: `No movies found for genre: ${genre}` });
    } else {
      res.status(200).json({ movies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await getMovieById(id);
    if (!movie) {
      res.status(404).json({ error: `No movie found with ID: ${id}` });
    } else {
      res.status(200).json({ movie });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/movies/release-year/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const movies = await getMoviesByReleaseYear(year);
    if (movies.length === 0) {
      res
        .status(404)
        .json({ error: `No movies found for release year: ${year}` });
    } else {
      res.status(200).json({ movies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
