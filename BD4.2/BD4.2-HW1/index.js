const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.2/BD4.2-HW1/books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW Template" });
});

const getAllBooks = async () => {
  return await db.all('SELECT * FROM books');
};

const getAllBooksByAuthor = async (author) => {
  return await db.all('SELECT * FROM books WHERE author = ?', [author]);
};

const getAllBooksByGenre = async (genre) => {
  return await db.all('SELECT * FROM books WHERE genre = ?', [genre]);
};

const getAllBooksByPublicationYear = async (year) => {
  return await db.all('SELECT * FROM books WHERE publication_year = ?', [year]);
};

app.get('/books', async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books.length === 0) {
      res.status(404).json({ error: 'No books found' });
    } else {
      res.status(200).json({ books });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const books = await getAllBooksByAuthor(author);
    if (books.length === 0) {
      res.status(404).json({ error: `No books found for author: ${author}` });
    } else {
      res.status(200).json({ books });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/genre/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const books = await getAllBooksByGenre(genre);
    if (books.length === 0) {
      res.status(404).json({ error: `No books found for genre: ${genre}` });
    } else {
      res.status(200).json({ books });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books/publication_year/:year', async (req, res) => {
  const year = req.params.year;
  try {
    const books = await getAllBooksByPublicationYear(year);
    if (books.length === 0) {
      res.status(404).json({ error: `No books found for publication year: ${year}` });
    } else {
      res.status(200).json({ books });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
