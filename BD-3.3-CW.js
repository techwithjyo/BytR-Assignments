const express = require('express');
const app = express();
const port = 3000;

let watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];

app.get('/watchlist/update', (req, res) => {
  const videoId = parseInt(req.query.videoId);
  const watched = req.query.watched === 'true';

  const updateWatchedStatusById = (id, status) => {
    const video = watchList.find(v => v.videoId === id);
    if (video) {
      video.watched = status;
    }
  };

  updateWatchedStatusById(videoId, watched);
  res.json(watchList);
});

app.get('/watchlist/update-all', (req, res) => {
  const watched = req.query.watched === 'true';

  const updateAllVideosWatchedStatus = (status) => {
    watchList.forEach(video => {
      video.watched = status;
    });
  };

  updateAllVideosWatchedStatus(watched);
  res.json(watchList);
});

app.get('/watchlist/delete', (req, res) => {
  const videoId = parseInt(req.query.videoId);

  const shouldDeleteById = (id) => {
    watchList = watchList.filter(video => video.videoId !== id);
  };

  shouldDeleteById(videoId);
  res.json(watchList);
});

app.get('/watchlist/delete-watched', (req, res) => {
  const deleteWatchedVideos = () => {
    watchList = watchList.filter(video => !video.watched);
  };

  deleteWatchedVideos();
  res.json(watchList);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});