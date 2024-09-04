const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.4/BD4.4-HW3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW3 Template" });
});

const fetchAllBooks = async () => {
  return await db.all("SELECT id, title, author FROM books");
};

const fetchBooksByAuthor = async (author) => {
  return await db.all(
    "SELECT id, title, author, year FROM books WHERE author = ?",
    author,
  );
};

const fetchBooksByGenre = async (genre) => {
  return await db.all(
    "SELECT id, title, author, genre FROM books WHERE genre = ?",
    genre,
  );
};

const fetchBooksByYear = async (year) => {
  return await db.all(
    "SELECT id, title, author, genre, year FROM books WHERE year = ?",
    year,
  );
};

app.get("/books", async (req, res) => {
  try {
    const books = await fetchAllBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/books/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const books = await fetchBooksByAuthor(author);
    if (books.length === 0) {
      return res
        .status(404)
        .json({ error: "No books found for the specified author" });
    }
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/books/genre/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const books = await fetchBooksByGenre(genre);
    if (books.length === 0) {
      return res
        .status(404)
        .json({ error: "No books found for the specified genre" });
    }
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/books/year/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const books = await fetchBooksByYear(year);
    if (books.length === 0) {
      return res
        .status(404)
        .json({ error: "No books found for the specified year" });
    }
    res.json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
