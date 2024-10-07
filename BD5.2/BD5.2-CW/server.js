const express = require('express');
const { sequelize } = require('./lib/index');
const Track = require('./models/movie.model');

const app = express();
const port = 3000;

const dummyMovieData = [
  {
    id: 1,
    name: 'Raabta',
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    genre: 'Romantic',
    duration: 4,
    release_year: 2012,
  },
  {
    id: 2,
    name: 'Shape of You',
    artist: 'Ed Sheeran',
    album: 'Divide',
    genre: 'Pop',
    duration: 4,
    release_year: 2017,
  },
  {
    id: 3,
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    genre: 'Synthwave',
    duration: 3,
    release_year: 2019,
  },
  {
    id: 4,
    name: 'Someone Like You',
    artist: 'Adele',
    album: '21',
    genre: 'Soul',
    duration: 5,
    release_year: 2011,
  },
  {
    id: 5,
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    genre: 'Rock',
    duration: 6,
    release_year: 1975,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); 
    await Track.bulkCreate(dummyMovieData);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.get('/tracks', async (req, res) => {
  try {
    const tracks = await fetchAllTracks();
    res.status(200).json({ tracks });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).send('Error fetching tracks');
  }
});

const fetchAllTracks = async () => {
  return await Track.findAll();
};

app.get('/tracks/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const track = await fetchTrackById(id);
    res.status(200).json({ track });
  } catch (error) {
    console.error('Error fetching track by ID:', error);
    res.status(500).send('Error fetching track by ID');
  }
});

const fetchTrackById = async (id) => {
  return await Track.findByPk(id);
};

app.get('/tracks/artist/:artist', async (req, res) => {
  const artist = req.params.artist;
  try {
    const tracks = await fetchTracksByArtist(artist);
    res.status(200).json({ tracks });
  } catch (error) {
    console.error('Error fetching tracks by artist:', error);
    res.status(500).send('Error fetching tracks by artist');
  }
});

const fetchTracksByArtist = async (artist) => {
  return await Track.findAll({ where: { artist } });
};

app.get('/tracks/sort/release_year', async (req, res) => {
  const order = req.query.order || 'asc';
  try {
    const tracks = await sortTracksByReleaseYear(order);
    res.status(200).json({ tracks });
  } catch (error) {
    console.error('Error sorting tracks by release year:', error);
    res.status(500).send('Error sorting tracks by release year');
  }
});

const sortTracksByReleaseYear = async (order) => {
  return await Track.findAll({ order: [['release_year', order]] });
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});