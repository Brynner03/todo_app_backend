const Router = require('express').Router()

const userRouter = require('./UserRoutes')
const boardRouter = require('./BoardRoutes')
const taskRouter = require('./TaskRoutes')

Router.use('/users', userRouter)
Router.use('/boards', boardRouter)
Router.use('/tasks', taskRouter)

module.exports = Router