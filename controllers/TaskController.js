const { Task } = require('../models');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    throw error;
  }
};

const getTaskByPk = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    res.send(task);
  } catch (error) {
    throw error;
  }
};

const createTask = async (req, res) => {
  try {
    let taskBody = {
      ...req.body,
      boardId: parseInt(req.params.boardId)
    };
    let task = await Task.create(taskBody);
    res.send(task);
  } catch (error) {
    throw error;
  }
};

const updateTask = async (req, res) => {
  try {
    let taskId = parseInt(req.params.taskId);
    let updateTask = await Task.update(req.body, {
      where: { id: taskId },
      returning: true
    });
    res.send(updateTask);
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (req, res) => {
  try {
    let taskId = parseInt(req.params.taskId);
    await Task.destroy({
      where: { id: taskId },
    });
    res.send({ message: `Deleted a task with an id of ${taskId}` });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTasks,
  getTaskByPk,
  createTask,
  updateTask,
  deleteTask,
};
