const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3001;
let db;

(async () => {
  db = await open({
    filename: "BD4.2/BD4.2-HW2/tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW2 Template" });
});

const getAllTracks = async () => {
  return await db.all('SELECT * FROM tracks');
};

const getTracksByArtist = async (artist) => {
  return await db.all('SELECT * FROM tracks WHERE artist = ?', [artist]);
};

const getTracksByGenre = async (genre) => {
  return await db.all('SELECT * FROM tracks WHERE genre = ?', [genre]);
};

const getTracksByReleaseYear = async (year) => {
  return await db.all('SELECT * FROM tracks WHERE release_year = ?', [year]);
};

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await getAllTracks();
    if (tracks.length === 0) {
      res.status(404).json({ error: 'No tracks found' });
    } else {
      res.status(200).json({ tracks });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tracks/artist/:artist', async (req, res) => {
  const artist = req.params.artist;
  try {
    const tracks = await getTracksByArtist(artist);
    if (tracks.length === 0) {
      res.status(404).json({ error: `No tracks found for artist: ${artist}` });
    } else {
      res.status(200).json({ tracks });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tracks/genre/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const tracks = await getTracksByGenre(genre);
    if (tracks.length === 0) {
      res.status(404).json({ error: `No tracks found for genre: ${genre}` });
    } else {
      res.status(200).json({ tracks });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/tracks/release_year/:year', async (req, res) => {
  const year = req.params.year;
  try {
    const tracks = await getTracksByReleaseYear(year);
    if (tracks.length === 0) {
      res.status(404).json({ error: `No tracks found for release year: ${year}` });
    } else {
      res.status(200).json({ tracks });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
