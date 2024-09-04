const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.4/BD4.4-HW2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW2 Template" });
});

const fetchAllArtworks = async () => {
  return await db.all("SELECT id, title, artist FROM artworks");
};

const fetchArtworksByArtist = async (artist) => {
  return await db.all(
    "SELECT id, title, artist, year FROM artworks WHERE artist = ?",
    artist,
  );
};

const fetchArtworksByYear = async (year) => {
  return await db.all(
    "SELECT id, title, artist, year FROM artworks WHERE year = ?",
    year,
  );
};

const fetchArtworksByMedium = async (medium) => {
  return await db.all(
    "SELECT id, title, artist, medium FROM artworks WHERE medium = ?",
    medium,
  );
};

app.get("/artworks", async (req, res) => {
  try {
    const artworks = await fetchAllArtworks();
    if (artworks.length === 0) {
      return res.status(404).json({ error: "No artworks found" });
    }
    res.json({ artworks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/artworks/artist/:artist", async (req, res) => {
  try {
    const artist = req.params.artist;
    const artworks = await fetchArtworksByArtist(artist);
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ error: "No artworks found for the specified artist" });
    }
    res.json({ artworks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/artworks/year/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const artworks = await fetchArtworksByYear(year);
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ error: "No artworks found for the specified year" });
    }
    res.json({ artworks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/artworks/medium/:medium", async (req, res) => {
  try {
    const medium = req.params.medium;
    const artworks = await fetchArtworksByMedium(medium);
    if (artworks.length === 0) {
      return res
        .status(404)
        .json({ error: "No artworks found for the specified medium" });
    }
    res.json({ artworks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
