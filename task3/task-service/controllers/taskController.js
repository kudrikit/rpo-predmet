const Task = require('../models/Task');
const TaskWithUserDTO = require('../dtos/TaskWithUserDTO');
const UserServiceClient = require('../services/UserServiceClient');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        const tasksWithUsers = await Promise.all(tasks.map(async (task) => {
            const user = await UserServiceClient.getUserById(task.userId);
            return new TaskWithUserDTO(task, user);
        }));
        res.json(tasksWithUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            const user = await UserServiceClient.getUserById(task.userId);
            res.json(new TaskWithUserDTO(task, user));
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
