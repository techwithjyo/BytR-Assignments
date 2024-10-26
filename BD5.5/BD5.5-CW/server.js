const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib/index");
const User = require("./models/user.model");
const Track = require("./models/track.model");
const Like = require("./models/like.model");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyUsers = [
  {
    username: "testuser",
    email: "testuser@gmail.com",
    password: "testuser",
  },
];

const dummyTracks = [
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
    await User.bulkCreate(dummyUsers);
    await Track.bulkCreate(dummyTracks);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.post("/users/new", async (req, res) => {
  const newUser = req.body.newUser;
  if (!newUser) {
    return res
      .status(400)
      .json({ error: "newUser is required in the request body" });
  }
  try {
    const user = await User.create(newUser);
    res.status(201).json({ newUser: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    await User.update(updatedData, { where: { id } });
    const updatedUser = await User.findByPk(id);
    res.status(200).json({
      message: "User updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Like a Track
app.post("/users/:id/like", async (req, res) => {
  const userId = req.params.id;
  const trackId = req.query.trackId;
  try {
    const newLike = await Like.create({ userId, trackId });
    res.json({ message: "Track liked", newLike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Track
app.post("/users/:id/dislike", async (req, res) => {
  const userId = req.params.id;
  const trackId = req.query.trackId;
  try {
    await Like.destroy({ where: { userId, trackId } });
    res.json({ message: "Track disliked" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Tracks
app.get("/users/:id/liked", async (req, res) => {
  const userId = req.params.id;
  try {
    const likedTracks = await Track.findAll({
      include: {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
      },
    });
    res.json({ likedTracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id/liked-artist", async (req, res) => {
  const userId = req.params.id;
  const artist = req.query.artist;
  try {
    const likedTracks = await Track.findAll({
      where: { artist },
      include: {
        model: User,
        where: { id: userId },
        through: { attributes: [] },
      },
    });
    res.json({ likedTracks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
