const { db, DataTypes } = require('../db');
const User = require('./User');
const Board = require('./Board');
const Task = require('./Task');

// Associations between models
User.hasMany(Board, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Board.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Board.hasMany(Task, {
  foreignKey: {
    name: 'boardId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Task.belongsTo(Board, {
  foreignKey: {
    name: 'boardId',
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

module.exports = {
  db,
  DataTypes,
  User,
  Board,
  Task,
};
