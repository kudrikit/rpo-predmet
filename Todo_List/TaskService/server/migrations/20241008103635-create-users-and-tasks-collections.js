module.exports = {
  async up(db, client) {
    // Создание коллекции "users"
    await db.createCollection('users');
    const users = await db.collection('users').insertMany([
      { email: 'user1@example.com', fullName: 'John Doe' },
      { email: 'user2@example.com', fullName: 'Jane Smith' }
    ]);

    const user1Id = users.insertedIds[0];  // Получаем ID первого пользователя
    const user2Id = users.insertedIds[1];  // Получаем ID второго пользователя

    // Создание коллекции "tasks"
    await db.createCollection('tasks');
    await db.collection('tasks').insertMany([
      { title: 'Task 1', description: 'First task', status: 'not completed', userId: 'user1Id' },
      { title: 'Task 2', description: 'Second task', status: 'completed', userId: 'user2Id ' }
    ]);
  },

  async down(db, client) {
    // Удаление коллекций
    await db.collection('tasks').drop();
    await db.collection('users').drop();
  }
};