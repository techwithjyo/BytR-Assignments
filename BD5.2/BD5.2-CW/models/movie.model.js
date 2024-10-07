const { DataTypes, sequelize } = require('../lib/index');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  album: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  artist: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'movies'
});

  module.exports = Movie;