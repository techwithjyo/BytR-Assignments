const express = require('express');
const { sequelize } = require('./lib/index');
const Track = require('./models/book.model');

const app = express();
const port = 3000;

const dummyBookData = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description: 'A novel about the serious issues of rape and racial inequality.',
      genre: 'Fiction',
    },
    {
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',
      genre: 'Dystopian',
    },
    {
      title: 'Moby Dick',
      author: 'Herman Melville',
      description: 'The narrative of Captain Ahab\'s obsessive quest to kill the white whale, Moby Dick.',
      genre: 'Adventure',
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description: 'A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet.',
      genre: 'Romance',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel about the American dream and the roaring twenties.',
      genre: 'Tragedy',
    },
  ];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); 
    await Track.bulkCreate(dummyBookData);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});