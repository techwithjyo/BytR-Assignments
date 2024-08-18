const express = require('express');
const app = express();
const port = 3000;

let watchList = [
  { videoId: 1, title: 'JavaScript Tutorial', watched: false, url: 'https://youtu.be/shorturl1', isFavorite: false },
  { videoId: 2, title: 'Node.js Basics', watched: true, url: 'https://youtu.be/shorturl2', isFavorite: false },
  { videoId: 3, title: 'React.js Guide', watched: false, url: 'https://youtu.be/shorturl3', isFavorite: false }
];

let tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true }
];

let books = [
  { bookId: 1, title: '1984', available: true },
  { bookId: 2, title: 'Brave New World', available: true },
  { bookId: 3, title: 'Fahrenheit 451', available: false }
];

app.get('/watchlist/delete-unwatched', (req, res) => {
  let unwatchedVideos = watchList.filter(video => video.watched);
  res.json(unwatchedVideos);
  });

app.get('/watchlist/favorite', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite  = req.query.isFavorite === "true";
  markVideoAsFavorite(videoId, isFavorite);
  res.json(watchList);
});

function markVideoAsFavorite (videoId, isFavorite){
  let videos = watchList.find(v => v.videoId === videoId);
  if (videos){
      videos.isFavorite = isFavorite;
  }
};

app.get('/tasks/update', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const completed = req.query.completed === 'true';

  const updateTaskStatusById = (id, status) => {
    const task = tasks.find(t => t.taskId === id);
    if (task) {
      task.completed = status;
    }
  };

  updateTaskStatusById(taskId, completed);
  res.json(tasks);
});

app.get('/tasks/remove-completed', (req, res) => {
  const removeCompletedTasks = () => {
    return tasks.filter(task => !task.completed);
  };

  const result = removeCompletedTasks();
  res.json(result);
});

app.get('/library/update', (req, res) => {
  const bookId = parseInt(req.query.bookId);
  const available = req.query.available === 'true';

  const updateBookAvailabilityById = (id, status) => {
    const book = books.find(b => b.bookId === id);
    if (book) {
      book.available = status;
    }
  };

  updateBookAvailabilityById(bookId, available);
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});