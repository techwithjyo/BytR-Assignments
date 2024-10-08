const { DataTypes, sequelize } = require('../lib/index');

const Post = sequelize.define('Post', {
  name: {
  type: DataTypes.TEXT,
  allowNull: false,
},
author: {
  type: DataTypes.TEXT,
  allowNull: false,
},
content: {
  type: DataTypes.TEXT,
  allowNull: false,
},
title: {
  type: DataTypes.TEXT,
  allowNull: false,
},
}, {
timestamps: false,
tableName: 'posts'
});

module.exports = Post;