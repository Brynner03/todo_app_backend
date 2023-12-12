const Router = require('express').Router();
const controller = require('../controllers/BoardController')

Router.get('/', controller.getBoards)
Router.post('/', controller.createBoard)
Router.get('/:boardId/tasks', controller.getBoardsTasks)
Router.get('/:boardId', controller.getBoardById)
Router.get('/user/:userId', controller.getSpecificUserBoards)
Router.put('/edit/:boardId', controller.updateBoard)
Router.delete('/:boardId', controller.deleteBoard)

module.exports = Router