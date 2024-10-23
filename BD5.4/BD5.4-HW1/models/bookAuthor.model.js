const { DataTypes, sequelize } = require('../lib/index');
const Book = require('./book');
const Author = require('./author');

const BookAuthor = sequelize.define('BookAuthor', {
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: Author,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: Book,
      key: 'id',
    },
  },
});

Book.belongsToMany(Author, { through: BookAuthor, foreignKey: 'bookId' });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: 'authorId' });

module.exports = BookAuthor;