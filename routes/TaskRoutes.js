const Router = require('express').Router();
const controller = require('../controllers/TaskController')

Router.get('/', controller.getTasks)
Router.post('/', controller.createTask)
Router.get('/:taskId', controller.getTaskByPk)
Router.put('/edit/:taskId', controller.updateTask)
Router.delete('/:tasktId', controller.deleteTask)

module.exports = Router