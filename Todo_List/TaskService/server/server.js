var express = require('express');
const mongoose = require('mongoose');
var app = express();
const Task = require('./task'); // Импорт модели Task из task.js
const axios = require('axios');

// Добавление middleware для парсинга JSON-данных
app.use(express.json());

mongoose.connect('mongodb+srv://mmarlen2303:vGAa6rZ2ovM4zuZG@cluster0.imwyi2m.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Получение всех задач
axios.get('http://localhost:3000/tasks')
  .then(response => {
    console.log('Все задачи:', response.data);
})
  .catch(error => {
    console.error('Ошибка при получении задач:', error);
});

const cache = {};

// Middleware для кэширования
app.get('/tasks', async (req, res) => {
    const cacheKey = 'all_tasks';

    // Проверяем наличие в кэше
    if (cache[cacheKey]) {
        return res.json(cache[cacheKey]);
    }

    try {
        const tasks = await Task.find();

        // Кэшируем результат
        cache[cacheKey] = tasks;

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание новой задачи
const newTaskData = {
    title: 'Новая задача',
    description: 'Описание новой задачи',
    status: 'not completed'
  };
  
  axios.post('http://localhost:3000/tasks', newTaskData)
    .then(response => {
      console.log('Новая задача создана:', response.data);
    })
    .catch(error => {
      console.error('Ошибка при создании новой задачи:', error);
    });

// Создание новой задачи
app.post('/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ID задачи, которую необходимо обновить
// const taskId = '65d0aec18384cf3e2bf32d73';

// Данные для обновления задачи
// const updateData = {
//     title: 'Новое название задачи',
//     description: 'Новое описание задачи',
//     status: 'выполняется'
// };

// // Отправка запроса на обновление задачи
// axios.patch(`http://localhost:3000/tasks/${taskId}`, updateData)
//   .then(response => {
//     console.log('Задача успешно обновлена:', response.data);
// })
//   .catch(error => {
//     console.error('Ошибка при обновлении задачи:', error);
// });

// // Обновление задачи
// app.patch('/tasks/:id', async (req, res) => {
//     try {
//         const taskId = req.params.id;
//         const updateData = req.body; // Данные для обновления задачи

//         // Логика обновления задачи по id
//         // Использование метода findByIdAndUpdate из mongoose
//         const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

//         if (!updatedTask) {
//             return res.status(404).json({ message: 'Задача не найдена' });
//         }

//         res.json(updatedTask);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// ID задачи, которую необходимо удалить
const taskId = '65d0aec18384cf3e2bf32d73';

// Отправка запроса на удаление задачи
axios.delete(`http://localhost:3000/tasks/${taskId}`)
  .then(response => {
    console.log('Задача успешно удалена');
})
  .catch(error => {
    console.error('Ошибка при удалении задачи:', error);
});

// Удаление задачи
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        // Логика удаления задачи по id
        // Использование метода findByIdAndDelete из mongoose
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Задача не найдена' });
        }

        res.json({ message: 'Задача успешно удалена' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});