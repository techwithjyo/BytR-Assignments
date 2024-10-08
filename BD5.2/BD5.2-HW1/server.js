const express = require('express');
const { sequelize } = require('./lib/index');
const Track = require('./models/post.model');

const app = express();
const port = 3000;

const dummyPostData = [
  {
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1'
  },
  {
    name: 'Post2',
    author: 'Author2',
    content: 'This is the content of post 2',
    title: 'Title2'
  },
  {
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3'
  }
];


app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); 
    await Track.bulkCreate(dummyPostData);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await fetchAllPosts();
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Error fetching posts');
  }
});

const fetchAllPosts = async () => {
  return await Track.findAll();
};

app.get('/posts/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const post = await fetchPostById(id);
    res.status(200).json({ post });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).send('Error fetching post by ID');
  }
});

const fetchPostById = async (id) => {
  return await Track.findByPk(id);
};

app.get('/posts/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const posts = await fetchPostsByAuthor(author);
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    res.status(500).send('Error fetching posts by author');
  }
});

const fetchPostsByAuthor = async (author) => {
  return await Track.findAll({ where: { author } });
};

app.get('/posts/sort/name', async (req, res) => {
  const order = req.query.order || 'asc';
  try {
    const posts = await sortPostsByName(order);
    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error sorting posts by name:', error);
    res.status(500).send('Error sorting posts by name');
  }
});

const sortPostsByName = async (order) => {
  return await Track.findAll({ order: [['name', order]] });
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});