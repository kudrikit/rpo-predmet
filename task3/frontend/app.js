const apiBaseUrl = 'http://localhost:3000/api'; // URL Task Service
const userApiBaseUrl = 'http://localhost:3001/api'; // URL User Service

// Function to get all tasks
async function fetchTasks() {
    const response = await fetch(`${apiBaseUrl}/tasks`);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear previous tasks

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>Description: ${task.description}</p>
            <p>Deadline: ${task.deadlineDate}</p>
            <p>Status: ${getStatusText(task.status)}</p>
            <p>Assigned to: ${task.user.fullName} (${task.user.email})</p>
        `;
        taskList.appendChild(taskElement);
    });
}

// Function to create a new task
async function createTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const deadlineDate = document.getElementById('task-deadline').value;
    const userId = document.getElementById('task-user-id').value;

    const taskData = {
        title,
        description,
        deadlineDate,
        userId
    };

    const response = await fetch(`${apiBaseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    });

    if (response.ok) {
        alert('Task created successfully!');
        fetchTasks();
    } else {
        alert('Failed to create task.');
    }
}

// Helper function to convert status
function getStatusText(status) {
    switch (status) {
        case 0: return 'Created';
        case 1: return 'In Progress';
        case 2: return 'Done';
        case 3: return 'Failed';
        default: return 'Unknown';
    }
}

fetchTasks();
