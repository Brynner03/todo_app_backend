const { Board, Task } = require('../models');

const getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.send(boards);
  } catch (error) {
    throw error;
  }
};

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.boardId);
    res.send(board);
  } catch (error) {
    throw error;
  }
};

const getBoardsTasks = async (req, res) => {
  try {
    const board = await Board.findOne({
      where: { id: req.params.boardId },
      include: [{ model: Task }],
    });
    res.json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createBoard = async (boardData) => {
  try {
    const { title, userId } = boardData;

    // Create the board
    const board = await Board.create({ title, userId });

    // Create default tasks for the board
    const tasks = await Task.bulkCreate([
      { title: 'Task 1', completed: false, boardId: board.id },
      { title: 'Task 2', completed: false, boardId: board.id },
      { title: 'Task 3', completed: false, boardId: board.id },
    ]);

    // Associate the tasks with the board
    await board.setTasks(tasks);

    return board;
  } catch (error) {
    throw error;
  }
};

const updateBoard = async (req, res) => {
  try {
    let boardId = parseInt(req.params.boardId);
    let updateBoard = await Board.update(req.body, {
      where: { id: boardId },
      returning: true,
    });
    res.send(updateBoard);
  } catch (error) {
    throw error;
  }
};

const deleteBoard = async (req, res) => {
  try {
    let boardId = parseInt(req.params.boardId);
    await Board.destroy({
      where: { id: boardId },
    });
    res.send({ message: `Deleted a board with an id of ${boardId}` });
  } catch (error) {
    throw error;
  }
};

const getSpecificUserBoards = async (req, res) => {
  try {
    const userBoards = await Board.findAll({ where: { userId: req.params.userId }});
    res.json(userBoards);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardsTasks,
  getSpecificUserBoards,
};
