const { DataTypes, sequelize } = require('../lib/index');

const Book = sequelize.define('book', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  module.exports = Book;