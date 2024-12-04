const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_database', 'postgres_user', 'postgres_password', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432'
});

module.exports = sequelize;
