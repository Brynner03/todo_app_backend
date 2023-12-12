const { Board, Task, User } = require('./models/index');
const { db } = require('./models/index');

const seed = async () => {
  await db.sync({ force: true }); // clear out database + tables

  // Create a user
  const user = await User.create({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  });

  // Create boards for the user
  const boards = await Promise.all([
    Board.create({ title: 'Not Started', userId: user.id }),
    Board.create({ title: 'In-Progress', userId: user.id }),
    Board.create({ title: 'Completed', userId: user.id }),
  ]);

  const tasks = await Promise.all(
    boards.flatMap((board) => {
      const tasksData = [
        { title: 'Task 1', order: 1, boardId: board.id },
        { title: 'Task 2', order: 2, boardId: board.id },
      ];
      return tasksData.map((taskData) => Task.create(taskData));
    })
  );

  console.log('Seed data added successfully');
};

module.exports = {
  seed,
};
