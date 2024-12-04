const express = require('express');
const app = express();
const sequelize = require('./config/database');
const User = require('./user');

app.use(express.json());

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user' });
    }
  });
  
  app.listen(4000, () => {
    console.log('User Service running on port 4000');
  });