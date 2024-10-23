const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib/index");
const Author = require("./models/author.model");
const Book = require("./models/book.model");
const BookAuthor = require("./models/book.model");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyBooks = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

const dummyAuthors = [{ name: "J.K Rowling", birthYear: 1965 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Book.bulkCreate(dummyBooks);
    await Author.bulkCreate(dummyAuthors);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.post("/authors/new", async (req, res) => {
  const newAuthor = req.body.newAuthor;
  if (!newAuthor) {
    return res
      .status(400)
      .json({ error: "newAuthor is required in the request body" });
  }
  try {
    const author = await Author.create(newAuthor);
    res.status(201).json({ newAuthor: author });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/authors/update/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newAuthorData = req.body;
  try {
    await Author.update(newAuthorData, { where: { id } });
    const updatedAuthor = await Author.findByPk(id);
    res.status(200).json({
      message: "Author updated successfully",
      updatedAuthor: updatedAuthor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
