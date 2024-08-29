const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3001;
let db;

(async () => {
  db = await open({
    filename: "BD4.3/BD4.3-CW/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 CW Template" });
});

const fetchAllMovies = async () => {
  return await db.all('SELECT * FROM movies');
};

const filterByActor = async (actor) => {
  return await db.all('SELECT * FROM movies WHERE actor = ?', [actor]);
};

const filterByDirector = async (director) => {
  return await db.all('SELECT * FROM movies WHERE director = ?', [director]);
};

app.get('/movies', async (req, res) => {
  try {
    const movies = await fetchAllMovies();
    if (movies.length === 0) {
      res.status(404).json({ error: 'No movies found' });
    } else {
      res.status(200).json({ movies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movies/actor/:actor', async (req, res) => {
  const actor = req.params.actor;
  try {
    const movies = await filterByActor(actor);
    if (movies.length === 0) {
      res.status(404).json({ error: `No movies found for actor: ${actor}` });
    } else {
      res.status(200).json({ movies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movies/director/:director', async (req, res) => {
  const director = req.params.director;
  try {
    const movies = await filterByDirector(director);
    if (movies.length === 0) {
      res.status(404).json({ error: `No movies found for director: ${director}` });
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
