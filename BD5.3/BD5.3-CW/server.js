const express = require("express");
const { sequelize } = require("./lib/index");
const Track = require("./models/track.model");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummySongData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Track.bulkCreate(dummySongData);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.get("/tracks", async (req, res) => {
  const tracks = await Track.findAll();
  res.json({ tracks });
});

app.post("/tracks/new", async (req, res) => {
  const newTrack = req.body.newTrack;
  if (!newTrack) {
    return res
      .status(400)
      .json({ error: "newTrack is required in the request body" });
  }
  const createdTrack = await Track.create(newTrack);
  res.json({ newTrack: createdTrack });
});

app.post("/tracks/update/:id", async (req, res) => {
  const id = req.params.id;
  const newTrackData = req.body;
  await Track.update(newTrackData, { where: { id } });
  const updatedTrack = await Track.findByPk(id);
  res.json({ message: "Track updated successfully", updatedTrack });
});

app.post("/tracks/delete", async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .status(400)
      .json({ error: "id is required in the request body" });
  }
  await Track.destroy({ where: { id } });
  res.json({ message: "Track record deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
