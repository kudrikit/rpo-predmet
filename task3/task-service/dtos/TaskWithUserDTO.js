class TaskWithUserDTO {
    constructor(task, user) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.deadlineDate = task.deadlineDate;
        this.status = task.status;
        this.user = user; // Информация о пользователе
    }
}

module.exports = TaskWithUserDTO;
