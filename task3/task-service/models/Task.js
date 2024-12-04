const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadlineDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // 0 - created
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Task;
