const express = require('express');
const sequelize = require('./config/database');
const axios = require('axios');
const Task = require('./task');

const app = express();
app.use(express.json());

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to PostgreSQL:', err);
  });

app.post('/tasks', async (req, res) => {
    const { title, description, status, userId } = req.body;
  
    try {
      const userResponse = await axios.get(`http://localhost:4000/users/${userId}`);
  
      if (!userResponse.data) {
        return res.status(404).json({ message: 'User not found' });
      }
  

      const task = await Task.create({ title, description, status, userId });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Error creating task' });
    }
  });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});