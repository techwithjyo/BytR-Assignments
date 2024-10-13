const express = require("express");
const { sequelize } = require("./lib/index");
const Post = require("./models/post.model");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyPosts = [
  {
    title: "Getting Started with Node.js",
    content:
      "This post will guide you through the basics of Node.js and how to set up a Node.js project.",
    author: "Alice Smith",
  },
  {
    title: "Advanced Express.js Techniques",
    content:
      "Learn advanced techniques and best practices for building applications with Express.js.",
    author: "Bob Johnson",
  },
  {
    title: "ORM with Sequelize",
    content:
      "An introduction to using Sequelize as an ORM for Node.js applications.",
    author: "Charlie Brown",
  },
  {
    title: "Boost Your JavaScript Skills",
    content:
      "A collection of useful tips and tricks to improve your JavaScript programming.",
    author: "Dana White",
  },
  {
    title: "Designing RESTful Services",
    content: "Guidelines and best practices for designing RESTful APIs.",
    author: "Evan Davis",
  },
  {
    title: "Mastering Asynchronous JavaScript",
    content:
      "Understand the concepts and patterns for writing asynchronous code in JavaScript.",
    author: "Fiona Green",
  },
  {
    title: "Modern Front-end Technologies",
    content:
      "Explore the latest tools and frameworks for front-end development.",
    author: "George King",
  },
  {
    title: "Advanced CSS Layouts",
    content: "Learn how to create complex layouts using CSS Grid and Flexbox.",
    author: "Hannah Lewis",
  },
  {
    title: "Getting Started with React",
    content: "A beginner's guide to building user interfaces with React.",
    author: "Ian Clark",
  },
  {
    title: "Writing Testable JavaScript Code",
    content:
      "An introduction to unit testing and test-driven development in JavaScript.",
    author: "Jane Miller",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Track.bulkCreate(dummyPosts);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  res.json({ posts });
});

app.post("/posts/new", async (req, res) => {
  const newPost = req.body.newPost;
  if (!newPost) {
    return res
      .status(400)
      .json({ error: "newPost is required in the request body" });
  }
  const createdPost = await Post.create(newPost);
  res.json({ newPost: createdPost });
});

app.post("/posts/update/:id", async (req, res) => {
  const id = req.params.id;
  const newPostData = req.body;
  await Post.update(newPostData, { where: { id } });
  const updatedPost = await Post.findByPk(id);
  res.json({ message: "Post updated successfully", updatedPost });
});

app.post("/posts/delete", async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .status(400)
      .json({ error: "id is required in the request body" });
  }
  await Post.destroy({ where: { id } });
  res.json({ message: "Post record deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
