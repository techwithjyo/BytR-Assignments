const express = require('express');
const { sequelize } = require('./lib/index');
const Track = require('./models/post.model');

const app = express();
const port = 3000;

const dummyData = [
    {
      name: 'John Doe',
      author: 'John Doe',
      title: 'Introduction to JavaScript',
      content: 'JavaScript is a versatile programming language used for web development...',
    },
    {
      name: 'Jane Smith',
      author: 'Jane Smith',
      title: 'Understanding Asynchronous Programming',
      content: 'Asynchronous programming is a key concept in JavaScript that allows...',
    },
    {
      name: 'Alice Johnson',
      author: 'Alice Johnson',
      title: 'Mastering React',
      content: 'React is a popular JavaScript library for building user interfaces...',
    },
    {
      name: 'Bob Brown',
      author: 'Bob Brown',
      title: 'Getting Started with Node.js',
      content: 'Node.js is a runtime environment that allows you to run JavaScript on the server...',
    },
    {
      name: 'Charlie Davis',
      author: 'Charlie Davis',
      title: 'Exploring TypeScript',
      content: 'TypeScript is a superset of JavaScript that adds static types...',
    },
  ];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); 
    await Track.bulkCreate(dummyData);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});