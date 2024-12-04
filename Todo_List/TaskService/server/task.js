const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  deadlineDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('completed', 'not completed'),
    defaultValue: 'not completed',
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  }
});

module.exports = Task;